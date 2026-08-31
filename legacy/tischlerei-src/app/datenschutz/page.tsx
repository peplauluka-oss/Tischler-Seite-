import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung der Hobbytischlerei Berlin.",
  alternates: { canonical: "/datenschutz" },
  robots: { index: false },
};

/**
 * ⚠️ Strukturierte Platzhalter nach DSGVO.
 * Die verbindlichen Texte liefert der Kunde bzw. dessen
 * Datenschutzbeauftragter/Anwalt – hier werden KEINE Rechtstexte erfunden.
 *
 * Technischer Ist-Zustand der Website (für die Erklärung relevant):
 *  - Kontaktformular (Name, E-Mail, optional Telefon, Anliegen, Nachricht)
 *  - Google-Maps-Einbindung erst nach aktiver Einwilligung (Zwei-Klick)
 *  - Google Fonts werden zur Build-Zeit geladen und vom eigenen Server
 *    ausgeliefert (kein Request an Google zur Laufzeit)
 *  - keine Tracking- oder Analyse-Tools, keine Marketing-Cookies
 */
export default function DatenschutzPage() {
  return (
    <PageShell
      label="Rechtliches"
      title="Datenschutzerklärung"
      intro="Informationen zur Verarbeitung personenbezogener Daten gemäß Art. 13 DSGVO."
    >
      <div className="max-w-2xl space-y-8 text-sm leading-relaxed text-char/80">
        <section>
          <h2 className="font-display text-lg font-bold text-char">1. Verantwortlicher</h2>
          <p className="mt-2">[PLATZHALTER: Name &amp; Kontaktdaten des Verantwortlichen]</p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-char">2. Hosting</h2>
          <p className="mt-2">
            [PLATZHALTER: Angaben zum Hoster (geplant: Vercel Inc.) inkl.
            Server-Logfiles, Rechtsgrundlage Art. 6 Abs. 1 lit. f DSGVO]
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-char">3. Kontaktformular &amp; Kontaktaufnahme</h2>
          <p className="mt-2">
            [PLATZHALTER: Verarbeitung von Name, E-Mail, optional Telefon,
            Anliegen und Nachricht zur Bearbeitung der Anfrage;
            Rechtsgrundlage, Speicherdauer]
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-char">4. Google Maps (Zwei-Klick-Einbindung)</h2>
          <p className="mt-2">
            [PLATZHALTER: Die Karte wird erst nach aktiver Einwilligung
            geladen (Art. 6 Abs. 1 lit. a DSGVO); Datenübermittlung an
            Google beschreiben]
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-char">5. Ihre Rechte</h2>
          <p className="mt-2">
            [PLATZHALTER: Auskunft, Berichtigung, Löschung, Einschränkung,
            Datenübertragbarkeit, Widerspruch, Beschwerderecht bei der
            Aufsichtsbehörde]
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-char">6. Stand</h2>
          <p className="mt-2">[PLATZHALTER: Datum der letzten Aktualisierung]</p>
        </section>
      </div>
    </PageShell>
  );
}
