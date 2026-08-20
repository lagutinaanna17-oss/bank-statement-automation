import { brands, relatedPlatformModels } from "@/lib/site-config";
import { TiltCard } from "@/components/ui/TiltCard";

const badgeGradients = ["from-accent to-electric", "from-electric to-violet", "from-violet to-accent"];

export function BrandsGrid() {
  return (
    <section id="brands" className="relative scroll-mt-24 bg-ink-900 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-2xl font-bold text-ink-deep sm:text-3xl">Марки, с которыми мы работаем</h2>
        <p className="mt-2 text-center text-sm text-ink-600">
          Специализируемся на вариаторах Jatco JF0xx — самых массовых CVT на рынке
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {brands.map((brand, i) => (
            <TiltCard key={brand.slug} className="rounded-2xl shadow-depth">
              {/* TODO: заменить на реальный логотип марки */}
              <div className="glass flex h-full flex-col items-center gap-2 rounded-2xl p-5 text-center">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${badgeGradients[i % badgeGradients.length]} text-sm font-extrabold text-white`}
                >
                  {brand.name.charAt(0)}
                </span>
                <p className="text-sm font-bold text-ink-deep">{brand.name}</p>
                <p className="text-xs text-ink-600">{brand.models}</p>
                <p className="text-xs text-ink-600">{brand.gearboxCodes.join(", ")}</p>
              </div>
            </TiltCard>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-ink-600">{relatedPlatformModels}</p>
      </div>
    </section>
  );
}
