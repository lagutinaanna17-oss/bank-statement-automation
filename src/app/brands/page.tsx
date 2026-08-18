import type { Metadata } from "next";
import Link from "next/link";
import { brands } from "@/lib/site-config";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Ремонт вариаторов по маркам автомобилей",
  description: "Ремонт вариаторов Nissan, Mitsubishi, Toyota, Renault, Honda, Subaru — коды коробок и особенности ремонта.",
};

export default function BrandsPage() {
  return (
    <>
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Ремонт по маркам</h1>
          <p className="mt-3 text-ink-600">Выберите марку автомобиля, чтобы узнать особенности ремонта вашей коробки.</p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {brands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/brands/${brand.slug}`}
                className="rounded-2xl border border-ink-700 bg-ink-900 p-5 transition hover:border-accent"
              >
                <p className="text-lg font-bold text-white">{brand.name}</p>
                <p className="mt-1 text-sm text-ink-600">{brand.models}</p>
                <p className="mt-2 text-xs text-electric">{brand.gearboxCodes.join(", ")}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
