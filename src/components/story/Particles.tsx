"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { storyProgress } from "./progress";
import { window01, clamp01 } from "./acts";

/**
 * Partikel (Sägespäne in Akt 2, Schleifstaub in Akt 4) als EIN
 * InstancedMesh pro Effekt – ein Draw-Call für hunderte Späne.
 *
 * Wichtig: Der komplette Partikel-Lebenszyklus wird rein aus dem
 * Scroll-Fortschritt berechnet (kein eigener Timer!). Dadurch bleibt
 * auch dieser Effekt vollständig scrubbing-fähig: Wer zurückscrollt,
 * sieht die Späne rückwärts fliegen.
 */

const dummy = new THREE.Object3D();

/** Deterministische Pseudo-Zufallszahl pro Partikel (stabil über Frames). */
const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export function Sawdust({ count }: { count: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null!);

  /* Startwerte pro Span: Richtung, Tempo, Drehung – einmalig berechnet */
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        angle: rand(i) * Math.PI * 2,
        speed: 0.4 + rand(i + 99) * 1.1,
        up: 0.6 + rand(i + 7) * 1.2,
        spin: rand(i + 31) * 8,
        size: 0.5 + rand(i + 55),
      })),
    [count]
  );

  useFrame(() => {
    const p = storyProgress.value;
    // Lebenszyklus: stieben ab dem Schnitt auf (0.16) und sinken bis 0.3
    const t = window01(p, 0.16, 0.3);
    mesh.current.visible = t > 0 && t < 1;
    if (!mesh.current.visible) return;

    for (let i = 0; i < count; i++) {
      const s = seeds[i];
      const x = Math.cos(s.angle) * s.speed * t;
      const z = Math.sin(s.angle) * s.speed * t;
      // Parabel: erst aufstieben, dann von der Schwerkraft geholt werden
      const y = 0.37 + s.up * t - 2.2 * t * t;
      dummy.position.set(x, Math.max(y, 0.02), z);
      dummy.rotation.set(s.spin * t, s.angle, s.spin * 0.7 * t);
      // am Ende des Zyklus schrumpfen die Späne weg
      const scale = s.size * 0.02 * (1 - t * t);
      dummy.scale.setScalar(Math.max(scale, 0.0001));
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} visible={false}>
      <boxGeometry args={[1, 0.5, 1]} />
      <meshStandardMaterial color="#d8b98a" roughness={1} />
    </instancedMesh>
  );
}

export function SandingDust({ count }: { count: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null!);

  const seeds = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: (rand(i) - 0.5) * 2.2,
        z: 0.45 + rand(i + 13) * 0.5,
        phase: rand(i + 71),
        drift: (rand(i + 5) - 0.5) * 0.3,
      })),
    [count]
  );

  useFrame(() => {
    const p = storyProgress.value;
    const act = window01(p, 0.5, 0.62); // nur während der Hobel-Kante
    mesh.current.visible = act > 0 && act < 1;
    if (!mesh.current.visible) return;

    for (let i = 0; i < count; i++) {
      const s = seeds[i];
      // jeder Staubkorn-Zyklus wiederholt sich, versetzt um phase –
      // fract() macht daraus ein kontinuierliches Rieseln
      const cycle = (act * 2 + s.phase) % 1;
      dummy.position.set(s.x + s.drift * cycle, 1.32 - cycle * 0.55, s.z);
      dummy.rotation.set(cycle * 5, 0, cycle * 3);
      const scale = 0.008 * Math.sin(cycle * Math.PI);
      dummy.scale.setScalar(Math.max(scale, 0.0001));
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} visible={false}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#e8d9bd" roughness={1} />
    </instancedMesh>
  );
}
