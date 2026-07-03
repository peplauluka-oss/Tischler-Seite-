/**
 * Referenzen / Galerie.
 * ⚠️ Bilder & Beschreibungen sind Platzhalter – vor Livegang durch
 * echte Werkstattfotos + je 1 Satz pro Projekt ersetzen.
 * Kundenstimmen NIEMALS erfinden – nur echte, freigegebene Zitate einsetzen.
 */
export type Referenz = {
  titel: string;
  kategorie: "Möbel" | "Kursarbeiten" | "Reparaturen";
  beschreibung: string;
  /** Pfad unter /public/referenzen/ */
  bild: string;
  alt: string;
};

export const referenzen: Referenz[] = [
  {
    titel: "[PLATZHALTER: Projektname]",
    kategorie: "Möbel",
    beschreibung: "[PLATZHALTER: 1 Satz zum Projekt – z. B. Esstisch aus Eiche, geölt.]",
    bild: "/referenzen/platzhalter-1.svg",
    alt: "[PLATZHALTER: Alt-Text – Möbelstück aus der Werkstatt]",
  },
  {
    titel: "[PLATZHALTER: Projektname]",
    kategorie: "Möbel",
    beschreibung: "[PLATZHALTER: 1 Satz zum Projekt.]",
    bild: "/referenzen/platzhalter-2.svg",
    alt: "[PLATZHALTER: Alt-Text]",
  },
  {
    titel: "[PLATZHALTER: Kursarbeit]",
    kategorie: "Kursarbeiten",
    beschreibung: "[PLATZHALTER: 1 Satz zur Kursarbeit eines Teilnehmers.]",
    bild: "/referenzen/platzhalter-3.svg",
    alt: "[PLATZHALTER: Alt-Text]",
  },
  {
    titel: "[PLATZHALTER: Kursarbeit]",
    kategorie: "Kursarbeiten",
    beschreibung: "[PLATZHALTER: 1 Satz zur Kursarbeit.]",
    bild: "/referenzen/platzhalter-4.svg",
    alt: "[PLATZHALTER: Alt-Text]",
  },
  {
    titel: "[PLATZHALTER: Reparatur]",
    kategorie: "Reparaturen",
    beschreibung: "[PLATZHALTER: 1 Satz zur Reparatur.]",
    bild: "/referenzen/platzhalter-5.svg",
    alt: "[PLATZHALTER: Alt-Text]",
  },
  {
    titel: "[PLATZHALTER: Sonderanfertigung]",
    kategorie: "Möbel",
    beschreibung: "[PLATZHALTER: 1 Satz zur Sonderanfertigung.]",
    bild: "/referenzen/platzhalter-6.svg",
    alt: "[PLATZHALTER: Alt-Text]",
  },
];

export const kundenstimmen: { zitat: string; name: string }[] = [
  {
    zitat: "[PLATZHALTER: Echtes Kundenzitat – keine Zitate erfinden!]",
    name: "[PLATZHALTER: Name]",
  },
  {
    zitat: "[PLATZHALTER: Echtes Kundenzitat]",
    name: "[PLATZHALTER: Name]",
  },
];
