import Link from "next/link";
import ActSection from "@/components/story/ActSection";
import Keyvisual from "@/components/story/Keyvisual";
import { angebote } from "@/content/angebote";

/** Akt 3 – ANGEBOTE: die drei Conversion-Pfade, synchron zur Exploded View. */
export default function AngeboteSection() {
  return (
    <ActSection act="angebote" id="angebote" label="Akt 03 · Das Sägewerk" keyvisual={<Keyvisual variant="bretter" />}>
      <h2 className="font-display text-3xl font-bold tracking-tight text-wood-walnut sm:text-4xl">
        Drei Wege zu Ihrem Werkstück
      </h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {angebote.map((a) => (
          <article
            key={a.slug}
            className="flex flex-col rounded-2xl bg-wood-raw/85 p-6 shadow-sm backdrop-blur transition hover:shadow-md"
          >
            <h3 className="font-display text-xl font-bold text-char">{a.titel}</h3>
            <p className="mt-1 font-medium text-wood-walnut">{a.kurz}</p>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-char/70">{a.beschreibung}</p>
            <Link
              href={a.href}
              className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-char px-4 py-2 text-sm font-medium text-wood-raw transition hover:bg-wood-walnut"
            >
              {a.cta}
              <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </div>
      {/* Sekundäre Pfade – bewusst nicht gleichrangig */}
      <p className="mt-5 rounded-full bg-wood-oak/20 px-5 py-2.5 text-center text-sm text-char/70">
        Verschenken statt selber bauen?{" "}
        <Link href="/kontakt?anliegen=gutschein" className="font-medium text-wood-walnut underline underline-offset-2 hover:text-char">
          Gutscheine
        </Link>{" "}
        und exklusive Holzprodukte im{" "}
        <span className="font-medium">Onlineshop [PLATZHALTER: Link]</span>.
      </p>
    </ActSection>
  );
}
