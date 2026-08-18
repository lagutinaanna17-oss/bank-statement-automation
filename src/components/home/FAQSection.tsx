import { faq } from "@/lib/site-config";
import { FaqSchema } from "@/components/schema/JsonLd";

export function FAQSection() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <FaqSchema />
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">Частые вопросы</h2>

        <div className="mt-8 space-y-3">
          {faq.map((item) => (
            <details
              key={item.question}
              className="group rounded-xl border border-ink-700 bg-ink-900 p-4 open:border-accent"
            >
              <summary className="cursor-pointer list-none font-semibold text-white marker:content-none">
                <span className="flex items-center justify-between">
                  {item.question}
                  <span className="ml-4 text-accent group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-3 text-sm text-ink-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
