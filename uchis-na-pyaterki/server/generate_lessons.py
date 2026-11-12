"""Заготавливает уроки по темам и сохраняет их в базу. Запускается вручную, тратит деньги на счёте Anthropic.

Примеры (из папки server):
  python generate_lessons.py --grades 1-4 --variants 2          # начальная школа, по 2 варианта урока
  python generate_lessons.py --grades 3 --subjects math,rus     # только математика (Петерсон) и русский 3 класса
  python generate_lessons.py --grades 1-4 --dry-run             # только посчитать, сколько уроков не хватает

Готовые уроки пропускаются, поэтому прерванный запуск можно просто повторить.
"""
import argparse
import json
import sqlite3
import sys

from lessons import lesson_prompt, parse_json, valid_lesson


def parse_grades(text: str) -> list:
    grades = set()
    for part in text.split(","):
        a, _, b = part.partition("-")
        grades.update(range(int(a), int(b or a) + 1))
    return sorted(g for g in grades if 1 <= g <= 11)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--grades", default="1-4", help="классы: 1-4, 5, 5-11 или 1,3")
    ap.add_argument("--subjects", default="", help="коды предметов через запятую (math, mathm, rus, read, world, eng…); пусто — все")
    ap.add_argument("--variants", type=int, default=2, help="сколько вариантов урока нужно на каждую тему")
    ap.add_argument("--dry-run", action="store_true", help="ничего не генерировать, только показать объём")
    args = ap.parse_args()

    import app  # создаёт таблицы и даёт путь к базе и список тем
    from teacher import MODEL, call_claude

    only = {s for s in args.subjects.split(",") if s}
    con = sqlite3.connect(app.DB_PATH)
    todo = []
    for grade in parse_grades(args.grades):
        for subject in app.CURR.get(str(grade), []):
            if only and subject["id"] not in only:
                continue
            for idx, topic in enumerate(subject["topics"]):
                have = {r[0] for r in con.execute(
                    "SELECT variant FROM lessons WHERE grade = ? AND subj = ? AND idx = ?", (grade, subject["id"], idx))}
                for variant in range(args.variants):
                    if variant not in have:
                        todo.append((grade, subject, idx, topic, variant))

    print(f"Модель: {MODEL}. Нужно составить уроков: {len(todo)}")
    if args.dry_run or not todo:
        return
    tokens_in = tokens_out = done = failed = 0
    for n, (grade, subject, idx, topic, variant) in enumerate(todo, 1):
        label = f"[{n}/{len(todo)}] {grade} класс, {subject['name']} ({subject['id']}), тема {idx + 1}, вариант {variant + 1}"
        lesson = None
        for attempt in range(2):   # одна повторная попытка, если модель нарушила формат
            try:
                prompt = lesson_prompt(grade, subject, topic)
                if variant:
                    prompt += f"\nЭто вариант урока № {variant + 1}: придумай другие примеры и другие вопросы, чем в очевидном первом варианте."
                text, usage = call_claude("Ты составляешь учебные материалы. Отвечай строго в запрошенном формате.",
                                          [{"role": "user", "content": prompt}], effort="medium")
            except Exception as exc:
                print(label, "— ошибка запроса:", type(exc).__name__, exc)
                break
            tokens_in += usage.input_tokens
            tokens_out += usage.output_tokens
            lesson = valid_lesson(parse_json(text)) if text else None
            if lesson:
                break
        if not lesson:
            failed += 1
            print(label, "— не получилось, пропускаю")
            continue
        con.execute("INSERT OR REPLACE INTO lessons(grade, subj, idx, variant, body) VALUES(?, ?, ?, ?, ?)",
                    (grade, subject["id"], idx, variant, json.dumps(lesson, ensure_ascii=False)))
        con.commit()
        done += 1
        print(label, "— готово")
    print(f"\nСоставлено: {done}, не получилось: {failed}. Израсходовано токенов: вход {tokens_in}, выход {tokens_out}.")
    if failed:
        print("Запустите команду ещё раз: готовые уроки будут пропущены, недостающие — составлены заново.")
        sys.exit(1)


if __name__ == "__main__":
    main()
