"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { STORY_VH } from "./acts";
import { storyProgress, detectDeviceTier, type DeviceTier } from "./progress";

/**
 * Das 3D-Bundle wird lazy geladen (next/dynamic, kein SSR):
 * Der erste Paint – die Hero-Headline als LCP-Element – ist reines HTML
 * und wartet NIE auf Three.js.
 */
const StoryCanvas = dynamic(() => import("./StoryCanvas"), { ssr: false });

/**
 * StoryStage – die Bühne der Scroll-Story.
 *
 * Aufbau (siehe auch acts.ts):
 *  - Ein fixierter Fullscreen-Canvas (z-0) liegt HINTER den scrollenden
 *    DOM-Sektionen (z-10). Aller Text bleibt echtes HTML.
 *  - Der Wrapper ist 700vh hoch; ein Master-ScrollTrigger (scrub) mappt
 *    die Strecke auf einen Fortschritt 0–1 im storyProgress-Store.
 *  - Jede Sektion ([data-act]) blendet synchron zu ihrem Akt ein/aus.
 *
 * Fallback-Kaskade:
 *  - SSR / kein JS / reduced motion / kein WebGL → Klasse "story-static":
 *    statische Keyvisuals pro Sektion sind sichtbar, kein Canvas,
 *    keine Scroll-Kopplung.
 *  - Erst wenn ein fähiges Gerät erkannt wurde, wird "story-3d" gesetzt
 *    und das 3D-Bundle geladen.
 */
export default function StoryStage({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const [tier, setTier] = useState<DeviceTier>("off");
  const [ready, setReady] = useState(false);

  /* Geräte-Erkennung nur im Browser – SSR bleibt statisch. */
  useEffect(() => {
    setTier(detectDeviceTier());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || tier === "off" || !wrapperRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    /* Smooth Scrolling (Lenis) – nutzt nativen Scroll, daher bleibt
       position:sticky in den Sektionen voll funktionsfähig. */
    const lenis = new Lenis({ lerp: 0.12 });
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    const ctx = gsap.context(() => {
      /* Master-ScrollTrigger: normalisierter Fortschritt 0–1 über 700vh.
         scrub:true → die GESAMTE Choreografie hängt nur am Scrollweg,
         vor- und zurückscrollen funktioniert damit immer sauber. */
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => storyProgress.set(self.progress),
      });

      /* Sektionen synchron zum Akt ein-/ausblenden
         (Opacity + leichtes Y-Translate, echtes HTML bleibt im DOM). */
      gsap.utils.toArray<HTMLElement>("[data-act-content]").forEach((el, i) => {
        const slot = el.parentElement!;
        if (i === 0) {
          /* Hero: ist das LCP-Element und beim Laden IMMER sichtbar –
             deshalb nur ausblenden, nie einblenden. */
          gsap.to(el, {
            opacity: 0,
            y: -40,
            ease: "none",
            scrollTrigger: {
              trigger: slot,
              start: "bottom 60%",
              end: "bottom 20%",
              scrub: true,
            },
          });
          return;
        }
        gsap
          .timeline({
            scrollTrigger: {
              trigger: slot,
              start: "top 85%",
              end: "bottom 15%",
              scrub: true,
            },
          })
          .fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.25, ease: "none" })
          .to(el, { opacity: 1, duration: 0.5, ease: "none" })
          .to(el, { opacity: 0, y: -40, duration: 0.25, ease: "none" });
      });

      /* Am Ende der Story löst sich der Canvas sanft auf und gibt den
         normalen Seitenfluss (Kontakt, FAQ, Footer) frei. */
      if (canvasWrapRef.current) {
        gsap.to(canvasWrapRef.current, {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "97% bottom",
            end: "bottom bottom",
            scrub: true,
          },
        });
      }
    }, wrapperRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [ready, tier]);

  const is3d = ready && tier !== "off";

  return (
    <div className={is3d ? "story-3d" : "story-static"}>
      {/* Fixierter Canvas hinter allen Sektionen (z-0) */}
      {is3d && (
        <div
          ref={canvasWrapRef}
          className="fixed inset-0 z-0"
          aria-hidden="true"
        >
          <StoryCanvas tier={tier} />
        </div>
      )}

      {/* Story-Strecke: 700vh, Sektionen absolut in ihren Akt-Fenstern */}
      <div
        ref={wrapperRef}
        className="relative z-10"
        style={{ height: `${STORY_VH}vh` }}
      >
        {children}
      </div>
    </div>
  );
}
