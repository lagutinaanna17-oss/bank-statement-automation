import { company } from "@/lib/site-config";
import { LeadForm } from "@/components/forms/LeadForm";
import { PhoneReveal } from "@/components/layout/PhoneReveal";

export function FinalCTA() {
  return (
    <section id="lead-form" className="bg-ink-900 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Запишитесь на бесплатную диагностику
          </h2>
          <p className="mt-3 text-ink-600">
            Оставьте заявку — перезвоним в течение 10 минут и запишем на удобное время.
          </p>

          <div className="mt-6 space-y-2 text-sm">
            <p>
              <PhoneReveal className="text-lg font-semibold text-white hover:text-accent" />
            </p>
            <div className="flex gap-4">
              <a href={company.whatsappHref} className="text-electric hover:underline">
                WhatsApp
              </a>
              <a href={company.telegramHref} className="text-electric hover:underline">
                Telegram
              </a>
            </div>
            <p className="text-ink-600">{company.workHours}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-ink-700 bg-ink-800 p-6">
          <LeadForm source="final-cta" />
        </div>
      </div>
    </section>
  );
}
