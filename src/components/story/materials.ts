import * as THREE from "three";

/**
 * Prozedurale Holz-Materialien – KEINE Textur-Downloads.
 *
 * Beide Materialien basieren auf MeshPhysicalMaterial (echtes PBR-Licht,
 * Clearcoat für den „Öl-Glanz“ in Akt 6). Die Holz-Optik entsteht durch
 * GLSL-Noise, der per onBeforeCompile in die Standard-Shader von three.js
 * injiziert wird:
 *
 *  - Rinde:  fbm-Noise verformt die Zylinder-Oberfläche (Vertex) und
 *            erzeugt dunkle, vertikale Streifen (Fragment).
 *  - Bretter: radiales Ringmuster (Jahresringe) + gestreckte Maserung.
 *            Uniform uSweep steuert die „Hobel-Lichtkante“ aus Akt 4:
 *            hinter der Kante wird die Oberfläche glatt (Roughness
 *            0.9 → 0.35) und die Maserung tritt goldwarm hervor.
 */

/** Klassischer Value-Noise + fbm – klein, schnell, völlig ausreichend. */
const NOISE_GLSL = /* glsl */ `
  float hash3(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float vnoise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash3(i + vec3(0,0,0)), hash3(i + vec3(1,0,0)), f.x),
          mix(hash3(i + vec3(0,1,0)), hash3(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(hash3(i + vec3(0,0,1)), hash3(i + vec3(1,0,1)), f.x),
          mix(hash3(i + vec3(0,1,1)), hash3(i + vec3(1,1,1)), f.x), f.y),
      f.z);
  }
  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * vnoise(p);
      p = p * 2.02 + vec3(13.7);
      a *= 0.5;
    }
    return v;
  }
`;

/** Rinden-Material für Baumstamm & Stumpf. */
export function createBarkMaterial() {
  const mat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#6a4d38"),
    roughness: 0.95,
    metalness: 0,
    transparent: true, // wird beim Übergang zu den Brettern ausgeblendet
  });

  mat.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace(
        "#include <common>",
        `#include <common>\n${NOISE_GLSL}\nvarying vec3 vWoodPos;`
      )
      .replace(
        "#include <begin_vertex>",
        /* glsl */ `
        vec3 transformed = vec3(position);
        // Rindenstruktur: Noise entlang der Höhe gestreckt → vertikale Furchen
        float bark = fbm(vec3(position.x * 5.0, position.y * 1.1, position.z * 5.0));
        transformed += normal * (bark - 0.5) * 0.09;
        vWoodPos = position;
        `
      );
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>\n${NOISE_GLSL}\nvarying vec3 vWoodPos;`
      )
      .replace(
        "#include <color_fragment>",
        /* glsl */ `
        #include <color_fragment>
        // dunkle Streifen wie echte Eichenrinde
        float streak = fbm(vec3(vWoodPos.x * 7.0, vWoodPos.y * 0.9, vWoodPos.z * 7.0));
        diffuseColor.rgb *= mix(0.65, 1.2, streak);
        `
      );
    mat.userData.shader = shader;
  };
  return mat;
}

/**
 * Brett-Material mit Jahresringen, Maserung und Hobel-Lichtkante.
 * Uniforms (per userData.shader von außen animierbar):
 *  - uSweep:      x-Position der Lichtkante in Objektkoordinaten
 *                 (-2.0 = noch nichts gehobelt, +2.0 = fertig)
 *  - uSweepGlow:  0–1, Intensität der leuchtenden Kante (Technik-Petrol)
 *  - uRingShift:  variiert die Ringe pro Brett, damit nicht alle gleich aussehen
 */
export function createBoardMaterial(ringShift = 0) {
  const mat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#c49a6c"),
    roughness: 0.9,
    metalness: 0,
    transparent: true,
    clearcoat: 0,
    clearcoatRoughness: 0.35,
  });

  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uSweep = { value: -2.0 };
    shader.uniforms.uSweepGlow = { value: 0.0 };
    shader.uniforms.uRingShift = { value: ringShift };

    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vWoodPos;")
      .replace(
        "#include <begin_vertex>",
        "#include <begin_vertex>\nvWoodPos = position;"
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        /* glsl */ `#include <common>
        ${NOISE_GLSL}
        varying vec3 vWoodPos;
        uniform float uSweep;
        uniform float uSweepGlow;
        uniform float uRingShift;`
      )
      .replace(
        "#include <color_fragment>",
        /* glsl */ `
        #include <color_fragment>
        // Jahresringe: radiale Distanz im Querschnitt (y/z-Ebene, Brett liegt
        // entlang x). Auf den Stirnseiten ergibt das Ringe, auf den Längs-
        // seiten gestreckte Maserungsbänder – wie bei echtem Schnittholz.
        float wob = fbm(vWoodPos * 3.0) * 0.35;
        float d = length(vec2(vWoodPos.y * 2.2, vWoodPos.z)) + wob + uRingShift;
        float rings = 0.5 + 0.5 * sin(d * 34.0);
        rings = smoothstep(0.25, 0.95, rings);
        // feine Längsmaserung
        float grain = fbm(vec3(vWoodPos.x * 2.0, vWoodPos.y * 16.0, vWoodPos.z * 16.0));
        diffuseColor.rgb *= mix(0.78, 1.0, rings) * mix(0.88, 1.08, grain);

        // Hobel-Fortschritt: links der Lichtkante ist die Fläche „fertig“
        float done = 1.0 - smoothstep(uSweep - 0.12, uSweep + 0.12, vWoodPos.x);
        // fertige Fläche: Maserung tritt goldwarm hervor
        diffuseColor.rgb = mix(diffuseColor.rgb,
                               diffuseColor.rgb * vec3(1.1, 1.02, 0.9), done);
        `
      )
      .replace(
        "#include <roughnessmap_fragment>",
        /* glsl */ `
        #include <roughnessmap_fragment>
        // Shader-Blend der Rauheit: 0.9 (sägerau) → 0.35 (gehobelt/geschliffen)
        float doneR = 1.0 - smoothstep(uSweep - 0.12, uSweep + 0.12, vWoodPos.x);
        roughnessFactor = mix(0.9, 0.35, doneR);
        `
      )
      .replace(
        "#include <emissivemap_fragment>",
        /* glsl */ `
        #include <emissivemap_fragment>
        // die leuchtende Präzisions-Kante selbst (Technik-Petrol, sparsam!)
        float edge = 1.0 - smoothstep(0.0, 0.09, abs(vWoodPos.x - uSweep));
        totalEmissiveRadiance += vec3(0.12, 0.48, 0.45) * edge * uSweepGlow;
        `
      );
    mat.userData.shader = shader;
  };
  return mat;
}

/** Dunkleres Holz für die Tischbeine (Nussbaum-Ton). */
export function createLegMaterial() {
  const mat = createBoardMaterial(0.4);
  mat.color = new THREE.Color("#5f4432");
  return mat;
}
