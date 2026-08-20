import { company, faq, reviews } from "@/lib/site-config";

/** Универсальный рендер JSON-LD скрипта. */
function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify экранирует пользовательский текст, безопасно для встраивания.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** LocalBusiness + AutoRepair — используется в корневом layout на каждой странице. */
export function LocalBusinessSchema({ siteUrl }: { siteUrl: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: company.brandName,
    // legalName умышленно не заполняется, пока не указаны реальные реквизиты
    // юрлица — placeholder-текст не должен попадать в структурированные данные.
    image: `${siteUrl}/images/workshop-cover.jpg`,
    url: siteUrl,
    telephone: company.phoneHref.replace("tel:", ""),
    email: company.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.actualAddress,
      addressCountry: "RU",
    },
    openingHours: "Mo-Su 00:00-23:59",
    priceRange: "₽₽",
    areaServed: company.cities,
  };

  return <JsonLdScript data={data} />;
}

/** FAQPage — переиспользуется на главной и на странице услуг. */
export function FaqSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return <JsonLdScript data={data} />;
}

/**
 * Review — агрегированные отзывы клиентов.
 * ВАЖНО: не подключать, пока `reviews` в site-config содержит иллюстративные
 * примеры, а не настоящие отзывы — публикация выдуманных Review/AggregateRating
 * в JSON-LD для реальной компании нарушает правила Google по структурированным
 * данным. Подключить `<ReviewsSchema />` в ReviewsSection только после того,
 * как массив reviews будет заполнен настоящими отзывами.
 */
export function ReviewsSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: company.brandName,
    review: reviews.map((review) => ({
      "@type": "Review",
      author: { "@type": "Person", name: review.author },
      datePublished: review.date,
      reviewBody: review.text,
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
      },
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: (
        reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      ).toFixed(1),
      reviewCount: reviews.length,
    },
  };

  return <JsonLdScript data={data} />;
}
