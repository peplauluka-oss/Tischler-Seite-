/**
 * Statische Keyvisuals für die Fallback-Kaskade (reduced motion,
 * schwache Geräte ohne WebGL, kein JavaScript).
 *
 * Stilisierte SVG-Illustrationen in der Holz-Palette – dieselbe
 * „Editorial 3D“-Formsprache wie die echte Szene, nur eben still.
 * Kein externer Asset-Download nötig, alles inline.
 */
const OAK = "#c49a6c";
const WALNUT = "#5f4432";
const RAW = "#efe6d3";
const CHAR = "#201a13";
const PRECISION = "#1f7a72";

type Variant = "baum" | "schnitt" | "bretter" | "hobel" | "fuegung" | "tisch";

const labels: Record<Variant, string> = {
  baum: "Illustration: Ein stilisierter Eichenstamm im warmen Abendlicht",
  schnitt: "Illustration: Eine leuchtende Präzisions-Schnittlinie teilt den Stamm",
  bretter: "Illustration: Der Stamm zerfällt in schwebende Bretter mit Jahresringen",
  hobel: "Illustration: Ein Brett wird gehobelt und geschliffen, mit CAD-Bemaßung",
  fuegung: "Illustration: Bretter fügen sich zu einer Tischplatte zusammen",
  tisch: "Illustration: Der fertige Maßtisch aus massivem Holz",
};

export default function Keyvisual({ variant }: { variant: Variant }) {
  return (
    <svg
      viewBox="0 0 480 200"
      role="img"
      aria-label={labels[variant]}
      className="h-40 w-full max-w-md rounded-2xl bg-wood-walnut/10 sm:h-48"
    >
      {variant === "baum" && (
        <g>
          <ellipse cx="240" cy="180" rx="120" ry="10" fill={CHAR} opacity="0.15" />
          <rect x="215" y="30" width="50" height="150" rx="8" fill={WALNUT} />
          <rect x="222" y="30" width="10" height="150" rx="5" fill={OAK} opacity="0.5" />
          <rect x="248" y="40" width="42" height="12" rx="6" fill={WALNUT} transform="rotate(-28 248 46)" />
          <rect x="196" y="70" width="38" height="11" rx="5.5" fill={WALNUT} transform="rotate(206 214 75)" />
          <rect x="250" y="95" width="34" height="10" rx="5" fill={WALNUT} transform="rotate(-18 250 100)" />
          <circle cx="360" cy="55" r="26" fill={OAK} opacity="0.55" />
        </g>
      )}
      {variant === "schnitt" && (
        <g>
          <ellipse cx="240" cy="180" rx="120" ry="10" fill={CHAR} opacity="0.15" />
          <rect x="215" y="30" width="50" height="68" rx="8" fill={WALNUT} />
          <rect x="215" y="112" width="50" height="68" rx="8" fill={WALNUT} />
          <line x1="140" y1="105" x2="340" y2="105" stroke={PRECISION} strokeWidth="3" strokeLinecap="round" />
          <circle cx="340" cy="105" r="6" fill={PRECISION} />
          <circle cx="290" cy="90" r="2" fill={OAK} />
          <circle cx="305" cy="118" r="2.5" fill={OAK} />
          <circle cx="285" cy="130" r="1.5" fill={OAK} />
        </g>
      )}
      {variant === "bretter" && (
        <g>
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <rect
                x={120 + i * 8}
                y={35 + i * 30}
                width="220"
                height="16"
                rx="5"
                fill={i % 2 ? OAK : WALNUT}
                transform={`rotate(${i % 2 ? -2 : 2} 240 ${43 + i * 30})`}
              />
              <circle cx={352 + i * 8} cy={43 + i * 30} r="7" fill={RAW} stroke={WALNUT} strokeWidth="1.5" />
              <circle cx={352 + i * 8} cy={43 + i * 30} r="3.5" fill="none" stroke={WALNUT} strokeWidth="1" />
            </g>
          ))}
        </g>
      )}
      {variant === "hobel" && (
        <g>
          <rect x="100" y="90" width="280" height="26" rx="7" fill={OAK} />
          <rect x="100" y="90" width="150" height="26" rx="7" fill={WALNUT} opacity="0.35" />
          <line x1="250" y1="70" x2="250" y2="136" stroke={PRECISION} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="100" y1="55" x2="380" y2="55" stroke={PRECISION} strokeWidth="1" strokeDasharray="4 4" />
          <line x1="100" y1="48" x2="100" y2="62" stroke={PRECISION} strokeWidth="1" />
          <line x1="380" y1="48" x2="380" y2="62" stroke={PRECISION} strokeWidth="1" />
          <text x="228" y="44" fontFamily="monospace" fontSize="11" fill={PRECISION}>2400 mm</text>
          <circle cx="270" cy="80" r="1.5" fill={OAK} />
          <circle cx="285" cy="72" r="1.5" fill={OAK} />
          <circle cx="262" cy="65" r="1.5" fill={OAK} />
        </g>
      )}
      {variant === "fuegung" && (
        <g>
          <ellipse cx="240" cy="182" rx="130" ry="9" fill={CHAR} opacity="0.15" />
          <rect x="130" y="60" width="220" height="14" rx="4" fill={OAK} />
          <rect x="130" y="78" width="220" height="14" rx="4" fill={WALNUT} />
          <rect x="130" y="96" width="220" height="14" rx="4" fill={OAK} />
          <rect x="145" y="112" width="13" height="66" rx="4" fill={WALNUT} />
          <rect x="322" y="112" width="13" height="66" rx="4" fill={WALNUT} transform="rotate(8 328 145)" />
          <path d="M348 70 l16 -12" stroke={PRECISION} strokeWidth="2" strokeLinecap="round" />
          <circle cx="366" cy="56" r="3" fill={PRECISION} />
        </g>
      )}
      {variant === "tisch" && (
        <g>
          <ellipse cx="240" cy="182" rx="140" ry="9" fill={CHAR} opacity="0.18" />
          <rect x="110" y="86" width="260" height="18" rx="5" fill={OAK} />
          <rect x="110" y="86" width="260" height="6" rx="3" fill={RAW} opacity="0.35" />
          <rect x="128" y="104" width="14" height="74" rx="4" fill={WALNUT} />
          <rect x="338" y="104" width="14" height="74" rx="4" fill={WALNUT} />
          <path d="M150 78 q90 -30 180 0" stroke={RAW} strokeWidth="3" fill="none" opacity="0.7" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}
