import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { roomStory } from "@/content/club";
import { asset } from "@/lib/asset";

/**
 * DER RAUM — bildgeführt.
 *
 * Die erste Fassung erklärte den Club in drei gleich großen Textkacheln.
 * Ein Club zeigt sich aber, er beschreibt sich nicht. Deshalb: drei
 * Aufnahmen in unterschiedlichen Größen und Ausrichtungen, jede beantwortet
 * eine Frage, dazu jeweils eine Zeile. Kein wiederholtes Kartenraster.
 */
export default function Room() {
  const [flaeche, boxen, bar] = roomStory;

  return (
    <section id="club" className="scroll-mt-16 py-24 md:py-32">
      <Reveal className="px-5 md:px-[7vw]">
        <span className="label">Der Raum</span>
        <p
          className="display display-stack mt-4 max-w-[18ch] text-ivory"
          style={{ fontSize: "clamp(2.75rem, 8vw, 6rem)" }}
        >
          Dunkel, rot,<br />
          voll besetzt
        </p>
      </Reveal>

      {/* 01 — die Fläche: breit, randlos, das Bild trägt allein. */}
      <Reveal className="mt-14 md:mt-20">
        <figure className="relative aspect-[4/3] w-full md:aspect-[21/9]">
          <Image
            src={asset(flaeche.image.src)}
            alt={flaeche.image.alt}
            fill
            sizes="100vw"
            loading="lazy"
            className="graded object-cover"
            placeholder="blur"
            blurDataURL={flaeche.image.lqip}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-void via-void/10 to-transparent"
          />
          <figcaption className="absolute bottom-6 left-5 right-5 md:bottom-10 md:left-[7vw] md:right-[7vw]">
            <span className="label label-accent">{flaeche.kicker}</span>
            <p className="mt-2 max-w-md text-lg leading-snug text-ivory md:text-2xl">
              {flaeche.line}
            </p>
          </figcaption>
        </figure>
      </Reveal>

      {/* 02 — die Boxen: hochkant, nach rechts versetzt, Text links daneben. */}
      <div className="mt-16 grid items-center gap-8 px-5 md:mt-28 md:grid-cols-12 md:gap-10 md:px-[7vw]">
        <Reveal className="md:col-span-5 md:col-start-1 md:pr-6">
          <span className="label label-accent">{boxen.kicker}</span>
          <p className="mt-3 text-xl leading-snug text-ivory md:text-3xl">
            {boxen.line}
          </p>
        </Reveal>
        <Reveal delay={0.08} className="md:col-span-6 md:col-start-7">
          <figure className="relative aspect-[4/5] w-full">
            <Image
              src={asset(boxen.image.src)}
              alt={boxen.image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
              className="graded object-cover"
              placeholder="blur"
              blurDataURL={boxen.image.lqip}
            />
          </figure>
        </Reveal>
      </div>

      {/* 03 — die Bar: hochkant links, kleiner, Text rechts. */}
      <div className="mt-16 grid items-end gap-8 px-5 md:mt-24 md:grid-cols-12 md:gap-10 md:px-[7vw]">
        <Reveal className="md:col-span-5 md:col-start-1">
          <figure className="relative aspect-[3/4] w-full">
            <Image
              src={asset(bar.image.src)}
              alt={bar.image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 42vw"
              loading="lazy"
              className="graded object-cover"
              placeholder="blur"
              blurDataURL={bar.image.lqip}
            />
          </figure>
        </Reveal>
        <Reveal delay={0.08} className="md:col-span-5 md:col-start-8 md:pb-10">
          <span className="label label-accent">{bar.kicker}</span>
          <p className="mt-3 text-xl leading-snug text-ivory md:text-3xl">
            {bar.line}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
