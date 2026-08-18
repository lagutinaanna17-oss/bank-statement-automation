import { workStages, workStagesNote } from "@/lib/site-config";

export function HowWeWork() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">Как мы работаем</h2>

        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {workStages.map((stage, i) => (
            <li key={stage.title} className="relative rounded-2xl border border-ink-700 bg-ink-900 p-5">
              <span className="text-3xl font-extrabold text-electric">{i + 1}</span>
              <p className="mt-2 font-semibold text-white">{stage.title}</p>
              <p className="mt-1 text-sm text-ink-600">{stage.description}</p>
            </li>
          ))}
        </ol>

        <p className="mt-8 rounded-xl border border-accent/40 bg-accent/10 p-4 text-center text-sm font-medium text-white">
          {workStagesNote}
        </p>
      </div>
    </section>
  );
}
