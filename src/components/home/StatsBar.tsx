import { extraStats } from "@/lib/site-config";
import { GlowOrbs } from "@/components/ui/GlowOrbs";

export function StatsBar() {
  return (
    <section className="relative overflow-hidden bg-ink-900 px-4 py-14 sm:px-6 lg:px-8">
      <GlowOrbs variant="section" />
      <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-6 sm:grid-cols-4">
        {extraStats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-gradient-electric text-3xl font-extrabold sm:text-4xl">{stat.value}</p>
            <p className="mt-1 text-xs text-ink-600 sm:text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
