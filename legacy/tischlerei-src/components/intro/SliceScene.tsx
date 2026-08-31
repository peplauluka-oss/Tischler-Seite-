"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { introProgress, win, type DeviceTier } from "./progress";

/**
 * DER SCHNITT — die Fullscreen-Swipe-Interaktion.
 *
 * Konzept „Fruit Ninja, aber Holz": Der komplette Viewport ist eine
 * massive Holzwand. Beim Swipen fährt eine leuchtende Präzisionslinie
 * diagonal über den Schirm, die Wand teilt sich entlang des Schnitts
 * und die beiden Hälften gleiten auseinander — dahinter liegt die
 * nächste Holzschicht. Drei Schichten (Eiche → Nussbaum → Räuchereiche),
 * dann öffnet sich der dunkle Werkstattraum mit dem Abbinder.
 *
 * Alles ist Screen-Space-Shading auf drei Fullscreen-Planes — kein
 * Objekt „schwebt im Bild", die Fläche deckt IMMER 100 % des Viewports.
 * Sämtliche Bewegung hängt ausschließlich am Scroll-Fortschritt
 * (scrubbed): vor- und zurückswipen ist jederzeit sauber möglich.
 *
 * Schnitt-Fenster auf dem Fortschritt 0–1:
 *   Schicht 1 (Eiche):        0.06 – 0.32
 *   Schicht 2 (Nussbaum):     0.36 – 0.60
 *   Schicht 3 (Räuchereiche): 0.64 – 0.88
 */

const NOISE = /* glsl */ `
  float hash1(float n) { return fract(sin(n) * 43758.5453); }
  float hash2(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float vnoise(vec2 x) {
    vec2 i = floor(x);
    vec2 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash2(i), hash2(i + vec2(1, 0)), f.x),
      mix(hash2(i + vec2(0, 1)), hash2(i + vec2(1, 1)), f.x),
      f.y);
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * vnoise(p);
      p = p * 2.03 + vec2(17.3);
      a *= 0.5;
    }
    return v;
  }
`;

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

/**
 * Fragment-Shader einer Schnitt-Schicht.
 *
 * Trick: Die „Bewegung" der beiden Hälften passiert rein im Sampling —
 * jeder Pixel rechnet zurück, welchen Punkt der ungeteilten Wand er
 * zeigen würde, nachdem seine Hälfte um `sep` verschoben und minimal
 * rotiert wurde. Liegt der zurückgerechnete Punkt jenseits der
 * Schnittlinie, gehört der Pixel zur Fuge → transparent → die nächste
 * Schicht scheint durch.
 */
