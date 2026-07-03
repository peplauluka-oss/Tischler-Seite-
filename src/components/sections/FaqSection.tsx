import { faq } from "@/content/faq";
import { faqJsonLd } from "@/lib/jsonld";

/**
 * FAQ als natives <details>-Accordion (funktioniert ohne JavaScript,
 * per Tastatur bedienbar) + FAQPage-JSON-LD für Rich Results.
 */
export default function FaqSection() {
  return (
    <section id="faq" className="relative z-10 bg-wood-raw px-4 pb-24 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />
      <div className="mx-auto max-w-3xl">
        <p className="tech-label mb-6">Häufige Fragen</p>
        <h2 className="font-display text-3xl font-bold tracking-tight text-wood-walnut sm:text-4xl">
          Gut zu wissen
        </h2>
        <div className="mt-8 divide-y divide-wood-walnut/15 border-y border-wood-walnut/15">
          {faq.map((f) => (
            <details key={f.frage} className="faq-item group py-4">
              <summary className="flex items-center justify-between gap-4 font-medium text-char">
                {f.frage}
                <span className="faq-chevron text-precision" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 pr-8 text-sm leading-relaxed text-char/70">{f.antwort}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
