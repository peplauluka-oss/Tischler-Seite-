"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navItems } from "@/content/club";
import { MedusaMark } from "@/components/ui/Brand";
import { ReserveButton } from "@/components/ui/Cta";
import { scrollToSection } from "@/lib/scroll";

/**
 * Permanente Navigation.
 *
 * Sie ist zu Beginn unsichtbar: Die Hero-Timeline blendet sie ein, während
 * die Brandingleiste verschwindet — deshalb die `data-nav-*`-Haken, die
 * `Hero.tsx` per GSAP anspricht. Ohne aktive Choreografie (kein JS,
 * reduzierte Bewegung) bleibt sie schlicht sichtbar.
 */
export default function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // Aktiver Abschnitt für die Navigation — ein Observer statt Scroll-Handler.
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

  // Menü schließt bei Escape und blockiert währenddessen nicht den Fokus.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <header
        data-nav-shell
        className="hero-reveal fixed inset-x-0 top-0 z-100"
        style={{ willChange: "opacity, transform" }}
      >
        <div
          data-nav-bg
          className="absolute inset-0 border-b border-ivory/10 bg-void/72 backdrop-blur-xl"
        />

        <div className="relative mx-auto flex h-16 max-w-[1560px] items-center justify-between gap-6 px-5 md:h-[74px] md:px-8">
          <button
            type="button"
            onClick={() => scrollToSection("top")}
            className="flex items-center gap-3 text-ivory transition-opacity hover:opacity-70"
          >
            <MedusaMark size={26} />
            <span
              className="display hidden text-[0.95rem] sm:block"
              style={{ letterSpacing: "0.26em" }}
            >
              BLACK MEDUSA
            </span>
            <span className="sr-only">Black Medusa Berlin — zum Seitenanfang</span>
          </button>

          <nav aria-label="Hauptnavigation" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(item.id);
                    }}
                    aria-current={active === item.id ? "true" : undefined}
                    className={`relative block py-2 text-[0.7rem] font-semibold tracking-[0.24em] transition-colors ${
                      active === item.id
                        ? "text-ivory"
                        : "text-mute hover:text-ivory"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px bg-ember transition-all duration-500 ${
                        active === item.id ? "w-full" : "w-0"
                      }`}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ReserveButton compact className="hidden sm:inline-flex" />

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex h-11 w-11 items-center justify-center text-ivory lg:hidden"
            >
              <span className="sr-only">Menü öffnen</span>
              <svg width="22" height="12" viewBox="0 0 22 12" aria-hidden="true">
                <path d="M0 1h22M0 11h16" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-110 bg-void/97 backdrop-blur-xl lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
          >
            <div className="flex h-16 items-center justify-between px-5">
              <MedusaMark size={26} className="text-ivory" />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex h-11 w-11 items-center justify-center text-ivory"
                autoFocus
              >
                <span className="sr-only">Menü schließen</span>
                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                  <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </button>
            </div>

            <nav aria-label="Hauptnavigation mobil" className="px-5 pt-6">
              <ul>
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
                    className="border-b border-ivory/10"
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        go(item.id);
                      }}
                      className="display block py-5 text-3xl text-ivory"
                      style={{ letterSpacing: "0.06em" }}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-9">
                <ReserveButton className="w-full" />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
