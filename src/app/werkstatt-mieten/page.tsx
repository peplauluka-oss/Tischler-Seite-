import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Holzwerkstatt mieten in Berlin – mit oder ohne Maschinennutzung",
  description:
    "Werkstatt mieten in Berlin: Voll ausgestattete Holzwerkstatt in Kaulsdorf stundenweise nutzen – mit oder ohne Maschinen. Ideal für eigene Möbelprojekte.",
  alternates: { canonical: "/werkstatt-mieten" },
};

export default function WerkstattMietenPage() {
  return (
    <PageShell
      label="Mietwerkstatt"
      title="Holzwerkstatt mieten in Berlin: Ihr Projekt, unsere Maschinen"
      intro="Sie haben ein Projekt im Kopf, aber keinen Platz, keine Maschinen oder beides nicht? Mieten Sie unsere Werkstatt in Berlin-Kaulsdorf – wahlweise mit Maschinennutzung und fachlichem Rat nebenan."
      ctaHref="/kontakt?anliegen=werkstattmiete"
      ctaText="Verfügbarkeit anfragen"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-wood-oak/15 p-6">
          <h2 className="font-display text-xl font-bold text-char">Werkbank ohne Maschinen</h2>
          <p className="mt-2 text-sm leading-relaxed text-char/70">
            Ein fester Arbeitsplatz mit Werkbank und Handwerkzeug – für
            alle Arbeiten, die Ruhe und Platz brauchen: Verleimen,
            Schleifen, Oberflächenbehandlung.
          </p>
          <p className="mt-3 font-mono text-xs text-char/50">
            [PLATZHALTER: Konditionen &amp; Preise]
          </p>
        </div>
        <div className="rounded-2xl bg-wood-oak/15 p-6">
          <h2 className="font-display text-xl font-bold text-char">Mit Maschinennutzung</h2>
          <p className="mt-2 text-sm leading-relaxed text-char/70">
            Zugang zum Maschinenpark nach kurzer Einweisung:
            Formatkreissäge, Abricht- und Dickenhobel, Bandschleifer und
            mehr. [PLATZHALTER: Maschinenliste &amp; Voraussetzungen]
          </p>
          <p className="mt-3 font-mono text-xs text-char/50">
            [PLATZHALTER: Konditionen &amp; Preise]
          </p>
        </div>
      </div>
      <p className="mt-8 text-sm leading-relaxed text-char/60">
        Sie sind unsicher, ob Ihr Vorhaben in die Mietwerkstatt passt?
        Rufen Sie uns an oder schreiben Sie uns – wir sagen ehrlich, was
        geht, und empfehlen im Zweifel den passenden Kurs als Einstieg.
      </p>
    </PageShell>
  );
}
