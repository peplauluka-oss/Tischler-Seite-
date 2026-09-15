"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * DER MOMENT.
 *
 * Die Fläche liegt fertig da und ist von zwei Blenden verdeckt, die beim
 * Scrollen zur Seite fahren. Das Bild wächst nicht, es wird freigegeben —
 * und weil der Scroll die Blenden treibt, macht der Besucher die Bewegung
 * selbst.
 *
 * Das ist die teuerste Geste der Seite und steht deshalb genau einmal:
 * dort, wo die Bildstrecke ihren Höhepunkt hat. Ein zweites Mal wäre sie
 * ein Effekt; einmal ist sie ein Moment.
 *
 * Nur `transform` auf zwei Rechtecken — kein `clip-path`, der bei
 * bildschirmbreiten Flächen auf jedem Frame neu gerastert würde.
 */
export default function Curtain({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    /* Offen, bevor die Fläche in der Mitte steht: Der Höhepunkt soll
       erreicht sein, wenn man ihn ansieht — nicht danach. */
    offset: ["start 0.92", "start 0.34"],
  });
  const left = useTransform(scrollYProgress, [0, 1], ["0%", "-101%"]);
  const right = useTransform(scrollYProgress, [0, 1], ["0%", "101%"]);

  /* Ohne Bewegung stehen die Blenden von Anfang an offen. Sie bleiben
     trotzdem im Markup: Server und Client müssen dieselben Elemente
     rendern, sonst scheitert die Hydration genau dort, wo jemand die
     Seite besonders ruhig haben wollte. */
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {children}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[50.5%] bg-void"
        style={{ x: reduced ? "-101%" : left }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[50.5%] bg-void"
        style={{ x: reduced ? "101%" : right }}
      />
    </div>
  );
}
