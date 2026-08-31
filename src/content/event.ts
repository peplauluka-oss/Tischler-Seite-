/* ---------------------------------------------------------------------------
   Event-Daten — die einzige Quelle für alles, was im Hero, in den Event-
   Sektionen und im Reservierungs-Overlay über die kommende Nacht steht.

   WICHTIG für den Betreiber / die nächste Iteration:
   Alles, was mit `status: "tbc"` markiert ist, ist ein **Platzhalter** und
   noch nicht bestätigt. Die Oberfläche zeigt solche Werte mit einem kleinen
   „TBC“-Marker an — es wird bewusst nichts erfunden.
--------------------------------------------------------------------------- */

export type FactStatus = "confirmed" | "tbc";

export type Fact = {
  label: string;
  value: string;
  status: FactStatus;
};

export const event = {
  /** Headliner — als Display-Typo im Hero */
  headliner: "SINAN",
  /** Rolle des Headliners (bestätigt) */
  role: "SPECIAL GUEST",

  /**
   * PLATZHALTER — Datum/Uhrzeit sind noch nicht bestätigt.
   * Zum Ändern reicht diese eine Zeile (ISO inkl. Zeitzonen-Offset Berlin).
   * Der Countdown, das Datum im Hero und die Reservierung ziehen daraus.
   */
  startsAt: "2026-09-05T23:00:00+02:00",
  dateStatus: "tbc" as FactStatus,

  /** Anzeige-Strings bewusst als Literale: keine Locale-/Zeitzonen-Differenz
      zwischen Server- und Client-Rendering (Hydration bleibt stabil). */
  dateShort: "SA · 05.09.2026",
  dateLong: "Samstag, 5. September 2026",
  doors: "22:00",
  start: "23:00",

  /** Ende für den Countdown-Zustand „läuft gerade“ → danach „Event beendet“ */
  endsAfterHours: 6,

  /** Musikrichtung — Ausrichtung des Hauses, keine Setlist-Behauptung */
  music: "BALKAN · TÜRKÇE POP · CLUB",

  /** Line-up. Support steht pro Nacht unterschiedlich fest → TBC statt Fantasie. */
  lineup: [
    { name: "SINAN", role: "SPECIAL GUEST", status: "confirmed" as FactStatus },
    { name: "SUPPORT", role: "DJ · WIRD ERGÄNZT", status: "tbc" as FactStatus },
  ],

  /** Tickets: bewusst kein Online-Verkauf — Einlass über die Abendkasse. */
  admission: "TICKETS NUR AN DER ABENDKASSE",
} as const;

/** Kurze Fakten-Zeile im Hero — knapp halten, nicht überladen. */
export const heroFacts: Fact[] = [
  { label: "DATUM", value: event.dateShort, status: event.dateStatus },
  { label: "EINLASS", value: `${event.doors} UHR`, status: "tbc" },
  { label: "CLUB", value: "BLACK MEDUSA · BERLIN", status: "confirmed" },
  { label: "SOUND", value: event.music, status: "confirmed" },
];

/**
 * Tisch-Kategorien — PLATZHALTER-Struktur für den Prototyp.
 * Keine Preise, keine Mindestverzehr-Angaben: beides muss vom Betreiber
 * kommen. Kategorien lassen sich hier eintauschen, ohne UI zu ändern.
 */
export const tableCategories = [
  {
    id: "standard",
    name: "STANDARD",
    hint: "Tisch im Barbereich",
    accent: false,
  },
  {
    id: "lounge",
    name: "LOUNGE",
    hint: "Sitzbox mit Sofa",
    accent: false,
  },
  {
    id: "premium",
    name: "PREMIUM",
    hint: "Box mit bestem Blick auf die Fläche",
    accent: true,
  },
] as const;

export type TableCategoryId = (typeof tableCategories)[number]["id"];

export const guestRange = { min: 2, max: 12, default: 4 } as const;
