"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroVideo from "@/components/hero/HeroVideo";
import HeroBrandBar from "@/components/hero/HeroBrandBar";
import HeroCaption from "@/components/hero/HeroCaption";
import EventLayer from "@/components/hero/EventLayer";
import { images } from "@/content/club";
import { event } from "@/content/event";
import { asset } from "@/lib/asset";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

gsap.registerPlugin(ScrollTrigger);

/* Zeitachse der Hero-Choreografie (0 = Ankunft, 1 = Ende der Strecke).
   Eine einzige Timeline — keine unabhängigen Einzelanimationen.

   Der Hero ist eine Bühne, kein Abschnitt. Er hat zwei Zustände: die
   Clubwelt und das Event. Der Scroll navigiert zwischen ihnen nicht, er
   blendet sie ineinander — derselbe Viewport, anderer Inhalt. */
const CUE = {
  scrollCueOut: 0.02,
  brandOut: 0.07,
  navIn: 0.12,
  videoRecedes: 0.18,
  depthIn: 0.28,
  caption: 0.36,
  navOut: 0.46,
  dissolve: 0.5,
  navBack: 0.99,
};

/** Dauer der Verpuffung in Fortschritt — kurz, damit sie wie ein Impact wirkt. */
const DISSOLVE = 0.11;

