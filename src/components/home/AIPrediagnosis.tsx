"use client";

import { FormEvent, useState } from "react";
import type { PrediagnosisRequest, PrediagnosisResponse } from "@/lib/types";
import { ConsentCheckbox } from "@/components/forms/ConsentCheckbox";
import { Honeypot } from "@/components/forms/Honeypot";

/**
 * ИИ-предиагностика: пользователь описывает проблему своими словами,
 * фронтенд шлёт текст на /api/prediagnosis и получает вероятные причины
 * и ориентировочную вилку цены. Эндпоинт сейчас — заготовка с моковым
 * ответом (см. src/app/api/prediagnosis/route.ts), позже туда подключается LLM.
 */
export function AIPrediagnosis() {
  const [description, setDescription] = useState("");
  const [consentGiven, setConsentGiven] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [result, setResult] = useState<PrediagnosisResponse | null>(null);

  const canSubmit = description.trim().length >= 10 && consentGiven;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit || status === "loading") return;

    setStatus("loading");
    setResult(null);

    const payload: PrediagnosisRequest = { description: description.trim(), consentGiven, honeypot };

    try {
      const res = await fetch("/api/prediagnosis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("request failed");

      const data: PrediagnosisResponse = await res.json();
      setResult(data);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl rounded-2xl border border-electric/30 bg-ink-900 p-6 sm:p-8">
        <span className="inline-block rounded-full bg-electric/15 px-3 py-1 text-xs font-semibold text-electric">
          Только у нас
        </span>
        <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">ИИ-предиагностика</h2>
        <p className="mt-2 text-sm text-ink-600">
          Опишите, что происходит с коробкой своими словами — например,
          «дёргается на разгоне» или «воет на 60 км/ч». Мы подскажем вероятную
          причину и ориентировочную стоимость ремонта.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Например: коробка дёргается при разгоне, особенно на холодную"
            rows={4}
            required
            minLength={10}
            className="w-full rounded-xl border border-ink-600 bg-ink-800 px-4 py-3 text-base text-white placeholder:text-ink-600 focus:border-electric focus:outline-none"
          />

          <Honeypot value={honeypot} onChange={setHoneypot} name="prediagnosis_website" />

          <ConsentCheckbox id="consent-prediagnosis" checked={consentGiven} onChange={setConsentGiven} />

          <button
            type="submit"
            disabled={!canSubmit || status === "loading"}
            className="w-full rounded-full bg-electric px-6 py-3 text-base font-semibold text-white transition hover:bg-electric-hover disabled:cursor-not-allowed disabled:opacity-40"
          >
            {status === "loading" ? "Анализируем..." : "Получить предварительный ответ"}
          </button>
        </form>

        {status === "error" && (
          <p className="mt-4 text-sm text-red-400">
            Не удалось получить ответ. Попробуйте записаться на бесплатную диагностику напрямую.
          </p>
        )}

        {status === "done" && result && (
          <div className="mt-6 rounded-xl border border-ink-700 bg-ink-800 p-5">
            <p className="text-sm font-semibold text-white">Вероятные причины:</p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-ink-600">
              {result.possibleCauses.map((cause) => (
                <li key={cause}>{cause}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-ink-600">
              Ориентировочная стоимость:{" "}
              <span className="font-semibold text-accent">
                {result.priceRangeFrom.toLocaleString("ru-RU")} – {result.priceRangeTo.toLocaleString("ru-RU")} ₽
              </span>
            </p>
            <p className="mt-2 text-sm text-ink-600">{result.recommendation}</p>

            <a
              href="#lead-form"
              className="mt-4 inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover"
            >
              Записаться на точную бесплатную диагностику
            </a>

            <p className="mt-3 text-xs text-ink-600">
              Это предварительный ориентир на основе описания, а не диагноз. Точную причину
              определит мастер на очной бесплатной диагностике.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
