import { NextRequest, NextResponse } from "next/server";
import type { PrediagnosisRequest, PrediagnosisResponse } from "@/lib/types";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

/**
 * ИИ-предиагностика по свободному тексту описания симптомов.
 *
 * Сейчас — заготовка с моковым ответом на основе простого поиска ключевых
 * слов, чтобы фронтенд можно было полноценно разрабатывать и тестировать.
 *
 * TODO: подключить LLM API (например, YandexGPT API или GigaChat API — с
 * учётом требований к размещению данных в РФ) вместо mockPrediagnosis:
 * 1. Прочитать LLM_API_KEY из переменных окружения (.env.example).
 * 2. Отправить lead.description в модель с системным промптом,
 *    объясняющим контекст (диагностика вариаторов/АКПП).
 * 3. Распарсить ответ модели в формат PrediagnosisResponse.
 * 4. Обязательно сохранить дисклеймер, что это не точный диагноз.
 */
export async function POST(request: NextRequest) {
  const ip = getClientIp(request.headers);

  const allowed = checkRateLimit({ key: `prediagnosis:${ip}`, limit: 10, windowMs: 60_000 });
  if (!allowed) {
    return NextResponse.json({ message: "Слишком много запросов. Попробуйте позже." }, { status: 429 });
  }

  let body: PrediagnosisRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Некорректный запрос." }, { status: 400 });
  }

  if (body.honeypot) {
    return NextResponse.json(mockPrediagnosis(""));
  }

  if (!body.description || body.description.trim().length < 10) {
    return NextResponse.json({ message: "Опишите проблему подробнее." }, { status: 400 });
  }

  if (!body.consentGiven) {
    return NextResponse.json(
      { message: "Необходимо согласие на обработку персональных данных." },
      { status: 400 },
    );
  }

  // TODO: подключить LLM API вместо моковой функции
  const result = mockPrediagnosis(body.description);

  return NextResponse.json<PrediagnosisResponse>(result);
}

function mockPrediagnosis(description: string): PrediagnosisResponse {
  const text = description.toLowerCase();

  if (text.includes("во") || text.includes("гул") || text.includes("шум")) {
    return {
      possibleCauses: [
        "Износ подшипников вариатора",
        "Недостаточный уровень или загрязнение масла",
        "Износ ремня/цепи вариатора",
      ],
      priceRangeFrom: 15000,
      priceRangeTo: 45000,
      recommendation:
        "Гул на скорости часто связан с подшипниками или маслом. Рекомендуем бесплатную диагностику для точного диагноза.",
    };
  }

  if (text.includes("рыв") || text.includes("дёрг") || text.includes("дерг") || text.includes("пинок")) {
    return {
      possibleCauses: [
        "Проскальзывание ремня/цепи вариатора",
        "Загрязнённое или устаревшее масло",
        "Неисправность датчиков / ошибка адаптации",
      ],
      priceRangeFrom: 14000,
      priceRangeTo: 60000,
      recommendation:
        "Рывки при разгоне могут быть решены заменой масла или требовать более серьёзного ремонта. Точно скажем после диагностики.",
    };
  }

  if (text.includes("не едет") || text.includes("не переключ") || text.includes("авар")) {
    return {
      possibleCauses: [
        "Аварийный режим коробки (Limp mode)",
        "Неисправность гидроблока",
        "Серьёзный износ внутренних узлов",
      ],
      priceRangeFrom: 40000,
      priceRangeTo: 90000,
      recommendation:
        "Похоже на серьёзную неисправность. Не рекомендуем продолжать движение — запишитесь на диагностику как можно скорее.",
    };
  }

  return {
    possibleCauses: [
      "Требуется точная диагностика для определения причины",
      "Возможен как незначительный, так и серьёзный дефект",
    ],
    priceRangeFrom: 14000,
    priceRangeTo: 70000,
    recommendation:
      "По описанию сложно определить точную причину. Рекомендуем бесплатную диагностику — мастер точно скажет, в чём дело.",
  };
}
