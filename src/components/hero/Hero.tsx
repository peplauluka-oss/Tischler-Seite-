"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroVideo from "@/components/hero/HeroVideo";
import HeroBrandBar from "@/components/hero/HeroBrandBar";
import EventReveal from "@/components/hero/EventReveal";
import { images } from "@/content/club";
import { asset } from "@/lib/asset";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

gsap.registerPlugin(ScrollTrigger);

/* Zeitachse der Hero-Choreografie (0 = Ankunft, 1 = Ruhezustand).
   Eine einzige Timeline — keine unabhängigen Einzelanimationen. */
const CUE = {
  scrollCueOut: 0.02,
  brandOut: 0.08,
  navIn: 0.13,
  videoRecedes: 0.2,
  depthIn: 0.3,
  eventLabel: 0.42,
  cta: 0.52,
  interrupt: 0.7,
};

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const section = root.current;
    const stageEl = stage.current;
    if (!section || !stageEl) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        isMobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean };
        const q = gsap.utils.selector(section);

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

        /* 05 — DAS EVENT TRITT AUF: gestaffelt, nicht gleichzeitig. */
        const reveal = (
          selector: string,
          at: number,
          from: gsap.TweenVars = {},
          duration = 0.09,
        ) =>
          tl.fromTo(
            q(selector),
            { opacity: 0, ...from },
            { opacity: 1, y: 0, x: 0, duration, stagger: 0.018 },
            at,
          );

        reveal("[data-reveal='label']", CUE.eventLabel, { x: -20 }, 0.07);
        reveal("[data-reveal='cta']", CUE.cta, { y: 20 }, 0.1);

        /* Parallaxe: Inhalt läuft minimal langsamer als das Bild. */
        tl.fromTo(
          content,
          { y: isDesktop ? 56 : 34 },
          { y: 0, duration: 0.5 },
          CUE.videoRecedes,
        );

        /* 06 — MUSTERBRUCH: Wenn alles steht, wandert die Bildebene ein Stück
               *gegen* die Scrollrichtung. Kurz, ruhig, nur für die Tiefe. */
        if (isDesktop) {
          tl.to(depth, { yPercent: 9, duration: 0.2 }, CUE.interrupt);
          tl.to(panel, { yPercent: -4, duration: 0.2 }, CUE.interrupt);
        }
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      id="top"
      ref={root}
      className="hero-scroll relative h-[230svh] md:h-[260svh]"
    >
      <div
        ref={stage}
        className="sticky top-0 h-[100svh] w-full overflow-hidden bg-void"
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
            <EventReveal />
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
    </section>
  );
}
