/* ---------------------------------------------------------------------------
   AKTUELLES EVENT — das einzige Content-Objekt, das der Betreiber pflegt.

   Gedachter Ablauf (bewusst ohne Entwickler):
     1. Black Medusa baut das Event-Creative für Instagram.
     2. Dasselbe Creative wird hier hinterlegt (später über ein CMS).
     3. Die Website zeigt es als Kampagnenbild — das Layout bleibt gleich.

   Das Artwork ist das Hauptvisual. Die Felder darunter sind die strukturierte
   Fassung derselben Information: für Screenreader, Suchmaschinen, Countdown
   und Reservierung. Nichts davon wird aus dem Bild gelesen.

   `status: "tbc"` heißt: noch nicht bestätigt — die Oberfläche kennzeichnet
   solche Werte sichtbar, statt etwas zu erfinden.
--------------------------------------------------------------------------- */

export type FactStatus = "confirmed" | "tbc";

export type EventArtwork = {
  /** Pfad unter /public. `null` → die Bühne zeigt den Platzhalter. */
  src: string | null;
  /** Beschreibung des Bildinhalts für Screenreader — Pflicht, sobald gesetzt. */
  alt: string;
  /** Seitenverhältnis des Creatives. Instagram-Post: 4/5, Story: 9/16. */
  ratio: "4/5" | "1/1" | "9/16";
};

export const event = {
  /** Sichtbar schalten, wenn kein Event ansteht → Bühne zeigt „kein Termin“. */
  active: true,

  headliner: "SINAN",
  role: "SPECIAL GUEST",
  title: "SINAN LIVE",

  /**
   * Das Kampagnenbild. Sobald hier das Instagram-Creative liegt, übernimmt
   * es die gesamte visuelle Arbeit — die Bühne drumherum bleibt unverändert.
   */
  artwork: {
    src: null,
    alt: "",
    ratio: "4/5",
  } as EventArtwork,

  /** PLATZHALTER — Termin bestätigen lassen. Countdown und Reservierung
      ziehen aus dieser einen Zeile (ISO mit Zeitzonen-Offset Berlin). */
  startsAt: "2026-09-05T23:00:00+02:00",
  dateStatus: "tbc" as FactStatus,

  /* Anzeige-Strings als Literale: keine Locale-Differenz zwischen Server-
     und Client-Rendering, damit die Hydration stabil bleibt. */
  weekday: "SAMSTAG",
  dayMonth: "05.09.",
  year: "2026",
  dateShort: "SA 05.09.",
  dateLong: "Samstag, 5. September 2026",
  doors: "22:00",
  start: "23:00",

  /** Nach so vielen Stunden gilt das Event als beendet (Countdown-Zustand). */
  endsAfterHours: 6,

  /** Musikalische Ausrichtung — knapp, zur Wiedererkennung. */
  music: "BALKAN · TÜRKÇE · ARABIC",

  /** Kein Onlineverkauf: Einlass läuft über die Abendkasse. */
  admission: "Eintritt an der Abendkasse",
} as const;

/* ---------------------------------------------------------------------------
   RESERVIERUNG — Konfiguration des schrittweisen Ablaufs.
   Nur was wirklich gebraucht wird: Gruppengröße, Termin, Kontaktweg, Name.
--------------------------------------------------------------------------- */

export const groupSizes = [
  { id: "1-5", label: "1 – 5", hint: "Tisch" },
  { id: "6-10", label: "6 – 10", hint: "Große Box" },
  { id: "11-20", label: "11 – 20", hint: "Mehrere Boxen" },
  { id: "20+", label: "20 +", hint: "Wir melden uns persönlich" },
] as const;

export const contactChannels = [
  { id: "whatsapp", label: "WhatsApp", hint: "Antwort meist am selben Tag" },
  { id: "phone", label: "Anruf", hint: "Wir rufen zurück" },
] as const;

export type GroupSizeId = (typeof groupSizes)[number]["id"];
export type ContactChannelId = (typeof contactChannels)[number]["id"];
