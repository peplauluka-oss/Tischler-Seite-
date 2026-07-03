import Link from "next/link";
import ActSection from "@/components/story/ActSection";
import Keyvisual from "@/components/story/Keyvisual";
import { site } from "@/content/site";

/** Akt 1 – HERO. Die H1 ist das LCP-Element: reines HTML, wartet nie auf 3D. */
export default function HeroSection() {
  return (
    <ActSection act="hero" id="hero" label="Akt 01 · Der Baum" keyvisual={<Keyvisual variant="baum" />}>
      <div className="max-w-2xl">
        <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-char sm:text-6xl md:text-7xl">
          {site.claim}
        </h1>
        <p className="mt-5 max-w-lg text-lg text-char/70 sm:text-xl">{site.subline}</p>

        {/* Drei gleichwertige Conversion-Pfade – in unter 5 Sekunden wählbar */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="#angebote"
            className="rounded-full bg-char px-5 py-2.5 text-sm font-medium text-wood-raw transition hover:bg-wood-walnut"
          >
            Kurs entdecken
          </Link>
          <Link
            href="#angebote"
            className="rounded-full border border-char/25 bg-wood-raw/60 px-5 py-2.5 text-sm font-medium text-char backdrop-blur transition hover:border-char"
          >
            Werkstatt mieten
          </Link>
          <Link
            href="#kontakt"
            data-anliegen="auftrag"
            className="rounded-full border border-char/25 bg-wood-raw/60 px-5 py-2.5 text-sm font-medium text-char backdrop-blur transition hover:border-char"
          >
            Projekt anfragen
          </Link>
        </div>

        <p className="mt-14 flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-char/50">
          <span className="scroll-hint-dot inline-block h-2 w-2 rounded-full bg-precision" aria-hidden="true" />
          Scrollen, um den Prozess zu erleben
        </p>
      </div>
    </ActSection>
  );
}
