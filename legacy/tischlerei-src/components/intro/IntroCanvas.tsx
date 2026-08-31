"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import SliceScene from "./SliceScene";
import { introProgress, type DeviceTier } from "./progress";

/**
 * Canvas der Schnitt-Interaktion — lazy geladen (next/dynamic), die
 * Hero-Headline (LCP) ist reines HTML und wartet nie auf Three.js.
 *
 * frameloop="demand": gerendert wird nur bei Scroll-Änderung plus ein
 * sparsamer ~30fps-Ticker für den ruhigen Lichtzug, solange der Besucher
 * am Seitenanfang steht, der Tab sichtbar ist und bereits interagiert hat.
 */
function Invalidator() {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => introProgress.subscribe(() => invalidate()), [invalidate]);
  return null;
}

function IdleTicker() {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    let raf = 0;
    let last = 0;
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (t - last < 33) return;
      last = t;
      if (document.visibilityState === "visible" && introProgress.value < 0.05) {
        invalidate();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [invalidate]);
  return null;
}

export default function IntroCanvas({ tier }: { tier: DeviceTier }) {
  return (
    <Canvas
      frameloop="demand"
      dpr={tier === "low" ? 1 : [1, 1.75]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      camera={{ fov: 50, position: [0, 0, 3], near: 0.1, far: 20 }}
    >
      <Invalidator />
      <IdleTicker />
      <SliceScene tier={tier} />
    </Canvas>
  );
}
