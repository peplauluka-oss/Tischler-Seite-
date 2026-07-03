"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { storyProgress } from "./progress";
import { window01, easeInOut, lerp } from "./acts";

/**
 * CameraRig – EINE durchgehende Kamerafahrt über alle 6 Akte.
 *
 * Die Fahrt ist als Keyframe-Liste (Fortschritt → Position + Blickpunkt)
 * definiert und wird pro Segment weich interpoliert. Akt 5 ist ein
 * Sonderfall: dort fährt die Kamera einen echten 180°-Orbit um den
 * entstehenden Tisch (analytisch berechnet, damit die Kreisbahn sauber
 * bleibt). In Akt 1 „atmet“ die Kamera minimal, damit die Szene auch
 * ohne Scrollen lebt.
 */

type Key = { p: number; pos: [number, number, number]; look: [number, number, number] };

/* Keyframes für Akt 1–4 und Akt 6 (Akt 5 = Orbit, s. unten) */
const KEYS: Key[] = [
  { p: 0.0,  pos: [0.4, 1.7, 6.4],  look: [0, 1.5, 0] },   // Akt 1: Baum
  { p: 0.14, pos: [1.2, 1.5, 5.6],  look: [0, 1.2, 0] },   // Schnittlinie
  { p: 0.26, pos: [2.4, 1.0, 4.4],  look: [1.0, 0.5, 0] }, // Kamera schwenkt mit dem fallenden Stamm nach unten
  { p: 0.34, pos: [2.0, 1.5, 2.8],  look: [0.3, 1.3, 0] }, // Exploded View beginnt
  { p: 0.4,  pos: [0.5, 1.7, 0.8],  look: [-0.5, 1.3, 0] },// Dolly ZWISCHEN den Brettern hindurch
  { p: 0.46, pos: [-2.2, 1.6, 2.2], look: [0, 1.3, 0] },   // Austritt seitlich
  { p: 0.54, pos: [0, 1.9, 2.7],    look: [0, 1.3, 0.4] }, // Akt 4: Großaufnahme Brett
  { p: 0.62, pos: [1.2, 1.9, 3.3],  look: [0, 1.2, 0] },   // Übergang in den Orbit
];

/* Akt-5-Orbit: 180° um den Tisch */
const ORBIT = { from: 0.35, radius: 3.7, height: 1.9, look: [0, 1.0, 0] as const };

/* Akt 6: Heldenperspektive, Kamera kommt zur Ruhe */
const FINAL: Key = { p: 1, pos: [2.5, 1.2, 3.3], look: [0, 0.95, 0] };

const v1 = new THREE.Vector3();
const v2 = new THREE.Vector3();
const lookTarget = new THREE.Vector3();

export default function CameraRig() {
  const smoothedLook = useRef(new THREE.Vector3(0, 1.5, 0));

  useFrame(({ camera, clock }) => {
    const p = storyProgress.value;

    if (p <= 0.62) {
      /* Keyframe-Segment finden und weich interpolieren */
      let a = KEYS[0];
      let b = KEYS[KEYS.length - 1];
      for (let i = 0; i < KEYS.length - 1; i++) {
        if (p >= KEYS[i].p && p <= KEYS[i + 1].p) {
          a = KEYS[i];
          b = KEYS[i + 1];
          break;
        }
      }
      const t = easeInOut(window01(p, a.p, b.p));
      camera.position.copy(v1.set(...a.pos).lerp(v2.set(...b.pos), t));
      lookTarget.set(...a.look).lerp(v2.set(...b.look), t);
    } else if (p <= 0.82) {
      /* Akt 5: analytischer 180°-Orbit um den entstehenden Tisch */
      const t = window01(p, 0.62, 0.82);
      const angle = ORBIT.from + t * Math.PI;
      camera.position.set(
        Math.sin(angle) * ORBIT.radius,
        ORBIT.height,
        Math.cos(angle) * ORBIT.radius
      );
      lookTarget.set(...ORBIT.look);
    } else {
      /* Akt 6: aus dem Orbit-Endpunkt weich in die Heldenperspektive */
      const t = easeInOut(window01(p, 0.82, 0.96));
      const endAngle = ORBIT.from + Math.PI;
      v1.set(
        Math.sin(endAngle) * ORBIT.radius,
        ORBIT.height,
        Math.cos(endAngle) * ORBIT.radius
      );
      camera.position.copy(v1.lerp(v2.set(...FINAL.pos), t));
      lookTarget.set(...ORBIT.look).lerp(v2.set(...FINAL.look), t);
    }

    /* Akt 1: ruhige Idle-Bewegung (minimaler Orbit + „Atmen“),
       ausschließlich solange wir am Seitenanfang stehen. */
    const idle = 1 - window01(p, 0, 0.1);
    if (idle > 0) {
      const time = clock.getElapsedTime();
      camera.position.x += Math.sin(time * 0.25) * 0.18 * idle;
      camera.position.y += Math.sin(time * 0.4) * 0.05 * idle;
    }

    /* Blickpunkt leicht nachziehen → weiche, „schwere“ Kamera */
    smoothedLook.current.lerp(lookTarget, 0.18);
    camera.lookAt(smoothedLook.current);
  });

  return null;
}
