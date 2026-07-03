"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { introProgress, detectDeviceTier, type DeviceTier } from "./progress";

const LogCanvas = dynamic(() => import("./LogCanvas"), { ssr: false });

/** Länge der Intro-Strecke in Viewport-Höhen */
const TRACK_VH = 340;

/**
 * IntroStage — die Bühne der Swipe-Interaktion.
 *
 * Aufbau: ein 340vh hoher Track; darin klebt (sticky) ein 100vh-Screen
 * mit dem Canvas (z-0) und den HTML-Overlays (z-10, echtes HTML → SEO).
 * Ein ScrollTrigger (scrub) mappt den Track auf Fortschritt 0–1.
 *
 * Overlays in drei Phasen (data-intro-phase):
 *  a — Headline + CTAs (sichtbar am Anfang, blendet beim Aufbrechen aus)
 *  b — schwebende CAD-Labels während des Aufbrechens
 *  c — Abbinder „Drei Wege zu Ihrem Werkstück“ am Ende der Strecke
 *
 * Fallback: SSR / kein JS / reduced motion / kein WebGL → .story-static:
 *  der Track kollabiert auf einen normalen 100svh-Hero mit statischem
 *  Keyvisual, Phase b/c werden ausgeblendet. Kein Canvas, keine Kopplung.
 */
export default function IntroStage({ children }: { children: React.ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [tier, setTier] = useState<DeviceTier>("off");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTier(detectDeviceTier());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || tier === "off" || !trackRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    /* Smooth Scrolling / Swipe-Trägheit (nutzt nativen Scroll → sticky ok) */
    const lenis = new Lenis({ lerp: 0.11 });
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    const ctx = gsap.context((self) => {
      ScrollTrigger.create({
        trigger: trackRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (st) => introProgress.set(st.progress),
      });

      const q = (sel: string) => self.selector!(sel) as HTMLElement[];

      /* EINE Master-Timeline, gescrubbt über die komplette Strecke —
         Positionen 0–1 entsprechen exakt dem introProgress der Szene. */
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: trackRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      /* Phase a: Headline ist beim Laden voll da (LCP!), nur ausblenden */
      q('[data-intro-phase="a"]').forEach((el) => {
        tl.to(el, { opacity: 0, y: -46, duration: 0.1 }, 0.05);
      });

      /* Phase b: CAD-Labels schweben während des Aufbrechens ein/aus */
      q('[data-intro-phase="b"]').forEach((el, i) => {
        const at = 0.2 + i * 0.05;
        tl.fromTo(el, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.1 }, at)
          .to(el, { opacity: 0, y: -26, duration: 0.1 }, at + 0.32);
      });

      /* Phase c: der Abbinder */
      q('[data-intro-phase="c"]').forEach((el) => {
        tl.fromTo(el, { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.12 }, 0.85);
      });
    }, trackRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [ready, tier]);

  const is3d = ready && tier !== "off";

  return (
    <div id="intro" className={is3d ? "story-3d" : "story-static"}>
      <div
        ref={trackRef}
        className="intro-track intro-dark-bg on-dark relative text-cream"
        style={{ height: `${TRACK_VH}vh` }}
      >
        <div className="intro-sticky sticky top-0 h-screen overflow-hidden">
          {/* Canvas hinter den Overlays */}
          {is3d && (
            <div className="absolute inset-0 z-0" aria-hidden="true">
              <LogCanvas tier={tier} />
            </div>
          )}
          {/* Lesbarkeits-Scrim: dunkelt die untere Kante hinter dem Text ab */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 z-[5] h-[45%] bg-gradient-to-t from-espresso/85 via-espresso/35 to-transparent"
          />
          {/* HTML-Overlays (echtes HTML, SEO & Screenreader) */}
          <div className="relative z-10 h-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
