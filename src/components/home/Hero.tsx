import { heroContent } from "@/lib/site-config";
import { PhoneReveal } from "@/components/layout/PhoneReveal";

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-ink-900 to-ink-950 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          {heroContent.title}
        </h1>
        <p className="mt-4 text-lg text-ink-600 sm:text-xl">{heroContent.subtitle}</p>
        <p className="mt-2 text-sm text-ink-600">{heroContent.citiesNote}</p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#lead-form"
            className="w-full rounded-full bg-accent px-8 py-4 text-center text-base font-semibold text-white shadow-lg shadow-accent/30 transition hover:bg-accent-hover sm:w-auto"
          >
            {heroContent.ctaLabel}
          </a>
          <PhoneReveal className="text-lg font-semibold text-white hover:text-accent" />
        </div>
      </div>
    </section>
  );
}
