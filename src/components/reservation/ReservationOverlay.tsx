"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ReservationFlow from "@/components/reservation/ReservationFlow";
import { Logo } from "@/components/ui/Brand";
import { useReservation } from "@/lib/reservation";
import { lockScroll, unlockScroll } from "@/lib/scroll";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])';

/**
 * Reservierung als Vollbild-Ebene.
 *
 * Auf dem Telefon ein echtes Sheet über die volle Höhe (dvh, damit die
 * Adressleiste nichts abschneidet) mit eigenem Scrollbereich — die alte
 * Fassung hatte hier ein Formular, das unter der Navigation lag. Auf großen
 * Schirmen eine ruhige Spalte über der abgedunkelten Seite.
 */
export default function ReservationOverlay() {
  const { isOpen, close, restoreFocus } = useReservation();
  const panel = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;
    lockScroll();
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
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panel.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
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
          className="fixed inset-0 z-200 flex justify-center md:items-center md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease }}
        >
          <button
            type="button"
            aria-label="Reservierung schließen"
            onClick={close}
            className="absolute inset-0 cursor-default bg-void/92 backdrop-blur-md"
          />

          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="reservation-title"
            tabIndex={-1}
            initial={reduced ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease }}
            className="relative flex h-[100dvh] w-full flex-col bg-void outline-none
                       md:h-auto md:max-h-[88svh] md:max-w-xl md:border md:border-ivory/12"
          >
            <header className="flex shrink-0 items-center justify-between gap-4 px-5 pt-5 md:px-10 md:pt-8">
              <span className="flex items-center gap-3">
                <Logo width={116} />
                <span id="reservation-title" className="label">
                  Tisch reservieren
                </span>
              </span>
              <button
                type="button"
                onClick={close}
                className="-mr-2 flex h-11 w-11 items-center justify-center text-mute transition-colors hover:text-ivory"
              >
                <span className="sr-only">Schließen</span>
                <svg viewBox="0 0 18 18" width="16" height="16" aria-hidden="true">
                  <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </header>

            {/* Eigener Scrollbereich; unten Platz für die Home-Leiste des Telefons. */}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-8 md:px-10 md:pb-10">
              <ReservationFlow onClose={close} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
