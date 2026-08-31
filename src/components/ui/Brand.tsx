/* ---------------------------------------------------------------------------
   Markenzeichen.

   Hinweis für die Übergabe: Das Haus führt ein Medusa-Signet im griechischen
   Mäanderring (siehe Fotomaterial). Bis die Originaldatei des Betreibers
   vorliegt, steht hier ein eigenes Zeichen aus demselben Formenkanon —
   Mäanderring + Monogramm. Austausch = nur diese Datei.
--------------------------------------------------------------------------- */

/** Ein Mäander-Element (griechischer Schlüssel), das rund um den Ring rotiert. */
const KEY_UNIT = "M -5.4 4.6 v -6.2 h 8.2 v 4.2 h -4.4 v -2 h 2.4";

export function MedusaMark({
  className = "",
  size = 40,
}: {
  className?: string;
  size?: number;
}) {
  const units = 22;
  return (
    <svg
      viewBox="-50 -50 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle r="45.5" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.9" />
      <circle r="30" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      <g stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="square">
        {Array.from({ length: units }, (_, i) => (
          <g key={i} transform={`rotate(${(360 / units) * i}) translate(0 -38)`}>
            <path d={KEY_UNIT} />
          </g>
        ))}
      </g>
      <text
        x="0"
        y="9"
        textAnchor="middle"
        fill="currentColor"
        fontSize="30"
        fontFamily="var(--font-display)"
        fontWeight="600"
        letterSpacing="0.5"
      >
        M
      </text>
    </svg>
  );
}

/** Volle Wortmarke — Hero-Brandingleiste und Footer. */
export function Wordmark({
  className = "",
  markSize = 44,
  stacked = false,
}: {
  className?: string;
  markSize?: number;
  stacked?: boolean;
}) {
  return (
    <span
      className={`flex items-center ${stacked ? "flex-col gap-4" : "gap-3 sm:gap-4"} ${className}`}
    >
      <MedusaMark size={markSize} className="shrink-0 text-ivory" />
      <span className={stacked ? "text-center" : ""}>
        <span
          className="display block text-ivory"
          style={{ letterSpacing: "0.22em", lineHeight: 1 }}
        >
          BLACK MEDUSA
        </span>
        <span className="label mt-1.5 block text-[0.625rem]" style={{ letterSpacing: "0.42em" }}>
          BERLIN
        </span>
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
