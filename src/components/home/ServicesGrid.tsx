import Link from "next/link";
import { services } from "@/lib/site-config";
import { TiltCard } from "@/components/ui/TiltCard";

export function ServicesGrid() {
  return (
    <section className="relative bg-ink-900 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">Услуги и цены</h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <TiltCard key={service.slug} className="rounded-2xl shadow-depth">
              <Link
                href={`/services#${service.slug}`}
                className="glass flex h-full flex-col rounded-2xl p-5 transition-colors hover:border-accent/60"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-hover text-sm font-bold text-white shadow-glow">
                  {i + 1}
                </span>
                <p className="mt-4 font-semibold text-white">{service.title}</p>
                <p className="text-gradient-accent mt-2 text-2xl font-extrabold">
                  {service.priceFrom > 0 ? `от ${service.priceFrom.toLocaleString("ru-RU")} ${service.unit}` : service.unit}
                </p>
                <p className="mt-2 text-sm text-ink-600">{service.description}</p>
              </Link>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
