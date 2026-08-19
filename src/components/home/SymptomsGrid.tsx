import { symptoms } from "@/lib/site-config";
import { TiltCard } from "@/components/ui/TiltCard";
import { PlaceholderVisual } from "@/components/ui/PlaceholderVisual";

export function SymptomsGrid() {
  return (
    <section className="bg-ink-900 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold text-ink-deep sm:text-3xl">
          Симптомы неисправности вариатора
        </h2>
        <p className="mt-2 text-center text-sm text-ink-600">
          Узнайте вероятную причину и ориентировочную стоимость ремонта по симптому
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {symptoms.map((symptom, i) => (
            <TiltCard key={symptom.title} className="rounded-2xl shadow-depth">
              <div className="glass flex h-full gap-4 rounded-2xl p-5">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                  <PlaceholderVisual
                    icon="gauge"
                    label=""
                    gradient={i % 2 === 0 ? "electric" : "accent"}
                  />
                </div>
                <div>
                  <p className="font-semibold text-ink-deep">{symptom.title}</p>
                  <p className="mt-1 text-sm text-ink-600">{symptom.description}</p>
                  <p className="text-gradient-accent mt-2 text-sm font-semibold">
                    от {symptom.priceFrom.toLocaleString("ru-RU")} до {symptom.priceTo.toLocaleString("ru-RU")} ₽
                  </p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
