/* ---------------------------------------------------------------------------
   Club-Stammdaten, Navigation, Bildmaterial.

   Bildbeschreibungen sind rein deskriptiv. Adresse, Öffnungszeiten und
   Kontaktdaten liegen nicht vor und werden nicht erfunden — sie sind als
   Platzhalter markiert und in der Oberfläche als solche gekennzeichnet.
--------------------------------------------------------------------------- */

export const club = {
  name: "BLACK MEDUSA",
  nameFull: "Black Medusa",
  city: "BERLIN",
  district: "Hohenschönhausen",
  /** Aus dem Wasserzeichen des Clubclips übernommen. */
  instagram: "blackmedusaberlin",
  instagramUrl: "https://instagram.com/blackmedusaberlin",
  /* PLATZHALTER — vom Betreiber ergänzen. */
  address: "Adresse folgt",
  addressStatus: "tbc" as const,
  hours: "Öffnungszeiten folgen",
  hoursStatus: "tbc" as const,
  phone: null as string | null,
} as const;

/** Minimale Navigation: vier Ziele, dazu die Reservierung als Aktion. */
export const navItems = [
  { id: "event", label: "EVENT" },
  { id: "club", label: "CLUB" },
  { id: "musik", label: "MUSIK" },
  { id: "location", label: "LOCATION" },
] as const;

export type ClubImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  lqip: string;
};

export const images = {
  bar: {
    src: "/media/club-bar.webp",
    alt: "Dunkler Bartresen des Black Medusa mit rot hinterleuchteten Paneelen und Sternenhimmel-Decke",
    width: 1325,
    height: 1800,
    lqip: "data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAADwAwCdASoQABYAPt1apkyopSOiMAgBEBuJZQCdAB6Wh3so7v0Rw6QAAP7zENxxtSChmwP46EXw9eKLDZMsfk0ohVi7WgQKfwFiTATfyLloyxz8RhAC61PcPwEHk6o24pK1lyAA",
  },
  ambiente: {
    src: "/media/club-ambiente.webp",
    alt: "Clubraum mit rot leuchtendem Lichtband an der Decke und Sternenhimmel-Beleuchtung",
    width: 1800,
    height: 1431,
    lqip: "data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAADwAQCdASoQAA0AAwBSJZgCw7DxHig+QwAA/kRE1dqFHvPJq9unjluAiy7Ta+FvruYobXRpFL4JwrIn14qNJxU9LCIkdVHiAAA=",
  },
  lounge: {
    src: "/media/club-lounge.webp",
    alt: "Loungebereich mit Bartresen, hängenden Edison-Lampen, Discokugel und Barhockern",
    width: 1339,
    height: 1800,
    lqip: "data:image/webp;base64,UklGRooAAABXRUJQVlA4IH4AAAAwBACdASoQABYAPt1cpkyopSOiMAgBEBuJYgCw7CG2oMBFsXfiYPrlrAAA/u8syWWKj/JkVPZ3UspucyIfBx9ZNJZ6ttP8SYAynRH2RCqGF/n4a4UBW3hlNfAF8Tfr+NRzbAjqkpeNetJos1a4SPeaU7ZAfXCyZ4Bb/1R2AAA=",
  },
  sitzbereich: {
    src: "/media/club-sitzbereich.webp",
    alt: "Sitzbereich mit weißen Lederbänken, LED-beleuchtetem Tisch und Palme",
    width: 1329,
    height: 1800,
    lqip: "data:image/webp;base64,UklGRogAAABXRUJQVlA4IHwAAAAwBACdASoQABYAPt1cpkyopSOiMAgBEBuJQBdgBEP2s580kF/8ZtTVSQAA/vKk843kpB6wbrAZlrupFO8pb0gmjsQQ/GoFqqT0puw49uEcF5lo4wDN4RX0rLELRMS+xmLjfkt7263NyMp5cdh4dLst+vKKovpCtaRI4AAA",
  },
  tresen: {
    src: "/media/club-tresen.webp",
    alt: "Bartresen mit Spirituosenregal, roten Lichtsäulen und dem Medusa-Zeichen des Hauses",
    width: 1102,
    height: 1800,
    lqip: "data:image/webp;base64,UklGRrAAAABXRUJQVlA4IKQAAADwAwCdASoQABoAPt1apkyopSOiMAgBEBuJbACdACFnnODr1wwdlRWMAP7ypBAssOo+MAoDncTMfg2da9XyGFsIq9z6wq1y6aGdn9/YwRtzuxfcD807X9RHkSoYa6P3dqbc1nVUtXZ+h506vqy+Nu9SYG3l9tjVBdj64BL1V6ZWrWCu2ZYo3DMNe9CTJ/WSPVS11g9eZw54CEWRKO9F3ZV8KWzAAA=",
  },
  eingang: {
    src: "/media/club-eingang.webp",
    alt: "Außenansicht des Black Medusa mit roter Leuchtschrift über dem Eingang",
    width: 1339,
    height: 1800,
    lqip: "data:image/webp;base64,UklGRpgAAABXRUJQVlA4IIwAAAAwBACdASoQABYAPt1cpkyopSOiMAgBEBuJYwC2z3gAcGr3/1qe2OmM1PQA/mcQJobrLb+CKhBk+2HxEEjoLkyh6f2GjuSXBFuviqWcgYN7jtf4kSYllg+9ldzQmh7vLuFWzE1gSUIgqoSUyeNvIKolsu4deEy6P0bs6XTsgjmCkdAXMIKU6I7JvwAAAA==",
  },
} satisfies Record<string, ClubImage>;

export const heroVideo = {
  webm: "/media/hero-clip.webm",
  mp4: "/media/hero-clip.mp4",
  poster: "/media/hero-poster.jpg",
  ambient: "/media/hero-ambient.jpg",
} as const;

/* ---------------------------------------------------------------------------
   DER RAUM — bildgeführt statt Textblöcke.
   Jede Aufnahme beantwortet genau eine Frage; ohne Antwort kein Bild.
--------------------------------------------------------------------------- */
export const roomStory = [
  {
    id: "flaeche",
    no: "01",
    image: images.ambiente,
    kicker: "DIE FLÄCHE",
    /* Inhaltlich unverändert, nur in Zeilen gesetzt: In der Bildkomposition
       trägt der kurze Umbruch mehr als ein durchlaufender Satz. */
    lines: ["Sternenhimmel.", "Rotes Lichtband.", "Sonst Dunkelheit."],
  },
  {
    id: "boxen",
    no: "02",
    image: images.sitzbereich,
    kicker: "DIE BOXEN",
    lines: [
      "Weiße Lederbänke mit eigenem Tisch —",
      "das, was eine Reservierung sichert.",
    ],
  },
  {
    id: "bar",
    no: "03",
    image: images.tresen,
    kicker: "DIE BAR",
    lines: ["Voll bestückter Tresen.", "Cocktails sind der Ursprung des Hauses."],
  },
] as const;
