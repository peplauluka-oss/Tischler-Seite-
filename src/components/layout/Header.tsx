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
  const [pastIntro, setPastIntro] = useState(false);
  const onHome = pathname === "/";

  useEffect(() => {
    if (!onHome) {
      setPastIntro(true);
      return;
    }
    const update = () => {
      const track = document.querySelector<HTMLElement>(".intro-track");
      const limit = track ? track.offsetHeight - window.innerHeight * 0.6 : 200;
      setPastIntro(window.scrollY > limit);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [onHome, pathname]);

  const dark = onHome && !pastIntro;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        dark ? "bg-transparent" : "bg-cream/80 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href="/"
          className={`font-display text-lg font-bold tracking-tight transition-colors duration-500 ${
            dark ? "text-cream" : "text-char"
          }`}
        >
          Hobbytischlerei
          <span
            className={`ml-2 font-mono text-[0.6rem] font-normal uppercase tracking-[0.22em] ${
              dark ? "text-precision-bright" : "text-precision"
            }`}
          >
            Berlin
          </span>
        </Link>
        <nav
          aria-label="Hauptnavigation"
          className={`hidden items-center gap-7 text-sm font-medium md:flex ${
            dark ? "text-cream/75" : "text-char/75"
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
              dark
                ? "bg-cream text-espresso hover:bg-oak-light"
                : "bg-char text-cream hover:bg-walnut"
            }`}
          >
            Kontakt
          </Link>
        </nav>
        <Link
          href="/kontakt"
          className={`rounded-full px-4 py-2 text-sm font-medium md:hidden ${
            dark ? "bg-cream text-espresso" : "bg-char text-cream"
          }`}
        >
          Kontakt
        </Link>
      </div>
    </header>
  );
}
