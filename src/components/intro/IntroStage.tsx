"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { introProgress, detectDeviceTier, type DeviceTier } from "./progress";

const IntroCanvas = dynamic(() => import("./IntroCanvas"), { ssr: false });

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
    /* 3D erst bei der ERSTEN Nutzer-Interaktion aktivieren (Mausbewegung,
       Touch, Scroll) — der erste Paint + Interaktivität (LCP/TBT/TTI)
       gehören komplett dem HTML. Reale Besucher interagieren innerhalb
       von Millisekunden; als Fallback lädt die Szene spätestens nach 8 s
       Leerlauf. Bis dahin zeigt der Hero das statische Keyvisual. */
    let done = false;
    const events = ["pointermove", "pointerdown", "touchstart", "wheel", "keydown", "scroll"] as const;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const activate = () => {
      if (done) return;
      done = true;
      events.forEach((ev) => window.removeEventListener(ev, activate));
      if (timer) clearTimeout(timer);
      setTier(detectDeviceTier());
      setReady(true);
    };
    events.forEach((ev) => window.addEventListener(ev, activate, { passive: true }));
    timer = setTimeout(activate, 8000);
    return () => {
      events.forEach((ev) => window.removeEventListener(ev, activate));
      if (timer) clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!ready || tier === "off" || !trackRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    /* Smooth Scrolling / Swipe-Trägheit (nutzt nativen Scroll → sticky ok).
       WICHTIG für Performance: Der rAF-Loop läuft NICHT permanent, sondern
       nur bei Aktivität (Eingabe + 1,5 s Nachlauf bzw. solange Lenis
       animiert). Ein dauerhaft wacher Main Thread würde TBT/TTI ruinieren. */
    const lenis = new Lenis({ lerp: 0.11 });
    lenis.on("scroll", ScrollTrigger.update);

    let rafId = 0;
    let wakeUntil = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      if (performance.now() < wakeUntil || lenis.isScrolling) {
        rafId = requestAnimationFrame(loop);
      } else {
        rafId = 0;
      }
    };
    const wake = () => {
      wakeUntil = performance.now() + 1500;
      if (!rafId) rafId = requestAnimationFrame(loop);
    };
    const wakeEvents = ["wheel", "touchstart", "touchmove", "pointerdown", "keydown"] as const;
    wakeEvents.forEach((ev) => window.addEventListener(ev, wake, { passive: true }));
    wake(); // initialer Kick (z. B. für Anker-Navigation)

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

      /* Phase a: Headline ist beim Laden voll da (LCP!), nur ausblenden —
         sie verschwindet, während der erste Schnitt öffnet. */
      q('[data-intro-phase="a"]').forEach((el) => {
        tl.to(el, { opacity: 0, y: -40, duration: 0.09 }, 0.07);
      });

      /* Zwischentexte: jedes Element bringt sein Fenster als
         data-win="start,ende" mit (Anteile der Gesamtstrecke 0–1).
         Nur transform + opacity, kurze Wege — ruhig, nicht zappelig. */
      q("[data-win]").forEach((el) => {
        const [a, b] = (el.dataset.win ?? "0,1").split(",").map(Number);
        const d = Math.max(b - a, 0.08);
        tl.fromTo(el, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: d * 0.35 }, a)
          .to(el, { opacity: 0, y: -22, duration: d * 0.35 }, b - d * 0.35);
      });

      /* Phase c: der Abbinder im dunklen Raum */
      q('[data-intro-phase="c"]').forEach((el) => {
        tl.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.1 }, 0.88);
      });
    }, trackRef);

    return () => {
      ctx.revert();
      wakeEvents.forEach((ev) => window.removeEventListener(ev, wake));
      if (rafId) cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [ready, tier]);

  const is3d = ready && tier !== "off";

  return (
    <div id="intro" className={is3d ? "story-3d" : "story-static"}>
      <div
        ref={trackRef}
        className="intro-track relative"
        style={{ height: `${TRACK_VH}vh` }}
      >
        {/* Vor dem 3D-Start (und im statischen Fallback) zeigt die Bühne
            eine CSS-Holzwand — der Canvas malt dann dasselbe Motiv darüber. */}
        <div className="intro-sticky intro-wood-bg sticky top-0 h-screen overflow-hidden">
          {is3d && (
            <div className="absolute inset-0 z-0" aria-hidden="true">
              <IntroCanvas tier={tier} />
            </div>
          )}
          {/* HTML-Overlays (echtes HTML, SEO & Screenreader) */}
          <div className="relative z-10 h-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
