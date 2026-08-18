import Link from "next/link";
import { brands } from "@/lib/site-config";

export function BrandsGrid() {
  return (
    <section className="bg-ink-900 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">Ремонт по маркам</h2>
        <p className="mt-2 text-center text-sm text-ink-600">
          Работаем со всеми марками, специализируемся на самых массовых вариаторах
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {brands.map((brand) => (
            <Link
              key={brand.slug}
              href={`/brands/${brand.slug}`}
              className="flex flex-col items-center justify-center rounded-2xl border border-ink-700 bg-ink-800 p-5 text-center transition hover:border-accent"
            >
              {/* TODO: заменить на реальный логотип марки */}
              <div className="flex h-10 w-full items-center justify-center text-sm font-bold text-ink-600">
                {brand.name}
              </div>
              <p className="mt-2 text-xs text-ink-600">{brand.gearboxCodes.join(", ")}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
