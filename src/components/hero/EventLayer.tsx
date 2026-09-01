"use client";

import EventClip from "@/components/sections/EventClip";
import { ReserveButton } from "@/components/ui/Cta";
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
 * Die Komposition ist der Clip. Das Schwarz des Creatives läuft in die
 * Fläche des Viewports weiter — der Rand ist Teil des Bildes, kein Container.
 * Die Handlung sitzt unten im Schwarz und kommt später als der Clip: erst
 * Sinan, dann die Reservierung.
 */
export default function EventLayer({ active }: { active: boolean }) {
  return (
    <div
      data-event-layer
      className={`absolute inset-0 z-10 flex flex-col bg-black ${
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

      {/* Ein Hauch Gold aus dem Clip: Auf breiten Schirmen ist die Fläche
          neben dem Hochformat dadurch Teil der Komposition, nicht Leerraum. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(191,150,63,0.30) 0%, transparent 64%)",
        }}
      />

      <div className="relative min-h-0 flex-1">
        <EventClip active={active} />
      </div>

      <div
        data-event-cta
        className="relative z-10 flex shrink-0 flex-col items-center gap-2.5 px-5
                   pb-[max(1.1rem,env(safe-area-inset-bottom))] pt-3
                   md:flex-row md:justify-center md:gap-7 md:pb-7 md:pt-4"
      >
        <ReserveButton className="w-full sm:w-auto" />
        <span className="text-[0.625rem] font-bold tracking-[0.16em] text-mute">
          {event.admission.toUpperCase()} · {event.minAge}
        </span>
      </div>
    </div>
  );
}
