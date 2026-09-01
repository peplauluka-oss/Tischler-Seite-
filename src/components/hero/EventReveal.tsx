"use client";

import Countdown from "@/components/hero/Countdown";
import { QuietLink, ReserveButton } from "@/components/ui/Cta";

/**
 * Der Hero-Abschluss — Erwartung, nicht Ankündigung.
 *
 * Bis V3 stand hier das Event mit Name, Datum, Einlass und Ort. Genau das
 * zeigt jetzt das Creative direkt darunter — und zwar besser. Zweimal
 * dasselbe wäre eine doppelte Informationshierarchie.
 *
 * Übrig bleibt, was das Creative NICHT leisten kann: der laufende Countdown
 * als Spannung und der Weg zur Handlung. Wer das Event sehen will, scrollt
 * eine Bewegung weiter — und bekommt den goldenen Impact.
 */
export default function EventReveal() {
  return (
    <div className="w-full max-w-[36rem]">
      <div data-reveal="label" className="hero-reveal flex items-center gap-3">
        <span className="h-px w-7 bg-ember" aria-hidden="true" />
        <span className="label label-accent">Nächste Nacht</span>
      </div>

      {/* Der Countdown übernimmt die Bühne, die vorher der Eventname hatte. */}
      <div data-reveal="title" className="mt-4">
        <span className="hero-reveal block overflow-hidden pb-[0.06em]">
          <span data-reveal="title-inner" className="block">
            <Countdown size="hero" />
          </span>
        </span>
      </div>

      <div
        data-reveal="cta"
        className="hero-reveal mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8"
      >
        <ReserveButton className="w-full sm:w-auto" />
        <QuietLink target="event" label="Zum Event" />
      </div>
    </div>
  );
}
