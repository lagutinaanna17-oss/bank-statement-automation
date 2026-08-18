import Link from "next/link";
import { services } from "@/lib/site-config";

export function ServicesGrid() {
  return (
    <section className="bg-ink-900 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">Услуги и цены</h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services#${service.slug}`}
              className="flex flex-col rounded-2xl border border-ink-700 bg-ink-800 p-5 transition hover:border-accent"
            >
              <p className="font-semibold text-white">{service.title}</p>
              <p className="mt-2 text-2xl font-extrabold text-accent">
                {service.priceFrom > 0 ? `от ${service.priceFrom.toLocaleString("ru-RU")} ${service.unit}` : service.unit}
              </p>
              <p className="mt-2 text-sm text-ink-600">{service.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
