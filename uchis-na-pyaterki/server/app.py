"""Сервер сайта «Учись на пятёрки»: аккаунты, подписка, готовые уроки, чат с ИИ-учителем.

Запуск:  uvicorn app:app --host 127.0.0.1 --port 8000   (из папки server)
Настройки берутся из переменных окружения, см. ../.env.example.
"""
import base64
import hashlib
import hmac
import json
import os
import random
import re
import secrets
import sqlite3
import time
import urllib.error
import urllib.request
import uuid
from contextlib import contextmanager
from pathlib import Path

from fastapi import FastAPI, HTTPException, Request, Response
from fastapi.responses import HTMLResponse, JSONResponse, PlainTextResponse, RedirectResponse

from lessons import LESSON_QN, valid_lesson  # noqa: F401  (valid_lesson нужен генератору и тестам)
from teacher import ask_teacher

ROOT = Path(__file__).resolve().parent.parent
BASE_URL = os.environ.get("BASE_URL", "http://127.0.0.1:8000").rstrip("/")
DB_PATH = os.environ.get("DB_PATH", str(ROOT / "data.sqlite3"))
DEV_MODE = os.environ.get("DEV_MODE") == "1"
COOKIE_SECURE = BASE_URL.startswith("https://")
YOOKASSA_SHOP_ID = os.environ.get("YOOKASSA_SHOP_ID", "")
YOOKASSA_SECRET = os.environ.get("YOOKASSA_SECRET", "")
TEACHER_DAILY_LIMIT = int(os.environ.get("TEACHER_DAILY_LIMIT", "20"))
PERIOD_DAYS = 30
PLANS = {
    "primary": {"price": int(os.environ.get("PRICE_PRIMARY", "49")), "title": "1–4 класс", "grades": range(1, 5)},
    "secondary": {"price": int(os.environ.get("PRICE_SECONDARY", "100")), "title": "5–11 класс", "grades": range(5, 12)},
}
CURR = json.loads((Path(__file__).parent / "curriculum.json").read_text(encoding="utf-8"))
SESSION_DAYS = 60
COOKIE = "sid"

app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)


# ---------- база данных ----------
@contextmanager
def db():
    con = sqlite3.connect(DB_PATH, timeout=10)
    con.row_factory = sqlite3.Row
    try:
        yield con
        con.commit()
    finally:
        con.close()


def init_db():
    with db() as con:
        con.executescript(
            """
            PRAGMA journal_mode=WAL;
            CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, email TEXT UNIQUE NOT NULL, salt BLOB NOT NULL,
                pass_hash BLOB NOT NULL, created INTEGER NOT NULL, progress TEXT);
            CREATE TABLE IF NOT EXISTS sessions(token TEXT PRIMARY KEY, user_id INTEGER NOT NULL, expires INTEGER NOT NULL);
            CREATE TABLE IF NOT EXISTS subs(user_id INTEGER NOT NULL, plan TEXT NOT NULL, until INTEGER NOT NULL,
                PRIMARY KEY(user_id, plan));
            CREATE TABLE IF NOT EXISTS payments(id TEXT PRIMARY KEY, user_id INTEGER NOT NULL, plan TEXT NOT NULL,
                amount INTEGER NOT NULL, status TEXT NOT NULL, created INTEGER NOT NULL);
            CREATE TABLE IF NOT EXISTS lessons(grade INTEGER NOT NULL, subj TEXT NOT NULL, idx INTEGER NOT NULL,
                variant INTEGER NOT NULL, body TEXT NOT NULL, PRIMARY KEY(grade, subj, idx, variant));
            CREATE TABLE IF NOT EXISTS usage(user_id INTEGER NOT NULL, day TEXT NOT NULL, n INTEGER NOT NULL,
                PRIMARY KEY(user_id, day));
            CREATE TABLE IF NOT EXISTS attempts(key TEXT NOT NULL, ts INTEGER NOT NULL);
            """
        )


init_db()


# ---------- аккаунты ----------
def hash_password(password: str, salt: bytes) -> bytes:
    return hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, 300_000)


def current_user(request: Request):
    token = request.cookies.get(COOKIE)
    if not token:
        return None
    with db() as con:
        row = con.execute(
            "SELECT u.* FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token = ? AND s.expires > ?",
            (token, int(time.time())),
        ).fetchone()
    return row


def require_user(request: Request):
    user = current_user(request)
    if not user:
        raise HTTPException(401, "need_login")
    return user


def active_plans(user_id: int) -> dict:
    now = int(time.time())
    with db() as con:
        rows = con.execute("SELECT plan, until FROM subs WHERE user_id = ? AND until > ?", (user_id, now)).fetchall()
    return {r["plan"]: r["until"] for r in rows}


