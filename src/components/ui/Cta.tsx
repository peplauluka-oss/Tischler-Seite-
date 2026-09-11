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
      data-guestlist-cta
      onClick={() => open("guestlist", eventSlug)}
      className={`cta cta-glow ${className}`}
    >
      {label}
      <Arrow />
    </button>
  );
}

/**
 * TISCH — nachrangig: gleiche Form, aber nur Kontur statt Fläche.
 *
 * `filled` kehrt das im Tisch-Abschnitt um: Dort ist der Tisch die Handlung,
 * und die Gästeliste steht daneben als Zeile. Den Schimmer trägt sie trotzdem
 * nirgends — der bleibt der Primäraktion der Seite vorbehalten.
 */
export function TableButton({
  className = "",
  label = "TISCH RESERVIEREN",
  eventSlug = null,
  filled = false,
}: {
  className?: string;
  label?: string;
  eventSlug?: string | null;
  filled?: boolean;
}) {
  const { open } = useBooking();
  return (
    <button
      type="button"
      onClick={() => open("table", eventSlug)}
      className={`cta ${filled ? "" : "cta-ghost"} ${className}`}
    >
      {label}
      <Arrow />
    </button>
  );
}

/** Tisch als Zeile — im Hero, wo zwei gleich schwere Knöpfe nebeneinander
    wie ein Formular aussähen statt wie der Anfang einer Nacht. */
export function TableLink({
  className = "",
  label = "Tisch reservieren",
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
      className={`cta-quiet ${className}`}
    >
      {label}
      <Arrow />
    </button>
  );
}

/** Gästeliste als Zeile — dort, wo sie nicht die Hauptsache ist. */
export function GuestlistLink({
  className = "",
  label = "Nur auf die Gästeliste",
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
      className={`cta-quiet ${className}`}
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
