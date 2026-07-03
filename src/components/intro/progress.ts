/**
 * Scroll-Fortschritt (0–1) der Intro-Interaktion + Geräte-Heuristik.
 *
 * Kein React-State: Der Wert ändert sich bei jedem Scroll-Frame, die
 * 3D-Szene liest ihn direkt in useFrame. Subscribe dient nur dazu,
 * on-demand neue Frames anzufordern.
 */
type Listener = (p: number) => void;

const listeners = new Set<Listener>();

export const introProgress = {
  value: 0,
  set(p: number) {
    this.value = p;
    listeners.forEach((l) => l(p));
  },
  subscribe(l: Listener) {
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  },
};

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
export const win = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
export const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Fallback-Kaskade:
 *  - "high": volle Szene · "low": reduzierte Geometrie, keine Partikel,
 *    DPR 1 · "off": reduced motion / kein WebGL → statischer Hero
 */
export type DeviceTier = "high" | "low" | "off";

export function detectDeviceTier(): DeviceTier {
  if (typeof window === "undefined") return "off";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "off";
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    if (!gl) return "off";
  } catch {
    return "off";
  }
  const nav = navigator as Navigator & { deviceMemory?: number };
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;
  const dpr = window.devicePixelRatio ?? 1;
  if (cores <= 3 || memory <= 2 || (cores <= 4 && dpr > 2.5)) return "low";
  return "high";
}
