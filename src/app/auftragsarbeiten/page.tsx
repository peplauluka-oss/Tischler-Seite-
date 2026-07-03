import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { prozessSchritte } from "@/content/prozess";

export const metadata: Metadata = {
  title: "Möbel nach Maß aus Berlin – Auftragstischlerei in Kaulsdorf",
  description:
    "Möbel nach Maß, Reparaturen und Sonderanfertigungen: Die Auftragstischlerei der Hobbytischlerei Berlin fertigt Ihr Werkstück aus massivem Holz – millimetergenau.",
  alternates: { canonical: "/auftragsarbeiten" },
};

export default function AuftragsarbeitenPage() {
  return (
    <PageShell
      label="Auftragsarbeiten"
      title="Möbel nach Maß in Berlin: Wir bauen es für Sie"
      intro="Esstisch, Regal, Einbaulösung oder die Reparatur eines geliebten Stücks: Wir planen und fertigen in unserer Werkstatt in Berlin-Kaulsdorf – aus massivem Holz, millimetergenau, mit ehrlicher Beratung."
      ctaHref="/kontakt?anliegen=auftrag"
      ctaText="Projekt anfragen"
    >
      <h2 className="font-display text-2xl font-bold text-walnut">Vom Anruf zum Möbelstück</h2>
      <ol className="mt-6 grid gap-4 md:grid-cols-4">
        {prozessSchritte.map((s) => (
          <li key={s.nr} className="rounded-2xl bg-oak/15 p-5">
            <span className="font-mono text-sm font-medium text-precision">{s.nr}</span>
            <h3 className="mt-2 font-display text-lg font-bold text-char">{s.titel}</h3>
            <p className="mt-1 text-sm leading-relaxed text-char/70">{s.text}</p>
          </li>
        ))}
      </ol>
      <div className="mt-10 rounded-2xl bg-walnut p-6 text-cream sm:p-8">
        <h2 className="font-display text-xl font-bold">Was wir fertigen</h2>
        <ul className="mt-3 grid gap-2 text-sm text-cream/80 sm:grid-cols-2">
          <li>· Tische, Regale &amp; Einzelmöbel nach Maß</li>
          <li>· Einbauten für Nischen und Dachschrägen</li>
          <li>· Reparaturen &amp; Aufarbeitung bestehender Möbel</li>
          <li>· Sonderanfertigungen nach Ihrer Idee</li>
        </ul>
      </div>
    </PageShell>
  );
}