def plan_for_grade(grade: int) -> str:
    return "primary" if grade <= 4 else "secondary"


def too_many_attempts(key: str, limit: int = 10, window: int = 900) -> bool:
    """Простая защита от подбора пароля: не больше `limit` попыток за `window` секунд."""
    now = int(time.time())
    with db() as con:
        con.execute("DELETE FROM attempts WHERE ts < ?", (now - window,))
        n = con.execute("SELECT COUNT(*) FROM attempts WHERE key = ?", (key,)).fetchone()[0]
        con.execute("INSERT INTO attempts(key, ts) VALUES(?, ?)", (key, now))
    return n >= limit


def start_session(response: Response, user_id: int):
    token = secrets.token_urlsafe(32)
    with db() as con:
        con.execute("INSERT INTO sessions(token, user_id, expires) VALUES(?, ?, ?)",
                    (token, user_id, int(time.time()) + SESSION_DAYS * 86400))
    response.set_cookie(COOKIE, token, max_age=SESSION_DAYS * 86400, httponly=True, samesite="lax", secure=COOKIE_SECURE)


async def read_json(request: Request, limit: int = 200_000) -> dict:
    raw = await request.body()
    if len(raw) > limit:
        raise HTTPException(413, "too_large")
    try:
        data = json.loads(raw or b"{}")
    except ValueError:
        raise HTTPException(400, "bad_json")
    if not isinstance(data, dict):
        raise HTTPException(400, "bad_json")
    return data


EMAIL_RE = re.compile(r"^[^@\s]{1,64}@[^@\s]{1,190}\.[^@\s]{2,}$")


@app.post("/api/register")
async def register(request: Request):
    data = await read_json(request)
    email = str(data.get("email", "")).strip().lower()
    password = str(data.get("password", ""))
    if not EMAIL_RE.match(email):
        raise HTTPException(400, "bad_email")
    if not 8 <= len(password) <= 200:
        raise HTTPException(400, "bad_password")
    if data.get("consent") is not True:
        raise HTTPException(400, "need_consent")
    if too_many_attempts("reg:" + (request.client.host if request.client else "?"), limit=20):
        raise HTTPException(429, "rate_limited")
    salt = secrets.token_bytes(16)
    try:
        with db() as con:
            cur = con.execute("INSERT INTO users(email, salt, pass_hash, created) VALUES(?, ?, ?, ?)",
                              (email, salt, hash_password(password, salt), int(time.time())))
            user_id = cur.lastrowid
    except sqlite3.IntegrityError:
        raise HTTPException(409, "email_taken")
    response = JSONResponse({"ok": True})
    start_session(response, user_id)
    return response


@app.post("/api/login")
async def login(request: Request):
    data = await read_json(request)
    email = str(data.get("email", "")).strip().lower()
    password = str(data.get("password", ""))
    if too_many_attempts("login:" + email):
        raise HTTPException(429, "rate_limited")
    with db() as con:
        user = con.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()
    if not user or not hmac.compare_digest(hash_password(password, user["salt"]), user["pass_hash"]):
        raise HTTPException(401, "bad_login")
    response = JSONResponse({"ok": True})
    start_session(response, user["id"])
    return response


@app.post("/api/logout")
async def logout(request: Request):
    token = request.cookies.get(COOKIE)
    if token:
        with db() as con:
            con.execute("DELETE FROM sessions WHERE token = ?", (token,))
    response = JSONResponse({"ok": True})
    response.delete_cookie(COOKIE)
    return response


@app.get("/api/me")
def me(request: Request):
    prices = {k: {"price": v["price"], "title": v["title"], "days": PERIOD_DAYS} for k, v in PLANS.items()}
    user = current_user(request)
    if not user:
        return {"user": None, "prices": prices}
    progress = None
    if user["progress"]:
        try:
            progress = json.loads(user["progress"])
        except ValueError:
            progress = None
    return {"user": {"email": user["email"]}, "plans": active_plans(user["id"]), "progress": progress,
            "prices": prices, "teacher_limit": TEACHER_DAILY_LIMIT}


@app.post("/api/progress")
async def save_progress(request: Request):
    user = require_user(request)
    data = await read_json(request, limit=100_000)
    with db() as con:
        con.execute("UPDATE users SET progress = ? WHERE id = ?", (json.dumps(data, ensure_ascii=False), user["id"]))
    return {"ok": True}


# ---------- уроки ----------
def find_subject(grade: int, subj: str):
    return next((s for s in CURR.get(str(grade), []) if s["id"] == subj), None)


