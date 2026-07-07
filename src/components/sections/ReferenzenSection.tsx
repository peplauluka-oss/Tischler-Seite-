import Reveal from "@/components/Reveal";
import ReferenzGalerie from "@/components/ReferenzGalerie";
import { kundenstimmen } from "@/content/referenzen";

/** Referenzen: filterbare Galerie + Kundenstimmen. */
export default function ReferenzenSection() {
  return (
    <section id="referenzen" className="bg-cream-2/50 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="max-w-2xl font-display text-4xl font-bold leading-[1.06] tracking-tight text-walnut sm:text-5xl">
            Aus unserer Werkstatt
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <ReferenzGalerie />
        </Reveal>
        <div className="mt-14 grid gap-8 border-t border-walnut/15 pt-10 sm:grid-cols-2">
          {kundenstimmen.map((k, i) => (
            <Reveal key={i} delay={i * 70}>
              <blockquote className="text-lg italic leading-relaxed text-char/75">
                „{k.zitat}“
                <footer className="mt-3 font-mono text-[0.68rem] not-italic uppercase tracking-[0.18em] text-walnut/70">
                  — {k.name}
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
