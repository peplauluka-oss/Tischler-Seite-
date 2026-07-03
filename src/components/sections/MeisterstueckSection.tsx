import Link from "next/link";
import ActSection from "@/components/story/ActSection";
import Keyvisual from "@/components/story/Keyvisual";

/** Akt 6 – Die Doppel-Pointe: bestellen ODER selbst bauen. */
export default function MeisterstueckSection() {
  return (
    <ActSection act="meisterstueck" id="meisterstueck" label="Akt 06 · Das Meisterstück" keyvisual={<Keyvisual variant="tisch" />}>
      <div className="max-w-2xl">
        <h2 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-char sm:text-5xl">
          Bestellen Sie Ihr Maßstück — oder bauen Sie es selbst bei uns.
        </h2>
        <p className="mt-4 max-w-lg text-lg text-char/70">
          Beides beginnt mit einer kurzen Nachricht. Wir melden uns und
          besprechen, wie Ihr Werkstück entsteht.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="#kontakt"
            data-anliegen="auftrag"
            className="rounded-full bg-char px-6 py-3 font-medium text-wood-raw transition hover:bg-wood-walnut"
          >
            Projekt anfragen
          </Link>
          <Link
            href="#kontakt"
            data-anliegen="kurs"
            className="rounded-full border-2 border-char px-6 py-3 font-medium text-char transition hover:bg-char hover:text-wood-raw"
          >
            Kurs buchen
          </Link>
        </div>
      </div>
    </ActSection>
  );
}
