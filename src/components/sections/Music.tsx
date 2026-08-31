import Reveal from "@/components/ui/Reveal";
import { QuietLink } from "@/components/ui/Cta";

/**
 * MUSIK — typografisch, ohne Bild.
 *
 * Kein Genre-Katalog: Wer diese Musik hört, erkennt sich in drei Wörtern.
 * Alle anderen müssen nicht überzeugt werden. Danach der lokale Vorteil —
 * als Vorteil formuliert, nicht als Entschuldigung dafür, nicht in Mitte
 * zu liegen.
 */
export default function Music() {
  return (
    <section
      id="musik"
      className="relative scroll-mt-16 overflow-hidden px-5 py-28 md:px-[7vw] md:py-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-10%] top-1/2 h-[30rem] w-[30rem] -translate-y-1/2 rounded-full opacity-[0.13]"
        style={{
          background:
            "radial-gradient(circle, rgba(224,27,15,0.7) 0%, transparent 60%)",
        }}
      />

      <Reveal className="relative">
        <span className="label">Der Sound</span>
        <p
          className="display display-stack mt-5 text-ivory"
          style={{ fontSize: "clamp(3.25rem, 13vw, 11rem)" }}
        >
          Balkan.
          <br />
          Türkçe.
          <br />
          <span className="text-ember">Arabic.</span>
        </p>
      </Reveal>

      <Reveal delay={0.1} className="relative mt-12 md:mt-16">
        <p className="max-w-xl text-lg leading-relaxed text-ivory md:text-2xl">
          Wenn das deine Musik ist, weißt du längst, ob dieser Abend deiner ist.
        </p>
        <p className="mt-6 max-w-lg text-[0.9375rem] leading-relaxed text-mute">
          Special Guests, dazu ein bis zwei DJs — das Line-up wechselt von
          Nacht zu Nacht. Was bleibt: der Sound, die Leute, die Fläche.
          Dafür musst du nicht durch die halbe Stadt fahren.
        </p>

        <QuietLink target="event" label="Zum aktuellen Event" className="mt-8" />
      </Reveal>
    </section>
  );
}
