/* ---------------------------------------------------------------------------
   Club-Stammdaten, Navigation und Bildmaterial.

   Die Bildbeschreibungen sind rein deskriptiv (was auf dem Foto zu sehen ist).
   Adresse, Öffnungszeiten und Kontakt sind als Platzhalter markiert — sie
   liegen im Materialbestand nicht vor und werden bewusst nicht erfunden.
--------------------------------------------------------------------------- */

export const club = {
  name: "BLACK MEDUSA",
  nameFull: "Black Medusa",
  city: "BERLIN",
  /** Vom Wasserzeichen des Club-Clips übernommen (@blackmedusaberlin). */
  instagram: "blackmedusaberlin",
  instagramUrl: "https://instagram.com/blackmedusaberlin",
  /** PLATZHALTER — vom Betreiber ergänzen. */
  address: "Adresse folgt",
  addressStatus: "tbc" as const,
  hours: "Öffnungszeiten folgen",
  hoursStatus: "tbc" as const,
} as const;

export const navItems = [
  { id: "events", label: "EVENTS" },
  { id: "artists", label: "ARTISTS" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "gallery", label: "GALLERY" },
  { id: "location", label: "LOCATION" },
] as const;

export type ClubImage = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  lqip: string;
};

/** Alle sechs Originalaufnahmen des Clubs (HEIC → WebP, 1800 px lange Kante). */
export const images = {
  bar: {
    src: "/media/club-bar.webp",
    alt: "Dunkler Bartresen des Black Medusa mit rot hinterleuchteten Paneelen und Sternenhimmel-Decke",
    caption: "BAR",
    width: 1325,
    height: 1800,
    lqip: "data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAADwAwCdASoQABYAPt1apkyopSOiMAgBEBuJZQCdAB6Wh3so7v0Rw6QAAP7zENxxtSChmwP46EXw9eKLDZMsfk0ohVi7WgQKfwFiTATfyLloyxz8RhAC61PcPwEHk6o24pK1lyAA",
  },
  ambiente: {
    src: "/media/club-ambiente.webp",
    alt: "Clubraum mit rot leuchtendem Onyx-Band an der Decke und Sternenhimmel-Beleuchtung",
    caption: "FLÄCHE",
    width: 1800,
    height: 1431,
    lqip: "data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAADwAQCdASoQAA0AAwBSJZgCw7DxHig+QwAA/kRE1dqFHvPJq9unjluAiy7Ta+FvruYobXRpFL4JwrIn14qNJxU9LCIkdVHiAAA=",
  },
  lounge: {
    src: "/media/club-lounge.webp",
    alt: "Loungebereich mit Bartresen, hängenden Edison-Lampen, Discokugel und Barhockern",
    caption: "LOUNGE",
    width: 1339,
    height: 1800,
    lqip: "data:image/webp;base64,UklGRooAAABXRUJQVlA4IH4AAAAwBACdASoQABYAPt1cpkyopSOiMAgBEBuJYgCw7CG2oMBFsXfiYPrlrAAA/u8syWWKj/JkVPZ3UspucyIfBx9ZNJZ6ttP8SYAynRH2RCqGF/n4a4UBW3hlNfAF8Tfr+NRzbAjqkpeNetJos1a4SPeaU7ZAfXCyZ4Bb/1R2AAA=",
  },
  sitzbereich: {
    src: "/media/club-sitzbereich.webp",
    alt: "Sitzbereich mit weißen Lederbänken, LED-beleuchtetem Tisch und Palme",
    caption: "TISCHE",
    width: 1329,
    height: 1800,
    lqip: "data:image/webp;base64,UklGRogAAABXRUJQVlA4IHwAAAAwBACdASoQABYAPt1cpkyopSOiMAgBEBuJQBdgBEP2s580kF/8ZtTVSQAA/vKk843kpB6wbrAZlrupFO8pb0gmjsQQ/GoFqqT0puw49uEcF5lo4wDN4RX0rLELRMS+xmLjfkt7263NyMp5cdh4dLst+vKKovpCtaRI4AAA",
  },
  tresen: {
    src: "/media/club-tresen.webp",
    alt: "Bartresen mit Spirituosenregal, roten Lichtsäulen und dem Medusa-Zeichen des Hauses",
    caption: "TRESEN",
    width: 1102,
    height: 1800,
    lqip: "data:image/webp;base64,UklGRrAAAABXRUJQVlA4IKQAAADwAwCdASoQABoAPt1apkyopSOiMAgBEBuJbACdACFnnODr1wwdlRWMAP7ypBAssOo+MAoDncTMfg2da9XyGFsIq9z6wq1y6aGdn9/YwRtzuxfcD807X9RHkSoYa6P3dqbc1nVUtXZ+h506vqy+Nu9SYG3l9tjVBdj64BL1V6ZWrWCu2ZYo3DMNe9CTJ/WSPVS11g9eZw54CEWRKO9F3ZV8KWzAAA=",
  },
  eingang: {
    src: "/media/club-eingang.webp",
    alt: "Außenansicht des Black Medusa in Berlin mit roter Leuchtschrift über dem Eingang",
    caption: "EINGANG",
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

/** „Experience“-Sektion: beschreibt ausschließlich das, was die Aufnahmen zeigen. */
export const experience = [
  {
    no: "01",
    title: "STERNENHIMMEL",
    text: "Perforierte Deckenfelder mit hunderten Lichtpunkten über Tresen und Fläche — der Raum bleibt dunkel, das Licht kommt von oben.",
  },
  {
    no: "02",
    title: "ROTES LICHTBAND",
    text: "Ein durchgehendes, rot hinterleuchtetes Steinband zieht sich durch den Raum und gibt dem Club seine Farbe.",
  },
  {
    no: "03",
    title: "SITZBOXEN",
    text: "Weiße Lederboxen mit eigenen Tischen — der Platz, den eine Reservierung sichert.",
  },
  {
    no: "04",
    title: "COCKTAILBAR",
    text: "Voll bestückter Tresen mit Glitzerfront und beleuchtetem Rückbuffet — Cocktails sind der Ursprung des Hauses.",
  },
] as const;
