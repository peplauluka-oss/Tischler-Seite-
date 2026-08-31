import Link from "next/link";

/**
 * Hero-Overlay der Schnitt-Interaktion (Server-Komponente, echtes HTML).
 * Die H1 ist das LCP-Element und wartet nie auf Three.js.
 *
 * Ebenen:
 *  - Phase a: Headline + drei Conversion-Pfade auf der Eichenwand
 *    (dunkle Typo auf hellem Holz), blendet mit dem ersten Schnitt aus.
 *  - data-win-Texte: drei knappe Verben — ein Satzzeichen pro Schnitt.
 *    „Wir sägen. / Wir hobeln. / Wir ölen." (Fenster als data-win).
 *  - Phase c: Abbinder im dunklen Raum → leitet zu den Angeboten über.
 */
export default function Hero() {
  return (
    <div className="mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-16 sm:px-8 sm:pb-24">
      {/* ---- Phase A: Headline auf der Eichenwand ---- */}
      <div data-intro-phase="a" className="max-w-3xl">
        <p className="tech-label mb-6 !text-espresso/70">
          Erlebniswerkstatt · Berlin-Kaulsdorf
        </p>
        <h1 className="font-display text-[2.9rem] font-bold leading-[1.02] tracking-tight text-espresso sm:text-7xl md:text-[5.2rem]">
          Vom Baum zum
          <br />
          Meisterstück.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-espresso/75 sm:text-xl">
          Kurse, Mietwerkstatt und Auftragsarbeiten in Berlin-Kaulsdorf — Sie
          entscheiden, wie viel Holz Sie selbst in die Hand nehmen.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/kurse"
            className="btn bg-espresso text-cream hover:bg-walnut"
          >
            Kurs entdecken
          </Link>
          <Link href="/werkstatt-mieten" className="btn btn-outline text-espresso">
            Werkstatt mieten
          </Link>
          <Link href="/kontakt?anliegen=auftrag" className="btn btn-outline text-espresso">
            Projekt anfragen
          </Link>
        </div>
        <p className="mt-12 flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-espresso/55">
          <span className="scroll-hint-dot inline-block h-2 w-2 rounded-full bg-precision" aria-hidden="true" />
          Swipen — der erste Schnitt
        </p>
      </div>

      {/* ---- Die drei Schnitte: ein Verb pro Schicht ---- */}
      <div aria-hidden="false" className="pointer-events-none">
        <div
          data-win="0.15,0.34"
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center opacity-0"
        >
          <p className="font-display text-5xl font-bold tracking-tight text-cream sm:text-7xl">
            Wir sägen.
          </p>
          <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.25em] text-cream/60">
            Eiche · massiv
          </p>
        </div>
        <div
          data-win="0.42,0.62"
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center opacity-0"
        >
          <p className="font-display text-5xl font-bold tracking-tight text-cream sm:text-7xl">
            Wir hobeln.
          </p>
          <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.25em] text-precision-bright/80">
            Zuschnitt ± 0,5 mm
          </p>
        </div>
        <div
          data-win="0.7,0.87"
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center opacity-0"
        >
          <p className="font-display text-5xl font-bold tracking-tight text-cream sm:text-7xl">
            Wir ölen.
          </p>
          <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.25em] text-cream/60">
            Oberfläche · Hand
          </p>
        </div>
      </div>

      {/* ---- Phase C: Abbinder im dunklen Raum ---- */}
      <div
        data-intro-phase="c"
        className="absolute inset-x-0 bottom-16 mx-auto max-w-3xl px-5 text-center opacity-0 sm:bottom-20"
      >
        <p className="tech-label on-dark justify-center !text-precision-bright">
          Drei Schnitte später
        </p>
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
