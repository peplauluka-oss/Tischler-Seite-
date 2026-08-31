"use client";

import { useEffect, useLayoutEffect } from "react";

/** `useLayoutEffect` ohne SSR-Warnung — nötig, damit GSAP seine Startwerte
    noch vor dem ersten Paint setzt (kein Aufblitzen des Endzustands). */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
