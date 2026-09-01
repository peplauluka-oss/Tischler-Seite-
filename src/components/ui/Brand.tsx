import Image from "next/image";
import { asset } from "@/lib/asset";

/* ---------------------------------------------------------------------------
   DIE WORTMARKE.

   Kein nachgebautes Zeichen mehr: Das Logo ist aus dem Event-Creative des
   Clubs extrahiert (BLACK + Schlangenkopf im Mäanderring + MEDUSA), auf
   Transparenz freigestellt und unverändert übernommen.

   Die native Breite beträgt 365 px. Deutlich darüber hinaus sollte es nicht
   skaliert werden — mehr Auflösung als das Ausgangsmaterial gibt es nicht.
--------------------------------------------------------------------------- */

const LOGO = { src: "/media/logo-black-medusa.png", width: 365, height: 66 };

export function Logo({
  width = 200,
  className = "",
  priority = false,
}: {
  width?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={asset(LOGO.src)}
      alt="Black Medusa"
      width={LOGO.width}
      height={LOGO.height}
      priority={priority}
      sizes={`${width}px`}
      className={className}
      style={{ width, height: "auto" }}
    />
  );
}

/** Wortmarke mit Ortszusatz — Fußzeile und Ankunftszustand des Hero. */
export function Wordmark({
  width = 220,
  className = "",
  priority = false,
}: {
  width?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <span className={`inline-flex flex-col items-center ${className}`}>
      <Logo width={width} priority={priority} />
      <span
        className="label mt-2.5 block text-[0.625rem]"
        style={{ letterSpacing: "0.42em" }}
      >
        BERLIN
      </span>
    </span>
  );
}

/** Feine Mäanderlinie als Sektionstrenner. */
export function MeanderRule({ className = "" }: { className?: string }) {
  return (
    <div
      className={`h-3 w-full opacity-25 ${className}`}
      aria-hidden="true"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='12' viewBox='0 0 24 12'%3E%3Cpath d='M0 11h22V1H6v7h10V4H10' fill='none' stroke='%23f2eee8' stroke-width='1'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat-x",
        backgroundSize: "24px 12px",
      }}
    />
  );
}
