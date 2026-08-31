/**
 * Die drei Umsatzquellen / Conversion-Pfade.
 * Texte: Deutsch, Sie-Form, warm & präzise – keine erfundenen Fakten.
 */
export type Angebot = {
  slug: string;
  titel: string;
  kurz: string;
  beschreibung: string;
  cta: string;
  anliegen: "kurs" | "werkstattmiete" | "auftrag";
  href: string;
};

export const angebote: Angebot[] = [
  {
    slug: "kurse",
    titel: "Kurse & Workshops",
    kurz: "Lernen Sie Holzbearbeitung von Profis.",
    beschreibung:
      "Vom ersten Sägeschnitt bis zum eigenen Möbelstück: In unseren Kursen arbeiten Sie an echten Maschinen, unter Anleitung erfahrener Tischler. Auch als Erlebniskurs am Standort Köpenick.",
    cta: "Kurse ansehen",
    anliegen: "kurs",
    href: "/kurse",
  },
  {
    slug: "werkstatt-mieten",
    titel: "Werkstatt mieten",
    kurz: "Ihr Projekt, unsere Maschinen.",
    beschreibung:
      "Mieten Sie unsere voll ausgestattete Holzwerkstatt – mit oder ohne Maschinennutzung. Ideal für alle, die zu Hause keinen Platz, aber ein Projekt im Kopf haben.",
    cta: "Verfügbarkeit anfragen",
    anliegen: "werkstattmiete",
    href: "/werkstatt-mieten",
  },
  {
    slug: "auftragsarbeiten",
    titel: "Auftragsarbeiten",
    kurz: "Wir bauen es für Sie.",
    beschreibung:
      "Möbel nach Maß, Reparaturen und Sonderanfertigungen: Wir planen, fertigen und montieren Ihr Werkstück – millimetergenau und aus massivem Holz.",
    cta: "Projekt anfragen",
    anliegen: "auftrag",
    href: "/auftragsarbeiten",
  },
];
