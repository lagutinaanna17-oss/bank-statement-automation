import { workStages, workStagesNote } from "@/lib/site-config";
import { TiltCard } from "@/components/ui/TiltCard";

export function HowWeWork() {
  return (
    <section className="relative px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-2xl font-bold text-ink-deep sm:text-3xl">Как мы работаем</h2>

        <ol className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {/* Соединительная линия между шагами — только на широких экранах */}
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-ink-600 to-transparent lg:block" />

          {workStages.map((stage, i) => (
            <li key={stage.title} className="relative">
              <TiltCard className="glass h-full rounded-2xl p-5 shadow-depth">
                <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-electric to-electric-hover text-lg font-extrabold text-white shadow-glow-electric">
                  {i + 1}
                </span>
                <p className="mt-4 font-semibold text-ink-deep">{stage.title}</p>
                <p className="mt-1 text-sm text-ink-600">{stage.description}</p>
              </TiltCard>
            </li>
          ))}
        </ol>

        <p className="glass mt-10 rounded-2xl border-accent/30 p-4 text-center text-sm font-medium text-ink-deep shadow-depth">
          {workStagesNote}
        </p>
      </div>
    </section>
  );
}
