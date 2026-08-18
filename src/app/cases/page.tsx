import type { Metadata } from "next";
import { CasesGrid } from "@/components/home/CasesGrid";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Примеры работ — ремонт вариаторов до и после",
  description: "Реальные кейсы ремонта вариаторов: модель коробки, проблема, срок и стоимость ремонта.",
};

export default function CasesPage() {
  return (
    <>
      <section className="px-4 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Примеры работ</h1>
          <p className="mt-3 text-ink-600">Фото до и после, модель коробки, срок и цена ремонта.</p>
        </div>
      </section>
      <CasesGrid />
      <FinalCTA />
    </>
  );
}
