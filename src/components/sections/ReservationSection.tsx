"use client";

import ReservationFlow from "@/components/reservation/ReservationFlow";
import Reveal from "@/components/ui/Reveal";
import { event } from "@/content/event";

/**
 * Die Reservierung liegt offen auf der Seite — nicht hinter einem Klick.
 *
 * Wer bis hierhin gescrollt hat, ist bereits überzeugt; ein weiterer
 * Zwischenschritt würde nur Reibung erzeugen. Der Ablauf ist derselbe wie im
 * Overlay, nur ohne Ebene darüber.
 *
 * Der Gruppengedanke steckt in der ersten Frage („Wie viele seid ihr?“) statt
 * in einer Aufforderung, Freunde mitzubringen.
 */
export default function ReservationSection() {
  return (
    <section
      id="reservierung"
      className="scroll-mt-16 border-t border-ivory/10 px-5 py-24 md:px-[7vw] md:py-32"
    >
      <div className="grid gap-14 md:grid-cols-12 md:gap-10">
        <Reveal className="md:col-span-5 md:col-start-1">
          <span className="label">Tisch</span>
          <p
            className="display display-stack mt-4 text-ivory"
            style={{ fontSize: "clamp(3rem, 9vw, 6.5rem)" }}
          >
            Reservier
            <br />
            für deine
            <br />
            Leute
          </p>
          <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-mute">
            Vier Fragen, keine Anmeldung. Wir bestätigen persönlich —
            für {event.headliner} am {event.dateShort} oder eine andere Nacht.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="md:col-span-6 md:col-start-7">
          <ReservationFlow />
        </Reveal>
      </div>
    </section>
  );
}
