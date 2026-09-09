"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navItems } from "@/content/club";
import { Logo } from "@/components/ui/Brand";
import { GuestlistButton, TableButton } from "@/components/ui/Cta";
import { scrollToSection } from "@/lib/scroll";

/**
 * Navigation — durchsichtig, damit sie in der Seite liegt statt darauf.
 *
 * Sichtbarkeit steuert die Hero-Timeline über `data-nav-shell`: Die Leiste
 * entsteht aus der Brandingleiste des Videos und tritt wieder zurück,
 * während sich der Hero in das Event verwandelt — sie läge sonst über dessen
 * eigenem Logo.
 *
 * Auf dem Telefon steht neben der Marke nur die Gästeliste und ein
 * Menüzeichen: Die wichtigste Handlung ist immer mit einem Daumen erreichbar,
 * alles Übrige liegt eine Berührung tiefer.
 */
export default function SiteNav({
  /** Auf der Startseite blendet die Hero-Timeline die Leiste ein und wieder
      aus. Auf allen anderen Seiten gibt es keinen Hero — dort steht sie. */
  heroDriven = false,
}: {
  heroDriven?: boolean;
}) {
  const [active, setActive] = useState<string | null>(null);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* Das Menü darf keinen Scroll hinter sich zulassen und muss auf Escape zu. */
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menu]);

  const go = (id: string) => {
    setMenu(false);
    scrollToSection(id);
  };

  return (
    <header
      data-nav-shell
      className={`fixed inset-x-0 top-0 z-100 ${heroDriven ? "hero-reveal" : ""}`}
      style={{ willChange: "opacity, transform" }}
    >
      <div
        data-nav-bg
        className="absolute inset-0 border-b border-ivory/10 bg-void/55 backdrop-blur-xl"
      />

      <div className="relative mx-auto flex h-14 max-w-[1560px] items-center justify-between gap-4 px-5 md:h-[72px] md:px-8">
        <button
          type="button"
          onClick={() => go("top")}
          className="flex shrink-0 items-center text-ivory transition-opacity hover:opacity-70"
        >
          <Logo width={136} className="md:!w-[148px]" />
          <span className="sr-only">Black Medusa — zum Seitenanfang</span>
        </button>

        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    go(item.id);
                  }}
                  aria-current={active === item.id ? "true" : undefined}
                  className={`block py-2 text-[0.6875rem] font-bold tracking-[0.2em] transition-colors ${
                    active === item.id ? "text-ivory" : "text-mute hover:text-ivory"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2.5">
          <TableButton
            label="TISCH"
            className="hidden min-h-10 gap-3 px-4 py-2.5 text-[0.6875rem] lg:inline-flex"
          />
          <GuestlistButton
            label="GÄSTELISTE"
            className="min-h-10 gap-2.5 px-3.5 py-2.5 text-[0.625rem] md:gap-3 md:px-4 md:text-[0.6875rem]"
          />

          <button
            type="button"
            onClick={() => setMenu((v) => !v)}
            aria-expanded={menu}
            aria-controls="site-menu"
            className="-mr-2 flex h-11 w-11 items-center justify-center text-ivory lg:hidden"
          >
            <span className="sr-only">{menu ? "Menü schließen" : "Menü öffnen"}</span>
            <svg viewBox="0 0 20 14" width="20" height="14" aria-hidden="true">
              {menu ? (
                <path d="M2 2l16 10M18 2L2 12" stroke="currentColor" strokeWidth="1.6" />
              ) : (
                <path d="M0 1h20M0 7h20M0 13h13" stroke="currentColor" strokeWidth="1.6" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menü: eine Liste, keine Vollbildwelt — vier Ziele brauchen keine. */}
      <AnimatePresence>
        {menu && (
          <motion.nav
            id="site-menu"
            aria-label="Menü"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative border-b border-ivory/10 bg-void/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="px-5 py-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(item.id);
                    }}
                    className="block border-b border-ivory/8 py-4 text-[0.8125rem] font-bold tracking-[0.2em] text-ivory last:border-0"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/events"
                  className="block py-4 text-[0.8125rem] font-bold tracking-[0.2em] text-mute"
                >
                  ALLE EVENTS
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