/** Die Blende: harte Kante mit einem Hauch Feder, damit sie reißt statt zu faden. */
const MASK =
  "radial-gradient(circle at 50% 46%, transparent calc(var(--reveal) - 13%), #000 var(--reveal))";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [eventOn, setEventOn] = useState(false);
  const hasEvent = event.active;

  useIsomorphicLayoutEffect(() => {
    const section = root.current;
    const stageEl = stage.current;
    if (!section || !stageEl) return;

    /* Scrollweg der Bühne: So lang ist die Strecke, über die die Timeline
       von 0 auf 1 läuft, während der Hero am oberen Rand klebt. */
    const trackLen = () =>
      Math.max(1, section.offsetHeight - stageEl.clientHeight);

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        isMobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean };
        const q = gsap.utils.selector(section);

        const world = q("[data-hero-world]")[0] as HTMLElement;
        const panel = q("[data-hero-video-panel]")[0] as HTMLElement;
        const veil = q("[data-hero-veil]")[0];
        const ambient = q("[data-hero-ambient]")[0];
        const scrim = q("[data-hero-scrim]");
        const depth = q("[data-hero-depth]");
        const lockup = q("[data-hero-lockup]")[0] as HTMLElement;
        const brandbar = q("[data-hero-brandbar]");
        const cue = q("[data-hero-cue]");
        const content = q("[data-hero-content]");

        // Die Navigation liegt außerhalb des Hero — sie wird bewusst von
        // derselben Timeline gesteuert, damit die Übergabe Logo → Navigation
        // eine Bewegung ist und nicht zwei.
        const navShell = document.querySelector("[data-nav-shell]");
        const navBg = document.querySelector("[data-nav-bg]");

        /** Ankunftsgeometrie der Videofläche: formatfüllend hoch, mittig. */
        const arrival = () => {
          const stageH = stageEl.clientHeight;
          const stageW = stageEl.clientWidth;
          return {
            scale: isDesktop ? (stageH / panel.offsetHeight) * 1.06 : 1.09,
            x: isDesktop
              ? stageW / 2 - (panel.offsetLeft + panel.offsetWidth / 2)
              : 0,
          };
        };

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.65,
            invalidateOnRefresh: true,
          },
        });

        /* 01 — ANKUNFT: nur der Scrollhinweis verabschiedet sich. */
        tl.to(cue, { opacity: 0, y: 12, duration: 0.08 }, CUE.scrollCueOut);

        /* 02 — LOGO → NAVIGATION: die Wortmarke wandert nach links und
               verblasst, während die Navigation an derselben Kante erscheint. */
        tl.fromTo(
          brandbar,
          { opacity: 1 },
          { opacity: 0, duration: 0.14 },
          CUE.brandOut,
        )
          .fromTo(
            lockup,
            { x: 0, scale: 1, filter: "blur(0px)" },
            {
              x: () => -(lockup.offsetLeft - (isDesktop ? 32 : 20)),
              scale: 0.82,
              filter: "blur(4px)",
              duration: 0.16,
            },
            CUE.brandOut,
          )
          .fromTo(
            navShell,
            { opacity: 0, y: -14 },
            { opacity: 1, y: 0, duration: 0.13 },
            CUE.navIn,
          )
          .fromTo(
            navBg,
            { opacity: 0 },
            { opacity: 1, duration: 0.16 },
            CUE.navIn + 0.03,
          );

        /* 03 — DAS VIDEO GIBT NACH: es verschwindet nicht, es tritt zurück. */
        tl.fromTo(
          panel,
          { scale: () => arrival().scale, x: () => arrival().x },
          { scale: 1, x: 0, duration: 0.36 },
          CUE.videoRecedes,
        )
          .fromTo(
            veil,
            { opacity: 0 },
            { opacity: isDesktop ? 0.5 : 0.86, duration: 0.3 },
            CUE.videoRecedes + 0.04,
          )
          .fromTo(
            ambient,
            { opacity: 0.55 },
            { opacity: 0.16, duration: 0.3 },
            CUE.videoRecedes,
          )
          .fromTo(
            scrim,
            { opacity: 0 },
            { opacity: 1, duration: 0.26 },
            CUE.videoRecedes + 0.08,
          );

        /* 04 — TIEFE: eine zweite Bildebene schiebt sich hinter das Video. */
        if (isDesktop) {
          tl.fromTo(
            depth,
            { opacity: 0, yPercent: 14, scale: 1.06 },
            { opacity: 0.3, yPercent: 0, scale: 1, duration: 0.3 },
            CUE.depthIn,
          );
        }

        /* 05 — DER ORT tritt auf. */
        tl.fromTo(
          q("[data-reveal='caption']"),
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.07, stagger: 0.018 },
          CUE.caption,
        );

        /* Parallaxe: Inhalt läuft minimal langsamer als das Bild. */
        tl.fromTo(
          content,
          { y: isDesktop ? 56 : 34 },
          { y: 0, duration: 0.5 },
          CUE.videoRecedes,
        );

        if (!hasEvent) return;

        /* 06 — DIE VERWANDLUNG.
               Die Clubwelt verpufft: Sie wird unscharf, dehnt sich leicht und
               löst sich auf. Darunter liegt das Event längst fertig — deshalb
               entsteht kein schwarzer Zwischenmoment, keine Lücke und kein
               zweiter Screen. Der goldene Impact des Creatives läuft genau
               jetzt an; er ist der Übergang.

               Die Navigation geht kurz vorher, sonst läge sie über dem Logo
               im Creative — und aus dem Moment würde wieder ein Video in
               einer Website. */
        tl.to(navShell, { opacity: 0, duration: 0.05 }, CUE.navOut)
          /* Keine Überblendung: Ein dunkles Bild, das über ein helles
             wegblendet, hat zwangsläufig eine trübe Mitte — genau der
             schwarze Zwischenmoment, den es nicht geben soll. Stattdessen
             reißt die Welt auf. Jeder Punkt zeigt entweder Club oder Event,
             nie eine Mischung aus beidem. Die Blende öffnet dort, wo im
             Clip gleich der goldene Impact steht. */
          .set(world, { maskImage: MASK, webkitMaskImage: MASK }, CUE.dissolve)
          .fromTo(
            world,
            { "--reveal": "0%" },
            { "--reveal": "165%", duration: DISSOLVE, ease: "power2.in" },
            CUE.dissolve,
          )
          /* Was noch am Rand steht, verpufft: unscharf, gedehnt, überstrahlt.
             Der Startwert steht ausgeschrieben da — von `none` aus fängt GSAP
             bei brightness(0) an und schwärzt das Bild einen Moment lang. */
          .fromTo(
            world,
            { scale: 1, filter: "blur(0px) brightness(1)" },
            {
              scale: 1.06,
              filter: `blur(${isDesktop ? 22 : 14}px) brightness(1.6)`,
              duration: DISSOLVE,
              ease: "power2.in",
              immediateRender: false,
            },
            CUE.dissolve,
          )
          .to(
            world,
            { opacity: 0, duration: DISSOLVE * 0.3 },
            CUE.dissolve + DISSOLVE * 0.7,
          );

        /* Erst wenn die Bühne weiterzieht, ist die Navigation wieder da:
           Solange das Creative den Bildschirm hat, läge sie über dessen
           eigenem Logo. */
        tl.to(navShell, { opacity: 1, duration: 0.01 }, CUE.navBack);

        /* Der Zustandswechsel selbst: Er startet den Clip und nimmt der
           verpufften Welt Zeiger und Tastatur ab. */
        const gate = ScrollTrigger.create({
          trigger: section,
          start: () => `top+=${CUE.dissolve * trackLen()} top`,
          /* Bis die Bühne wirklich aus dem Bild ist — nicht schon, wenn die
             Timeline durch ist: Sonst stünde der Clip still, während er noch
             bildschirmfüllend zu sehen ist. */
          end: "bottom top",
          invalidateOnRefresh: true,
          onToggle: (self) => setEventOn(self.isActive),
        });

        return () => {
          gate.kill();
          setEventOn(false);
        };
      },
    );

    /* Reduzierte Bewegung: dieselbe Dramaturgie, aber ohne Verlauf. Die
       Welt wird an einem Punkt schlicht ausgetauscht — ein Zustandswechsel,
       keine Animation. */
    mm.add("(prefers-reduced-motion: reduce)", () => {
      if (!hasEvent) return;
      const world = section.querySelector("[data-hero-world]");
      const navShell = document.querySelector("[data-nav-shell]");

      const gate = ScrollTrigger.create({
        trigger: section,
        start: () => `top+=${0.45 * trackLen()} top`,
        end: "bottom top",
        invalidateOnRefresh: true,
        onToggle: (self) => {
          setEventOn(self.isActive);
          gsap.set([world, navShell], { opacity: self.isActive ? 0 : 1 });
        },
      });

      return () => {
        gate.kill();
        gsap.set([world, navShell], { opacity: 1 });
        setEventOn(false);
      };
    });

    return () => mm.revert();
  }, [hasEvent]);

  /* Zwei gleichzeitig dekodierende Videos wären auf dem Telefon spürbar:
     Sobald der Hero ins Event gekippt ist, ruht der Clubclip. */
  useIsomorphicLayoutEffect(() => {
    const video = root.current?.querySelector<HTMLVideoElement>(
      "[data-hero-video-panel] video",
    );
    if (!video) return;
    if (eventOn) {
      video.pause();
    } else if (video.dataset.userPaused !== "true") {
      void video.play().catch(() => {});
    }
  }, [eventOn]);

  return (
    <section
      id="top"
      ref={root}
      className={`hero-scroll relative ${
        hasEvent ? "h-[300svh] md:h-[340svh]" : "h-[200svh] md:h-[230svh]"
      }`}
    >
      {/* Sprungmarke für „EVENT“: kein eigener Abschnitt, sondern der
          Abschnitt der Hero-Strecke, in dem der Hero das Event ist. */}
      {hasEvent && (
        <div
          id="event"
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 top-1/2"
        />
      )}

      <div
        ref={stage}
        className="sticky top-0 h-[100svh] w-full overflow-hidden bg-void"
      >
        {/* ---- ZUSTAND 2: DAS EVENT ------------------------------------
            Liegt unter der Clubwelt und ist fertig gezeichnet, bevor sie
            verpufft. Deshalb gibt es keinen Übergangsscreen. */}
        {hasEvent && <EventLayer active={eventOn} />}

        {/* ---- ZUSTAND 1: DIE CLUBWELT ---------------------------------
            Eine geschlossene, deckende Ebene: Sie wird als Ganzes unscharf
            und löst sich auf — nicht Element für Element. */}
        <div
          data-hero-world
          className={`absolute inset-0 z-20 bg-void ${
            eventOn ? "pointer-events-none" : ""
          }`}
          style={
            {
              willChange: "opacity, filter, transform",
              "--reveal": "0%",
            } as React.CSSProperties
          }
        >
          <HeroVideo />

          {/* Tiefenebene: ein zweites Clubbild hinter der Videofläche. */}
          <div
            data-hero-depth
            aria-hidden="true"
            className="absolute right-[24vw] top-[15svh] z-10 hidden h-[54svh] w-[34svh] opacity-30 md:block"
            style={{
              willChange: "transform",
              maskImage:
                "linear-gradient(90deg, transparent 0%, #000 42%, #000 100%)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent 0%, #000 42%, #000 100%)",
            }}
          >
            <Image
              src={asset(images.tresen.src)}
              alt=""
              fill
              sizes="30vh"
              className="graded-strong object-cover"
              placeholder="blur"
              blurDataURL={images.tresen.lqip}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/25 to-void" />
          </div>

          {/* Lesbarkeitsschicht — Desktop von links, Mobil von unten. */}
          <div
            data-hero-scrim
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-25 hidden md:block"
            style={{
              background:
                "linear-gradient(90deg, rgba(5,4,6,0.96) 0%, rgba(5,4,6,0.82) 34%, rgba(5,4,6,0.25) 58%, transparent 78%)",
            }}
          />
          <div
            data-hero-scrim
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-25 md:hidden"
            style={{
              background:
                "linear-gradient(0deg, rgba(5,4,6,0.97) 6%, rgba(5,4,6,0.72) 46%, rgba(5,4,6,0.35) 72%, rgba(5,4,6,0.55) 100%)",
            }}
          />

          <HeroBrandBar />

          <div
            data-hero-content
            className="absolute inset-0 z-30 flex items-end pb-14 pt-20 md:items-center md:pb-0 md:pt-0"
            style={{ willChange: "transform" }}
          >
            <div className="w-full px-5 md:px-[7vw]">
              <HeroCaption />
            </div>
          </div>

          {/* Scrollhinweis — nur im Ankunftszustand. */}
          <div
            data-hero-cue
            className="pointer-events-none absolute inset-x-0 bottom-6 z-40 flex flex-col items-center gap-3"
            aria-hidden="true"
          >
            <span className="label text-[0.5625rem]">SCROLLEN</span>
            <span className="block h-10 w-px bg-gradient-to-b from-ivory/60 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
