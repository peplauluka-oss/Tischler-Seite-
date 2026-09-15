"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DUR, EASE, IN_VIEW } from "@/lib/motion";

/**
 * FAMILIE B — EDITORIALER AUFTRITT.
 *
 * Für Schrift, die Gewicht hat. Die Zeile steigt hinter ihrer eigenen
 * Grundlinie hervor — dieselbe Geste wie im Hero bei „Tonight starts here“,
 * damit die Seite eine Handschrift behält und nicht zwei.
 *
 * Der Block kommt als Block. Wort für Wort oder Zeichen für Zeichen
 * animierte Typografie ist kein Auftritt, sondern eine Wartezeit — und
 * liest sich beim zweiten Besuch wie ein Tick. Mehrzeilige Überschriften
 * steigen zeilenweise mit winzigem Versatz: spürbar, nicht zählbar.
 *
 * Die Zeilen stehen als Text im Markup und nicht als Kinder — so bleibt die
 * Überschrift für Screenreader ein Satz.
 *
 * ZWEI FALLEN, die hier bewusst umgangen sind:
 *
 * 1. Der Beschnitt braucht Luft. Ohne sie fehlen Umlautpunkte und
 *    Unterlängen — aus Hohenschönhausen wird Hohenschonhausen. Die Luft
 *    sitzt als Innenabstand im fahrenden Element, damit der Rahmen genau so
 *    hoch ist wie sein Inhalt; die negativen Außenabstände nehmen sie dem
 *    Satzbild wieder ab.
 *
 * 2. Der Auslöser darf nicht am beschnittenen Element hängen. Ein Element,
 *    das vollständig hinter der Kante liegt, schneidet der Browser aus der
 *    Sichtbarkeitsprüfung heraus: Es wäre nie „im Bild“ und käme nie
 *    hervor. Deshalb beobachtet der Rahmen, und die Zeile folgt ihm über
 *    Varianten.
 *
 * Bei reduzierter Bewegung ändert sich nur der Startwert, nicht der Aufbau:
 * Server und Client müssen dieselben Elemente rendern.
 */
const LINE = {
  hidden: { y: "104%" },
  shown: { y: "0%" },
};

export default function WipeLines({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  as: Tag = "h2",
}: {
  lines: readonly string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const reduced = useReducedMotion();

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <motion.span
          key={line}
          className={`-mt-[0.16em] -mb-[0.1em] block overflow-hidden ${lineClassName}`}
          initial={reduced ? false : "hidden"}
          whileInView="shown"
          viewport={IN_VIEW}
        >
          <motion.span
            className="block pb-[0.1em] pt-[0.16em]"
            variants={LINE}
            transition={{
              duration: reduced ? 0 : DUR.arrive,
              delay: reduced ? 0 : delay + i * 0.07,
              ease: EASE,
            }}
          >
            {line}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  );
}

export { WipeLines };
