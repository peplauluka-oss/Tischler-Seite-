/* ---------------------------------------------------------------------------
   EVENTS — die einzige Datei, die der Club pflegt.

   Ein Event wird EINMAL angelegt. Seinen Zustand bestimmt das Datum, nicht
   ein Feld: Was in der Zukunft liegt, ist die nächste bzw. eine kommende
   Nacht; was vorbei ist, wandert ins Archiv. Niemand muss ein Event nach dem
   Wochenende „umschalten“ oder von einer Liste in die andere kopieren.

   Ablauf für den Betreiber:
     1. Das Instagram-Artwork wie gewohnt bauen.
     2. Datei nach /public/media legen.
     3. Hier einen Block ergänzen — fertig.

   Daraus entstehen automatisch: Hero-Takeover, Countdown, Upcoming-Liste,
   Archiv, Event-Seite, Metadaten, Gästelisten- und Tischkontext.

   Was hier nicht steht, erfindet die Seite nicht. Felder dürfen `null` sein;
   die Oberfläche lässt sie dann weg, statt Platzhalter zu zeigen.
--------------------------------------------------------------------------- */

export type EventArtwork = {
  /** Bewegtes Creative — optional. `null` → das Standbild trägt allein. */
  mp4: string | null;
  webm: string | null;
  /** Das Artwork als Bild. Pflicht: Ohne Bild kein Event-Auftritt. */
  poster: string;
  /** Was darauf zu sehen ist — für Screenreader und Suchmaschinen. */
  description: string;
};

export type MedusaEvent = {
  /** Teil der URL: /events/<slug> */
  slug: string;
  /** Anlass — bei Sondernächten der eigentliche Aufhänger. */
  occasion: string | null;
  /** Act, der die Nacht trägt. */
  headliner: string | null;
  /** Weitere Namen: DJs, Shows. */
  support: readonly string[];
  /** Musikrichtung — nur wenn der Club sie für diese Nacht angibt. Es gibt
      keine Hausrichtung, die hier gälte: Was läuft, entscheidet der Abend. */
  music: string | null;
  /** Einlass als ISO-Zeitpunkt mit Zonenversatz. Quelle für alles Zeitliche. */
  entryAt: string;
  /** Nach so vielen Stunden gilt die Nacht als vorbei. */
  endsAfterHours: number;
  artwork: EventArtwork;
  guestlist: boolean;
  tables: boolean;
  minAge: string;
  admission: string;
};

export const events: readonly MedusaEvent[] = [
  {
    slug: "birthday-bash-4-jahre",
    occasion: "4 Jahre Black Medusa",
    headliner: "SINAN",
    support: ["DJ Maky", "DJ Pasa", "Tupan Show", "Belly Dance Show"],
    /* Im Artwork steht keine Genreangabe — also steht hier keine. */
    music: null,
    entryAt: "2026-09-05T22:00:00+02:00",
    endsAfterHours: 7,
    artwork: {
      /* 768×1440. Das Original liegt als 9:16 vor; diese Fassung trägt auf
         allen vier Seiten ein Stück des eigenen Bildes, an der Kante
         gespiegelt und weich gezeichnet, damit sie jedes Telefonformat
         vollflächig deckt, ohne dass am Plakat etwas fehlt.
         Quelle: event-clip.mp4. */
      mp4: "/media/event-clip-full.mp4",
      webm: "/media/event-clip-full.webm",
      poster: "/media/event-poster-full.jpg",
      description:
        "Event-Ankündigung des Black Medusa: Birthday Bash, vier Jahre Black Medusa, " +
        "mit Special Guest Sinan, DJ Maky, DJ Pasa, Tupan Show und Belly Dance Show. " +
        "Samstag, 5. September 2026, Einlass 22 Uhr. Tischbuchung unter 0176 28278840. " +
        "Grevesmühlener Straße 26, 13059 Berlin. Ab 18 Jahren.",
    },
    guestlist: true,
    tables: true,
    minAge: "18+",
    admission: "Eintritt an der Abendkasse",
  },
];

/* ---------------------------------------------------------------------------
   DATUM — bewusst ohne Intl.

   `toLocaleDateString` liefert auf Server und Client je nach Umgebung
   unterschiedliche Zeichenketten; das quittiert React mit einem
   Hydration-Fehler. Deshalb wird hier direkt aus der ISO-Zeichenkette
   gelesen: Sie trägt die Berliner Ortszeit bereits im Zonenversatz.
--------------------------------------------------------------------------- */

