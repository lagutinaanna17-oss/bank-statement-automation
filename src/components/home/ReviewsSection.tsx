import { company, reviews } from "@/lib/site-config";
import { TiltCard } from "@/components/ui/TiltCard";

function Stars({ rating }: { rating: number }) {
  return (
    <span aria-label={`Оценка ${rating} из 5`} className="text-accent">
      {"★".repeat(rating)}
      <span className="text-ink-700">{"★".repeat(5 - rating)}</span>
    </span>
  );
}

const avatarGradients = [
  "from-accent to-electric",
  "from-electric to-violet",
  "from-violet to-accent",
];

export function ReviewsSection() {
  return (
    <section id="reviews" className="scroll-mt-24 bg-ink-900 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-ink-deep sm:text-3xl">Отзывы клиентов</h2>
          <span className="mt-2 inline-block rounded-full bg-ink-800 px-3 py-1 text-xs text-ink-600">
            Примеры формата — настоящие отзывы читайте по ссылке ниже
          </span>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <TiltCard key={review.id} className="rounded-2xl shadow-depth">
              <div className="glass h-full rounded-2xl p-5">
                <Stars rating={review.rating} />
                <p className="mt-3 text-sm text-ink-600">{review.text}</p>
                <div className="mt-4 flex items-center gap-3">
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${avatarGradients[i % avatarGradients.length]} text-sm font-bold text-white`}
                  >
                    {review.author.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink-deep">{review.author}</p>
                    <p className="text-xs text-ink-600">{review.carModel}</p>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 text-sm sm:flex-row">
          <a href={company.yandexMapsReviewsUrl} className="text-electric hover:underline">
            Читать отзывы на Яндекс Картах
          </a>
          {company.twoGisReviewsUrl && (
            <>
              <span className="hidden text-ink-700 sm:inline">•</span>
              <a href={company.twoGisReviewsUrl} className="text-electric hover:underline">
                Читать отзывы на 2ГИС
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
