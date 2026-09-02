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

      {/* Die Einordnung — mehr braucht es auf dem Plakat nicht. Sie sitzt im
          weichen Rand über dem Motiv, damit sie nichts verdeckt, und sagt in
          zwei Worten, was hier gerade den Bildschirm hat. Alles Weitere steht
          eine Scrollbewegung später in der Schrift der Seite. */}
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
            Nächste Nacht
          </span>
        </span>
      </div>
    </div>
  );
}
