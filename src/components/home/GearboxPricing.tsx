import { gearboxPricing } from "@/lib/site-config";
import { TiltCard } from "@/components/ui/TiltCard";

export function GearboxPricing() {
  return (
    <section className="bg-ink-900 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-2xl font-bold text-ink-deep sm:text-3xl">
          Цены по модели вариатора
        </h2>
        <p className="mt-2 text-center text-sm text-ink-600">
          Точная стоимость определяется после бесплатной дефектовки — таблица ниже показывает ориентир
        </p>

        <TiltCard className="mt-8 rounded-2xl shadow-depth-lg">
          <div className="glass overflow-x-auto rounded-2xl p-2">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="text-left text-ink-600">
                  <th className="px-4 py-3 font-semibold">Модель</th>
                  <th className="px-4 py-3 font-semibold">Поколение</th>
                  <th className="px-4 py-3 font-semibold">Локальный ремонт</th>
                  <th className="px-4 py-3 font-semibold">Полный ремонт</th>
                  <th className="px-4 py-3 font-semibold">Капремонт</th>
                </tr>
              </thead>
              <tbody>
                {gearboxPricing.map((row) => (
                  <tr key={row.code} className="border-t border-ink-700">
                    <td className="px-4 py-3 font-semibold text-ink-deep">{row.code}</td>
                    <td className="px-4 py-3 text-ink-600">{row.generation}</td>
                    <td className="px-4 py-3 text-ink-600">от {row.localRepairFrom.toLocaleString("ru-RU")} ₽</td>
                    <td className="px-4 py-3 text-ink-600">от {row.fullRepairFrom.toLocaleString("ru-RU")} ₽</td>
                    <td className="px-4 py-3 text-gradient-accent font-semibold">
                      от {row.overhaulFrom.toLocaleString("ru-RU")} ₽
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TiltCard>

        <p className="mt-4 text-center text-xs text-ink-600">
          Стоимость ремонта зависит от сложности неисправности и объёма необходимых запчастей. Не является публичной офертой.
        </p>
      </div>
    </section>
  );
}
