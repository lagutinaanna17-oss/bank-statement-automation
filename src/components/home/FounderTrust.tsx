import { founder } from "@/lib/site-config";
import { TiltCard } from "@/components/ui/TiltCard";
import { PlaceholderVisual } from "@/components/ui/PlaceholderVisual";

/**
 * Блок доверия "от основателя" — по образцу конкурентов, но с плейсхолдером:
 * реального имени, фото и биографии у демо-компании нет. Обязательно
 * заменить перед запуском на настоящего человека.
 */
export function FounderTrust() {
  return (
    <section className="bg-ink-900 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-[220px_1fr] sm:items-center">
        <TiltCard className="mx-auto w-48 overflow-hidden rounded-2xl shadow-depth-lg sm:w-full">
          <div className="aspect-square">
            <PlaceholderVisual icon="team" label="Фото руководителя" gradient="violet" />
          </div>
        </TiltCard>

        <div>
          <span className="inline-block rounded-full bg-ink-800 px-3 py-1 text-xs text-ink-600">
            Демо-блок — заменить на реального руководителя
          </span>
          <p className="mt-3 text-xl font-bold italic text-ink-deep">«{founder.quote}»</p>
          <p className="mt-4 text-sm font-semibold text-ink-deep">{founder.name}</p>
          <p className="text-sm text-ink-600">{founder.role}</p>
          <p className="mt-3 text-sm text-ink-600">{founder.bio}</p>
        </div>
      </div>
    </section>
  );
}
