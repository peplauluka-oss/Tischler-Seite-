"use client";

import { useReservation } from "@/lib/reservation";
import { scrollToSection } from "@/lib/scroll";

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 10"
      width="16"
      height="10"
      className={`arrow ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0 5h14M10 1l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

/** Primäraktion der gesamten Seite: Tischreservierung öffnen. */
export function ReserveButton({
  className = "",
  label = "TISCH RESERVIEREN",
  compact = false,
}: {
  className?: string;
  label?: string;
  compact?: boolean;
}) {
  const { open } = useReservation();
  return (
    <button
      type="button"
      onClick={() => open()}
      className={`btn btn-primary ${compact ? "btn-compact" : ""} ${className}`}
    >
      {label}
      <Arrow />
    </button>
  );
}

/** Sekundäraktion: zu den Eventdetails führen. */
export function EventButton({
  className = "",
  label = "MEHR ÜBER DAS EVENT",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <a
      href="#events"
      onClick={(e) => {
        e.preventDefault();
        scrollToSection("events");
      }}
      className={`btn btn-ghost ${className}`}
    >
      {label}
      <Arrow className="rotate-90" />
    </a>
  );
}
