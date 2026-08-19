import { advantages } from "@/lib/site-config";
import { TiltCard } from "@/components/ui/TiltCard";

export function Advantages() {
  return (
    <section className="relative px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold text-ink-deep sm:text-3xl">Наши преимущества</h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((item, i) => (
            <TiltCard key={item.title} className="rounded-2xl shadow-depth">
              <div className="glass h-full rounded-2xl p-5">
                <span className="text-gradient-accent text-2xl font-extrabold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 font-semibold text-ink-deep">{item.title}</p>
                <p className="mt-1 text-sm text-ink-600">{item.description}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
