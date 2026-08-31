import Link from "next/link";
import Reveal from "@/components/Reveal";

/**
 * Die Doppel-Pointe des Kunden als dunkles CTA-Band:
 * bestellen — oder selbst bauen.
 */
export default function CtaBand() {
  return (
    <section className="on-dark intro-dark-bg px-5 py-24 text-cream sm:px-8 sm:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <h2 className="font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
            Bestellen Sie Ihr Maßstück —
            <br />
            <span className="text-oak-light">oder bauen Sie es selbst bei uns.</span>
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-cream/60">
            Beides beginnt mit einer kurzen Nachricht. Wir melden uns und
            besprechen, wie Ihr Werkstück entsteht.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/kontakt?anliegen=auftrag" className="btn btn-primary" data-anliegen="auftrag">
              Projekt anfragen
            </Link>
            <Link href="/kontakt?anliegen=kurs" className="btn btn-outline text-cream" data-anliegen="kurs">
              Kurs buchen
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