def check_access(request: Request, grade: int):
    """Платный доступ: нужен вход и действующая подписка на группу классов."""
    user = require_user(request)
    if plan_for_grade(grade) not in active_plans(user["id"]):
        raise HTTPException(402, "need_pay")
    return user


@app.get("/api/lesson")
def lesson(request: Request, grade: int, subj: str, i: int):
    subject = find_subject(grade, subj)
    if not subject or not 0 <= i < len(subject["topics"]):
        raise HTTPException(404, "no_topic")
    if i > 0:  # первая тема каждого предмета открыта всем как пробная
        check_access(request, grade)
    with db() as con:
        rows = con.execute("SELECT body FROM lessons WHERE grade = ? AND subj = ? AND idx = ?", (grade, subj, i)).fetchall()
    if not rows:
        raise HTTPException(404, "no_lesson")
    return json.loads(random.choice(rows)["body"])


# ---------- чат с учителем ----------
@app.post("/api/teacher")
async def teacher(request: Request):
    data = await read_json(request, limit=100_000)
    try:
        grade = int(data.get("grade", 0))
    except (TypeError, ValueError):
        raise HTTPException(400, "bad_grade")
    if str(grade) not in CURR:
        raise HTTPException(400, "bad_grade")
    user = check_access(request, grade)
    turns = data.get("turns")
    if not isinstance(turns, list) or not 1 <= len(turns) <= 40:
        raise HTTPException(400, "bad_turns")
    clean = []
    for t in turns:
        if not isinstance(t, dict) or t.get("role") not in ("user", "assistant") or not isinstance(t.get("content"), str):
            raise HTTPException(400, "bad_turns")
        text = t["content"].strip()
        if not text or len(text) > 4000:
            raise HTTPException(400, "bad_turns")
        clean.append({"role": t["role"], "content": text})
    if clean[-1]["role"] != "user":
        raise HTTPException(400, "bad_turns")
    while clean and clean[0]["role"] != "user":
        clean.pop(0)

    day = time.strftime("%Y-%m-%d")
    with db() as con:
        row = con.execute("SELECT n FROM usage WHERE user_id = ? AND day = ?", (user["id"], day)).fetchone()
        if row and row["n"] >= TEACHER_DAILY_LIMIT:
            raise HTTPException(429, "rate_limited")
        con.execute("INSERT INTO usage(user_id, day, n) VALUES(?, ?, 1) ON CONFLICT(user_id, day) DO UPDATE SET n = n + 1",
                    (user["id"], day))

    subject = find_subject(grade, str(data.get("subj", "")))
    try:
        text = ask_teacher(grade, subject, clean)
    except Exception as exc:  # ошибку ИИ не показываем пользователю, пишем в журнал сервера
        print("teacher error:", type(exc).__name__, exc)
        with db() as con:  # неудачный вопрос не считаем в дневной лимит
            con.execute("UPDATE usage SET n = n - 1 WHERE user_id = ? AND day = ? AND n > 0", (user["id"], day))
        raise HTTPException(502, "upstream_error")
    if text is None:
        raise HTTPException(422, "refused")
    return {"text": text}


# ---------- оплата через ЮKassa ----------
def yookassa(method: str, path: str, body: dict | None = None) -> dict:
    auth = base64.b64encode(f"{YOOKASSA_SHOP_ID}:{YOOKASSA_SECRET}".encode()).decode()
    req = urllib.request.Request(
        "https://api.yookassa.ru/v3" + path,
        data=json.dumps(body).encode("utf-8") if body is not None else None,
        method=method,
        headers={"Authorization": "Basic " + auth, "Content-Type": "application/json", "Idempotence-Key": str(uuid.uuid4())},
    )
    with urllib.request.urlopen(req, timeout=20) as resp:
        return json.loads(resp.read())


def activate(payment_id: str) -> bool:
    """Отмечает платёж оплаченным и продлевает подписку на 30 дней. Повторный вызов ничего не меняет."""
    now = int(time.time())
    with db() as con:
        pay = con.execute("SELECT * FROM payments WHERE id = ?", (payment_id,)).fetchone()
        if not pay or pay["status"] == "succeeded":
            return False
        con.execute("UPDATE payments SET status = 'succeeded' WHERE id = ?", (payment_id,))
        row = con.execute("SELECT until FROM subs WHERE user_id = ? AND plan = ?", (pay["user_id"], pay["plan"])).fetchone()
        until = max(now, row["until"] if row else 0) + PERIOD_DAYS * 86400
        con.execute("INSERT INTO subs(user_id, plan, until) VALUES(?, ?, ?) "
                    "ON CONFLICT(user_id, plan) DO UPDATE SET until = excluded.until", (pay["user_id"], pay["plan"], until))
    return True


