"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { storyProgress, type DeviceTier } from "./progress";
import { window01, easeInOut, lerp, clamp01 } from "./acts";
import {
  createBarkMaterial,
  createBoardMaterial,
  createLegMaterial,
} from "./materials";

/**
 * HeroWood – das zentrale „Held-Objekt“ der Story.
 *
 * Es gibt KEINE harten Szenenwechsel: alle Zustände (Baum → gefällter
 * Stamm → schwebende Bretter → fertiger Tisch) leben von Anfang an als
 * Meshes in EINER Gruppe und werden über vordefinierte Ziel-Transforms
 * gemorpht. Sämtliche Bewegung wird pro Frame ausschließlich aus dem
 * Scroll-Fortschritt (storyProgress, 0–1) berechnet – dadurch ist die
 * komplette Verwandlung beliebig vor- und zurückscrollbar.
 *
 * Zeitfenster (vgl. acts.ts):
 *  0.00–0.12  Akt 1: Baum steht, Idle
 *  0.12–0.26  Akt 2: Laser-Schnittlinie → Stamm kippt in die Horizontale
 *  0.26–0.46  Akt 3: Stamm zerfällt in 6 Bretter (Exploded View)
 *  0.46–0.62  Akt 4: Held-Brett in Großaufnahme, Hobel-Lichtkante
 *  0.62–0.82  Akt 5: Bretter fügen sich zum Tisch, Beine drehen ein
 *  0.82–1.00  Akt 6: Glanz-Sweep („Ölen“), Tisch kommt zur Ruhe
 */

const BOARDS = 6;
/* Maße des fertigen Tischs */
const BOARD_LEN = 2.3;
const BOARD_THICK = 0.08;
const BOARD_WIDTH = 0.2;
const TABLE_TOP_Y = 1.16;
const LEG_H = 1.12;

