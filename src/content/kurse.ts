/**
 * Kursangebote.
 * ⚠️ Keine erfundenen Termine oder Preise – alles Fehlende ist Platzhalter
 * und wird vor Livegang durch die echte Kursliste des Kunden ersetzt.
 */
export type Kurs = {
  titel: string;
  beschreibung: string;
  ort: "Kaulsdorf" | "Köpenick";
  dauer: string;
  preis: string;
};

export const kurse: Kurs[] = [
  {
    titel: "Grundkurs Holzbearbeitung",
    beschreibung:
      "Sicherer Umgang mit Handwerkzeug und Maschinen: Sägen, Hobeln, Schleifen und einfache Verbindungen – die Basis für jedes eigene Projekt.",
    ort: "Kaulsdorf",
    dauer: "[PLATZHALTER: Dauer]",
    preis: "[PLATZHALTER: Preis]",
  },
  {
    titel: "Möbelbau-Workshop",
    beschreibung:
      "Sie planen und bauen ein eigenes kleines Möbelstück – von der Skizze über den Zuschnitt bis zur geölten Oberfläche.",
    ort: "Kaulsdorf",
    dauer: "[PLATZHALTER: Dauer]",
    preis: "[PLATZHALTER: Preis]",
  },
  {
    titel: "Erlebniskurs Köpenick",
    beschreibung:
      "Holzbearbeitung als Erlebnis: ein kompakter Kurs am Standort Berlin-Köpenick – ideal auch als Geschenk oder Teamevent.",
    ort: "Köpenick",
    dauer: "[PLATZHALTER: Dauer]",
    preis: "[PLATZHALTER: Preis]",
  },
];
