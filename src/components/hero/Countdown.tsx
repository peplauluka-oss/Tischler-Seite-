"use client";

import { event } from "@/content/event";
import { useCountdown } from "@/lib/useCountdown";

const UNITS = [
  { key: "days", unit: "TAGE" },
  { key: "hours", unit: "STD" },
  { key: "minutes", unit: "MIN" },
] as const;

/**
 * Live-Countdown ohne Kästen und ohne Monospace: eine Zeile Plakatziffern.
 * Er soll zeitlich orientieren und Druck aufbauen, nicht die Bühne des
 * Headliners übernehmen. Sekunden fehlen bewusst — ein tickender
 * Sekundenzähler wirkt nach Dashboard, nicht nach Nacht.
 */
export default function Countdown({
  className = "",
  size = "sm",
}: {
  className?: string;
  size?: "sm" | "lg" | "hero";
}) {
  const cd = useCountdown(event.startsAt, event.endsAfterHours);

  const numberSize =
    size === "hero"
      ? "text-[4.5rem] md:text-[6rem]"
      : size === "lg"
        ? "text-[3.25rem] md:text-[4rem]"
        : "text-[2.25rem]";
  const label =
    cd.status === "live"
      ? "LÄUFT GERADE"
      : cd.status === "ended"
        ? "EVENT BEENDET"
        : cd.isToday
          ? "HEUTE NACHT"
          : "NOCH";

  /* Im Hero rahmt bereits „Nächste Nacht“ den Zähler — ein zweites
     Kleinlabel direkt darüber wäre doppelt gemoppelt. */
  const showLabel = size !== "hero" || cd.status !== "counting";

  return (
    <div className={className}>
      {showLabel && (
        <span className={`label ${cd.status === "live" ? "label-accent" : ""}`}>
          {label}
        </span>
      )}

      {cd.status === "counting" ? (
        <div className={`flex items-baseline ${size === "hero" ? "gap-6" : "mt-2 gap-5"}`} role="timer">
          {UNITS.map((u) => (
            <span key={u.key} className="flex items-baseline gap-1.5">
              <span className={`display leading-none text-ivory ${numberSize}`}>
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
            ? `Türen offen · ${event.dateShort}`
            : "Der nächste Termin wird angekündigt."}
        </p>
      )}

      <span className="sr-only">
        {cd.ready && cd.status === "counting"
          ? `Noch ${Number(cd.days)} Tage bis zum Event am ${event.dateLong}.`
          : ""}
      </span>
    </div>
  );
}
