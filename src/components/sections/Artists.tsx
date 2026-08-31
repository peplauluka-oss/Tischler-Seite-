import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { event } from "@/content/event";

/**
 * Skelett für die spätere Artists-Seite: Der bestätigte Special Guest steht,
 * offene Slots sind sichtbar als offen markiert — statt erfundener Namen.
 */
export default function Artists() {
  const openSlots = [
    { label: "SUPPORT-DJ", note: "WIRD ERGÄNZT" },
    { label: "RESIDENT", note: "WIRD ERGÄNZT" },
  ];

  return (
    <Section
      id="artists"
      index="02"
      title="ARTISTS"
      lead="Jede Nacht trägt ein Special Guest, unterstützt von ein bis zwei DJs. Das Line-up wechselt von Event zu Event."
    >
      <div className="border-t border-ivory/12">
        <Reveal>
          <article className="grid gap-4 border-b border-ivory/10 py-8 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-10">
            <span className="font-mono text-[0.6875rem] text-ember">01</span>
            <h3
              className="display text-ivory"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
            >
              {event.headliner}
            </h3>
            <span className="font-mono text-[0.625rem] tracking-[0.24em] text-mute">
              {event.role} · {event.dateShort}
            </span>
          </article>
        </Reveal>

        {openSlots.map((slot, i) => (
          <Reveal key={slot.label} delay={0.06 * (i + 1)}>
            <article className="grid gap-4 border-b border-ivory/10 py-8 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-10">
              <span className="font-mono text-[0.6875rem] text-mute">
                {String(i + 2).padStart(2, "0")}
              </span>
              <h3
                className="display text-mute/60"
                style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
              >
                TBA
              </h3>
              <span className="font-mono text-[0.625rem] tracking-[0.24em] text-mute/70">
                {slot.label} · {slot.note}
              </span>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-8 max-w-md font-mono text-[0.625rem] leading-relaxed tracking-[0.16em] text-mute">
          PLATZHALTER-BEREICH — HIER ENTSTEHEN ARTIST-PROFILE MIT FOTO, SET-ZEIT
          UND VERGANGENEN AUFTRITTEN.
        </p>
      </Reveal>
    </Section>
  );
}
