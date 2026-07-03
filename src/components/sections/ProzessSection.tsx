import Reveal from "@/components/Reveal";
import { prozessSchritte } from "@/content/prozess";

/** 4-Schritte-Prozess mit Werkstattzeichnungs-Motiv (Messlinie + Ziffern). */
export default function ProzessSection() {
  return (
    <section id="prozess" className="bg-cream px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="tech-label mb-6">Prozess · ± 0,5 mm</p>
          <h2 className="max-w-2xl font-display text-4xl font-bold leading-[1.06] tracking-tight text-walnut sm:text-5xl">
            So läuft es bei uns
          </h2>
        </Reveal>
        <div className="relative mt-14">
          {/* Messlinie verbindet die Schritte (Desktop) */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-5 hidden border-t border-dashed border-precision/40 md:block"
          />
          <ol className="grid gap-10 md:grid-cols-4 md:gap-6">
            {prozessSchritte.map((s, i) => (
              <Reveal key={s.nr} as="li" delay={i * 140} className="relative">
                <span className="relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-precision/50 bg-cream font-mono text-sm text-precision">
                  {s.nr}
                </span>
                <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-char">
                  {s.titel}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-char/65">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
