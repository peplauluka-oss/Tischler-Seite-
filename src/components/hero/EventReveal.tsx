"use client";

import Countdown from "@/components/hero/Countdown";
import { QuietLink, ReserveButton } from "@/components/ui/Cta";
import { event } from "@/content/event";
import { club } from "@/content/club";

/**
 * Der Hero-Abschluss — Kampagne statt Datenblatt.
 *
 * Die erste Fassung stapelte hier Fließtext, ein Vier-Felder-Raster und zwei
 * gleich laute Knöpfe. Übrig bleibt, was eine Entscheidung trägt: wer,
 * wann, wie lange noch, und eine Aktion. Alles Weitere steht auf der
 * Event-Bühne direkt darunter.
 */
export default function EventReveal() {
  return (
    <div className="w-full max-w-[36rem]">
      <div data-reveal="label" className="hero-reveal flex items-center gap-3">
        <span className="h-px w-7 bg-ember" aria-hidden="true" />
        <span className="label label-accent">{event.role}</span>
      </div>

      <h1
        data-reveal="title"
        className="display mt-4 text-ivory"
        style={{ fontSize: "clamp(4.5rem, 17vw, 14rem)" }}
      >
        <span className="hero-reveal block overflow-hidden pb-[0.06em]">
          <span data-reveal="title-inner" className="block">
            {event.headliner}
          </span>
        </span>
      </h1>

      {/* Eine Zeile Eckdaten statt eines Rasters aus Feldern. */}
      <p
        data-reveal="meta"
        className="hero-reveal mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8125rem] font-bold tracking-[0.14em] text-ivory"
      >
        <span>{event.dateShort}</span>
        <span className="text-ember" aria-hidden="true">
          ·
        </span>
        <span>EINLASS {event.doors}</span>
        <span className="text-ember" aria-hidden="true">
          ·
        </span>
        <span className="text-mute">{club.district.toUpperCase()}</span>
        <span className="text-[0.5625rem] tracking-[0.16em] text-ember-soft/85">
          TBC
        </span>
      </p>

      <div data-reveal="countdown" className="hero-reveal mt-8">
        <Countdown />
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
