import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brands, services } from "@/lib/site-config";
import { FinalCTA } from "@/components/home/FinalCTA";

interface BrandPageProps {
  params: { brand: string };
}

// Статическая генерация страниц марок на этапе сборки — важно для SEO.
export function generateStaticParams() {
  return brands.map((brand) => ({ brand: brand.slug }));
}

export function generateMetadata({ params }: BrandPageProps): Metadata {
  const brand = brands.find((b) => b.slug === params.brand);
  if (!brand) return {};

  return {
    title: `Ремонт вариатора ${brand.name} (${brand.gearboxCodes.join(", ")})`,
    description: `${brand.description} Модели: ${brand.models}.`,
  };
}

export default function BrandPage({ params }: BrandPageProps) {
  const brand = brands.find((b) => b.slug === params.brand);
  if (!brand) notFound();

  return (
    <>
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ремонт вариатора {brand.name}
          </h1>
          <p className="mt-3 text-ink-600">{brand.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {brand.gearboxCodes.map((code) => (
              <span key={code} className="rounded-full bg-electric/15 px-3 py-1 text-sm font-semibold text-electric">
                {code}
              </span>
            ))}
          </div>

          <p className="mt-6 text-sm text-ink-600">
            <span className="font-semibold text-white">Модели:</span> {brand.models}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {services.map((service) => (
              <div key={service.slug} className="rounded-2xl border border-ink-700 bg-ink-900 p-5">
                <p className="font-semibold text-white">{service.title}</p>
                <p className="mt-1 text-xl font-extrabold text-accent">
                  {service.priceFrom > 0
                    ? `от ${service.priceFrom.toLocaleString("ru-RU")} ${service.unit}`
                    : service.unit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
