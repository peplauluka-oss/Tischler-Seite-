"use client";

import { event } from "@/content/event";
import { useCountdown } from "@/lib/useCountdown";

const UNITS = [
  { key: "days", suffix: "T" },
  { key: "hours", suffix: "H" },
  { key: "minutes", suffix: "M" },
  { key: "seconds", suffix: "S" },
] as const;

/**
 * Kompakter Live-Countdown.
 *
 * Bewusst klein gehalten: Er soll zeitlich orientieren und Druck erzeugen,
 * aber nicht die Bühne des Headliners übernehmen. Nach dem Start wechselt er
 * in „läuft gerade“, danach in „Event beendet“ — nie negative Zahlen.
 */
export default function Countdown({ className = "" }: { className?: string }) {
  const cd = useCountdown(event.startsAt, event.endsAfterHours);

  const label =
    cd.status === "live"
      ? "LÄUFT GERADE"
      : cd.status === "ended"
        ? "EVENT BEENDET"
        : cd.isToday
          ? "HEUTE NACHT — START IN"
          : "EVENT STARTET IN";

  return (
    <div className={className}>
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className={`h-1.5 w-1.5 rounded-full ${
            cd.status === "ended" ? "bg-mute" : "bg-ember"
          } ${cd.status === "live" ? "animate-pulse" : ""}`}
        />
        <span className="eyebrow">{label}</span>
      </div>

      {cd.status === "counting" ? (
        <div
          className="mt-3 inline-flex items-stretch border border-ivory/12 bg-ivory/[0.03]"
          role="timer"
          aria-live="off"
        >
          {UNITS.map((unit, i) => (
            <div
              key={unit.key}
              className={`flex items-baseline gap-1 px-3.5 py-2.5 sm:px-4 ${
                i > 0 ? "border-l border-ivory/10" : ""
              }`}
            >
              <span
                className="font-mono text-xl leading-none tabular-nums text-ivory sm:text-[1.35rem]"
                style={{ letterSpacing: "0.02em" }}
              >
                {cd[unit.key]}
              </span>
              <span className="font-mono text-[0.625rem] leading-none text-mute">
                {unit.suffix}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-3 font-mono text-sm tracking-[0.16em] text-ivory">
          {cd.status === "live"
            ? `TÜREN OFFEN · ${event.dateShort}`
            : "NÄCHSTER TERMIN WIRD ANGEKÜNDIGT"}
        </p>
      )}

      {/* Für Screenreader: eine ruhige Textfassung statt tickernder Zahlen. */}
      <span className="sr-only">
        {cd.ready && cd.status === "counting"
          ? `Noch ${Number(cd.days)} Tage bis zum Event am ${event.dateLong}.`
          : ""}
      </span>
    </div>
  );
}
