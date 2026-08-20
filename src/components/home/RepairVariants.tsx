import { repairVariants } from "@/lib/site-config";
import { TiltCard } from "@/components/ui/TiltCard";

export function RepairVariants() {
  return (
    <section className="relative px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-2xl font-bold text-ink-deep sm:text-3xl">Варианты ремонта</h2>
        <p className="mt-2 text-center text-sm text-ink-600">
          Точный вариант определяется в процессе дефектовки агрегата
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {repairVariants.map((variant) => (
            <TiltCard key={variant.title} className="rounded-2xl shadow-depth-lg">
              <div className="glass h-full rounded-2xl p-6">
                <h3 className="text-lg font-bold text-ink-deep">{variant.title}</h3>
                <p className="mt-2 text-sm text-ink-600">{variant.description}</p>

                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-electric">Работы</p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-ink-600">
                  {variant.works.map((work) => (
                    <li key={work}>{work}</li>
                  ))}
                </ul>

                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-electric">Комплектующие</p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-ink-600">
                  {variant.parts.map((part) => (
                    <li key={part}>{part}</li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
