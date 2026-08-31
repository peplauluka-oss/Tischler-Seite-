import Link from "next/link";
import Reveal from "@/components/Reveal";
import { angebote } from "@/content/angebote";

/** Die drei Conversion-Pfade als große Editorial-Karten. */
export default function AngeboteSection() {
  return (
    <section id="angebote" className="bg-cream px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="max-w-2xl font-display text-4xl font-bold leading-[1.06] tracking-tight text-walnut sm:text-5xl">
            Drei Wege zu Ihrem Werkstück
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {angebote.map((a, i) => (
            <Reveal key={a.slug} delay={i * 70} as="article" className="group">
              <Link
                href={a.href}
                className="flex h-full flex-col rounded-3xl border border-walnut/10 bg-cream-2/60 p-7 transition-[transform,border-color,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1.5 hover:border-walnut/25 hover:bg-cream-2 hover:shadow-[0_24px_60px_-30px_rgba(63,44,29,0.45)] active:scale-[0.985] active:duration-150 sm:p-8"
              >
                <span className="drawing-numeral">0{i + 1}</span>
                <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-char">
                  {a.titel}
                </h3>
                <p className="mt-1.5 font-medium text-walnut">{a.kurz}</p>
                <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-char/65">
                  {a.beschreibung}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-char">
                  {a.cta}
                  <span
                    aria-hidden="true"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-char/20 transition-[transform,border-color,background-color,color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1 group-hover:border-char group-hover:bg-char group-hover:text-cream"
                  >
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <p className="mt-8 text-sm text-char/55">
            Verschenken statt selber bauen?{" "}
            <Link
              href="/kontakt?anliegen=gutschein"
              className="font-medium text-walnut underline underline-offset-4 hover:text-char"
            >
              Gutscheine
            </Link>{" "}
            — und exklusive Holzprodukte im Onlineshop [PLATZHALTER: Link].
          </p>
        </Reveal>
      </div>
    </section>
  );
}
