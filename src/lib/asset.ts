/**
 * Präfix für statische Dateien aus /public.
 *
 * Nötig, weil das Projekt zwei Deploy-Ziele hat: Vercel (Root) und der
 * GitHub-Pages-Export unter /<repo-name>/. `next/image` hängt den basePath
 * bei `unoptimized` nicht selbst an — deshalb laufen Bilder, Video und
 * Poster ausnahmslos über diesen Helfer.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}
