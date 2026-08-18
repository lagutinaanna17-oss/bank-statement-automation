import { Hero } from "@/components/home/Hero";
import { TrustBlock } from "@/components/home/TrustBlock";
import { PriceQuiz } from "@/components/home/PriceQuiz";
import { AIPrediagnosis } from "@/components/home/AIPrediagnosis";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { HowWeWork } from "@/components/home/HowWeWork";
import { BrandsGrid } from "@/components/home/BrandsGrid";
import { CasesGrid } from "@/components/home/CasesGrid";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBlock />
      <PriceQuiz />
      <AIPrediagnosis />
      <ServicesGrid />
      <HowWeWork />
      <BrandsGrid />
      <CasesGrid />
      <ReviewsSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
