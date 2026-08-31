"use client";

import { useEffect, useState } from "react";

export type CountdownStatus = "counting" | "live" | "ended";

export type Countdown = {
  /** Erst nach dem Mount true — davor rendern wir Platzhalter, damit
      Server- und Client-Markup identisch bleiben (keine Hydration-Warnung). */
  ready: boolean;
  status: CountdownStatus;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  /** true, sobald es weniger als 24 h sind — die UI wechselt dann den Ton. */
  isToday: boolean;
};

const pad = (n: number) => String(Math.max(0, Math.floor(n))).padStart(2, "0");

function compute(target: number, endsAfterHours: number): Omit<Countdown, "ready"> {
  const now = Date.now();
  const diff = target - now;
  const end = target + endsAfterHours * 3_600_000;

  if (diff <= 0) {
    return {
      status: now < end ? "live" : "ended",
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
      isToday: now < end,
    };
  }

  const s = diff / 1000;
  return {
    status: "counting",
    days: pad(s / 86400),
    hours: pad((s % 86400) / 3600),
    minutes: pad((s % 3600) / 60),
    seconds: pad(s % 60),
    isToday: diff < 86_400_000,
  };
}

/**
 * Live-Countdown auf einen ISO-Zeitpunkt. Läuft im Sekundentakt und wird
 * niemals negativ: nach dem Start „läuft gerade“, nach `endsAfterHours`
 * „Event beendet“.
 */
export function useCountdown(iso: string, endsAfterHours = 6): Countdown {
  const target = Date.parse(iso);
  const [state, setState] = useState<Countdown>({
    ready: false,
    status: "counting",
    days: "––",
    hours: "––",
    minutes: "––",
    seconds: "––",
    isToday: false,
  });

  useEffect(() => {
    if (Number.isNaN(target)) return;

    const tick = () => setState({ ready: true, ...compute(target, endsAfterHours) });
    tick();

    // Auf die volle Sekunde einschwingen, damit der Sekundenwert nicht springt.
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      tick();
      interval = setInterval(tick, 1000);
    }, 1000 - (Date.now() % 1000));

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [target, endsAfterHours]);

  return state;
}
