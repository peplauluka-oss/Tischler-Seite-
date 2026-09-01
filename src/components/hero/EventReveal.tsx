"use client";

import { QuietLink, ReserveButton } from "@/components/ui/Cta";
import { club } from "@/content/club";

/**
 * Der Hero-Abschluss — Ort und Handlung, sonst nichts.
 *
 * Hier stand nacheinander das ganze Event, dann der Countdown, zuletzt die
 * große Wortmarke. Jedes Mal besetzte etwas anderes genau die Stelle, an der
 * der Sinan-Clip aufschlagen soll: Wer dort schon einen Auftritt gesehen hat,
 * erlebt den goldenen Impact danach nicht mehr als Ankündigung.
 *
 * Die Marke trägt oben die Brandbar und danach die Navigation. Der Hero
 * endet deshalb ruhig — der nächste visuelle Moment gehört ausschließlich
 * dem Event-Clip.
 */
export default function EventReveal() {
  return (
    <div className="w-full max-w-[36rem]">
      <div data-reveal="label" className="hero-reveal flex items-center gap-3">
        <span className="h-px w-7 bg-ember" aria-hidden="true" />
        <span className="label">
          {club.district} · {club.city}
        </span>
      </div>

      <div
        data-reveal="cta"
        className="hero-reveal mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8"
      >
        <ReserveButton className="w-full sm:w-auto" />
        <QuietLink target="event" label="Zum Event" />
      </div>
    </div>
  );
}