/* Überschwingende Ease für den „Klick“-Bounce beim Einrasten (Akt 5) */
const easeBack = (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

/* Ziel-Transforms der Exploded View (Akt 3) – pro Brett einmal definiert */
const EXPLODED = Array.from({ length: BOARDS }, (_, i) => ({
  pos: new THREE.Vector3(
    (i % 2 === 0 ? -0.18 : 0.18) + (i - 2.5) * 0.05,
    0.75 + i * 0.3,
    (i - 2.5) * 0.42
  ),
  rot: new THREE.Euler(
    (i % 2 === 0 ? 1 : -1) * 0.12,
    (i - 2.5) * 0.1,
    (i % 2 === 0 ? -1 : 1) * 0.06
  ),
}));

/* Startlage der Bretter: deckungsgleich „im“ liegenden Stamm gestapelt */
const STACKED = Array.from({ length: BOARDS }, (_, i) => ({
  pos: new THREE.Vector3(1.225, 0.35 + (i - 2.5) * (BOARD_THICK + 0.004), 0),
  rot: new THREE.Euler(0, 0, 0),
}));

/* Endlage: Tischplatte – 6 Bretter fugendicht nebeneinander */
const TABLETOP = Array.from({ length: BOARDS }, (_, i) => ({
  pos: new THREE.Vector3(0, TABLE_TOP_Y, (i - 2.5) * BOARD_WIDTH),
  rot: new THREE.Euler(0, 0, 0),
}));

/* Beine: an den vier Ecken unter der Platte */
const LEG_POS: [number, number][] = [
  [0.95, 0.42],
  [-0.95, 0.42],
  [0.95, -0.42],
  [-0.95, -0.42],
];

export default function HeroWood({ tier }: { tier: DeviceTier }) {
  const logGroup = useRef<THREE.Group>(null!);
  const logMesh = useRef<THREE.Mesh>(null!);
  const stump = useRef<THREE.Mesh>(null!);
  const cutRing = useRef<THREE.Mesh>(null!);
  const boardRefs = useRef<(THREE.Mesh | null)[]>([]);
  const legRefs = useRef<(THREE.Group | null)[]>([]);

  const segments = tier === "low" ? 20 : 48;

  /* Materialien einmalig erzeugen (pro Brett ein Klon → eigene Uniforms
     & eigene Opacity, aber identisches, gecachtes Shader-Programm). */
  const barkMat = useMemo(() => createBarkMaterial(), []);
  const boardMats = useMemo(
    () => Array.from({ length: BOARDS }, (_, i) => createBoardMaterial(i * 0.13)),
    []
  );
  const legMat = useMemo(() => createLegMaterial(), []);
  const ringMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#2de0d2"),
        transparent: true,
        opacity: 0,
        toneMapped: false,
      }),
    []
  );

  useFrame(() => {
    const p = storyProgress.value;

    /* ---------------- Akt 2: Schnitt & Fällen ---------------- */
    // Die leuchtende Schnittlinie umläuft den Stamm …
    const cutT = window01(p, 0.12, 0.18);
    cutRing.current.visible = cutT > 0 && p < 0.3;
    ringMat.opacity = Math.sin(clamp01(cutT) * Math.PI) * (p < 0.26 ? 1 : 1 - window01(p, 0.26, 0.3));
    cutRing.current.rotation.y = cutT * Math.PI * 4;
    cutRing.current.scale.setScalar(1 + (1 - cutT) * 0.25);

    // … dann kippt der Stamm in Zeitlupe in die Horizontale.
    // (Der „Schnitt“ ist als zwei getrennte Meshes gebaut – Stumpf und
    //  Stamm –, die bis zum Schnittmoment nahtlos aufeinanderstehen.
    //  Das ersetzt clippingPlanes, ist billiger und sieht identisch aus.)
    const fallT = easeInOut(window01(p, 0.18, 0.26));
    logGroup.current.rotation.z = -Math.PI / 2 * fallT;
    logGroup.current.position.y = 0.35 + Math.sin(fallT * Math.PI) * 0.06;

    /* ---------------- Akt 3: Stamm → Bretter ---------------- */
    // Stamm & Stumpf blenden aus, sobald die Bretter übernehmen.
    const logFade = 1 - window01(p, 0.26, 0.3);
    barkMat.opacity = logFade;
    logMesh.current.visible = logFade > 0.01;
    stump.current.visible = logFade > 0.01;

    const explode = window01(p, 0.26, 0.42);
    const gather = window01(p, 0.62, 0.8); // Akt 5: Rückkehr zum Tisch
    const focus = window01(p, 0.46, 0.54); // Akt 4: Held-Brett nach vorn

    for (let i = 0; i < BOARDS; i++) {
      const mesh = boardRefs.current[i];
      if (!mesh) continue;
      mesh.visible = p > 0.24;

      // Phase A: gestapelt im Stamm → Exploded View (mit Stagger pro Brett)
      const eT = easeInOut(window01(explode, i * 0.06, 0.7 + i * 0.05));
      const pos = STACKED[i].pos.clone().lerp(EXPLODED[i].pos, eT);
      let rx = lerp(STACKED[i].rot.x, EXPLODED[i].rot.x, eT);
      let ry = lerp(STACKED[i].rot.y, EXPLODED[i].rot.y, eT);
      let rz = lerp(STACKED[i].rot.z, EXPLODED[i].rot.z, eT);

      // Phase B (Akt 4): Brett Nr. 2 kommt in Großaufnahme, die anderen
      // treten als „CAD-Geister“ zurück (Transparenz statt Ausblenden,
      // damit die Rückkehr in Akt 5 nahtlos bleibt).
      const fT = easeInOut(focus);
      if (i === 2) {
        pos.lerp(new THREE.Vector3(0, 1.35, 0.6), fT);
        rx = lerp(rx, -0.18, fT);
        ry = lerp(ry, 0, fT);
        rz = lerp(rz, 0, fT);
      }
      const ghost = i === 2 ? 1 : lerp(1, 0.1, fT);
      const unghost = window01(p, 0.62, 0.68);
      boardMats[i].opacity = lerp(ghost, 1, unghost);

      // Phase C (Akt 5): choreografierte Rückkehr → Tischplatte,
      // mit Verzahnungs-„Klick“ (easeBack) und kleinem Scale-Bounce.
      const gT = window01(gather, i * 0.05, 0.75 + i * 0.05);
      if (gT > 0) {
        const gEase = easeBack(gT); // schwingt leicht über → „Einrasten“
        pos.lerp(TABLETOP[i].pos, gEase);
        rx = lerp(rx, 0, easeInOut(gT));
        ry = lerp(ry, 0, easeInOut(gT));
        rz = lerp(rz, 0, easeInOut(gT));
      }
      const clickPulse = gT > 0 ? 1 + Math.sin(clamp01(gT) * Math.PI) * 0.05 : 1;
      mesh.scale.setScalar(clickPulse);

      mesh.position.copy(pos);
      mesh.rotation.set(rx, ry, rz);

      /* Akt 4: Hobel-Lichtkante & Roughness-Blend (nur Held-Brett aktiv,
         die übrigen werden nach dem Zusammenbau „mitgeglättet“). */
      const shader = boardMats[i].userData.shader;
      if (shader) {
        if (i === 2) {
          const sweep = lerp(-2.0, 2.0, window01(p, 0.5, 0.62));
          shader.uniforms.uSweep.value = sweep;
          shader.uniforms.uSweepGlow.value =
            Math.sin(clamp01(window01(p, 0.5, 0.62)) * Math.PI) * 0.9;
        } else {
          // die restlichen Bretter werden beim Fügen glatt
          shader.uniforms.uSweep.value = lerp(-2.0, 2.0, window01(p, 0.62, 0.72));
          shader.uniforms.uSweepGlow.value = 0;
        }
      }

      /* Akt 6: Glanz-Sweep – Clearcoat hebt sich an, als würde die
         Platte frisch geölt. */
      const oil = easeInOut(window01(p, 0.84, 0.95));
      boardMats[i].clearcoat = oil * 0.7;
      boardMats[i].envMapIntensity = lerp(0.7, 1.5, oil);
    }

    /* ---------------- Akt 5: Beine drehen ein ---------------- */
    for (let i = 0; i < 4; i++) {
      const leg = legRefs.current[i];
      if (!leg) continue;
      const lT = window01(p, 0.72 + i * 0.025, 0.8 + i * 0.025);
      leg.visible = lT > 0;
      const e = easeBack(lT);
      leg.rotation.x = ((1 - e) * Math.PI) / 2;
      leg.position.y = TABLE_TOP_Y - BOARD_THICK / 2 + (1 - easeInOut(lT)) * 0.4;
      leg.scale.setScalar(lerp(0.6, 1, easeInOut(lT)));
    }
    legMat.opacity = window01(p, 0.72, 0.76);
    legMat.clearcoat = easeInOut(window01(p, 0.84, 0.95)) * 0.5;
  });

  return (
    <group>
      {/* --- Baumstumpf (bleibt nach dem Schnitt kurz stehen) --- */}
      <mesh ref={stump} material={barkMat} position={[0, 0.175, 0]}>
        <cylinderGeometry args={[0.36, 0.42, 0.35, segments, 4]} />
      </mesh>

      {/* --- Stamm: Pivot an der Schnittstelle (y = 0.35) --- */}
      <group ref={logGroup} position={[0, 0.35, 0]}>
        <mesh ref={logMesh} material={barkMat} position={[0, 1.225, 0]}>
          <cylinderGeometry args={[0.3, 0.36, 2.45, segments, tier === "low" ? 6 : 16]} />
          {/* 3 abstrahierte Astansätze */}
          <mesh material={barkMat} position={[0.28, 0.7, 0.1]} rotation={[0, 0, -0.9]}>
            <cylinderGeometry args={[0.07, 0.11, 0.5, 10]} />
          </mesh>
          <mesh material={barkMat} position={[-0.26, 0.35, -0.12]} rotation={[0.3, 0, 1.0]}>
            <cylinderGeometry args={[0.06, 0.1, 0.45, 10]} />
          </mesh>
          <mesh material={barkMat} position={[0.05, 1.0, -0.28]} rotation={[1.05, 0, 0.15]}>
            <cylinderGeometry args={[0.05, 0.09, 0.4, 10]} />
          </mesh>
        </mesh>
      </group>

      {/* --- Leuchtende Präzisions-Schnittlinie (Laser/CNC) --- */}
      <mesh ref={cutRing} material={ringMat} position={[0, 0.37, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.45, 0.012, 8, 64]} />
      </mesh>

      {/* --- Die 6 Bretter (von Anfang an da, bis Akt 3 unsichtbar) --- */}
      {Array.from({ length: BOARDS }, (_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            boardRefs.current[i] = el;
          }}
          material={boardMats[i]}
          visible={false}
        >
          <boxGeometry args={[BOARD_LEN, BOARD_THICK, BOARD_WIDTH]} />
        </mesh>
      ))}

      {/* --- Die 4 Tischbeine (drehen in Akt 5 aus dem Off ein) --- */}
      {LEG_POS.map(([x, z], i) => (
        <group
          key={i}
          ref={(el) => {
            legRefs.current[i] = el;
          }}
          position={[x, TABLE_TOP_Y, z]}
          visible={false}
        >
          <mesh material={legMat} position={[0, -LEG_H / 2, 0]}>
            <boxGeometry args={[0.09, LEG_H, 0.09]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
