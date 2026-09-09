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
  /* Vom Event-Creative des Clubs übernommen. */
  address: "Grevesmühlener Str. 26",
  postcode: "13059 Berlin",
  addressStatus: "confirmed" as const,
  hours: "Öffnungszeiten folgen",
  hoursStatus: "tbc" as const,

  /** Die Hausrichtung — knapp, zur Wiedererkennung. */
  music: "BALKAN · TÜRKÇE · ARABIC",

  /* Vom Event-Creative des Clubs übernommen („TABLE BOOKING“). Die
     WhatsApp-Adresse ist dieselbe Nummer in internationaler Schreibweise. */
  phone: "0176 28278840",
  phoneHref: "tel:+4917628278840",
  whatsapp: "4917628278840",
  contactStatus: "confirmed" as const,

  /* Anfahrt: Der Kartenlink ist aus der bestätigten Adresse gebaut. Welche
     Linien wirklich halten, ist nicht belegt — deshalb steht hier nichts.
     Sobald der Club es bestätigt, kommt es in `transit` und erscheint. */
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Grevesm%C3%BChlener+Stra%C3%9Fe+26%2C+13059+Berlin",
  transit: null as string | null,
  transitStatus: "tbc" as const,
} as const;

/**
 * Navigation — vier Ziele. Die beiden Aktionen (Gästeliste, Tisch) stehen
 * nicht in dieser Liste: Sie öffnen eine Ebene, sie springen nicht zu einem
 * Abschnitt, und sie sind in der Leiste anders gewichtet.
 */
export const navItems = [
  { id: "event", label: "EVENTS" },
  { id: "upcoming", label: "UPCOMING EVENTS" },
  { id: "inside", label: "INSIDE MEDUSA" },
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
  saal: {
    src: "/media/club-saal.webp",
    alt: "Leerer Clubraum mit Sternenhimmel-Decke, rotem Lichtband und Sitzbänken",
    width: 2000,
    height: 1590,
    lqip: "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAADQAQCdASoQAA0AAwBWJZgCw7Dp5kAJAAD+RPe5w8junf5Ev8nLgc5Hzl7PxoVpJcpXLwazlq+dIp+W9vAv+/6oh/aGxlVOTE/AAAAA",
  },
  eingang: {
    src: "/media/club-eingang.webp",
    alt: "Außenansicht des Black Medusa mit roter Leuchtschrift über dem Eingang",
    width: 1339,
    height: 1800,
    lqip: "data:image/webp;base64,UklGRpgAAABXRUJQVlA4IIwAAAAwBACdASoQABYAPt1cpkyopSOiMAgBEBuJYwC2z3gAcGr3/1qe2OmM1PQA/mcQJobrLb+CKhBk+2HxEEjoLkyh6f2GjuSXBFuviqWcgYN7jtf4kSYllg+9ldzQmh7vLuFWzE1gSUIgqoSUyeNvIKolsu4deEy6P0bs6XTsgjmCkdAXMIKU6I7JvwAAAA==",
  },
} satisfies Record<string, ClubImage>;

/**
 * DIE NÄCHTE.
 *
 * Echte Aufnahmen aus dem Club, unretuschiert und mit dem Wasserzeichen des
 * Hauses. Die Beschreibungen sind rein deskriptiv: Sie sagen, was zu sehen
 * ist, und behaupten nichts über die Menschen darauf.
 */
export const nights = {
  tisch: {
    src: "/media/night-tisch.webp",
    alt: "Zwei Gäste an einem Tisch im Black Medusa, Hände in die Kamera gestreckt",
    width: 1800,
    height: 1200,
    lqip: "data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAAAQAgCdASoQAAsAAwBWJQBWAB0+pVzzxDpsAP7y4qZQOznsHH7nKf44mAj08QvLTMQgvJwub5tga+qJp8315bC3WrY4Z5ra8iVqMUhoRkkDXThOd1d4AA==",
  },
  vip: {
    src: "/media/night-vip.webp",
    alt: "Zwei Gäste an einem Tisch, dahinter das rot leuchtende VIP-Schild",
    width: 1280,
    height: 1920,
    lqip: "data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAAAQAgCdASoLABAAAwBWJYgCdAEQ/i0Zw3KQAP7zKF8i4Jle7sK7R0UcORIwpXtQjoSgTTcVjvc8mhBgLvWtPQxC+0LDRk7XQTzxXB5tpgAAAA==",
  },
  flaeche: {
    src: "/media/night-flaeche.webp",
    alt: "Vier Gäste nebeneinander auf der Tanzfläche unter dem roten Lichtband",
    width: 1800,
    height: 1200,
    lqip: "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAADwAQCdASoQAAsAAwBWJZQAApPpEvWFCwAA/trTdYoa5TUGUSwrqxC5H7iyf80XMaJrDgrsceZWR6Ii5ntUtiVgPGqEnLv0wW8QDH6G/66fGxAA",
  },
  rot: {
    src: "/media/night-rot.webp",
    alt: "Gast in rotem Kleid im Clublicht, Hand am Kinn",
    width: 1280,
    height: 1920,
    lqip: "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAADwAQCdASoLABAAAwBWJQBOgCB0rGubfQAA/vK0CyXwuxsGOyB23rAGySDmN1yikSC5q45yTr+JkEkf3ZeOQ4YEpOVisbjwK57YYn3sjv3m54IivpbLgAAA",
  },
  glas: {
    src: "/media/night-glas.webp",
    alt: "Gast mit Glas in der Hand im dunklen Clubraum",
    width: 1280,
    height: 1920,
    lqip: "data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAADQAQCdASoLABAAAwBWJYwCdAED3Gm8EAD+9DJfCsZ4eE+xXBsJbAcNYvEs0JrsOYVo2Zczl3HeuGQgda/888RM/2YlwAAA",
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
/**
 * INSIDE MEDUSA — vier Blicke, keine Führung.
 *
 * Zuerst der Raum leer, direkt daneben derselbe Raum voll: Das ist die
 * einzige Gegenüberstellung, die man nicht erklären muss. Danach das, was
 * eine Reservierung überhaupt sichert, und der Tresen.
 */
export const insideStory = [
  {
    id: "saal",
    no: "01",
    image: images.saal,
    kicker: "DER RAUM",
    lines: ["Sternenhimmel.", "Rotes Lichtband.", "Sonst Dunkelheit."],
  },
  {
    id: "voll",
    no: "02",
    image: nights.flaeche,
    kicker: "DERSELBE RAUM",
    lines: ["Ab 22 Uhr", "sieht er anders aus."],
  },
  {
    id: "boxen",
    no: "03",
    image: images.sitzbereich,
    kicker: "DIE BOXEN",
    lines: [
      "Weiße Lederbänke mit eigenem Tisch —",
      "das, was eine Reservierung sichert.",
    ],
  },
  {
    id: "bar",
    no: "04",
    image: images.tresen,
    kicker: "DIE BAR",
    lines: ["Voll bestückter Tresen.", "Cocktails sind der Ursprung des Hauses."],
  },
] as const;
