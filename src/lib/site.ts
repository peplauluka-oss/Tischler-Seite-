/**
 * Absolute Adresse der Seite — nötig für Open Graph und strukturierte Daten,
 * die relative Pfade nicht auflösen können.
 *
 * Vorgabe ist die aktuelle Vorschau; ein Deploy unter eigener Domain setzt
 * NEXT_PUBLIC_SITE_URL und braucht keine Codeänderung.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://peplauluka-oss.github.io/Tischler-Seite-";

export function absolute(path: string): string {
  return `${SITE_URL.replace(/\/$/, "")}${path}`;
}
