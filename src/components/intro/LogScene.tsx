"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { introProgress, win, easeInOut, lerp, clamp01, type DeviceTier } from "./progress";
import { createSliceMaterial } from "./materials";

/**
 * Die Szene: ein massiver Eichenstamm, der beim Scrollen in sieben dicke
 * Scheiben aufbricht. Kein narratives Kino — ein Objekt-Study im
 * „Editorial 3D“-Stil: dunkler Raum, warmes Streiflicht, glühendes
 * Stirnholz. Sämtliche Bewegung wird pro Frame ausschließlich aus dem
 * Scroll-Fortschritt berechnet (vor-/zurückswipen jederzeit möglich).
 *
 * Choreografie (Fortschritt 0–1 über die Intro-Strecke):
 *  0.00–0.10  ruhender Stamm, Kamera atmet
 *  0.08–0.52  Aufbrechen: Scheiben gleiten mit Stagger auseinander,
 *             eine Präzisions-Lichtlinie wandert durch die Fugen,
 *             das Innere glüht auf
 *  0.50–0.78  Kamera umrundet das schwebende Ensemble (≈ 60°),
 *             Scheiben kippen minimal — Stirnholz fängt das Licht
 *  0.78–1.00  die Scheiben beruhigen sich zu einer lockeren Skulptur,
 *             Kamera kommt in Heldenperspektive zur Ruhe
 */

const SLICES = 7;
const RADIUS = 0.62;
/* unterschiedlich dicke Scheiben → wirkt gewachsen, nicht generiert */
const WIDTHS = [0.34, 0.52, 0.4, 0.66, 0.42, 0.55, 0.36];
const LOG_LEN = WIDTHS.reduce((a, b) => a + b, 0);
const LOG_Y = 1.0;

/* Grundpositionen (bündig aneinander, zentriert um x=0) */
const BASE_X: number[] = (() => {
  const xs: number[] = [];
  let acc = -LOG_LEN / 2;
  for (let i = 0; i < SLICES; i++) {
    xs.push(acc + WIDTHS[i] / 2);
    acc += WIDTHS[i];
  }
  return xs;
})();

/* Deterministischer Jitter pro Scheibe (stabil über alle Frames) */
const rand = (s: number) => {
  const x = Math.sin(s * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
const JITTER = Array.from({ length: SLICES }, (_, i) => ({
  y: (rand(i) - 0.5) * 0.34,
  z: (rand(i + 40) - 0.5) * 0.3,
  rotY: (rand(i + 7) - 0.5) * 0.5,
  rotZ: (rand(i + 21) - 0.5) * 0.16,
  rotX: (rand(i + 90) - 0.5) * 0.2,
}));

const V = new THREE.Vector3();
const dummy = new THREE.Object3D();

/**
 * Staubpartikel im Gegenlicht — hängen fast still in der Luft und geben
 * dem dunklen Raum Tiefe. Bewegung hängt an Zeit UND Scroll-Fortschritt
 * (leichte Parallaxe beim Swipen), bleibt also auch bei frameloop=demand
 * lebendig, wann immer gerendert wird.
 */
function Motes({ count }: { count: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null!);
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: (rand(i) - 0.5) * 7,
        y: 0.1 + rand(i + 31) * 2.4,
        z: -1.2 + rand(i + 77) * 2.6,
        speed: 0.25 + rand(i + 13) * 0.75,
        phase: rand(i + 51) * 6.28,
        size: 0.4 + rand(i + 5),
      })),
    [count]
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const p = introProgress.value;
    for (let i = 0; i < count; i++) {
      const s = seeds[i];
      dummy.position.set(
        s.x + Math.sin(t * 0.05 * s.speed + s.phase) * 0.3 + p * 0.6 * s.speed,
        s.y + Math.sin(t * 0.04 * s.speed + s.phase * 2.0) * 0.2 + p * 0.3,
        s.z
      );
      dummy.scale.setScalar(s.size * 0.011);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#e8c493" transparent opacity={0.2} toneMapped={false} />
    </instancedMesh>
  );
}

