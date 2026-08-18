import Image from "next/image";
import { trustBadges } from "@/lib/site-config";

export function TrustBlock() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-3 gap-4 rounded-2xl border border-ink-700 bg-ink-900 p-6 text-center sm:p-8">
          {trustBadges.map((badge) => (
            <div key={badge.label}>
              <p className="text-2xl font-extrabold text-accent sm:text-4xl">{badge.value}</p>
              <p className="mt-1 text-xs text-ink-600 sm:text-sm">{badge.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {/* TODO: заменить на реальные фото цеха и команды */}
          <div className="relative aspect-square overflow-hidden rounded-xl bg-ink-800">
            <Image
              src="/images/workshop-1.jpg"
              alt="[Заменить: фото цеха — рабочая зона с подъёмником]"
              fill
              loading="lazy"
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-xl bg-ink-800">
            <Image
              src="/images/workshop-2.jpg"
              alt="[Заменить: фото цеха — стенд диагностики вариаторов]"
              fill
              loading="lazy"
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-xl bg-ink-800">
            <Image
              src="/images/team-1.jpg"
              alt="[Заменить: фото команды мастеров сервиса]"
              fill
              loading="lazy"
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-xl bg-ink-800">
            <Image
              src="/images/warranty-card.jpg"
              alt="[Заменить: фото гарантийного талона]"
              fill
              loading="lazy"
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
