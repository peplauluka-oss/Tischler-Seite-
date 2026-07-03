import ActSection from "@/components/story/ActSection";
import Keyvisual from "@/components/story/Keyvisual";

/** Akt 2 – MATERIAL & WERKSTATT (synchron zum Laser-Schnitt in der Szene). */
export default function MaterialSection() {
  return (
    <ActSection act="material" id="material" label="Akt 02 · Der Schnitt" keyvisual={<Keyvisual variant="schnitt" />}>
      <div className="ml-auto max-w-md rounded-2xl bg-wood-raw/85 p-6 shadow-sm backdrop-blur sm:p-8">
        <h2 className="font-display text-3xl font-bold tracking-tight text-wood-walnut sm:text-4xl">
          Unser Material, unsere Werkstatt
        </h2>
        <p className="mt-4 text-char/80">
          Wir arbeiten mit massivem Holz – vor allem Eiche, Esche und
          Nussbaum. Jedes Brett wird bei uns von Hand ausgesucht, besäumt
          und gehobelt.
        </p>
        <p className="mt-3 text-char/80">
          Unser Maschinenpark in Berlin-Kaulsdorf steht Kursen,
          Mietwerkstatt und Auftragsfertigung gleichermaßen zur
          Verfügung: Formatkreissäge, Abricht- und Dickenhobel,
          Bandschleifer und mehr. [PLATZHALTER: Maschinenliste mit Kunde
          abstimmen]
        </p>
        <div className="mt-5 flex h-32 items-center justify-center rounded-xl border border-dashed border-wood-walnut/30 bg-wood-oak/10 font-mono text-xs text-wood-walnut/60">
          [PLATZHALTER: Werkstattfoto]
        </div>
      </div>
    </ActSection>
  );
}
