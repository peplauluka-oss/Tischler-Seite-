"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * FAMILIE C — ANKOMMEN.
 *
 * Eine große Fläche kommt eine Spur zu groß ins Bild und legt sich über den
 * ganzen Weg hin. Der Unterschied ist bewusst winzig: Zwischen Eintritt und
 * Austritt liegen sechs Prozent, verteilt über eine volle Bildschirmhöhe
 * Scrollweg. Man sieht keine Bewegung — man hat den Eindruck, das Bild
 * atme.
 *
 * Genau hier liegt die Grenze zum Ken-Burns-Kitsch: Alles darüber sieht
 * nach Effekt aus. Deshalb steht der Wert hier fest und nicht als frei
 * wählbarer Parameter.
 */
export default function Settle({
  children,
  className = "",
  /** Ausgangsmaßstab. Größere Flächen vertragen minimal mehr. */
  from = 1.06,
  /** Nur die Bildebene innerhalb einer Figur bewegen, nicht die Figur.
      Wo eine Bildunterschrift im Bild liegt, ist das der Unterschied
      zwischen einer atmenden Aufnahme und mitskalierter Schrift. */
  layer = false,
}: {
  children: React.ReactNode;
  className?: string;
  from?: number;
  layer?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [from, 1]);

  return (
    /* Der Beschnitt liegt außen: Das Bild darf wachsen, sein Rahmen nicht. */
    <div
      ref={ref}
      className={`overflow-hidden ${layer ? "absolute inset-0" : ""} ${className}`}
    >
      <motion.div
        className={layer ? "absolute inset-0" : "h-full"}
        style={reduced ? undefined : { scale }}
      >
        {children}
      </motion.div>
    </div>
  );
}
