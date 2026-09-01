import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { roomStory } from "@/content/club";
import { asset } from "@/lib/asset";

type Story = (typeof roomStory)[number];

/**
 * Beschriftung als Teil der Bildkomposition: Nummer, Kicker, Zeilen — ohne
 * sichtbaren Kasten. Lesbar wird sie durch einen Verlauf im Bild selbst,
 * nicht durch eine Fläche darüber.
 */
function Caption({ item, className = "" }: { item: Story; className?: string }) {
  /* Die Schriftgröße richtet sich nach der Textlänge, nicht nach der
     Position: Drei kurze Zeilen tragen Plakatgröße, ein ganzer Satz nicht. */
  const long = item.lines.some((line) => line.length > 24);

  return (
    <figcaption className={`absolute z-10 ${className}`}>
      <span className="flex items-center gap-3">
        <span className="display text-lg leading-none text-ember">{item.no}</span>
        <span className="label text-ivory/70">{item.kicker}</span>
      </span>
      <p
        className="display display-stack mt-3 text-ivory"
        style={{
          fontSize: long
            ? "clamp(1.25rem, 3.8vw, 2.25rem)"
            : "clamp(1.75rem, 5.5vw, 3.25rem)",
        }}
      >
        {item.lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>
    </figcaption>
  );
}

/**
 * DER RAUM.
 *
 * Drei Ausschnitte, drei verschiedene Kompositionen — randlos breit,
 * versetzt hochkant, wieder randlos mit anderem Textanker. Die Wiederholung
 * „Bild, Bildunterschrift, Bild, Bildunterschrift“ war das eigentliche
 * Problem: Sie las sich wie ein Katalog, nicht wie ein Blick in den Club.
 *
 * Der Text sitzt jetzt im Bild. Lesbarkeit kommt aus gerichteten Verläufen,
 * die dort dunkel sind, wo die Schrift steht — und nur dort.
 */
export default function Room() {
  const [flaeche, boxen, bar] = roomStory;

  return (
    <section id="club" className="scroll-mt-16 pb-24 pt-20 md:pb-32 md:pt-28">
      {/* Einstieg: knapp gehalten, das erste Bild folgt unmittelbar. */}
      <Reveal className="px-5 md:px-[7vw]">
        <span className="label">01 / Der Raum</span>
        <p
          className="display display-stack mt-3 max-w-[18ch] text-ivory"
          style={{ fontSize: "clamp(2.75rem, 8vw, 6rem)" }}
        >
          Dunkel, rot,
          <br />
          voll besetzt
        </p>
      </Reveal>

      {/* 01 — DIE FLÄCHE: randlos, Text unten links im Bild. */}
      <Reveal className="mt-8 md:mt-12">
        <figure className="relative aspect-[4/5] w-full sm:aspect-[16/10] md:aspect-[21/9]">
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
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(5,4,6,0.92) 0%, rgba(5,4,6,0.35) 38%, transparent 62%)",
            }}
          />
          <Caption item={flaeche} className="bottom-6 left-5 right-5 md:bottom-12 md:left-[7vw] md:right-[7vw]" />
        </figure>
      </Reveal>

      {/* 02 — DIE BOXEN: nach rechts versetzt, schmaler, Text greift von
             links in das Bild hinein. Anderer Rhythmus, anderes Format. */}
      <Reveal className="mt-14 md:mt-24">
        <figure className="relative ml-10 aspect-[3/4] sm:ml-[18%] sm:aspect-[4/5] md:ml-[26%] md:mr-[7vw] md:aspect-[16/11]">
          <Image
            src={asset(boxen.image.src)}
            alt={boxen.image.alt}
            fill
            sizes="(max-width: 768px) 90vw, 67vw"
            loading="lazy"
            className="graded object-cover"
            placeholder="blur"
            blurDataURL={boxen.image.lqip}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(5,4,6,0.95) 0%, rgba(5,4,6,0.55) 34%, transparent 68%)",
            }}
          />
          {/* Der Text beginnt links außerhalb der Bildkante und läuft hinein. */}
          <Caption
            item={boxen}
            className="-left-10 bottom-6 max-w-[20rem] pl-5 pr-5 sm:-left-[18%] sm:top-1/2 sm:max-w-[24rem] sm:-translate-y-1/2 md:-left-[26%] md:max-w-[32rem] md:pl-[7vw]"
          />
        </figure>
      </Reveal>

      {/* 03 — DIE BAR: wieder randlos, hoch, Text diesmal oben. */}
      <Reveal className="mt-14 md:mt-28">
        <figure className="relative aspect-[5/6] w-full sm:aspect-[3/2] md:aspect-[2/1]">
          <Image
            src={asset(bar.image.src)}
            alt={bar.image.alt}
            fill
            sizes="100vw"
            loading="lazy"
            className="graded object-cover object-[50%_35%]"
            placeholder="blur"
            blurDataURL={bar.image.lqip}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(5,4,6,0.9) 0%, rgba(5,4,6,0.3) 42%, transparent 70%)",
            }}
          />
          <Caption item={bar} className="left-5 right-5 top-7 md:left-[7vw] md:right-[7vw] md:top-12" />
        </figure>
      </Reveal>
    </section>
  );
}