export default function LogScene({ tier }: { tier: DeviceTier }) {
  const group = useRef<THREE.Group>(null!);
  const sliceRefs = useRef<(THREE.Mesh | null)[]>([]);
  const ringRef = useRef<THREE.Mesh>(null!);
  const lookAt = useRef(new THREE.Vector3(0, LOG_Y, 0));

  const radial = tier === "low" ? 48 : 96;
  const materials = useMemo(
    () => BASE_X.map((x) => createSliceMaterial(x)),
    []
  );
  const ringMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#3fd9c6"),
        transparent: true,
        opacity: 0,
        toneMapped: false,
        side: THREE.DoubleSide,
      }),
    []
  );

  useFrame(({ camera, clock, size }) => {
    const p = introProgress.value;
    /* Hochformat (Mobil): Kamera weiter weg + Objekt höher im Bild,
       damit Headline und CTAs unten frei bleiben. */
    const portrait = Math.min(Math.max((1.0 - size.width / size.height) * 2.2, 0), 1);

    /* ---- Aufbrechen: Spreizung mit Stagger von der Mitte nach außen ---- */
    const breakT = win(p, 0.08, 0.52);
    const settle = easeInOut(win(p, 0.78, 0.98)); // Phase C: beruhigen
    const spreadMax = lerp(2.05, 1.22, settle);
    const jitterAmt = lerp(1, 0.4, settle);

    for (let i = 0; i < SLICES; i++) {
      const m = sliceRefs.current[i];
      if (!m) continue;
      const distMitte = Math.abs(i - (SLICES - 1) / 2) / ((SLICES - 1) / 2);
      // mittlere Fugen öffnen zuerst → der Stamm „bricht von innen auf“
      const t = easeInOut(win(breakT, distMitte * 0.28, 0.72 + distMitte * 0.28));
      const spread = lerp(1, spreadMax, t);

      m.position.set(
        BASE_X[i] * spread,
        JITTER[i].y * t * jitterAmt,
        JITTER[i].z * t * jitterAmt
      );
      // leichte Radius-Variation, die erst beim Auseinandergleiten sichtbar
      // wird — der geschlossene Stamm behält eine saubere Silhouette
      const rad = 1 + (rand(i + 60) - 0.5) * 0.07 * t;
      m.scale.set(rad, 1, rad);
      m.rotation.set(
        JITTER[i].rotX * t * jitterAmt,
        JITTER[i].rotY * t * jitterAmt,
        Math.PI / 2 + JITTER[i].rotZ * t * jitterAmt // Zylinderachse → x
      );

      /* Glühen des Stirnholzes: hell beim Aufbrechen, ruhig danach */
      const shader = materials[i].userData.shader;
      if (shader) {
        const glowIn = Math.sin(clamp01(breakT) * Math.PI); // Puls
        shader.uniforms.uGlow.value = glowIn * 0.65 + settle * 0.1;
      }
    }

    /* ---- Präzisions-Lichtlinie wandert durch die öffnenden Fugen ---- */
    const lineT = win(p, 0.1, 0.5);
    const visible = lineT > 0 && lineT < 1;
    ringRef.current.visible = visible;
    if (visible) {
      const spread = lerp(1, 2.05, easeInOut(lineT));
      ringRef.current.position.x = lerp(-LOG_LEN / 2, LOG_LEN / 2, lineT) * spread;
      ringMat.opacity = Math.sin(lineT * Math.PI) * 0.9;
      const pulse = 1 + Math.sin(lineT * Math.PI * 6) * 0.02;
      ringRef.current.scale.setScalar(pulse);
    }

    /* ---- Gruppe: sanfte Eigenrotation während der Umrundung ---- */
    const orbitT = easeInOut(win(p, 0.5, 0.78));
    group.current.rotation.y = orbitT * -0.35 + settle * 0.15;

    /* ---- Kamera: eine durchgehende Fahrt ---- */
    const time = clock.getElapsedTime();
    const idle = 1 - win(p, 0, 0.08);

    // Basisfahrt: frontal → seitlich-nah → Helden-Total
    const a = easeInOut(win(p, 0.06, 0.52));
    const b = easeInOut(win(p, 0.52, 0.8));
    const c = easeInOut(win(p, 0.8, 1));
    V.set(0.0, 1.25, 6.0) // Start frontal
      .lerp({ x: 1.1, y: 1.05, z: 4.4 } as THREE.Vector3, a)
      .lerp({ x: 2.6, y: 0.85, z: 2.9 } as THREE.Vector3, b)
      .lerp({ x: 0.3, y: 1.45, z: 5.5 } as THREE.Vector3, c);
    // Idle-Atmen am Seitenanfang
    V.x += Math.sin(time * 0.22) * 0.14 * idle;
    V.y += Math.sin(time * 0.35) * 0.045 * idle;
    V.z += portrait * 2.6; // Hochformat: zurücktreten
    camera.position.copy(V);

    // Am Anfang sitzt der Stamm rechts der Headline, danach zentriert;
    // im Hochformat wandert er nach oben aus dem Textbereich.
    const shiftX = lerp(-0.45, 0, win(p, 0.04, 0.22)) * (1 - portrait);
    const shiftY = portrait * lerp(0.9, 0.25, win(p, 0.1, 0.4));
    lookAt.current.lerp(V.set(shiftX, LOG_Y + (b - c) * -0.1 - shiftY, 0), 0.16);
    camera.lookAt(lookAt.current);
  });

  return (
    <>
      {/* Raumstimmung: warmes Key-Licht rechts, neutrales Rim von hinten */}
      <directionalLight position={[4.5, 3.2, 2.5]} intensity={2.6} color="#ffbe7d" />
      <directionalLight position={[-5, 2.2, -3]} intensity={0.55} color="#d9d2c4" />
      {/* weiches Frontal-Fill hebt die Unterseiten aus dem Schwarz */}
      <directionalLight position={[0.5, -1.2, 5]} intensity={0.5} color="#a8825f" />
      <hemisphereLight args={["#6b5a45", "#2a1d12", 0.7]} />
      {/* dezentes Punktlicht im Kern → das Glühen wirkt physisch */}
      <pointLight position={[0, LOG_Y, 0.4]} intensity={0.6} distance={4} color="#ff9a4d" />

      <group ref={group} position={[0, LOG_Y, 0]}>
        {WIDTHS.map((w, i) => (
          <mesh
            key={i}
            ref={(el) => {
              sliceRefs.current[i] = el;
            }}
            material={materials[i]}
            rotation={[0, 0, Math.PI / 2]}
            position={[BASE_X[i], 0, 0]}
          >
            {/* Zylinderachse lokal = y, per Rotation auf x gelegt.
                Height-Segmente tragen die analytischen Relief-Normalen. */}
            <cylinderGeometry args={[RADIUS, RADIUS, w, radial, tier === "low" ? 8 : 28]} />
          </mesh>
        ))}

        {/* die wandernde Präzisionslinie (Laser-Ring um den Stamm) */}
        <mesh ref={ringRef} rotation={[0, 0, Math.PI / 2]} visible={false} material={ringMat}>
          <torusGeometry args={[RADIUS + 0.16, 0.008, 8, 96]} />
        </mesh>
      </group>

      {/* Staub im Gegenlicht (nur auf leistungsfähigen Geräten) */}
      {tier !== "low" && <Motes count={55} />}

      {/* weicher Kontaktschatten verankert die Skulptur im Raum */}
      {tier !== "low" && (
        <ContactShadows
          position={[0, LOG_Y - 1.05, 0]}
          opacity={0.55}
          scale={9}
          blur={2.8}
          far={2.2}
          resolution={512}
          color="#000000"
        />
      )}

      {/* prozedurales Environment für PBR-Reflexe – kein HDRI-Download */}
      <Environment resolution={64} frames={1}>
        <Lightformer intensity={1.6} position={[4, 3, 3]} scale={[4, 3, 1]} color="#ffd9a8" />
        <Lightformer intensity={0.45} position={[-4, 2, -3]} scale={[3, 4, 1]} color="#d8d2c2" />
        <Lightformer intensity={0.5} position={[0, -3, 2]} scale={[6, 2, 1]} color="#3a2a1a" />
      </Environment>
    </>
  );
}
