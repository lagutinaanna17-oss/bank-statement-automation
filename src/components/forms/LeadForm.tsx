"use client";

import { FormEvent, useState } from "react";
import type { Lead, LeadResponse } from "@/lib/types";
import { isValidRuPhone, isNonEmptyName } from "@/lib/validators";
import { ConsentCheckbox } from "./ConsentCheckbox";
import { Honeypot } from "./Honeypot";
import { SmartCaptcha } from "./SmartCaptcha";

interface LeadFormProps {
  /** Источник заявки для аналитики: 'hero' | 'quiz' | 'final-cta' | 'contacts'. */
  source: string;
  /** Необязательный контекст, добавляемый в комментарий (например, выбор из квиза). */
  prefillComment?: string;
  compact?: boolean;
}

/**
 * Короткая форма заявки: имя + телефон. Всё остальное — необязательно.
 * Кнопка отправки заблокирована, пока не отмечено согласие на обработку ПД.
 */
export function LeadForm({ source, prefillComment, compact }: LeadFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consentGiven, setConsentGiven] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const canSubmit = isNonEmptyName(name) && isValidRuPhone(phone) && consentGiven;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit || status === "submitting") return;

    setStatus("submitting");
    setErrorMessage(null);

    const lead: Lead = {
      name: name.trim(),
      phone: phone.trim(),
      comment: prefillComment,
      source,
      consentGiven,
      honeypot,
      captchaToken,
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      const data: LeadResponse = await res.json();

      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(data.message || "Не удалось отправить заявку. Попробуйте позвонить нам.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Не удалось отправить заявку. Проверьте соединение и попробуйте снова.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-accent/40 bg-accent/10 p-6 text-center">
        <p className="text-lg font-semibold text-ink-deep">Заявка принята!</p>
        <p className="mt-2 text-sm text-ink-600">
          Мастер перезвонит вам в течение 10 минут. Если это срочно — звоните нам прямо сейчас.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-3" : "space-y-4"} noValidate>
      <div>
        <label htmlFor={`name-${source}`} className="sr-only">
          Ваше имя
        </label>
        <input
          id={`name-${source}`}
          type="text"
          placeholder="Ваше имя"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full rounded-xl border border-ink-600 bg-ink-800 px-4 py-3 text-base text-ink-deep placeholder:text-ink-600 focus:border-accent focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor={`phone-${source}`} className="sr-only">
          Телефон
        </label>
        <input
          id={`phone-${source}`}
          type="tel"
          placeholder="+7 (___) ___-__-__"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onBlur={() => setPhoneError(phone && !isValidRuPhone(phone) ? "Проверьте номер телефона" : null)}
          required
          className="w-full rounded-xl border border-ink-600 bg-ink-800 px-4 py-3 text-base text-ink-deep placeholder:text-ink-600 focus:border-accent focus:outline-none"
        />
        {phoneError && <p className="mt-1 text-xs text-red-400">{phoneError}</p>}
      </div>

      <Honeypot value={honeypot} onChange={setHoneypot} />
      <SmartCaptcha onToken={setCaptchaToken} />

      <ConsentCheckbox id={`consent-${source}`} checked={consentGiven} onChange={setConsentGiven} />

      {status === "error" && errorMessage && (
        <p className="text-sm text-red-400">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={!canSubmit || status === "submitting"}
        className="btn-3d w-full rounded-full bg-accent px-6 py-3 text-base font-semibold text-white shadow-depth shadow-glow transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
      >
        {status === "submitting" ? "Отправляем..." : "Записаться на бесплатную диагностику"}
      </button>
    </form>
  );
}
