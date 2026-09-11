"use client";

import { eventDate, type MedusaEvent } from "@/content/events";
import { useCountdown } from "@/lib/useCountdown";

const UNITS = [
  { key: "days", unit: "TAGE" },
  { key: "hours", unit: "STD" },
  { key: "minutes", unit: "MIN" },
] as const;

/**
 * Der Countdown ist ein Lebenszeichen, keine Bühne.
 *
 * Er sagt, dass gleich etwas passiert — deshalb steht er klein und nie über
 * dem Namen der Nacht. Sekunden fehlen bewusst: Ein tickender Sekundenzähler
 * wirkt nach Dashboard, nicht nach Nacht.
 */
export default function Countdown({
  event,
  className = "",
}: {
  event: MedusaEvent;
  className?: string;
}) {
  const cd = useCountdown(event.entryAt, event.endsAfterHours);
  const date = eventDate(event);

  /* Vor dem ersten Tick auf dem Client steht noch keine Zahl fest. Ein
     Platzhalter wie „–– TAGE“ wäre ein kaputter Zustand, also steht dort
     nichts — der Zähler erscheint eine Bildwiederholung später. */
  if (!cd.ready) return null;

  const label =
    cd.status === "live"
      ? "GOING ON NOW"
      : cd.status === "ended"
        ? "VORBEI"
        : cd.isToday
          ? "STARTS TONIGHT"
          : "STARTS IN";

  return (
    <div className={className}>
      <span className={`label ${cd.status === "live" ? "label-accent" : ""}`}>
        {label}
      </span>

      {cd.status === "counting" ? (
        <div className="mt-2 flex items-baseline gap-5" role="timer">
          {UNITS.map((u) => (
            <span key={u.key} className="flex items-baseline gap-1.5">
              <span className="display text-[2.25rem] leading-none text-ivory">
                {cd[u.key]}
              </span>
              <span className="text-[0.625rem] font-bold tracking-[0.18em] text-mute">
                {u.unit}
              </span>
            </span>
          ))}
        </div>
      ) : (
        <p className="mt-2 text-sm text-mute">
          {cd.status === "live"
            ? `Türen offen seit ${date.time}`
            : "Der nächste Termin wird angekündigt."}
        </p>
      )}

      <span className="sr-only">
        {cd.ready && cd.status === "counting"
          ? `Noch ${Number(cd.days)} Tage bis zum Einlass am ${date.long}.`
          : ""}
      </span>
    </div>
  );
}
