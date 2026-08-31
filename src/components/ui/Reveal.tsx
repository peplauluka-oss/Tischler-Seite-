"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Ruhiger Einblender für Inhalte unterhalb des Hero.
 * Framer Motion übernimmt hier die UI-Ebene; die scrollgebundene
 * Choreografie des Hero bleibt bei GSAP.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 22,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
