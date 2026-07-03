"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import LogScene from "./LogScene";
import { introProgress, type DeviceTier } from "./progress";

/**
 * Der Canvas der Intro-Interaktion. Wird per next/dynamic lazy geladen —
 * die Hero-Headline (LCP) ist reines HTML und wartet nie auf Three.js.
 *
 * frameloop="demand": gerendert wird nur bei Scroll-Änderung plus ein
 * sparsamer ~30fps-Ticker fürs Kamera-Atmen, solange der Besucher am
 * Seitenanfang steht und der Tab sichtbar ist.
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
      if (document.visibilityState === "visible" && introProgress.value < 0.07) {
        invalidate();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [invalidate]);
  return null;
}

export default function LogCanvas({ tier }: { tier: DeviceTier }) {
  return (
    <Canvas
      frameloop="demand"
      dpr={tier === "low" ? 1 : [1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 38, position: [0, 1.25, 5.6], near: 0.1, far: 30 }}
    >
      <Invalidator />
      <IdleTicker />
      <LogScene tier={tier} />
    </Canvas>
  );
}
