"use client";

import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import HeroWood from "./HeroWood";
import CameraRig from "./CameraRig";
import { Sawdust, SandingDust } from "./Particles";
import type { DeviceTier } from "./progress";

/**
 * Die komplette 3D-Szene: Licht, Boden, Nebel und das Held-Objekt.
 *
 * Lichtkonzept „goldene Stunde in der Werkstatt“:
 *  - warmes Streiflicht von rechts (DirectionalLight, ~3000 K)
 *  - HemisphereLight für weiche Grundhelligkeit
 *  - prozedurales Environment (Lightformer) für PBR-Reflexe und den
 *    Öl-Glanz in Akt 6 – KEIN HDRI-Download, alles wird lokal erzeugt.
 */
export default function Scene({ tier }: { tier: DeviceTier }) {
  const low = tier === "low";

  return (
    <>
      {/* Bodennebel: Objekte lösen sich weich in den Seitenhintergrund auf */}
      <fog attach="fog" args={["#efe6d3", 7, 17]} />

      {/* warmes Streiflicht von rechts – goldene Stunde */}
      <directionalLight position={[5, 3.5, 2]} intensity={2.4} color="#ffc07a" />
      {/* kühleres Gegenlicht, damit die Schattenseite nicht absäuft */}
      <directionalLight position={[-4, 2, -3]} intensity={0.5} color="#dfe8e6" />
      <hemisphereLight args={["#fff3e0", "#8a6f52", 0.55]} />

      {/* Boden: dezente Scheibe im Ton der Schnittfläche */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <circleGeometry args={[14, 48]} />
        <meshStandardMaterial color="#e6dabf" roughness={0.95} />
      </mesh>

      {/* weicher Kontaktschatten unter dem Held-Objekt */}
      {!low && (
        <ContactShadows
          position={[0, 0, 0]}
          opacity={0.4}
          scale={8}
          blur={2.6}
          far={3}
          resolution={512}
          color="#2a1f14"
        />
      )}

      {/* prozedurales Environment für Reflexe (einmal gerendert) */}
      <Environment resolution={64} frames={1}>
        <Lightformer intensity={2} position={[4, 3, 2]} scale={[3, 3, 1]} color="#ffdcae" />
        <Lightformer intensity={0.8} position={[-3, 2, -2]} scale={[2, 4, 1]} color="#e8f0ee" />
        <Lightformer intensity={1.2} position={[0, 5, 0]} rotation-x={Math.PI / 2} scale={[6, 6, 1]} color="#fff6e8" />
      </Environment>

      {/* das Held-Objekt: Baum → Stamm → Bretter → Tisch */}
      <HeroWood tier={tier} />

      {/* Partikel nur auf leistungsfähigen Geräten */}
      {!low && <Sawdust count={280} />}
      {!low && <SandingDust count={120} />}

      {/* eine durchgehende Kamerafahrt über alle Akte */}
      <CameraRig />
    </>
  );
}
