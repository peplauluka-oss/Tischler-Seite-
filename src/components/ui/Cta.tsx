"use client";

import { useReservation } from "@/lib/reservation";
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
 * Primäraktion der Seite. Bewusst kein rotes Rechteck: Die hellste Fläche
 * im dunklen Raum zieht den Blick, beim Hover kippt sie in das Rot der
 * Fassade. Es gibt pro Bildschirmbereich nur eine davon.
 */
export function ReserveButton({
  className = "",
  label = "TISCH RESERVIEREN",
}: {
  className?: string;
  label?: string;
}) {
  const { open } = useReservation();
  return (
    <button type="button" onClick={() => open()} className={`cta ${className}`}>
      {label}
      <Arrow />
    </button>
  );
}

/** Nachrangige Aktion — reine Typo mit Haarlinie, nie ein zweiter Kasten. */
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
