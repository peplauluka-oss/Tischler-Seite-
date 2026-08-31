"use client";

import type Lenis from "lenis";

/**
 * Kleiner Modul-Speicher für die Lenis-Instanz. So kann das Reservierungs-
 * Overlay den Seitenscroll sperren, ohne dass jede Komponente die Instanz
 * durch den Baum reichen muss.
 */
let instance: Lenis | null = null;

export function registerLenis(l: Lenis | null) {
  instance = l;
}

export function lockScroll() {
  instance?.stop();
  document.documentElement.style.overflow = "hidden";
  // iOS: verhindert das Durchscrollen des Hintergrunds hinter dem Overlay.
  document.body.style.touchAction = "none";
}

export function unlockScroll() {
  instance?.start();
  document.documentElement.style.overflow = "";
  document.body.style.touchAction = "";
}

/** Sanft zu einem Abschnitt scrollen — respektiert reduzierte Bewegung. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (instance && !reduced) {
    instance.scrollTo(el, { offset: 0, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }
}
