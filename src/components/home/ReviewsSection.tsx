import { company, reviews } from "@/lib/site-config";
import { ReviewsSchema } from "@/components/schema/JsonLd";
import { TiltCard } from "@/components/ui/TiltCard";

function Stars({ rating }: { rating: number }) {
  return (
    <span aria-label={`Оценка ${rating} из 5`} className="text-accent">
      {"★".repeat(rating)}
      <span className="text-ink-700">{"★".repeat(5 - rating)}</span>
    </span>
  );
}

export function ReviewsSection() {
  return (
    <section className="bg-ink-900 px-4 py-16 sm:px-6 lg:px-8">
      <ReviewsSchema />
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">Отзывы клиентов</h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <TiltCard key={review.id} className="rounded-2xl shadow-depth">
              <div className="glass h-full rounded-2xl p-5">
                <Stars rating={review.rating} />
                <p className="mt-3 text-sm text-ink-600">{review.text}</p>
                <p className="mt-4 text-sm font-semibold text-white">{review.author}</p>
                <p className="text-xs text-ink-600">{review.carModel}</p>
              </div>
            </TiltCard>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 text-sm sm:flex-row">
          <a href={company.yandexMapsReviewsUrl} className="text-electric hover:underline">
            Читать отзывы на Яндекс Картах
          </a>
          <span className="hidden text-ink-700 sm:inline">•</span>
          <a href={company.twoGisReviewsUrl} className="text-electric hover:underline">
            Читать отзывы на 2ГИС
          </a>
        </div>
      </div>
    </section>
  );
}
