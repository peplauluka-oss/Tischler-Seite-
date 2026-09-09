import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { insideStory } from "@/content/club";
import { asset } from "@/lib/asset";

type Story = (typeof insideStory)[number];

/**
 * Beschriftung als Teil der Bildkomposition: Nummer, Kicker, Zeilen — ohne
 * sichtbaren Kasten. Lesbar wird sie durch einen Verlauf im Bild selbst,
 * nicht durch eine Fläche darüber.
 */
function Caption({ item, className = "" }: { item: Story; className?: string }) {
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
 * INSIDE MEDUSA.
 *
 * Keine Geschichte, keine Philosophie, kein „Über uns“ — der Club zeigt sich,
 * statt sich zu erklären. Vier Ausschnitte in vier verschiedenen
 * Kompositionen; die Wiederholung „Bild, Bildunterschrift, Bild“ wäre ein
 * Katalog, kein Blick hinein.
 */
export default function InsideMedusa() {
  const [saal, voll, boxen, bar] = insideStory;

  return (
    <section id="inside" className="scroll-mt-16 pb-24 pt-20 md:pb-32 md:pt-28">
      <Reveal className="px-5 md:px-[7vw]">
        <span className="label">Inside</span>
        <h2 className="display display-stack mt-3 max-w-[14ch] text-[clamp(2.75rem,11vw,7rem)] text-ivory">
          Inside Medusa
        </h2>
      </Reveal>

      {/* 01 + 02 — leer und voll nebeneinander. Das ist der ganze Satz. */}
      <div className="mt-8 grid grid-cols-12 gap-3 md:mt-12 md:gap-4">
        <Reveal className="col-span-12 md:col-span-7">
          <figure className="relative aspect-[4/3] w-full md:aspect-[5/4]">
            <Image
              src={asset(saal.image.src)}
              alt={saal.image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 58vw"
              loading="lazy"
              className="graded object-cover"
              placeholder="blur"
              blurDataURL={saal.image.lqip}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(5,4,6,0.92) 0%, rgba(5,4,6,0.3) 40%, transparent 66%)",
              }}
            />
            <Caption item={saal} className="bottom-6 left-5 right-5 md:bottom-9 md:left-8 md:right-8" />
          </figure>
        </Reveal>

        <Reveal delay={0.08} className="col-span-12 md:col-span-5">
          <figure className="relative aspect-[4/3] w-full md:aspect-[5/4]">
            <Image
              src={asset(voll.image.src)}
              alt={voll.image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 42vw"
              loading="lazy"
              className="graded object-cover"
              placeholder="blur"
              blurDataURL={voll.image.lqip}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(5,4,6,0.92) 0%, rgba(5,4,6,0.3) 40%, transparent 66%)",
              }}
            />
            <Caption item={voll} className="bottom-6 left-5 right-5 md:bottom-9 md:left-8 md:right-8" />
          </figure>
        </Reveal>
      </div>

      {/* 03 — die Boxen: nach rechts versetzt, Text greift von links hinein. */}
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
          <Caption
            item={boxen}
            className="-left-10 bottom-6 max-w-[20rem] pl-5 pr-5 sm:-left-[18%] sm:top-1/2 sm:max-w-[24rem] sm:-translate-y-1/2 md:-left-[26%] md:max-w-[32rem] md:pl-[7vw]"
          />
        </figure>
      </Reveal>

      {/* 04 — die Bar: randlos, Text oben. */}
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
