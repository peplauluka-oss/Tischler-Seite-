"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Tiefe durch Tempo: Ein Element läuft beim Scrollen minimal langsamer oder
 * schneller als die Seite. Nur `transform`, damit die GPU das trägt und kein
 * Layout neu gerechnet wird.
 *
 * Bewusst klein dosiert — es soll auffallen, dass die Ebenen nicht dasselbe
 * tun, nicht dass sich etwas bewegt.
 */
export default function Drift({
  children,
  amount = 28,
  className = "",
}: {
  children: React.ReactNode;
  /** Weg in Pixeln über die gesamte Sichtbarkeit. Negativ = gegenläufig. */
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduced ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}
