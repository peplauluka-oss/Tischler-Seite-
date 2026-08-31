import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum der Hobbytischlerei Berlin.",
  alternates: { canonical: "/impressum" },
  robots: { index: false },
};

/**
 * ⚠️ Strukturierte Platzhalter nach § 5 TMG / § 18 MStV.
 * Die Inhalte liefert der Kunde bzw. dessen Anwalt –
 * hier werden KEINE Rechtstexte erfunden.
 */
export default function ImpressumPage() {
  return (
    <PageShell
      label="Rechtliches"
      title="Impressum"
      intro="Angaben gemäß § 5 TMG."
    >
      <div className="max-w-2xl space-y-8 text-sm leading-relaxed text-char/80">
        <section>
          <h2 className="font-display text-lg font-bold text-char">Anbieter</h2>
          <p className="mt-2">
            [PLATZHALTER: Vollständiger Firmenname &amp; Rechtsform]
            <br />
            Alt-Kaulsdorf 52
            <br />
            12621 Berlin
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-char">Vertreten durch</h2>
          <p className="mt-2">[PLATZHALTER: Inhaber/Geschäftsführung]</p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-char">Kontakt</h2>
          <p className="mt-2">
            Telefon: +49 30 74 76 92 40
            <br />
            E-Mail: service@hobbytischlerei.de
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-char">Registereintrag &amp; Umsatzsteuer</h2>
          <p className="mt-2">
            [PLATZHALTER: Handelsregister / Handwerksrolle, Registernummer]
            <br />
            [PLATZHALTER: USt-IdNr. gemäß § 27a UStG]
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-char">Aufsichtsbehörde / Kammer</h2>
          <p className="mt-2">[PLATZHALTER: zuständige Handwerkskammer]</p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-char">
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
          </h2>
          <p className="mt-2">[PLATZHALTER: Name, Anschrift]</p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-char">Streitschlichtung</h2>
          <p className="mt-2">[PLATZHALTER: Hinweis zur EU-Streitschlichtung / Verbraucherschlichtungsstelle – vom Anwalt liefern lassen]</p>
        </section>
      </div>
    </PageShell>
  );
}