const WEEKDAYS = ["SO", "MO", "DI", "MI", "DO", "FR", "SA"] as const;
const WEEKDAYS_LONG = [
  "Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag",
] as const;
const MONTHS = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
] as const;

export type EventDate = {
  /** „SA“ */
  weekday: string;
  /** „Samstag“ */
  weekdayLong: string;
  /** „05.09.“ */
  dayMonth: string;
  /** „2026“ */
  year: string;
  /** „SA 05.09.2026“ */
  short: string;
  /** „Samstag, 5. September 2026“ */
  long: string;
  /** „22:00“ */
  time: string;
  /** Für <time datetime> und strukturierte Daten. */
  iso: string;
};

export function eventDate(ev: MedusaEvent): EventDate {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(ev.entryAt);
  if (!m) throw new Error(`Ungültiges entryAt in Event „${ev.slug}“`);
  const [, y, mo, d, hh, mm] = m;
  const day = new Date(Date.UTC(+y, +mo - 1, +d)).getUTCDay();

  return {
    weekday: WEEKDAYS[day],
    weekdayLong: WEEKDAYS_LONG[day],
    dayMonth: `${d}.${mo}.`,
    year: y,
    short: `${WEEKDAYS[day]} ${d}.${mo}.${y}`,
    long: `${WEEKDAYS_LONG[day]}, ${+d}. ${MONTHS[+mo - 1]} ${y}`,
    time: `${hh}:${mm}`,
    iso: `${y}-${mo}-${d}`,
  };
}

/** Wann die Nacht als beendet gilt. */
function endOf(ev: MedusaEvent): number {
  return Date.parse(ev.entryAt) + ev.endsAfterHours * 3_600_000;
}

const byDate = (a: MedusaEvent, b: MedusaEvent) =>
  Date.parse(a.entryAt) - Date.parse(b.entryAt);

/** Alles, was noch nicht vorbei ist — die nächste Nacht zuerst. */
export function comingEvents(now = Date.now()): MedusaEvent[] {
  return events.filter((e) => endOf(e) > now).sort(byDate);
}

/** Vorbei — die jüngste Nacht zuerst. */
export function pastEvents(now = Date.now()): MedusaEvent[] {
  return events.filter((e) => endOf(e) <= now).sort((a, b) => byDate(b, a));
}

/** Die nächste Nacht, oder `null`, wenn kein Termin ansteht. */
export function nextEvent(now = Date.now()): MedusaEvent | null {
  return comingEvents(now)[0] ?? null;
}

/**
 * Was der Hero zeigt.
 *
 * Steht ein Termin an, ist es der nächste. Steht keiner an, bleibt das
 * zuletzt gespielte Artwork stehen — es ist das aktuelle Plakat des Clubs.
 * Die Beschriftung sagt dann die Wahrheit („Letzte Nacht“) und der Countdown
 * weicht dem Hinweis, dass der nächste Termin angekündigt wird. So steht der
 * Bildschirm nie leer, ohne dass etwas Falsches behauptet wird.
 */
export function featuredEvent(now = Date.now()): {
  event: MedusaEvent;
  upcoming: boolean;
} | null {
  const next = nextEvent(now);
  if (next) return { event: next, upcoming: true };
  const last = pastEvents(now)[0];
  return last ? { event: last, upcoming: false } : null;
}

/** Kommende Nächte ohne die eine, die schon im Hero steht. */
export function upcomingEvents(now = Date.now()): MedusaEvent[] {
  return comingEvents(now).slice(1);
}

export function eventBySlug(slug: string): MedusaEvent | undefined {
  return events.find((e) => e.slug === slug);
}

/** Die Zeile, die ein Event benennt: Anlass zuerst, sonst der Act. */
export function eventTitle(ev: MedusaEvent): string {
  return ev.occasion ?? ev.headliner ?? "Clubnacht";
}

/** Vollständiger Name für Metadaten und Archivlisten. */
export function eventFullTitle(ev: MedusaEvent): string {
  const parts = [ev.occasion, ev.headliner].filter(Boolean);
  return parts.length ? parts.join(" · ") : "Clubnacht";
}
