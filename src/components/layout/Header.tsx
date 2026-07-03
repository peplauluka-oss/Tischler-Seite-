import Link from "next/link";

/**
 * Fixierter Header über Canvas (z-0) und Story-Sektionen (z-10).
 * Bewusst schlank: Wort-Logo + die drei Conversion-Pfade + Kontakt.
 */
export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-wood-raw/75 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-tight text-char"
        >
          Hobbytischlerei
          <span className="ml-2 font-mono text-[0.6rem] font-normal uppercase tracking-[0.2em] text-precision">
            Berlin
          </span>
        </Link>
        <nav aria-label="Hauptnavigation" className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="/kurse" className="text-char/80 transition hover:text-char">
            Kurse
          </Link>
          <Link href="/werkstatt-mieten" className="text-char/80 transition hover:text-char">
            Werkstatt mieten
          </Link>
          <Link href="/auftragsarbeiten" className="text-char/80 transition hover:text-char">
            Auftragsarbeiten
          </Link>
          <Link
            href="/kontakt"
            className="rounded-full bg-char px-4 py-2 text-wood-raw transition hover:bg-wood-walnut"
          >
            Kontakt
          </Link>
        </nav>
        {/* Mobil: nur der wichtigste CTA – die Sticky-Bar übernimmt den Rest */}
        <Link
          href="/kontakt"
          className="rounded-full bg-char px-4 py-2 text-sm font-medium text-wood-raw md:hidden"
        >
          Kontakt
        </Link>
      </div>
    </header>
  );
}
