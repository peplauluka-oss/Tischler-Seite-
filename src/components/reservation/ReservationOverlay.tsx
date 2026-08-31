"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ReservationForm from "@/components/reservation/ReservationForm";
import { MedusaMark } from "@/components/ui/Brand";
import { event } from "@/content/event";
import { club, images } from "@/content/club";
import { asset } from "@/lib/asset";
import { useReservation } from "@/lib/reservation";
import { lockScroll, unlockScroll } from "@/lib/scroll";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])';

/**
 * Fullscreen-Reservierung.
 *
 * Die Seite bleibt hinter dem Overlay sichtbar (abgedunkelt und unscharf) —
 * der Vorgang soll sich wie eine Schicht über Medusa anfühlen, nicht wie ein
 * fremdes Formular. Fokus bleibt gefangen, Escape schließt, der Seitenscroll
 * ist gesperrt.
 */
export default function ReservationOverlay() {
  const { isOpen, close, restoreFocus } = useReservation();
  const panel = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;

    lockScroll();
    // Fokus in den Dialog holen (Titelzeile, nicht das erste Eingabefeld —
    // so hören Screenreader zuerst, worum es geht).
    window.requestAnimationFrame(() => panel.current?.focus());

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;

      const items = Array.from(
        panel.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && (active === first || active === panel.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      unlockScroll();
      restoreFocus();
    };
  }, [isOpen, close, restoreFocus]);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-200 flex items-stretch justify-center md:items-center md:p-8"
          initial={reduced ? { opacity: 0 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease }}
        >
          {/* Hintergrund: Seite bleibt sichtbar, tritt aber zurück. */}
          <button
            type="button"
            aria-label="Reservierung schließen"
            onClick={close}
            className="absolute inset-0 cursor-default bg-void/88 backdrop-blur-[14px]"
          />

          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="reservation-title"
            tabIndex={-1}
            initial={reduced ? false : { opacity: 0, y: 28, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.995 }}
            transition={{ duration: 0.45, ease }}
            className="relative flex h-full w-full max-w-5xl flex-col overflow-hidden border-ivory/12 bg-ink outline-none md:h-auto md:max-h-[88svh] md:flex-row md:border"
          >
            {/* Kontextspalte — zeigt, wofür reserviert wird. */}
            <aside className="relative hidden w-[38%] shrink-0 md:block">
              <Image
                src={asset(images.sitzbereich.src)}
                alt={images.sitzbereich.alt}
                fill
                sizes="38vw"
                className="graded-strong object-cover"
                placeholder="blur"
                blurDataURL={images.sitzbereich.lqip}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(5,4,6,0.55) 0%, rgba(5,4,6,0.35) 40%, rgba(5,4,6,0.95) 100%)",
                }}
              />
              <div className="relative flex h-full flex-col justify-between p-8">
                <MedusaMark size={34} className="text-ivory" />
                <div>
                  <span className="font-mono text-[0.625rem] tracking-[0.3em] text-ember-soft">
                    {event.role}
                  </span>
                  <p
                    className="display mt-2 text-ivory"
                    style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)" }}
                  >
                    {event.headliner}
                  </p>
                  <p className="mt-3 font-mono text-[0.625rem] leading-relaxed tracking-[0.18em] text-mute">
                    {event.dateShort}
                    <br />
                    EINLASS {event.doors} UHR
                    <br />
                    {club.name} · {club.city}
                  </p>
                </div>
              </div>
            </aside>

            {/* Formularspalte */}
            <div className="flex min-h-0 flex-1 flex-col">
              <header className="flex items-start justify-between gap-6 border-b border-ivory/10 p-6 md:p-8">
                <div>
                  <span className="eyebrow text-[0.5625rem]">RESERVIERUNG</span>
                  <h2
                    id="reservation-title"
                    className="display mt-2 text-ivory"
                    style={{ fontSize: "clamp(1.75rem, 3.4vw, 2.5rem)" }}
                  >
                    TISCH RESERVIEREN
                  </h2>
                  <p className="mt-2 font-mono text-[0.5625rem] tracking-[0.2em] text-mute md:hidden">
                    {event.headliner} · {event.dateShort} · EINLASS {event.doors}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={close}
                  className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center text-mute transition-colors hover:text-ivory"
                >
                  <span className="sr-only">Schließen</span>
                  <svg viewBox="0 0 18 18" width="16" height="16" aria-hidden="true">
                    <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
              </header>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pt-6 md:px-8 md:pt-8">
                <ReservationForm onClose={close} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
