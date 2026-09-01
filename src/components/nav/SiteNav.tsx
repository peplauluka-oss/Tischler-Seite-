"use client";

import { useEffect, useState } from "react";
import { navItems } from "@/content/club";
import { MedusaMark } from "@/components/ui/Brand";
import { ReserveButton } from "@/components/ui/Cta";
import { scrollToSection } from "@/lib/scroll";

/**
 * Navigation — bewusst klein gehalten.
 *
 * Auf dem Telefon gibt es kein Menü und keine Vollbild-Ebene mehr: Bei einer
 * Seite, die man ohnehin durchscrollt, ist ein Hamburger-Overlay nur eine
 * zusätzliche Hürde. Oben bleibt die Marke, die Reservierung sitzt unten in
 * Daumenreichweite (siehe ReserveDock). Auf großen Schirmen vier Ziele und
 * die Aktion.
 *
 * Sichtbarkeit steuert die Hero-Timeline über `data-nav-shell` — die Leiste
 * entsteht aus der Brandingleiste des Videos.
 */
export default function SiteNav() {
  const [active, setActive] = useState<string | null>(null);
  const [overEvent, setOverEvent] = useState(false);

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

  /* Während der Event-Clip den Bildschirm hat, tritt die Leiste zurück:
     Sie läge sonst über dem Logo im Creative und würde aus dem Moment
     wieder ein eingebettetes Video machen. Danach kommt sie zurück.
     Die Deckkraft liegt auf einer inneren Ebene — die äußere gehört der
     Hero-Timeline (GSAP), die hier nicht überschrieben werden darf. */
  useEffect(() => {
    const section = document.getElementById("event");
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOverEvent(entry.intersectionRatio > 0.5),
      { threshold: [0, 0.5, 0.75] },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      data-nav-shell
      className="hero-reveal fixed inset-x-0 top-0 z-100"
      style={{ willChange: "opacity, transform" }}
    >
      <div
        className={`transition-opacity duration-500 ${
          overEvent ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <div
          data-nav-bg
          className="absolute inset-0 border-b border-ivory/10 bg-void/70 backdrop-blur-xl"
        />

      <div className="relative mx-auto flex h-14 max-w-[1560px] items-center justify-between gap-6 px-5 md:h-[72px] md:px-8">
        <button
          type="button"
          onClick={() => scrollToSection("top")}
          className="flex items-center gap-3 text-ivory transition-opacity hover:opacity-70"
        >
          <MedusaMark size={24} />
          <span
            className="display text-[1.05rem] leading-none"
            style={{ letterSpacing: "0.14em" }}
          >
            BLACK MEDUSA
          </span>
          <span className="sr-only">Zum Seitenanfang</span>
        </button>

        <nav aria-label="Hauptnavigation" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
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

        <ReserveButton
          label="Tisch"
          className="hidden min-h-10 gap-3 px-4 py-2.5 text-[0.6875rem] md:inline-flex"
        />
      </div>
      </div>
    </header>
  );
}
