import * as THREE from "three";

/**
 * Das Material der Stamm-Scheiben — vollständig prozedural, kein einziges
 * Textur-Asset. Ein Shader rendert BEIDES:
 *
 *  - Mantelfläche → Eichenrinde: fbm-Noise verformt die Silhouette radial
 *    (wasserdicht, weil rein positionsabhängig) und zeichnet dunkle,
 *    längs laufende Furchen.
 *  - Stirnflächen (Kappen) → Stirnholz: konzentrische Jahresringe mit
 *    Noise-Wobble, warmer Farbverlauf von Kern zu Splint. Über uGlow
 *    „glüht“ das frisch aufgebrochene Holz von innen (Akzent des Reveals).
 *
 * uShift verschiebt die Noise-Koordinaten pro Scheibe so, dass Rinde und
 * Ringe über alle Scheiben hinweg EIN durchgehender Stamm bleiben.
 */

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
      mix(mix(hash3(i), hash3(i + vec3(1,0,0)), f.x),
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
      p = p * 2.03 + vec3(19.1);
      a *= 0.5;
    }
    return v;
  }
  /* Höhenprofil der Borke — identisch in Vertex (Displacement) und
     Fragment (Bump-Shading), damit Silhouette und Licht zusammenpassen. */
  float barkH(vec3 p, float shift) {
    float plates = fbm(vec3(p.x * 3.6, (p.y + shift) * 1.1, p.z * 3.6));
    float furrows = fbm(vec3(p.x * 9.0, (p.y + shift) * 1.8, p.z * 9.0));
    return (plates - 0.5) * 0.1 + (furrows - 0.5) * 0.045;
  }
