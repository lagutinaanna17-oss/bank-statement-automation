"use client";

import { useMemo, useState } from "react";
import { brands, services } from "@/lib/site-config";
import { LeadForm } from "@/components/forms/LeadForm";

const symptoms = [
  { id: "noise", label: "Гул или вой при движении" },
  { id: "jerk", label: "Рывки или пинки при разгоне" },
  { id: "slip", label: "Пробуксовка, машина не едет" },
  { id: "no-shift", label: "Не переключается / аварийный режим" },
  { id: "maintenance", label: "Плановое ТО (замена масла)" },
];

const steps = ["Марка", "Симптом", "Услуга", "Результат"] as const;

/**
 * Квиз-калькулятор стоимости — главный лидген блок.
 * 3 шага выбора + результат с вилкой цены и скидкой за заявку с сайта.
 */
export function PriceQuiz() {
  const [step, setStep] = useState(0);
  const [brandSlug, setBrandSlug] = useState<string | null>(null);
  const [symptomId, setSymptomId] = useState<string | null>(null);
  const [serviceSlug, setServiceSlug] = useState<string | null>(null);

  const selectedBrand = brands.find((b) => b.slug === brandSlug);
  const selectedService = services.find((s) => s.slug === serviceSlug);

  const priceRange = useMemo(() => {
    if (!selectedService) return null;
    const base = selectedService.priceFrom;
    // Простая эвристика вилки цены для превью — точная смета даётся после дефектовки.
    const from = base;
    const to = symptomId === "no-shift" ? Math.round(base * 2.5) : Math.round(base * 1.6);
    return { from, to };
  }, [selectedService, symptomId]);

  const discountPercent = 5;

  function goNext() {
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  const comment = `Квиз: марка — ${selectedBrand?.name ?? "-"}, симптом — ${
    symptoms.find((s) => s.id === symptomId)?.label ?? "-"
  }, услуга — ${selectedService?.title ?? "-"}`;

  return (
    <section id="price-quiz" className="bg-ink-900 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
          Узнайте стоимость ремонта за 30 секунд
        </h2>
        <p className="mt-2 text-center text-sm text-ink-600">
          Ответьте на 3 простых вопроса — покажем ориентировочную цену и дадим скидку {discountPercent}% за заявку с сайта.
        </p>

        {/* Индикатор шагов */}
        <div className="mt-6 flex justify-center gap-2">
          {steps.map((label, i) => (
            <div
              key={label}
              className={`h-1.5 w-10 rounded-full ${i <= step ? "bg-accent" : "bg-ink-700"}`}
            />
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-ink-700 bg-ink-800 p-6">
          {step === 0 && (
            <div>
              <p className="mb-4 font-semibold text-white">Марка вашего автомобиля</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {brands.map((brand) => (
                  <button
                    key={brand.slug}
                    type="button"
                    onClick={() => {
                      setBrandSlug(brand.slug);
                      goNext();
                    }}
                    className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                      brandSlug === brand.slug
                        ? "border-accent bg-accent/10 text-white"
                        : "border-ink-600 text-ink-600 hover:border-accent hover:text-white"
                    }`}
                  >
                    {brand.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <p className="mb-4 font-semibold text-white">Что беспокоит?</p>
              <div className="flex flex-col gap-3">
                {symptoms.map((symptom) => (
                  <button
                    key={symptom.id}
                    type="button"
                    onClick={() => {
                      setSymptomId(symptom.id);
                      goNext();
                    }}
                    className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
                      symptomId === symptom.id
                        ? "border-accent bg-accent/10 text-white"
                        : "border-ink-600 text-ink-600 hover:border-accent hover:text-white"
                    }`}
                  >
                    {symptom.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <p className="mb-4 font-semibold text-white">Какая услуга нужна?</p>
              <div className="flex flex-col gap-3">
                {services.map((service) => (
                  <button
                    key={service.slug}
                    type="button"
                    onClick={() => {
                      setServiceSlug(service.slug);
                      goNext();
                    }}
                    className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
                      serviceSlug === service.slug
                        ? "border-accent bg-accent/10 text-white"
                        : "border-ink-600 text-ink-600 hover:border-accent hover:text-white"
                    }`}
                  >
                    {service.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && priceRange && (
            <div>
              <p className="text-center text-sm text-ink-600">Ориентировочная стоимость:</p>
              <p className="mt-1 text-center text-3xl font-extrabold text-accent">
                {priceRange.from.toLocaleString("ru-RU")} – {priceRange.to.toLocaleString("ru-RU")} ₽
              </p>
              <p className="mt-2 text-center text-xs text-ink-600">
                Точная цена определяется после бесплатной диагностики.{" "}
                <span className="font-semibold text-white">
                  Скидка {discountPercent}% при записи через сайт.
                </span>
              </p>

              <div className="mt-6">
                <LeadForm source="quiz" prefillComment={comment} compact />
              </div>
            </div>
          )}

          {step > 0 && step < 3 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="mt-4 text-xs text-ink-600 hover:text-white"
            >
              ← Назад
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
