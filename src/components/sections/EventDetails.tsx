"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { ReserveButton } from "@/components/ui/Cta";
import { event } from "@/content/event";
import { club, images } from "@/content/club";
import { asset } from "@/lib/asset";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

gsap.registerPlugin(ScrollTrigger);

function Row({
  label,
  value,
  tbc = false,
}: {
  label: string;
  value: string;
  tbc?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-ivory/10 py-4">
      <dt className="eyebrow text-[0.5625rem]">{label}</dt>
      <dd className="text-right text-sm font-semibold tracking-[0.06em] text-ivory">
        {value}
        {tbc && (
          <span className="ml-2 font-mono text-[0.5625rem] tracking-[0.18em] text-ember-soft/80">
            TBC
          </span>
        )}
      </dd>
    </div>
  );
}

export default function EventDetails() {
  const root = useRef<HTMLDivElement>(null);

  // Musterbruch / Tiefenwechsel: Das Bild läuft ein Stück gegen die
  // Scrollrichtung, wenn der Hero in die Eventseite übergeht.
  useIsomorphicLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const el = root.current?.querySelector("[data-counter-layer]");
      if (!el) return;
      gsap.fromTo(
        el,
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        },
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={root} className="relative bg-void">
      <Section
        id="events"
        index="01"
        title="DAS NÄCHSTE EVENT"
        lead="Ein Termin, alle Angaben auf einen Blick — und der direkte Weg zum Tisch."
      >
        <div className="grid gap-12 md:grid-cols-[1.05fr_0.95fr] md:gap-16">
          {/* Textspalte */}
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-ember" aria-hidden="true" />
                <span className="font-mono text-[0.6875rem] tracking-[0.34em] text-ember-soft">
                  {event.role}
                </span>
              </div>
              <p
                className="display mt-4 text-ivory"
                style={{ fontSize: "clamp(3.5rem, 9vw, 7rem)" }}
              >
                {event.headliner}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <dl className="mt-10 border-t border-ivory/12">
                <Row label="DATUM" value={event.dateLong} tbc />
                <Row
                  label="EINLASS / START"
                  value={`${event.doors} / ${event.start} UHR`}
                  tbc
                />
                <Row label="SOUND" value={event.music} />
                <Row label="CLUB" value={`${club.name} · ${club.city}`} />
                <Row label="EINTRITT" value={event.admission} />
              </dl>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-10">
                <span className="eyebrow text-[0.5625rem]">LINE-UP</span>
                <ul className="mt-4 space-y-3">
                  {event.lineup.map((act) => (
                    <li
                      key={act.name}
                      className="flex items-baseline justify-between gap-4"
                    >
                      <span
                        className={`display text-2xl ${
                          act.status === "confirmed" ? "text-ivory" : "text-mute"
                        }`}
                      >
                        {act.name}
                      </span>
                      <span className="font-mono text-[0.625rem] tracking-[0.2em] text-mute">
                        {act.role}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-11 flex flex-col gap-4 sm:flex-row sm:items-center">
                <ReserveButton className="w-full sm:w-auto" />
                <p className="font-mono text-[0.625rem] leading-relaxed tracking-[0.16em] text-mute">
                  KEIN ONLINE-TICKETVERKAUF
                  <br className="hidden sm:block" /> EINTRITT AN DER ABENDKASSE
                </p>
              </div>
            </Reveal>
          </div>

          {/* Bildspalte mit Gegenbewegung */}
          <Reveal delay={0.1} className="relative">
            <div className="relative aspect-[3/4] overflow-hidden md:aspect-[4/5]">
              <div
                data-counter-layer
                className="absolute inset-x-0 -top-[8%] h-[116%]"
                style={{ willChange: "transform" }}
              >
                <Image
                  src={asset(images.bar.src)}
                  alt={images.bar.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="graded object-cover"
                  placeholder="blur"
                  blurDataURL={images.bar.lqip}
                />
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(5,4,6,0.35) 0%, transparent 35%, rgba(5,4,6,0.85) 100%)",
                }}
              />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                <span className="font-mono text-[0.5625rem] tracking-[0.24em] text-ivory/80">
                  {images.bar.caption} · {club.name}
                </span>
                <span className="font-mono text-[0.5625rem] tracking-[0.24em] text-ivory/50">
                  {event.dateShort}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </div>
  );
}
