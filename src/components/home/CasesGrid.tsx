import Image from "next/image";
import { cases } from "@/lib/site-config";

export function CasesGrid() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">Кейсы: до и после</h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((item) => (
            <div key={item.id} className="rounded-2xl border border-ink-700 bg-ink-900 p-5">
              <div className="grid grid-cols-2 gap-2">
                <div className="relative aspect-square overflow-hidden rounded-xl bg-ink-800">
                  <Image
                    src={`/images/cases/${item.id}-before.jpg`}
                    alt={item.photoBeforeAlt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-xl bg-ink-800">
                  <Image
                    src={`/images/cases/${item.id}-after.jpg`}
                    alt={item.photoAfterAlt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <p className="mt-4 font-semibold text-white">
                {item.brand} {item.model} <span className="text-ink-600">({item.gearboxCode})</span>
              </p>
              <p className="mt-1 text-sm text-ink-600">Проблема: {item.problem}</p>
              <p className="mt-1 text-sm text-ink-600">Работы: {item.workDone}</p>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-ink-600">Срок: {item.durationDays} дн.</span>
                <span className="font-semibold text-accent">
                  {item.price.toLocaleString("ru-RU")} ₽
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
