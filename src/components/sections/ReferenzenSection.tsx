import ActSection from "@/components/story/ActSection";
import Keyvisual from "@/components/story/Keyvisual";
import ReferenzGalerie from "@/components/ReferenzGalerie";
import { kundenstimmen } from "@/content/referenzen";

/** Akt 5 – REFERENZEN, synchron zur Fügung des Tischs. */
export default function ReferenzenSection() {
  return (
    <ActSection act="referenzen" id="referenzen" label="Akt 05 · Die Fügung" keyvisual={<Keyvisual variant="fuegung" />}>
      <div className="rounded-2xl bg-wood-raw/85 p-6 shadow-sm backdrop-blur sm:p-8">
        <h2 className="font-display text-3xl font-bold tracking-tight text-wood-walnut sm:text-4xl">
          Aus unserer Werkstatt
        </h2>
        <ReferenzGalerie />
        <div className="mt-6 grid gap-4 border-t border-wood-walnut/15 pt-5 sm:grid-cols-2">
          {kundenstimmen.map((k, i) => (
            <blockquote key={i} className="text-sm italic leading-relaxed text-char/70">
              „{k.zitat}“
              <footer className="mt-1 font-mono text-[0.65rem] not-italic uppercase tracking-[0.15em] text-wood-walnut/70">
                — {k.name}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </ActSection>
  );
}
