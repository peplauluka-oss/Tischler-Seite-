"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import Scene from "./Scene";
import { storyProgress, type DeviceTier } from "./progress";

/**
 * Der eine, persistente Canvas der gesamten Story.
 * Wird per next/dynamic lazy geladen – der erste Paint (Hero-Headline,
 * LCP) wartet nie auf Three.js.
 *
 * Performance-Regeln:
 *  - DPR auf 1–1.75 geclampt (schwache Geräte: fix 1)
 *  - frameloop="demand": gerendert wird nur, wenn wirklich etwas
 *    passiert – beim Scrollen (Invalidator) oder im Hero-Idle (Ticker).
 *  - Partikel als InstancedMesh, keine Echtzeit-Schatten > 512px.
 */

/** Fordert genau dann neue Frames an, wenn sich der Fortschritt ändert. */
function Invalidator() {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => storyProgress.subscribe(() => invalidate()), [invalidate]);
  return null;
}

/**
 * Hält die Idle-Animation in Akt 1 am Leben (Kamera-„Atmen“), ohne
 * dauerhaft zu rendern: ein sparsamer ~30fps-Ticker, der nur läuft,
 * solange der Besucher am Seitenanfang steht und der Tab sichtbar ist.
 */
function IdleTicker() {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    let raf = 0;
    let last = 0;
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (t - last < 33) return; // ~30 fps reichen fürs Atmen
      last = t;
      if (document.visibilityState === "visible" && storyProgress.value < 0.11) {
        invalidate();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [invalidate]);
  return null;
}

export default function StoryCanvas({ tier }: { tier: DeviceTier }) {
  return (
    <Canvas
      frameloop="demand"
      dpr={tier === "low" ? 1 : [1, 1.75]}
      gl={{
        antialias: true,
        alpha: true, // Seitenhintergrund scheint durch
        powerPreference: "high-performance",
      }}
      camera={{ fov: 42, position: [0.4, 1.7, 6.4], near: 0.1, far: 40 }}
    >
      <Invalidator />
      <IdleTicker />
      <Scene tier={tier} />
    </Canvas>
  );
}
