"use client";

import EventClip from "@/components/sections/EventClip";
import {
  eventDate,
  eventFullTitle,
  type MedusaEvent,
} from "@/content/events";

/**
 * DER EVENT-ZUSTAND DES HERO.
 *
 * Keine eigene Section: Diese Ebene liegt im selben Hero-Viewport wie das
 * Clubvideo, nur darunter. Die Hero-Welt verpufft beim Scrollen — und was
 * darunter zum Vorschein kommt, ist bereits fertig gezeichnet. Deshalb gibt
 * es zwischen beiden Zuständen keinen schwarzen Frame und keinen Sprung:
 * dieselbe Bühne, anderer Inhalt.
 *
 * Der Bildschirm gehört hier dem Artwork. Darüber steht nur, worauf man
 * schaut — zwei Worte im weichen Rand, die nichts verdecken.
 */
export default function EventLayer({
  event,
  upcoming,
  active,
}: {
  event: MedusaEvent;
  upcoming: boolean;
  active: boolean;
}) {
  const date = eventDate(event);

  return (
    <div
      data-event-layer
      className={`absolute inset-0 z-10 overflow-hidden bg-black ${
        active ? "" : "pointer-events-none"
      }`}
    >
      {/* Die vollständige Information einmal maschinenlesbar — ein Video ist
          für Screenreader und Suchmaschinen sonst stumm. */}
      <h2 className="sr-only">
        {eventFullTitle(event)} — {date.long}, Einlass {date.time} Uhr
      </h2>

      <EventClip artwork={event.artwork} active={active} />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center
                   px-5 pb-8 pt-[max(1.1rem,3.5svh)]"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,4,6,0.82) 0%, rgba(5,4,6,0.42) 45%, rgba(5,4,6,0) 100%)",
        }}
      >
        <span className="flex items-center gap-3">
          <span className="h-px w-6 bg-ember" />
          <span className="label" style={{ color: "var(--color-ivory)" }}>
            {upcoming ? "Next Event" : "Letzte Nacht"}
          </span>
        </span>
      </div>
    </div>
  );
}