const FRAG = /* glsl */ `
  varying vec2 vUv;
  uniform float uP;      // Schnitt-Fortschritt 0–1 (0 = geschlossen)
  uniform float uLine;   // Fortschritt der leuchtenden Schnittlinie 0–1
  uniform float uAngle;  // Winkel der Schnittlinie
  uniform float uAspect;
  uniform float uSeed;
  uniform float uTime;
  uniform vec3 uColBase; // Grundton des Holzes
  uniform vec3 uColDark; // dunkle Maserung/Fugen
  ${NOISE}

  void main() {
    vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0);

    // In den Schnittraum rotieren: Schnittlinie = x-Achse
    float ca = cos(uAngle), sa = sin(uAngle);
    vec2 q = mat2(ca, sa, -sa, ca) * p;

    float side = q.y >= 0.0 ? 1.0 : -1.0;
    float sep = pow(uP, 1.6) * 1.6;      // Separation (ease-in: erst zart, dann weit)
    float halfSep = sep * 0.5;

    // Hälften-Transformation zurückrechnen: Verschiebung senkrecht +
    // leichte Parallel-Drift + minimale Rotation ums Schnittzentrum
    float drift = side * sep * 0.4;
    float rot = side * uP * 0.12;
    vec2 qs = vec2(q.x - drift, q.y - side * halfSep);
    float cr = cos(rot), sr = sin(rot);
    qs = mat2(cr, sr, -sr, cr) * qs;

    // Fuge: Punkt liegt nicht mehr auf dieser Hälfte → durchsichtig.
    // Weiche Kante über fwidth (Anti-Aliasing statt Treppchen).
    float d = qs.y * side;
    float aa = fwidth(d) * 1.5 + 0.0005;
    float alpha = uP <= 0.0001 ? 1.0 : smoothstep(0.0, aa, d);
    if (alpha < 0.01) discard;

    // ---- Holz: vertikale Bohlen mit Maserung -------------------------
    vec2 w = mat2(ca, -sa, sa, ca) * qs;   // zurück in Wandkoordinaten
    float px = (w.x + uSeed * 3.1) * 2.6;
    float plank = floor(px);
    float pf = fract(px);
    float shade = mix(0.9, 1.08, hash1(plank + uSeed));
    // feine dunkle Fuge zwischen den Bohlen
    float seam = smoothstep(0.0, 0.03, pf) * (1.0 - smoothstep(0.97, 1.0, pf));
    // Maserung: entlang der Bohle gestreckte Streifen + Wolken
    float grain = fbm(vec2(w.x * 22.0, w.y * 2.4 + plank * 4.7 + uSeed * 9.0));
    float cloud = fbm(vec2(w.x * 3.0, w.y * 0.8 + uSeed * 5.0));

    vec3 col = uColBase * shade;
    col = mix(col, uColDark, (1.0 - grain) * 0.3);
    col = mix(col, uColBase * 1.16, smoothstep(0.55, 0.9, cloud) * 0.3);
    col = mix(uColDark * 0.55, col, clamp(seam + 0.25, 0.0, 1.0));

    // ruhiger Lichtzug über die Fläche (lebt, ohne zu zappeln)
    col *= 1.0 + sin(uTime * 0.22 + w.x * 1.1 - w.y * 0.4) * 0.035;
    // Vignette
    col *= 1.0 - dot(p, p) * 0.1;

    // ---- Schnittkante (erst sichtbar, wenn der Schnitt offen ist) ------
    float open = smoothstep(0.0, 0.04, uP);
    float fromEdge = abs(q.y) - halfSep;   // Abstand zur frischen Kante
    // warmes Glühen der frisch geschnittenen Kante (Stirnholz-Glut)
    float ember = exp(-max(fromEdge, 0.0) * 55.0)
                * smoothstep(0.0, 0.12, uP)
                * (1.0 - 0.65 * smoothstep(0.45, 1.0, uP));
    col = mix(col, vec3(1.0, 0.52, 0.2), ember * 0.85 * open);
    // leichte Kanten-Abdunklung (Tiefe)
    col *= 1.0 - exp(-max(fromEdge, 0.0) * 120.0) * 0.3 * open;

    // ---- die wandernde Präzisionslinie (vor dem Aufklappen) ----------
    float maxX = uAspect * 0.75 + 0.3;
    float tip = mix(-maxX, maxX, uLine);
    float lineOn = step(0.001, uLine) * (1.0 - step(0.999, uLine));
    // scharfe Linie mit Schweif hinter der Spitze
    float lineCore = exp(-abs(q.y) * 260.0);
    float behind = smoothstep(0.0, 0.06, tip - q.x);
    float ahead = 1.0 - smoothstep(0.0, 0.02, q.x - tip);
    float trail = exp(-(tip - q.x) * 2.2);
    col += vec3(0.25, 0.85, 0.78) * lineCore * behind * ahead * max(trail, 0.35) * lineOn * 1.6;
    // Funken-Glut direkt an der Spitze
    float spark = exp(-length(vec2(q.x - tip, q.y)) * 40.0) * lineOn;
    col += vec3(1.0, 0.6, 0.25) * spark * 0.9;

    gl_FragColor = vec4(col, alpha);
  }
`;

/** Dunkler Werkstattraum hinter allen Schichten. */
const ROOM_FRAG = /* glsl */ `
  varying vec2 vUv;
  uniform float uAspect;
  ${NOISE}
  void main() {
    vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0);
    // warmer Kern oben rechts, außen fast schwarz
    float g = 1.0 - smoothstep(0.0, 1.25, length(p - vec2(0.35, 0.28)));
    vec3 col = mix(vec3(0.055, 0.037, 0.022), vec3(0.16, 0.11, 0.065), g);
    col += vec3(0.9, 0.5, 0.2) * exp(-length(p - vec2(0.0, -0.62)) * 2.6) * 0.05;
    col *= 1.0 - fbm(p * 3.0 + 7.0) * 0.08; // leichte Textur, kein Banding
    gl_FragColor = vec4(col, 1.0);
  }
`;

type Layer = {
  angle: number;
  seed: number;
  base: THREE.Color;
  dark: THREE.Color;
  window: [number, number];
  z: number;
};

