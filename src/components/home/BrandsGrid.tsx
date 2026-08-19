import Link from "next/link";
import { brands } from "@/lib/site-config";
import { TiltCard } from "@/components/ui/TiltCard";

const badgeGradients = ["from-accent to-electric", "from-electric to-violet", "from-violet to-accent"];

export function BrandsGrid() {
  return (
    <section className="relative bg-ink-900 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-2xl font-bold text-ink-deep sm:text-3xl">Ремонт по маркам</h2>
        <p className="mt-2 text-center text-sm text-ink-600">
          Работаем со всеми марками, специализируемся на самых массовых вариаторах
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {brands.map((brand, i) => (
            <TiltCard key={brand.slug} className="rounded-2xl shadow-depth">
              <Link
                href={`/brands/${brand.slug}`}
                className="glass flex h-full flex-col items-center justify-center gap-2 rounded-2xl p-5 text-center transition-colors hover:border-accent/60"
              >
                {/* TODO: заменить на реальный логотип марки */}
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${badgeGradients[i % badgeGradients.length]} text-sm font-extrabold text-white`}
                >
                  {brand.name.charAt(0)}
                </span>
                <p className="text-sm font-bold text-ink-deep">{brand.name}</p>
                <p className="text-xs text-ink-600">{brand.gearboxCodes.join(", ")}</p>
              </Link>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
