import { trustBadges } from "@/lib/site-config";
import { TiltCard } from "@/components/ui/TiltCard";
import { PlaceholderVisual } from "@/components/ui/PlaceholderVisual";

const photos = [
  { icon: "wrench", label: "Рабочая зона с подъёмником", gradient: "accent" },
  { icon: "gauge", label: "Стенд диагностики", gradient: "electric" },
  { icon: "team", label: "Команда мастеров", gradient: "violet" },
  { icon: "shield", label: "Гарантийный талон", gradient: "accent" },
] as const;

export function TrustBlock() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <TiltCard className="glass rounded-2xl shadow-depth-lg">
          <div className="grid grid-cols-3 gap-4 p-6 text-center sm:p-8">
            {trustBadges.map((badge) => (
              <div key={badge.label}>
                <p className="text-gradient-accent text-3xl font-extrabold sm:text-5xl">{badge.value}</p>
                <p className="mt-1 text-xs text-ink-600 sm:text-sm">{badge.label}</p>
              </div>
            ))}
          </div>
        </TiltCard>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {/* TODO: заменить плейсхолдеры на реальные фото цеха и команды (next/image) */}
          {photos.map((photo) => (
            <TiltCard key={photo.label} className="overflow-hidden rounded-2xl shadow-depth">
              <div className="relative aspect-square">
                <PlaceholderVisual icon={photo.icon} label={photo.label} gradient={photo.gradient} />
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
