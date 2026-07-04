"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Adaptiver Header: über dem dunklen Intro (Startseite) Creme-Typo auf
 * transparentem Grund; sobald die hellen Sektionen erreicht sind (oder
 * auf Unterseiten von Anfang an) eine Creme-Leiste mit dunkler Typo.
 */
export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const onHome = pathname === "/";

  useEffect(() => {
    if (!onHome) {
      setScrolled(true);
      return;
    }
    const update = () => setScrolled(window.scrollY > 60);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [onHome, pathname]);

  /* Am Seitenanfang schwebt der Header transparent über der hellen
     Holzwand (dunkle Typo); ab dem ersten Swipe kommt die Creme-Leiste —
     lesbar über jeder der Schnitt-Schichten. */
  const floating = onHome && !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        floating ? "bg-transparent" : "bg-cream/85 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href="/"
          className={`font-display text-lg font-bold tracking-tight transition-colors duration-500 ${
            floating ? "text-espresso" : "text-char"
          }`}
        >
          Hobbytischlerei
          <span
            className={`ml-2 font-mono text-[0.6rem] font-normal uppercase tracking-[0.22em] ${
              floating ? "text-precision" : "text-precision"
            }`}
          >
            Berlin
          </span>
        </Link>
        <nav
          aria-label="Hauptnavigation"
          className={`hidden items-center gap-7 text-sm font-medium md:flex ${
            floating ? "text-espresso/80" : "text-char/75"
          }`}
        >
          <Link href="/kurse" className="transition hover:opacity-100 opacity-90">
            Kurse
          </Link>
          <Link href="/werkstatt-mieten" className="transition opacity-90 hover:opacity-100">
            Werkstatt mieten
          </Link>
          <Link href="/auftragsarbeiten" className="transition opacity-90 hover:opacity-100">
            Auftragsarbeiten
          </Link>
          <Link
            href="/kontakt"
            className={`rounded-full px-4 py-2 transition ${
              floating
                ? "bg-espresso text-cream hover:bg-walnut"
                : "bg-char text-cream hover:bg-walnut"
            }`}
          >
            Kontakt
          </Link>
        </nav>
        <Link
          href="/kontakt"
          className={`rounded-full px-4 py-2 text-sm font-medium md:hidden ${
            floating ? "bg-espresso text-cream" : "bg-char text-cream"
          }`}
        >
          Kontakt
        </Link>
      </div>
    </header>
  );
}
