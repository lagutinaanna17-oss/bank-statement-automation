import type { Metadata } from "next";
import { services } from "@/lib/site-config";
import { FinalCTA } from "@/components/home/FinalCTA";
import { TiltCard } from "@/components/ui/TiltCard";

export const metadata: Metadata = {
  title: "Услуги и цены на ремонт вариаторов и АКПП",
  description: "Замена масла, ремонт вариатора, ремонт АКПП, диагностика коробки передач — цены и что входит в услугу.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Услуги и <span className="text-gradient-accent">цены</span>
          </h1>
          <p className="mt-3 text-ink-600">
            Финальная стоимость определяется после бесплатной диагностики и согласуется с вами
            до начала работ.
          </p>

          <div className="mt-10 space-y-8">
            {services.map((service) => (
              <TiltCard key={service.slug} className="scroll-mt-24 rounded-2xl shadow-depth">
                <div id={service.slug} className="glass scroll-mt-24 rounded-2xl p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="text-xl font-bold text-white">{service.title}</h2>
                    <p className="text-gradient-accent text-2xl font-extrabold">
                      {service.priceFrom > 0
                        ? `от ${service.priceFrom.toLocaleString("ru-RU")} ${service.unit}`
                        : service.unit}
                    </p>
                  </div>
                  <p className="mt-2 text-ink-600">{service.description}</p>
                  <ul className="mt-4 list-inside list-disc space-y-1 text-sm text-ink-600">
                    {service.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
