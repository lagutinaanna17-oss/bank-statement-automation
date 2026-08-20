import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { YandexMetrika } from "@/components/layout/YandexMetrika";
import { LocalBusinessSchema } from "@/components/schema/JsonLd";
import { company } from "@/lib/site-config";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });

// TODO: заменить на реальный домен перед запуском в production
const siteUrl = "https://example-cvt-service.ru";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.fullBrandName} — ремонт вариаторов и АКПП`,
    template: `%s — ${company.brandName}`,
  },
  description:
    "Ремонт вариаторов (CVT) и АКПП за 1–3 дня. Бесплатная диагностика и эвакуация, гарантия до 3 лет без ограничения пробега.",
  openGraph: {
    title: `${company.fullBrandName} — ремонт вариаторов и АКПП`,
    description:
      "Ремонт вариаторов (CVT) и АКПП за 1–3 дня. Бесплатная диагностика и эвакуация, гарантия до 3 лет без ограничения пробега.",
    url: siteUrl,
    siteName: company.brandName,
    locale: "ru_RU",
    type: "website",
    images: [{ url: "/images/og-cover.jpg", width: 1200, height: 630, alt: company.brandName }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={inter.variable}>
      <body className="font-sans">
        <LocalBusinessSchema siteUrl={siteUrl} />
        <YandexMetrika />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingActions />
        <CookieBanner />
      </body>
    </html>
  );
}
