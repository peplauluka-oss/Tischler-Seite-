"use client";

import { useBooking } from "@/lib/booking";
import { scrollToSection } from "@/lib/scroll";

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 18 10"
      width="18"
      height="10"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 5h16M12 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/**
 * GÄSTELISTE — die Primäraktion der ganzen Seite.
 *
 * Sie ist die hellste Fläche im dunklen Raum und trägt als einzige einen
 * Schimmer aus dem Rot der Fassade. Kein zweiter Knopf auf der Seite sieht
 * so aus; daran erkennt man sie, ohne dass sie größer sein müsste.
 */
export function GuestlistButton({
  className = "",
  label = "GÄSTELISTE",
  eventSlug = null,
}: {
  className?: string;
  label?: string;
  eventSlug?: string | null;
}) {
  const { open } = useBooking();
  return (
    <button
      type="button"
      onClick={() => open("guestlist", eventSlug)}
      className={`cta cta-glow ${className}`}
    >
      {label}
      <Arrow />
    </button>
  );
}

/** TISCH — nachrangig: gleiche Form, aber nur Kontur statt Fläche. */
export function TableButton({
  className = "",
  label = "TISCH RESERVIEREN",
  eventSlug = null,
}: {
  className?: string;
  label?: string;
  eventSlug?: string | null;
}) {
  const { open } = useBooking();
  return (
    <button
      type="button"
      onClick={() => open("table", eventSlug)}
      className={`cta cta-ghost ${className}`}
    >
      {label}
      <Arrow />
    </button>
  );
}

/** Nachrangige Navigation — reine Typo mit Haarlinie, nie ein dritter Kasten. */
export function QuietLink({
  target,
  label,
  className = "",
}: {
  target: string;
  label: string;
  className?: string;
}) {
  return (
    <a
      href={`#${target}`}
      onClick={(e) => {
        e.preventDefault();
        scrollToSection(target);
      }}
      className={`cta-quiet ${className}`}
    >
      {label}
      <Arrow className="rotate-90" />
    </a>
  );
}
