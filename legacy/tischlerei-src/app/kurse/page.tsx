import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { kurse } from "@/content/kurse";
import { coursesJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Tischlerkurs Berlin – Holzbearbeitung lernen in Kaulsdorf",
  description:
    "Tischlerkurse und Holzkurse in Berlin: Holzbearbeitung lernen an echten Maschinen, angeleitet von Profis. Kurse in Kaulsdorf und Köpenick – auch als Geschenk.",
  alternates: { canonical: "/kurse" },
};

export default function KursePage() {
  return (
    <PageShell
      label="Kurse & Workshops"
      title="Tischlerkurs in Berlin: Holzbearbeitung lernen von Profis"
      intro="Vom ersten Sägeschnitt bis zum eigenen Möbelstück – in unserer Erlebniswerkstatt in Berlin-Kaulsdorf lernen Sie Holzbearbeitung an echten Maschinen. Ohne Vorkenntnisse, mit viel Holz unter den Händen."
      ctaHref="/kontakt?anliegen=kurs"
      ctaText="Kurs anfragen"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(coursesJsonLd()) }}
      />
      <h2 className="font-display text-2xl font-bold text-walnut">Unsere Kurse</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {kurse.map((k) => (
          <article key={k.titel} className="flex flex-col rounded-2xl bg-oak/15 p-6">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-precision">
              Standort {k.ort}
            </p>
            <h3 className="mt-2 font-display text-lg font-bold text-char">{k.titel}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-char/70">{k.beschreibung}</p>
            <dl className="mt-4 space-y-1 border-t border-walnut/15 pt-3 text-sm text-char/70">
              <div className="flex justify-between">
                <dt>Dauer</dt>
                <dd className="font-mono text-xs">{k.dauer}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Preis</dt>
                <dd className="font-mono text-xs">{k.preis}</dd>
              </div>
            </dl>
            <Link
              href="/kontakt?anliegen=kurs"
              className="mt-4 inline-block w-fit rounded-full bg-char px-4 py-2 text-sm font-medium text-cream transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-walnut active:scale-[0.97] active:duration-150"
            >
              Termin anfragen
            </Link>
          </article>
        ))}
      </div>
      <p className="mt-8 text-sm text-char/60">
        [PLATZHALTER: Vollständige Kursliste mit Terminen &amp; Preisen vom
        Kunden.] Erlebniskurse bieten wir auch in{" "}
        <Link href="/holzkurse-koepenick" className="underline underline-offset-2 hover:text-char">
          Berlin-Köpenick
        </Link>{" "}
        an. Kurse lassen sich als{" "}
        <Link href="/kontakt?anliegen=gutschein" className="underline underline-offset-2 hover:text-char">
          Gutschein verschenken
        </Link>
        .
      </p>
    </PageShell>
  );
}
