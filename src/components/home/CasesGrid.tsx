import { cases } from "@/lib/site-config";
import { TiltCard } from "@/components/ui/TiltCard";
import { PlaceholderVisual } from "@/components/ui/PlaceholderVisual";

export function CasesGrid() {
  return (
    <section className="relative px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-ink-deep sm:text-3xl">Кейсы: до и после</h2>
          <span className="mt-2 inline-block rounded-full bg-ink-800 px-3 py-1 text-xs text-ink-600">
            Демо-примеры — на фото заглушки, заменяются на реальные фото
          </span>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((item) => (
            <TiltCard key={item.id} className="rounded-2xl shadow-depth-lg">
              <div className="glass rounded-2xl p-5">
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative aspect-square overflow-hidden rounded-xl">
                    <span className="absolute left-2 top-2 z-10 rounded-full bg-ink-deep/85 px-2 py-0.5 text-[10px] font-semibold text-white">
                      До
                    </span>
                    <PlaceholderVisual icon="gauge" label={item.gearboxCode} gradient="electric" />
                  </div>
                  <div className="relative aspect-square overflow-hidden rounded-xl">
                    <span className="absolute left-2 top-2 z-10 rounded-full bg-accent/90 px-2 py-0.5 text-[10px] font-semibold text-white">
                      После
                    </span>
                    <PlaceholderVisual icon="wrench" label="Готово" gradient="accent" />
                  </div>
                </div>

                <p className="mt-4 font-semibold text-ink-deep">
                  {item.brand} {item.model} <span className="text-ink-600">({item.gearboxCode})</span>
                </p>
                <p className="mt-1 text-sm text-ink-600">Проблема: {item.problem}</p>
                <p className="mt-1 text-sm text-ink-600">Работы: {item.workDone}</p>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-ink-600">Срок: {item.durationDays} дн.</span>
                  <span className="text-gradient-accent font-semibold">
                    {item.price.toLocaleString("ru-RU")} ₽
                  </span>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
