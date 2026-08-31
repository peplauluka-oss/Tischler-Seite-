/**
 * Zentrale Stammdaten des Betriebs.
 * ⚠️ Daten wurden von der aktuellen Website übernommen –
 * vor Livegang mit dem Kunden verifizieren!
 */
export const site = {
  name: "Hobbytischlerei Berlin",
  claim: "Vom Baum zum Meisterstück.",
  subline: "Kurse, Mietwerkstatt und Auftragsarbeiten in Berlin-Kaulsdorf.",
  url: "https://www.hobbytischlerei.de", // [PLATZHALTER: finale Domain bestätigen]
  phone: "+49 30 74 76 92 40",
  phoneHref: "tel:+493074769240",
  email: "service@hobbytischlerei.de",
  address: {
    street: "Alt-Kaulsdorf 52",
    zip: "12621",
    city: "Berlin",
    district: "Kaulsdorf",
    country: "DE",
  },
  geo: { lat: 52.5049, lng: 13.5889 },
  openingHours: "[PLATZHALTER: Öffnungszeiten vom Kunden]",
  /** [PLATZHALTER: Google-Bewertungslink vom Kunden] */
  googleReviewUrl: "",
  /** [PLATZHALTER: Shop-URL – Entscheidung verlinken vs. integrieren steht aus] */
  shopUrl: "",
  responseTimePromise: "[PLATZHALTER: „Antwort innerhalb von 24 h“ mit Kunde bestätigen]",
} as const;

export type AnliegenKey =
  | "kurs"
  | "werkstattmiete"
  | "auftrag"
  | "gutschein"
  | "sonstiges";

export const anliegenOptions: { value: AnliegenKey; label: string }[] = [
  { value: "kurs", label: "Kurs / Workshop" },
  { value: "werkstattmiete", label: "Werkstattmiete" },
  { value: "auftrag", label: "Auftragsarbeit" },
  { value: "gutschein", label: "Gutschein" },
  { value: "sonstiges", label: "Sonstiges" },
];
