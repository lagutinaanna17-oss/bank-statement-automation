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

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBlock />
      <PriceQuiz />
      <AIPrediagnosis />
      <ServicesGrid />
      <RepairVariants />
      <GearboxPricing />
      <HowWeWork />
      <SymptomsGrid />
      <BrandsGrid />
      <Advantages />
      <StatsBar />
      <CasesGrid />
      <FounderTrust />
      <ReviewsSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