@app.post("/api/pay")
async def pay(request: Request):
    user = require_user(request)
    data = await read_json(request)
    plan = data.get("plan")
    if plan not in PLANS:
        raise HTTPException(400, "bad_plan")
    price = PLANS[plan]["price"]
    if DEV_MODE:
        payment_id, url = "dev-" + uuid.uuid4().hex, None
    else:
        if not (YOOKASSA_SHOP_ID and YOOKASSA_SECRET):
            raise HTTPException(503, "pay_not_configured")
        try:
            result = yookassa("POST", "/payments", {
                "amount": {"value": f"{price}.00", "currency": "RUB"},
                "capture": True,
                "confirmation": {"type": "redirect", "return_url": BASE_URL + "/?paid=1"},
                "description": f"Учись на пятёрки: {PLANS[plan]['title']}, {PERIOD_DAYS} дней",
                "metadata": {"user_id": str(user["id"]), "plan": plan},
            })
            payment_id, url = result["id"], result["confirmation"]["confirmation_url"]
        except (urllib.error.URLError, KeyError, ValueError) as exc:
            print("yookassa error:", type(exc).__name__, exc)
            raise HTTPException(502, "pay_failed")
    with db() as con:
        con.execute("INSERT INTO payments(id, user_id, plan, amount, status, created) VALUES(?, ?, ?, ?, 'pending', ?)",
                    (payment_id, user["id"], plan, price, int(time.time())))
    return {"url": url or f"/api/dev/confirm?payment={payment_id}"}


@app.post("/api/yookassa/webhook")
async def yookassa_webhook(request: Request):
    """ЮKassa присылает уведомление; содержимому не верим, а переспрашиваем статус платежа по API."""
    data = await read_json(request)
    payment_id = str((data.get("object") or {}).get("id", ""))
    if data.get("event") != "payment.succeeded" or not payment_id:
        return {"ok": True}
    with db() as con:
        pay_row = con.execute("SELECT * FROM payments WHERE id = ?", (payment_id,)).fetchone()
    if not pay_row:
        return {"ok": True}
    try:
        real = yookassa("GET", "/payments/" + payment_id)
    except (urllib.error.URLError, ValueError) as exc:
        print("yookassa check error:", type(exc).__name__, exc)
        raise HTTPException(502, "check_failed")  # ЮKassa повторит уведомление позже
    paid = real.get("status") == "succeeded" and real.get("paid") is True
    amount_ok = (real.get("amount") or {}).get("value") == f"{pay_row['amount']}.00" and (real.get("amount") or {}).get("currency") == "RUB"
    if paid and amount_ok:
        activate(payment_id)
    return {"ok": True}


if DEV_MODE:
    @app.get("/api/dev/confirm")
    def dev_confirm(payment: str):
        """Только для проверки на своём компьютере: засчитывает платёж без денег."""
        activate(payment)
        return RedirectResponse("/?paid=1")


# ---------- страницы ----------
SKELETON = ('<!doctype html><html lang="ru"><head><meta charset="utf-8">'
            '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
            "<style>:root{color-scheme:light}body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}"
            "[hidden]{display:none!important}</style></head><body>")


def build_page() -> str:
    page = (ROOT / "web" / "page.html").read_text(encoding="utf-8")
    adapter = (ROOT / "web" / "adapter.js").read_text(encoding="utf-8")
    marker = "<script>\nconst P = "
    if marker not in page:
        raise RuntimeError("В web/page.html не найдено место для подключения adapter.js")
    return SKELETON + page.replace(marker, "<script>\n" + adapter + "\n</script>\n" + marker, 1) + "</body></html>"


PAGE = build_page()


@app.get("/", response_class=HTMLResponse)
def index():
    return build_page() if DEV_MODE else PAGE


def legal_page(name: str, title: str) -> str:
    text = (ROOT / "legal" / name).read_text(encoding="utf-8")
    safe = text.replace("&", "&amp;").replace("<", "&lt;")
    return (SKELETON + f"<title>{title}</title><main style='max-width:720px;margin:0 auto;padding:24px 16px;"
            "font-size:16px;line-height:1.55;white-space:pre-wrap'>" + safe + "</main></body></html>")


@app.get("/oferta", response_class=HTMLResponse)
def oferta():
    return legal_page("oferta.md", "Оферта")


@app.get("/privacy", response_class=HTMLResponse)
def privacy():
    return legal_page("privacy.md", "Политика обработки персональных данных")


@app.get("/robots.txt", response_class=PlainTextResponse)
def robots():
    return "User-agent: *\nDisallow: /api/\n"


@app.exception_handler(HTTPException)
async def http_error(request: Request, exc: HTTPException):
    return JSONResponse({"error": exc.detail}, status_code=exc.status_code)