const LAYERS: Layer[] = [
  {
    // Eiche, hell — die Fläche, auf der die Headline liegt
    angle: 0.32,
    seed: 1.7,
    base: new THREE.Color("#d2a878"),
    dark: new THREE.Color("#8a6440"),
    window: [0.06, 0.32],
    z: 0,
  },
  {
    // Nussbaum — Gegendiagonale
    angle: -0.42,
    seed: 4.2,
    base: new THREE.Color("#6b4c36"),
    dark: new THREE.Color("#3c2a1c"),
    window: [0.36, 0.6],
    z: -0.9,
  },
  {
    // Räuchereiche, fast schwarz — steiler Schnitt
    angle: 1.15,
    seed: 8.9,
    base: new THREE.Color("#3a2a1d"),
    dark: new THREE.Color("#1d1410"),
    window: [0.64, 0.88],
    z: -1.8,
  },
];

const CAM_Z = 3;

/** Staub im Gegenlicht des dunklen Raums (sichtbar, sobald sich Fugen öffnen). */
function Motes({ count }: { count: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const h = (n: number) => {
          const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
          return x - Math.floor(x);
        };
        return {
          x: (h(i) - 0.5) * 5,
          y: (h(i + 31) - 0.5) * 3,
          z: -2.2 + h(i + 77) * 0.5,
          speed: 0.3 + h(i + 13) * 0.7,
          phase: h(i + 51) * 6.28,
          size: 0.4 + h(i + 5),
        };
      }),
    [count]
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const p = introProgress.value;
    for (let i = 0; i < count; i++) {
      const s = seeds[i];
      dummy.position.set(
        s.x + Math.sin(t * 0.05 * s.speed + s.phase) * 0.25 + p * 0.5 * s.speed,
        s.y + Math.sin(t * 0.04 * s.speed + s.phase * 2.0) * 0.18,
        s.z
      );
      dummy.scale.setScalar(s.size * 0.012);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#e8c493" transparent opacity={0.22} toneMapped={false} />
    </instancedMesh>
  );
}

export default function SliceScene({ tier }: { tier: DeviceTier }) {
  const { size } = useThree();
  const planeRefs = useRef<(THREE.Mesh | null)[]>([]);
  const roomRef = useRef<THREE.Mesh>(null!);

  const materials = useMemo(
    () =>
      LAYERS.map(
        (l) =>
          new THREE.ShaderMaterial({
            vertexShader: VERT,
            fragmentShader: FRAG,
            transparent: true, // weiche AA-Kante an der Fuge
            uniforms: {
              uP: { value: 0 },
              uLine: { value: 0 },
              uAngle: { value: l.angle },
              uAspect: { value: 1 },
              uSeed: { value: l.seed },
              uTime: { value: 0 },
              uColBase: { value: l.base },
              uColDark: { value: l.dark },
            },
          })
      ),
    []
  );
  const roomMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: ROOM_FRAG,
        uniforms: { uAspect: { value: 1 } },
      }),
    []
  );

  useFrame(({ clock }) => {
    const p = introProgress.value;
    const t = clock.getElapsedTime();
    const aspect = size.width / size.height;

    // Planes decken den Viewport in jeder Tiefe exakt ab (+ Bleed)
    const cover = (z: number) => {
      const h = 2 * Math.tan((50 * Math.PI) / 360) * (CAM_Z - z) * 1.03;
      return [h * aspect, h] as const;
    };

    LAYERS.forEach((l, i) => {
      const mesh = planeRefs.current[i];
      if (!mesh) return;
      const [wd, ht] = cover(l.z);
      mesh.scale.set(wd, ht, 1);

      const u = materials[i].uniforms;
      const t01 = win(p, l.window[0], l.window[1]);
      // erste 22 % des Fensters: die Linie fährt; danach öffnet der Schnitt
      u.uLine.value = win(t01, 0, 0.22);
      u.uP.value = win(t01, 0.18, 1);
      u.uAspect.value = aspect;
      u.uTime.value = t;

      // Geöffnete Schichten aushängen (spart Fragment-Last)
      mesh.visible = t01 < 0.999;
    });

    roomMat.uniforms.uAspect.value = aspect;
    const [rw, rh] = cover(-2.6);
    roomRef.current.scale.set(rw, rh, 1);
  });

  return (
    <>
      {/* der dunkle Raum, ganz hinten (immer opak) */}
      <mesh ref={roomRef} position={[0, 0, -2.6]} material={roomMat}>
        <planeGeometry args={[1, 1]} />
      </mesh>

      {tier !== "low" && <Motes count={40} />}

      {/* die drei Holzschichten, von hinten nach vorn */}
      {LAYERS.map((l, i) => (
        <mesh
          key={i}
          ref={(el) => {
            planeRefs.current[i] = el;
          }}
          position={[0, 0, l.z]}
          material={materials[i]}
          renderOrder={i}
        >
          <planeGeometry args={[1, 1]} />
        </mesh>
      ))}
    </>
  );
}
