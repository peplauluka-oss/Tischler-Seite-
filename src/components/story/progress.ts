/**
 * Winziger Store für den Scroll-Fortschritt (0–1).
 *
 * Warum kein React-State? Der Fortschritt ändert sich bei jedem
 * Scroll-Frame. Ein setState würde die komplette React-Baumstruktur
 * neu rendern – viel zu teuer. Stattdessen: ein mutierbares Objekt,
 * das die 3D-Szene in useFrame direkt ausliest, plus ein simples
 * Subscribe-System für alle, die auf Änderungen reagieren wollen
 * (z. B. um on-demand einen neuen Frame anzufordern).
 */
type Listener = (p: number) => void;

const listeners = new Set<Listener>();

export const storyProgress = {
  /** aktueller Fortschritt 0–1, wird vom Master-ScrollTrigger gesetzt */
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

/**
 * Geräte-Heuristik für die Fallback-Kaskade:
 *  - "high":  volle Szene
 *  - "low":   reduzierte Geometrie, keine Partikel, DPR 1
 *  - "off":   kein WebGL bzw. prefers-reduced-motion → statische Keyvisuals
 */
export type DeviceTier = "high" | "low" | "off";

export function detectDeviceTier(): DeviceTier {
  if (typeof window === "undefined") return "off";

  // Stufe 1: Nutzerwunsch respektieren – keine Scroll-Kopplung.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "off";
  }

  // Stufe 3: WebGL-Check.
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ??
      canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl");
    if (!gl) return "off";
  } catch {
    return "off";
  }

  // Stufe 2: schwache Geräte → abgespeckte Szene.
  const nav = navigator as Navigator & { deviceMemory?: number };
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;
  const dpr = window.devicePixelRatio ?? 1;
  if (cores <= 3 || memory <= 2 || (cores <= 4 && dpr > 2.5)) {
    return "low";
  }

  return "high";
}
