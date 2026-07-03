import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Holzkurse in Berlin-Köpenick – Erlebniskurse der Hobbytischlerei",
  description:
    "Holzkurs in Berlin-Köpenick: Erlebniskurse für Holzbearbeitung am zweiten Standort der Hobbytischlerei Berlin – ideal als Geschenk oder Teamevent.",
  alternates: { canonical: "/holzkurse-koepenick" },
};

/** Bestehende Köpenick-Kursseite bleibt als eigene Route erhalten (SEO). */
export default function KoepenickPage() {
  return (
    <PageShell
      label="Standort Köpenick"
      title="Holzkurse in Berlin-Köpenick: Handwerk als Erlebnis"
      intro="Neben unserer Werkstatt in Kaulsdorf bieten wir ausgewählte Erlebniskurse in Berlin-Köpenick an: kompakte Holzkurse, in denen Sie an einem Termin ein eigenes Werkstück bauen – ideal auch als Geschenk oder Teamevent."
      ctaHref="/kontakt?anliegen=kurs"
      ctaText="Kurs in Köpenick anfragen"
    >
      <div className="space-y-6 text-char/80">
        <div className="rounded-2xl bg-wood-oak/15 p-6">
          <h2 className="font-display text-xl font-bold text-char">Erlebniskurs Köpenick</h2>
          <p className="mt-2 text-sm leading-relaxed">
            Holzbearbeitung zum Anfassen: Unter Anleitung entsteht in
            wenigen Stunden Ihr eigenes Stück aus massivem Holz.
            [PLATZHALTER: Kursinhalte, Adresse des Köpenicker Standorts,
            Termine &amp; Preise vom Kunden.]
          </p>
        </div>
        <p className="text-sm text-char/60">
          Alle weiteren Kurse finden in unserer Hauptwerkstatt in{" "}
          <Link href="/kurse" className="underline underline-offset-2 hover:text-char">
            Berlin-Kaulsdorf
          </Link>{" "}
          statt – gut erreichbar aus Köpenick, Marzahn und Hellersdorf.
        </p>
      </div>
    </PageShell>
  );
}
