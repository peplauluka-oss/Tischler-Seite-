"use client";

import { Logo } from "@/components/ui/Brand";
import { QuietLink, ReserveButton } from "@/components/ui/Cta";
import { club } from "@/content/club";

/**
 * Der Hero-Abschluss — die Marke, sonst nichts.
 *
 * Hier stand zuletzt der Countdown und davor das ganze Event mit Name und
 * Datum. Beides nahm dem Creative den Auftritt weg: Wer schon gelesen hat,
 * wann Sinan spielt, erlebt den goldenen Impact danach nicht mehr als
 * Ankündigung. Der Hero liefert jetzt Atmosphäre und Marke, das Event
 * kommt eine Scrollbewegung später — und der Countdown erst dahinter.
 */
export default function EventReveal() {
  return (
    <div className="w-full max-w-[36rem]">
      <div data-reveal="title" className="mt-4">
        <span className="hero-reveal block overflow-hidden pb-[0.06em]">
          <span data-reveal="title-inner" className="block">
            <Logo width={300} className="max-w-full md:!w-[360px]" priority />
          </span>
        </span>
      </div>

      <div data-reveal="label" className="hero-reveal mt-5 flex items-center gap-3">
        <span className="h-px w-7 bg-ember" aria-hidden="true" />
        <span className="label">
          {club.district} · {club.city}
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
