import type { Metadata } from "next";
import { company } from "@/lib/site-config";
import { PhoneReveal } from "@/components/layout/PhoneReveal";
import { LeadForm } from "@/components/forms/LeadForm";
import { TiltCard } from "@/components/ui/TiltCard";

export const metadata: Metadata = {
  title: "Контакты",
  description: `Контакты автосервиса ${company.brandName}: адрес, телефон, режим работы, карта проезда.`,
};

export default function ContactsPage() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
        <div>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="text-gradient-accent">Контакты</span>
          </h1>

          <dl className="mt-6 space-y-4 text-sm">
            <div>
              <dt className="font-semibold text-white">Адрес</dt>
              <dd className="text-ink-600">{company.actualAddress}</dd>
            </div>
            <div>
              <dt className="font-semibold text-white">Режим работы</dt>
              <dd className="text-ink-600">{company.workHours}</dd>
            </div>
            <div>
              <dt className="font-semibold text-white">Телефон</dt>
              <dd>
                <PhoneReveal className="text-ink-600 hover:text-accent" />
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-white">Email</dt>
              <dd>
                <a href={`mailto:${company.email}`} className="text-ink-600 hover:text-accent">
                  {company.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-white">Мессенджеры</dt>
              <dd className="flex gap-4 text-ink-600">
                <a href={company.whatsappHref} className="hover:text-accent">WhatsApp</a>
                <a href={company.telegramHref} className="hover:text-accent">Telegram</a>
              </dd>
            </div>
          </dl>

          {/* TODO: вставить встраиваемую карту (Яндекс.Карты / 2ГИС) через company.mapEmbedSrc */}
          <div className="glass mt-8 flex aspect-video items-center justify-center rounded-2xl p-4 text-center text-sm text-ink-600 shadow-depth">
            {company.mapEmbedSrc ? (
              <iframe
                src={company.mapEmbedSrc}
                title="Карта проезда"
                className="h-full w-full rounded-2xl"
                loading="lazy"
              />
            ) : (
              "Карта проезда — вставьте embed-ссылку Яндекс.Карт или 2ГИС в company.mapEmbedSrc"
            )}
          </div>
        </div>

        <TiltCard className="rounded-2xl shadow-depth-lg">
          <div className="glass h-full rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white">Оставить заявку</h2>
            <div className="mt-4">
              <LeadForm source="contacts" />
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}
