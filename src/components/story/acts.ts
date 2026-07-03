/**
 * Die 6 Akte der Scroll-Story.
 *
 * Der Story-Wrapper ist STORY_VH (700vh) hoch. Ein Master-ScrollTrigger
 * liefert einen normalisierten Fortschritt 0–1 über die gesamte Strecke.
 * Jeder Akt bekommt darin ein exakt definiertes Fenster [start, ende].
 *
 * Diese Datei ist bewusst reines TypeScript (kein React), damit sowohl
 * die DOM-Sektionen (Server) als auch die 3D-Szene (Client) dieselben
 * Zahlen benutzen – eine einzige Quelle der Wahrheit.
 */
export const STORY_VH = 700;

export type ActId =
  | "hero"
  | "material"
  | "angebote"
  | "prozess"
  | "referenzen"
  | "meisterstueck";

export const ACTS: Record<ActId, { start: number; end: number }> = {
  /* Akt 1 – Der Baum */
  hero: { start: 0, end: 0.12 },
  /* Akt 2 – Der Schnitt */
  material: { start: 0.12, end: 0.26 },
  /* Akt 3 – Das Sägewerk / Exploded View */
  angebote: { start: 0.26, end: 0.46 },
  /* Akt 4 – Präzision: Hobeln & Schleifen */
  prozess: { start: 0.46, end: 0.62 },
  /* Akt 5 – Die Fügung */
  referenzen: { start: 0.62, end: 0.82 },
  /* Akt 6 – Das Meisterstück */
  meisterstueck: { start: 0.82, end: 1 },
};

/** Hilfsfunktionen für die Choreografie ------------------------------- */

/** Wert auf 0–1 begrenzen. */
export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/**
 * Bildet den globalen Fortschritt (0–1 über 700vh) auf ein lokales
 * Fenster ab. Beispiel: window(p, 0.12, 0.26) liefert 0, solange wir
 * vor Akt 2 sind, läuft innerhalb von Akt 2 von 0 auf 1 und bleibt
 * danach bei 1. Damit ist jede Teil-Animation sauber scrubbing-fähig
 * (vor- UND zurückscrollen funktioniert immer).
 */
export const window01 = (p: number, start: number, end: number) =>
  clamp01((p - start) / (end - start));

/** Weiche Interpolation (entspricht GSAP power2.inOut). */
export const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

/** Lineare Interpolation. */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
