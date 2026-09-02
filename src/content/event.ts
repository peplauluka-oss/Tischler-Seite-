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

export type EventClip = {
  /** Bewegtes Creative. `null` → das Standbild (poster) trägt allein. */
  mp4: string | null;
  webm: string | null;
  /** Schlussbild der Animation — trägt die vollständige Eventinformation.
      Dient als Poster, als Fallback bei reduzierter Bewegung und ohne Video. */
  poster: string;
  /** Was zu sehen ist — für Screenreader, die die Animation nicht sehen. */
  description: string;
};

export const event = {
  /** Sichtbar schalten, wenn kein Event ansteht → Bühne zeigt „kein Termin“. */
  active: true,

  headliner: "SINAN",
  role: "SPECIAL GUEST",
  title: "BIRTHDAY BASH — 4 YEARS OF BLACK MEDUSA",

  /**
   * DAS EVENT-CREATIVE als Animation.
   *
   * Es trägt bereits alles: Name, Line-up, Datum, Einlass, Tischbuchung,
   * Adresse. Deshalb wiederholt die Seite darunter NICHTS davon — sie führt
   * nur noch zur Handlung. Neues Event = drei Dateien tauschen.
   */
  /* Das Creative liegt im Original als 9:16 vor. Ein Telefon ist schmaler
     als das — formatfüllend fielen rund neun Prozent je Seite weg, und darin
     liegen der Medusakopf im Logo und der rechte Rand des Datumsfelds.
     Deshalb wird hier eine 9:20-Fassung ausgeliefert: Sie trägt oben und
     unten ein Stück des eigenen Bildes, an der Kante gespiegelt und weich
     gezeichnet. Damit deckt der Clip jedes Telefonformat vollflächig ab,
     ohne dass am Plakat etwas fehlt. Quelle bleibt event-clip.mp4. */
  clip: {
    mp4: "/media/event-clip-full.mp4",
    webm: "/media/event-clip-full.webm",
    poster: "/media/event-poster-full.jpg",
    description:
      "Event-Ankündigung des Black Medusa: Birthday Bash, vier Jahre Black Medusa, " +
      "mit Special Guest Sinan, DJ Maky, DJ Pasa, Tupan Show und Belly Dance Show. " +
      "Samstag, 5. September 2026, Einlass 22 Uhr. Tischbuchung unter 0176 28278840. " +
      "Grevesmühlener Straße 26, 13059 Berlin. Ab 18 Jahren.",
  } as EventClip,

  /** Vom Event-Creative des Clubs bestätigt (Samstag 05.09.2026, Einlass 22 Uhr).
      Countdown und Reservierung ziehen aus dieser einen Zeile. */
  startsAt: "2026-09-05T23:00:00+02:00",
  dateStatus: "confirmed" as FactStatus,

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

  /** Altersfreigabe laut Creative. */
  minAge: "18+",
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
