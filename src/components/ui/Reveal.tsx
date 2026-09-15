"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DUR, EASE, IN_VIEW } from "@/lib/motion";

/**
 * FAMILIE A — ATMOSPHÄRISCHES AUFTAUCHEN.
 *
 * Der leiseste Ton der Seite: etwas wird da, ohne dass man den Vorgang
 * bemerkt. Opazität trägt, der Weg ist so kurz, dass er nur die Richtung
 * andeutet.
 *
 * Bewusst KEIN Standard für alles. Wo etwas Gewicht bekommen soll, steht
 * `Wipe`; wo eine Fläche ankommt, `Settle`. Käme jeder Block gleich ins
 * Bild, wäre die Choreografie eine Schablone.
 *
 * `x` statt `y` für Elemente, die nebeneinander liegen: Zwei Hochformate,
 * die gegeneinander hereinrücken, erzählen ihre Nachbarschaft — zwei, die
 * gemeinsam nach oben rutschen, erzählen nur die Animation.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 16,
  x = 0,
  className = "",
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={style}
      initial={reduced ? false : { opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={IN_VIEW}
      transition={{ duration: reduced ? 0 : DUR.arrive, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
