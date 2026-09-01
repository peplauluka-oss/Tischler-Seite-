"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EventClip from "@/components/sections/EventClip";
import Countdown from "@/components/hero/Countdown";
import Reveal from "@/components/ui/Reveal";
import { ReserveButton } from "@/components/ui/Cta";
import { event } from "@/content/event";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

gsap.registerPlugin(ScrollTrigger);

/**
 * DER EVENT-MOMENT.
 *
 * Beim Verlassen des Hero öffnet sich das Creative auf den ganzen Bildschirm
 * — es wird nicht eingeblendet, sondern aufgezogen: Der Rahmen wächst von
 * einem kleineren, abgedunkelten Feld auf den vollen Viewport, während die
 * Animation startet.
 *
 * Danach hält der Moment: Die Bühne klebt für knapp einen weiteren
 * Bildschirm am oberen Rand, der Clip läuft ab und geht anschließend in die
 * Schleife. Weiterscrollen ist jederzeit möglich — nur eben nicht in einem
 * Wimpernschlag vorbei. Am Ende der Strecke wandert der Bereich normal aus
 * dem Bild; er schwebt nicht über der restlichen Seite.
 *
 * Erst danach kommen Handlung und Countdown — in dieser Reihenfolge.
 */
export default function EventStage() {
  const track = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!track.current || !panel.current) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      /* Das Aufziehen ist an den Scroll gekoppelt: Der Nutzer öffnet es
         selbst, deshalb fühlt es sich wie ein Moment an und nicht wie eine
         abgespielte Animation. */
      gsap.fromTo(
        panel.current,
        { scale: 0.72, opacity: 0.25, filter: "brightness(0.4)" },
        {
          scale: 1,
          opacity: 1,
          filter: "brightness(1)",
          ease: "power2.out",
          scrollTrigger: {
            trigger: track.current,
            start: "top bottom",
            end: "top top",
            scrub: 0.5,
          },
        },
      );
    });

    return () => mm.revert();
  }, []);

  if (!event.active) {
    return (
      <section id="event" className="scroll-mt-16 px-5 py-28 md:px-[7vw]">
        <span className="label">Aktuell kein Termin</span>
        <p className="display display-stack mt-4 max-w-[16ch] text-[clamp(2.5rem,7vw,5rem)] text-ivory">
          Das nächste Event wird angekündigt
        </p>
      </section>
    );
  }

  return (
    <section id="event" className="relative">
      {/* Die vollständige Information einmal maschinenlesbar — ein Video ist
          für Screenreader und Suchmaschinen sonst stumm. Sichtbar steht sie
          nirgends doppelt: Das Creative zeigt sie. */}
      <h2 className="sr-only">
        {event.title} — {event.role} {event.headliner}, {event.dateLong},
        Einlass {event.doors} Uhr
      </h2>

      {/* Scrollstrecke: Der Bildschirm gehört dem Creative, bis der Nutzer
          fast einen weiteren Viewport weitergescrollt ist. */}
      <div ref={track} className="relative h-[185svh]">
        <div
          data-event-stage
          className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden bg-black"
        >
          {/* Ein Hauch Gold aus dem Clip, damit die Ränder auf breiten
              Schirmen nicht wie eine leere Fläche wirken. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(circle at 50% 45%, rgba(191,150,63,0.28) 0%, transparent 62%)",
            }}
          />
          <div ref={panel} className="relative h-full w-full md:w-auto" style={{ willChange: "transform" }}>
            <EventClip />
          </div>
        </div>
      </div>

      {/* Erst jetzt die Handlung … */}
      <Reveal className="mx-auto flex w-full max-w-[26rem] flex-col items-center gap-4 px-5 pt-12 text-center md:max-w-none md:pt-16">
        <ReserveButton className="w-full sm:w-auto" />
        <span className="text-[0.6875rem] font-bold tracking-[0.16em] text-mute">
          {event.admission.toUpperCase()} · {event.minAge}
        </span>
      </Reveal>

      {/* … und danach, nachrangig, die Zeit bis dahin. */}
      <Reveal delay={0.08} className="flex justify-center px-5 pb-20 pt-12 md:pb-28 md:pt-16">
        <Countdown className="text-center" />
      </Reveal>
    </section>
  );
}
