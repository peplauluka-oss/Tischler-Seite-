import ActSection from "@/components/story/ActSection";
import Keyvisual from "@/components/story/Keyvisual";
import { prozessSchritte } from "@/content/prozess";

/**
 * Akt 4 – PROZESS. Die holografischen CAD-Bemaßungslinien sind bewusst
 * DOM/SVG (kein Text im Canvas!) – Mono-Schrift, Technik-Petrol, sparsam.
 */
export default function ProzessSection() {
  return (
    <ActSection act="prozess" id="prozess" label="Akt 04 · Präzision" keyvisual={<Keyvisual variant="hobel" />}>
      <div className="max-w-xl rounded-2xl bg-wood-raw/85 p-6 shadow-sm backdrop-blur sm:p-8">
        <h2 className="font-display text-3xl font-bold tracking-tight text-wood-walnut sm:text-4xl">
          So läuft es bei uns
        </h2>

        {/* CAD-Bemaßung als grafisches Motiv (dekorativ) */}
        <svg viewBox="0 0 400 34" className="mt-4 w-full max-w-sm" aria-hidden="true">
          <line x1="8" y1="17" x2="392" y2="17" stroke="#1f7a72" strokeWidth="1" strokeDasharray="5 4" />
          <line x1="8" y1="9" x2="8" y2="25" stroke="#1f7a72" strokeWidth="1" />
          <line x1="392" y1="9" x2="392" y2="25" stroke="#1f7a72" strokeWidth="1" />
          <rect x="164" y="4" width="76" height="26" fill="#efe6d3" />
          <text x="202" y="21" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="#1f7a72">
            ± 0,5 mm
          </text>
        </svg>

        <ol className="mt-6 space-y-5">
          {prozessSchritte.map((s) => (
            <li key={s.nr} className="flex gap-4">
              <span className="mt-0.5 font-mono text-sm font-medium text-precision">{s.nr}</span>
              <div>
                <h3 className="font-display text-lg font-bold text-char">{s.titel}</h3>
                <p className="mt-1 text-sm leading-relaxed text-char/70">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </ActSection>
  );
}