`;

export type SliceShader = THREE.WebGLProgramParametersWithUniforms;

export function createSliceMaterial(shift: number) {
  const mat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff, // Albedo kommt komplett aus dem Shader
    roughness: 1,
    metalness: 0,
    clearcoat: 0,
    clearcoatRoughness: 0.4,
  });

  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uShift = { value: shift };
    shader.uniforms.uGlow = { value: 0 };

    shader.vertexShader = shader.vertexShader
      .replace(
        "#include <common>",
        `#include <common>
        ${NOISE_GLSL}
        uniform float uShift;
        varying vec3 vWoodPos;
        varying vec3 vWoodNormal;`
      )
      .replace(
        /* WICHTIG: beginnormal_vertex läuft VOR defaultnormal_vertex —
           nur hier wirkt sich die Normalen-Korrektur aufs Licht aus. */
        "#include <beginnormal_vertex>",
        /* glsl */ `
        #include <beginnormal_vertex>
        float woodR = length(position.xz);
        float woodH0 = 0.0;
        vec3 woodRadial = vec3(0.0);
        float woodRim = 0.0;
        if (woodR > 0.0001) {
          woodRadial = vec3(position.x, 0.0, position.z) / woodR;
          woodRim = smoothstep(0.15, 0.5, woodR); // Kappen-Zentrum bleibt plan
          woodH0 = barkH(position, uShift);

          // Analytische Normalen fürs Borken-Relief: Höhengradient entlang
          // der Stammachse und um den Umfang in die Vertex-Normale
          // eingerechnet (kein Screen-Space-Aliasing).
          float e = 0.03;
          vec3 around = normalize(cross(vec3(0.0, 1.0, 0.0), woodRadial));
          float hY = barkH(position + vec3(0.0, e, 0.0), uShift);
          float hA = barkH(position + around * e, uShift);
          vec3 slope = (vec3(0.0, 1.0, 0.0) * (hY - woodH0) + around * (hA - woodH0)) / e;
          float sideMask = 1.0 - step(0.9, abs(normal.y));
          objectNormal = normalize(objectNormal - slope * 1.6 * woodRim * sideMask);
        }
        `
      )
      .replace(
        "#include <begin_vertex>",
        /* glsl */ `
        vec3 transformed = vec3(position);
        // Rinde: rein positionsabhängige, radiale Verformung → die Kanten
        // von Mantel und Kappe verschieben sich identisch (wasserdicht).
        transformed += woodRadial * woodH0 * woodRim;
        vWoodPos = position;
        vWoodNormal = normal;
        `
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
        ${NOISE_GLSL}
        uniform float uShift;
        uniform float uGlow;
        varying vec3 vWoodPos;
        varying vec3 vWoodNormal;`
      )
      .replace(
        "#include <color_fragment>",
        /* glsl */ `
        #include <color_fragment>
        // Kappen (Stirnholz) vs. Mantel (Rinde) über die Objekt-Normale
        float capMask = smoothstep(0.82, 0.94, abs(vWoodNormal.y));

        // --- Rinde -------------------------------------------------------
        // Borkenplatten (hell) mit tiefen, dunklen Furchen dazwischen +
        // faserige Längsstreifen — Eichenborke, keine glatte Karamellwalze.
        float plates = fbm(vec3(vWoodPos.x * 3.6, (vWoodPos.y + uShift) * 1.1, vWoodPos.z * 3.6));
        float furrow = fbm(vec3(vWoodPos.x * 9.0, (vWoodPos.y + uShift) * 1.8, vWoodPos.z * 9.0));
        float fibre  = fbm(vec3(vWoodPos.x * 22.0, (vWoodPos.y + uShift) * 2.5, vWoodPos.z * 22.0));
        float crevice = smoothstep(0.55, 0.25, furrow); // 1 = tiefe Furche
        vec3 barkCol = mix(vec3(0.295, 0.212, 0.132), vec3(0.135, 0.092, 0.056), crevice);
        barkCol *= mix(0.88, 1.14, plates);
        barkCol *= mix(0.95, 1.05, fibre);
        // Flechten-Hauch auf den erhabenen Platten
        float lichen = fbm(vec3(vWoodPos.x * 2.0, (vWoodPos.y + uShift) * 0.5, vWoodPos.z * 2.0));
        barkCol = mix(barkCol, vec3(0.36, 0.33, 0.22), smoothstep(0.68, 0.9, lichen) * (1.0 - crevice) * 0.3);

        // --- Stirnholz (Jahresringe) --------------------------------------
        float rr = length(vWoodPos.xz);
        float wob = fbm(vec3(vWoodPos.x * 3.5, uShift, vWoodPos.z * 3.5)) * 0.14;
        float ringT = rr + wob;
        float rings = 0.5 + 0.5 * sin(ringT * 68.0);
        rings = smoothstep(0.3, 0.78, rings);
        float radialFade = smoothstep(0.62, 0.1, rr); // Kern heller als Rand
        vec3 grainLight = vec3(0.87, 0.68, 0.46);
        vec3 grainDark  = vec3(0.45, 0.29, 0.17);
        vec3 grainCol = mix(grainDark, grainLight, rings * 0.6 + radialFade * 0.4);
        // feine radiale Markstrahlen
        float rays = 0.5 + 0.5 * sin(atan(vWoodPos.z, vWoodPos.x) * 60.0 + uShift * 10.0);
        grainCol *= mix(0.94, 1.04, rays * smoothstep(0.1, 0.4, rr));
        // Rindenring am Rand der Schnittfläche
        grainCol = mix(grainCol, barkCol, smoothstep(0.52, 0.6, rr));

        diffuseColor.rgb = mix(barkCol, grainCol, capMask);
        `
      )
      .replace(
        "#include <roughnessmap_fragment>",
        /* glsl */ `
        #include <roughnessmap_fragment>
        float capR = smoothstep(0.82, 0.94, abs(vWoodNormal.y));
        // Rinde stumpf, frisch geschnittenes Stirnholz seidiger
        roughnessFactor = mix(0.97, 0.62, capR);
        `
      )
      .replace(
        "#include <emissivemap_fragment>",
        /* glsl */ `
        #include <emissivemap_fragment>
        // Das Innere glüht warm auf, während der Stamm aufbricht
        float capE = smoothstep(0.82, 0.94, abs(vWoodNormal.y));
        float rrE = length(vWoodPos.xz);
        float core = smoothstep(0.6, 0.05, rrE);
        totalEmissiveRadiance += vec3(1.0, 0.45, 0.16) * capE * core * uGlow * 0.55;
        `
      );

    mat.userData.shader = shader;
  };

  return mat;
}
