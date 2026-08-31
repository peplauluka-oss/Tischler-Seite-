"use client";

import Countdown from "@/components/hero/Countdown";
import { EventButton, ReserveButton } from "@/components/ui/Cta";
import { event, heroFacts } from "@/content/event";

/** Kleiner Marker für noch nicht bestätigte Angaben — statt Erfindung. */
function Tbc() {
  return (
    <span
      title="Noch nicht bestätigt"
      className="ml-1.5 align-middle font-mono text-[0.5625rem] tracking-[0.18em] text-ember-soft/80"
    >
      TBC
    </span>
  );
}

/**
 * Der Eventblock des Hero. Die Reihenfolge im Markup ist zugleich die
 * Reihenfolge der Enthüllung: Name → Rolle → Fakten → Countdown → Aktion.
 */
export default function EventReveal() {
  return (
    <div className="w-full max-w-[34rem] lg:max-w-[38rem]">
      <div data-reveal="label" className="hero-reveal flex items-center gap-3">
        <span className="h-px w-8 bg-ember" aria-hidden="true" />
        <span
          className="font-mono text-[0.6875rem] tracking-[0.34em] text-ember-soft"
        >
          {event.role}
        </span>
      </div>

      <h1
        data-reveal="title"
        className="display mt-3 text-ivory"
        style={{
          fontSize: "clamp(3.4rem, 14.5vw, 12.5rem)",
          letterSpacing: "-0.015em",
        }}
      >
        <span className="hero-reveal block overflow-hidden">
          <span data-reveal="title-inner" className="block">
            {event.headliner}
          </span>
        </span>
      </h1>

      <p
        data-reveal="intro"
        className="hero-reveal mt-5 hidden max-w-md md:block text-[0.9375rem] leading-relaxed text-mute"
      >
        Eine Nacht im Black Medusa: Balkan, Türkçe Pop und Club-Sound.
        Tisch sichern — den Rest macht der Abend.
      </p>

      <dl
        data-reveal="facts-grid"
        data-fact
        className="hero-reveal mt-5 grid max-w-lg grid-cols-2 gap-x-6 gap-y-3.5 border-t border-ivory/10 pt-5 md:mt-7 md:gap-y-4 md:pt-6"
      >
        {heroFacts.map((fact) => (
          <div key={fact.label} data-fact className="hero-reveal">
            <dt className="eyebrow text-[0.5625rem]">{fact.label}</dt>
            <dd className="mt-1.5 text-[0.8125rem] font-semibold tracking-[0.08em] text-ivory">
              {fact.value}
              {fact.status === "tbc" && <Tbc />}
            </dd>
          </div>
        ))}
      </dl>

      <div data-reveal="countdown" className="hero-reveal mt-6 md:mt-8">
        <Countdown />
      </div>

      <div
        data-reveal="cta"
        className="hero-reveal mt-7 flex flex-col gap-3 md:mt-9 sm:flex-row sm:items-center"
      >
        <ReserveButton className="w-full sm:w-auto" />
        <EventButton className="w-full sm:w-auto" />
      </div>

      <p
        data-reveal="note"
        className="hero-reveal mt-4 font-mono md:mt-5 text-[0.625rem] tracking-[0.2em] text-mute"
      >
        {event.admission}
      </p>
    </div>
  );
}
