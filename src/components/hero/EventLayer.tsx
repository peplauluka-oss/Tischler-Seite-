"use client";

import EventClip from "@/components/sections/EventClip";
import { event } from "@/content/event";

/**
 * DER EVENT-ZUSTAND DES HERO.
 *
 * Keine eigene Section: Diese Ebene liegt im selben Hero-Viewport wie das
 * Clubvideo, nur darunter. Die Hero-Welt verpufft beim Scrollen — und was
 * darunter zum Vorschein kommt, ist bereits fertig gezeichnet. Deshalb gibt
 * es zwischen beiden Zuständen keinen schwarzen Frame, keine Lücke und
 * keinen Layoutsprung: Es ist dieselbe Bühne, nur ein anderer Inhalt.
 *
 * Der Bildschirm gehört hier ausschließlich dem Creative — kein Rahmen,
 * keine Leiste, keine Aktion daneben. Handlung und Countdown kommen eine
 * Scrollbewegung später.
 */
export default function EventLayer({ active }: { active: boolean }) {
  return (
    <div
      data-event-layer
      className={`absolute inset-0 z-10 overflow-hidden bg-black ${
        active ? "" : "pointer-events-none"
      }`}
    >
      {/* Die vollständige Information einmal maschinenlesbar — ein Video ist
          für Screenreader und Suchmaschinen sonst stumm. Sichtbar steht sie
          nirgends doppelt: Das Creative zeigt sie. */}
      <h2 className="sr-only">
        {event.title} — {event.role} {event.headliner}, {event.dateLong},
        Einlass {event.doors} Uhr
      </h2>

      <EventClip active={active} />
    </div>
  );
}
