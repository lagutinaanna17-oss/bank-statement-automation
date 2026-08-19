import type { Metadata } from "next";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Отзывы клиентов о ремонте вариаторов",
  description: "Отзывы клиентов о ремонте вариаторов и АКПП. Ссылки на отзывы на Яндекс Картах и 2ГИС.",
};

export default function ReviewsPage() {
  return (
    <>
      <section className="px-4 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-extrabold text-ink-deep sm:text-4xl">Отзывы клиентов</h1>
        </div>
      </section>
      <ReviewsSection />
      <FinalCTA />
    </>
  );
}
