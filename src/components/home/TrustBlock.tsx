import Image from "next/image";
import { trustBadges } from "@/lib/site-config";
import { TiltCard } from "@/components/ui/TiltCard";

const photos = [
  { src: "/images/workshop-1.jpg", alt: "[Заменить: фото цеха — рабочая зона с подъёмником]" },
  { src: "/images/workshop-2.jpg", alt: "[Заменить: фото цеха — стенд диагностики вариаторов]" },
  { src: "/images/team-1.jpg", alt: "[Заменить: фото команды мастеров сервиса]" },
  { src: "/images/warranty-card.jpg", alt: "[Заменить: фото гарантийного талона]" },
];

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
          {/* TODO: заменить на реальные фото цеха и команды */}
          {photos.map((photo) => (
            <TiltCard key={photo.src} className="overflow-hidden rounded-2xl shadow-depth">
              <div className="relative aspect-square bg-ink-800">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
