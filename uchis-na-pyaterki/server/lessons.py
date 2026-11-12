"""Общее для сервера и генератора: текст задания для ИИ и проверка готового урока."""
import json
import re

LESSON_QN = 5


def lesson_prompt(grade: int, subject: dict, topic: str) -> str:
    small = ": короткие простые предложения, маленькие числа" if grade <= 2 else ""
    return f"""Ты — школьный учитель в России. Составь короткий урок для ученика {grade} класса.
Предмет: {subject['name']}. Программа: {subject['prog']}. Тема: «{topic}».
Требования:
- Пиши по-русски (на уроке английского — задания с английскими словами, пояснения по-русски). Уровень строго под {grade} класс{small}.
- Объяснение: 3–4 коротких абзаца простыми словами, с примером.
- Ровно {LESSON_QN} вопросов с выбором ответа, от простого к более трудному. У каждого 4 разных варианта и ровно один верный.
- Перепроверь каждый ответ: вычисления пересчитай, факты и правила сверь. Не включай вопрос, если не уверен в ответе.
- Вопрос должен быть понятен без картинок и без учебника. Не ссылайся на страницы и номера заданий, не выдумывай цитаты из произведений.
- В "why" коротко объясни, почему верный ответ верен.
- Ещё 3 письменных задания для рабочей тетради ("workbook"): то, что ученик выполняет ручкой на бумаге (решить, вписать, составить, записать). Без вариантов ответа и без картинок.
- Обычный текст без разметки.
Ответь только JSON такого вида:
{{"explain":["абзац","абзац","абзац"],"questions":[{{"q":"вопрос","options":["а","б","в","г"],"correct":0,"why":"объяснение"}}],"workbook":["задание","задание","задание"]}}"""


def parse_json(text: str):
    """Достаёт JSON из ответа модели: целиком, из блока ``` или от первой { до последней }."""
    text = text.strip()
    fence = re.search(r"```(?:json)?\s*(.*?)```", text, re.S)
    candidates = [text] + ([fence.group(1)] if fence else [])
    start, end = text.find("{"), text.rfind("}")
    if start != -1 and end > start:
        candidates.append(text[start:end + 1])
    for candidate in candidates:
        try:
            return json.loads(candidate)
        except ValueError:
            continue
    return None


def valid_lesson(data):
    """Возвращает урок в строгом виде или None, если он не подходит (те же правила, что на странице)."""
    if not isinstance(data, dict) or not isinstance(data.get("explain"), list) or not isinstance(data.get("questions"), list):
        return None
    explain = [x.strip() for x in data["explain"] if isinstance(x, str) and x.strip()][:6]
    questions = []
    for q in data["questions"]:
        if not isinstance(q, dict) or not isinstance(q.get("q"), str) or not isinstance(q.get("options"), list):
            continue
        options = [str(o) for o in q["options"] if isinstance(o, (str, int, float)) and not isinstance(o, bool)]
        correct = q.get("correct")
        if len(options) != 4 or len(set(options)) != 4 or isinstance(correct, bool) or not isinstance(correct, int) or not 0 <= correct < 4:
            continue
        questions.append({"q": q["q"], "options": options, "correct": correct,
                          "why": q["why"] if isinstance(q.get("why"), str) else ""})
    if not explain or len(questions) < LESSON_QN:
        return None
    raw = data.get("workbook")
    workbook = [x.strip() for x in raw if isinstance(x, str) and x.strip()][:5] if isinstance(raw, list) else []
    return {"explain": explain, "questions": questions[:LESSON_QN], "workbook": workbook}
