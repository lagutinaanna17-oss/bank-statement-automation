import { NextRequest, NextResponse } from "next/server";
import type { Lead, LeadResponse } from "@/lib/types";
import { isValidRuPhone, isNonEmptyName } from "@/lib/validators";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

/**
 * Приём заявок со всех форм сайта.
 *
 * TODO для подключения к боевой инфраструктуре:
 * 1. amoCRM / Битрикс24: отправить лид на CRM_WEBHOOK_URL (см. .env.example).
 * 2. Telegram-уведомление: отправить сообщение через Bot API,
 *    используя TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID.
 * 3. SmartCaptcha: проверить lead.captchaToken через SmartCaptcha Server API
 *    (SMARTCAPTCHA_SERVER_KEY), отклонять запрос при невалидном токене.
 */
export async function POST(request: NextRequest) {
  const ip = getClientIp(request.headers);

  const allowed = checkRateLimit({ key: `lead:${ip}`, limit: 5, windowMs: 60_000 });
  if (!allowed) {
    return NextResponse.json<LeadResponse>(
      { ok: false, message: "Слишком много попыток. Попробуйте позже или позвоните нам." },
      { status: 429 },
    );
  }

  let lead: Lead;
  try {
    lead = await request.json();
  } catch {
    return NextResponse.json<LeadResponse>({ ok: false, message: "Некорректный запрос." }, { status: 400 });
  }

  // Honeypot: если скрытое поле заполнено — это бот, тихо отклоняем.
  if (lead.honeypot) {
    return NextResponse.json<LeadResponse>({ ok: true, message: "Заявка принята." });
  }

  if (!isNonEmptyName(lead.name)) {
    return NextResponse.json<LeadResponse>({ ok: false, message: "Укажите имя." }, { status: 400 });
  }

  if (!isValidRuPhone(lead.phone)) {
    return NextResponse.json<LeadResponse>({ ok: false, message: "Укажите корректный номер телефона." }, { status: 400 });
  }

  if (!lead.consentGiven) {
    return NextResponse.json<LeadResponse>(
      { ok: false, message: "Необходимо согласие на обработку персональных данных." },
      { status: 400 },
    );
  }

  // TODO: проверка lead.captchaToken через SmartCaptcha Server API

  // TODO: отправка в CRM (amoCRM / Битрикс24) через CRM_WEBHOOK_URL
  // await fetch(process.env.CRM_WEBHOOK_URL, { method: "POST", body: JSON.stringify(lead) });

  // TODO: уведомление в Telegram через Bot API
  // await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     chat_id: process.env.TELEGRAM_CHAT_ID,
  //     text: `Новая заявка (${lead.source}): ${lead.name}, ${lead.phone}${lead.comment ? `\n${lead.comment}` : ""}`,
  //   }),
  // });

  console.log("[lead] новая заявка:", { name: lead.name, phone: lead.phone, source: lead.source });

  return NextResponse.json<LeadResponse>({ ok: true, message: "Заявка принята." });
}
