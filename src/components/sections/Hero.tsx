import Link from "next/link";
import { site } from "@/content/site";

/**
 * Hero-Overlay der Intro-Interaktion (Server-Komponente, echtes HTML).
 * Die H1 ist das LCP-Element und wartet nie auf Three.js.
 *
 * data-intro-phase steuert, wann die 3 Ebenen im Scroll erscheinen
 * (siehe IntroStage). Im statischen Fallback zeigt .intro-fallback eine
 * stilisierte SVG-Version des aufgebrochenen Stamms.
 */
export default function Hero() {
  return (
    <div className="mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-16 sm:px-8 sm:pb-20">
      {/* ---- Statisches Keyvisual (nur ohne 3D sichtbar) ---- */}
      <div className="intro-fallback pointer-events-none mb-10 self-center sm:self-end">
        <svg
          viewBox="0 0 520 240"
          role="img"
          aria-label="Illustration: Ein Eichenstamm, in massive Scheiben aufgebrochen — die Jahresringe leuchten warm."
          className="h-44 w-auto max-w-full sm:h-60"
        >
          {[0, 1, 2, 3, 4].map((i) => {
            const x = 20 + i * 100;
            const dy = [8, -6, 12, -10, 4][i];
            return (
              <g key={i} transform={`translate(${x} ${70 + dy}) rotate(${(i - 2) * 3})`}>
                <rect x="0" y="0" width="62" height="120" rx="16" fill="#2a1d11" />
                <ellipse cx="62" cy="60" rx="17" ry="60" fill="#caa06f" />
                <ellipse cx="62" cy="60" rx="11" ry="41" fill="none" stroke="#8a613c" strokeWidth="2.5" />
                <ellipse cx="62" cy="60" rx="6" ry="22" fill="none" stroke="#8a613c" strokeWidth="2" />
                <ellipse cx="62" cy="60" rx="2.4" ry="8" fill="#ff9a4d" opacity="0.85" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* ---- Phase A: Headline + Conversion-Pfade ---- */}
      <div data-intro-phase="a" className="max-w-3xl">
        <p className="tech-label mb-6">Erlebniswerkstatt · Berlin-Kaulsdorf</p>
        <h1 className="font-display text-[2.9rem] font-bold leading-[1.02] tracking-tight text-cream sm:text-7xl md:text-[5.2rem]">
          Vom Baum zum
          <br />
          Meisterstück.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-cream/65 sm:text-xl">
          {site.subline} Lernen, mieten oder bauen lassen — Sie entscheiden,
          wie viel Holz Sie selbst in die Hand nehmen.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/kurse" className="btn btn-primary">
            Kurs entdecken
          </Link>
          <Link href="/werkstatt-mieten" className="btn btn-outline text-cream">
            Werkstatt mieten
          </Link>
          <Link href="/kontakt?anliegen=auftrag" className="btn btn-outline text-cream">
            Projekt anfragen
          </Link>
        </div>
        <p className="mt-12 flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-cream/40">
          <span className="scroll-hint-dot inline-block h-2 w-2 rounded-full bg-precision-bright" aria-hidden="true" />
          Scrollen — der Stamm bricht auf
        </p>
      </div>

      {/* ---- Phase B: schwebende CAD-Labels (dekorative Bemaßung) ---- */}
      <div aria-hidden="true" className="pointer-events-none">
        <p
          data-intro-phase="b"
          className="absolute left-[8%] top-[22%] font-mono text-xs uppercase tracking-[0.25em] text-precision-bright/90 opacity-0"
        >
          <span className="mr-3 inline-block h-px w-10 bg-current align-middle" />
          Eiche · massiv
        </p>
        <p
          data-intro-phase="b"
          className="absolute right-[9%] top-[38%] font-mono text-xs uppercase tracking-[0.25em] text-cream/70 opacity-0"
        >
          Ø 620 mm
          <span className="ml-3 inline-block h-px w-10 bg-current align-middle" />
        </p>
        <p
          data-intro-phase="b"
          className="absolute left-[14%] top-[68%] font-mono text-xs uppercase tracking-[0.25em] text-cream/70 opacity-0"
        >
          <span className="mr-3 inline-block h-px w-10 bg-current align-middle" />
          Zuschnitt ± 0,5 mm
        </p>
      </div>

      {/* ---- Phase C: Abbinder → leitet in die Angebote über ---- */}
      <div
        data-intro-phase="c"
        className="absolute inset-x-0 bottom-16 mx-auto max-w-3xl px-5 text-center opacity-0 sm:bottom-20"
      >
        <p className="tech-label justify-center">Aus einem Stamm</p>
        <p className="mt-4 font-display text-3xl font-bold tracking-tight text-cream sm:text-5xl">
          Drei Wege zu Ihrem Werkstück
        </p>
        <Link
          href="#angebote"
          className="mt-7 inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 text-cream transition hover:border-cream"
          aria-label="Zu den Angeboten scrollen"
        >
          ↓
        </Link>
      </div>
    </div>
  );
}
