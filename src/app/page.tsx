import { Hero } from "@/components/home/Hero";
import { TrustBlock } from "@/components/home/TrustBlock";
import { PriceQuiz } from "@/components/home/PriceQuiz";
import { AIPrediagnosis } from "@/components/home/AIPrediagnosis";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { RepairVariants } from "@/components/home/RepairVariants";
import { GearboxPricing } from "@/components/home/GearboxPricing";
import { HowWeWork } from "@/components/home/HowWeWork";
import { SymptomsGrid } from "@/components/home/SymptomsGrid";
import { BrandsGrid } from "@/components/home/BrandsGrid";
import { Advantages } from "@/components/home/Advantages";
import { StatsBar } from "@/components/home/StatsBar";
import { CasesGrid } from "@/components/home/CasesGrid";
import { FounderTrust } from "@/components/home/FounderTrust";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { FinalCTA } from "@/components/home/FinalCTA";

// Порядок секций повторяет структуру навигации реального сайта компании
// (Главная → Отзывы → Варианты ремонта → Этапы ремонта → Симптомы →
// О компании → Контакты) — отзывы и блок "о компании" специально не в
// конце, как обычно на лендингах, а там же, где на исходном сайте.
export default function HomePage() {
  return (
    <>
      <Hero />
      <ReviewsSection />
      <TrustBlock />
      <RepairVariants />
      <GearboxPricing />
      <HowWeWork />
      <SymptomsGrid />
      <PriceQuiz />
      <ServicesGrid />
      <BrandsGrid />
      <Advantages />
      <StatsBar />
      <CasesGrid />
      <FounderTrust />
      <AIPrediagnosis />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
