import { company, heroContent } from "@/lib/site-config";
import { PhoneReveal } from "@/components/layout/PhoneReveal";
import { GlowOrbs } from "@/components/ui/GlowOrbs";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-950 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <GlowOrbs variant="hero" />

      <div className="relative mx-auto max-w-4xl text-center">
        <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-white/90 shadow-depth">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          Бесплатная диагностика · гарантия до {company.warrantyYears} лет
        </span>

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
          Ремонт вариаторов{" "}
          <span className="text-gradient-accent">за 24 часа</span>
        </h1>
        <p className="mt-5 text-lg text-ink-600 sm:text-xl">{heroContent.subtitle}</p>
        <p className="mt-2 text-sm text-ink-600">{heroContent.citiesNote}</p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#lead-form"
            className="btn-3d w-full rounded-full bg-accent px-8 py-4 text-center text-base font-semibold text-white shadow-depth-lg shadow-glow sm:w-auto"
          >
            {heroContent.ctaLabel}
          </a>
          <PhoneReveal className="btn-3d text-lg font-semibold text-white hover:text-accent" />
        </div>

        {/* Плавающие "объёмные" карточки-бейджи с ключевыми цифрами */}
        <div className="pointer-events-none mt-16 hidden justify-center gap-6 sm:flex">
          <div className="glass animate-float rounded-2xl px-6 py-4 shadow-depth" style={{ animationDelay: "0s" }}>
            <p className="text-2xl font-extrabold text-white">{company.yearsOnMarket}+</p>
            <p className="text-xs text-ink-600">лет на рынке</p>
          </div>
          <div className="glass animate-float-slow rounded-2xl px-6 py-4 shadow-depth" style={{ animationDelay: "1s" }}>
            <p className="text-2xl font-extrabold text-white">{company.gearboxesRepaired}+</p>
            <p className="text-xs text-ink-600">коробок отремонтировано</p>
          </div>
          <div className="glass animate-float rounded-2xl px-6 py-4 shadow-depth" style={{ animationDelay: "2s" }}>
            <p className="text-2xl font-extrabold text-white">до {company.warrantyYears} лет</p>
            <p className="text-xs text-ink-600">гарантии</p>
          </div>
        </div>
      </div>
    </section>
  );
}
