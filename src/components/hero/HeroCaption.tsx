"use client";

import { ReserveButton } from "@/components/ui/Cta";
import { club } from "@/content/club";
import { event } from "@/content/event";

/**
 * Die Bildunterschrift des Hero — Ort, sonst nichts.
 *
 * Hier standen nacheinander das ganze Event, ein Countdown und zuletzt die
 * große Wortmarke. Jedes davon besetzte die Stelle, an der sich der Hero in
 * das Event verwandelt. Der Hero trägt jetzt nur noch, wo wir sind; die
 * Handlung gehört dem Event-Zustand.
 *
 * Nur wenn gerade kein Termin ansteht, gibt es hier eine Aktion — sonst
 * bliebe der Hero ohne jede.
 */
export default function HeroCaption() {
  return (
    <div className="w-full max-w-[36rem]">
      <div data-reveal="caption" className="hero-reveal flex items-center gap-3">
        <span className="h-px w-7 bg-ember" aria-hidden="true" />
        <span className="label">
          {club.district} · {club.city}
        </span>
      </div>

      {!event.active && (
        <div data-reveal="caption" className="hero-reveal mt-7">
          <ReserveButton className="w-full sm:w-auto" />
        </div>
      )}
    </div>
  );
}
