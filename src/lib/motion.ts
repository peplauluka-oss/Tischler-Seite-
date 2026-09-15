/* ---------------------------------------------------------------------------
   BEWEGUNGSSPRACHE.

   Eine Seite, eine Handschrift. Alles, was sich bewegt, benutzt dieselben
   zwei Kurven und dieselben drei Tempi — sonst entstehen aus einzeln
   plausiblen Animationen zusammen ein Flickenteppich.

   Die Kurve ist ein Ausklang, kein Sprung: Dinge kommen schnell an und
   legen sich langsam hin. So verhält sich Gewicht.
--------------------------------------------------------------------------- */

/** Ausklang — für alles, was ankommt. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Weicher, symmetrischer Verlauf — für alles, was scrollgebunden läuft. */
export const EASE_SOFT: [number, number, number, number] = [0.4, 0, 0.2, 1];

/** Drei Tempi, mehr braucht die Seite nicht. */
export const DUR = {
  /** Kleine Zustände: Hover, Umschalten. */
  quick: 0.32,
  /** Der Normalfall: etwas kommt ins Bild. */
  arrive: 0.8,
  /** Große Flächen, die sich Zeit nehmen dürfen. */
  slow: 1.1,
} as const;

/** Wann ein Element als „im Bild“ gilt. Einmal — nichts wiederholt sich. */
export const IN_VIEW = { once: true, margin: "-12% 0px -10% 0px" } as const;
