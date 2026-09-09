import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import Drift from "@/components/ui/Drift";
import { GuestlistButton } from "@/components/ui/Cta";
import { nights, type ClubImage } from "@/content/club";
import { asset } from "@/lib/asset";

/**
 * MEDUSA NIGHTS.
 *
 * Hier steht bewusst kein Satz. Die Bilder sollen die Arbeit machen: andere
 * Leute, sichtbar normale Leute, haben hier eine gute Zeit — und der Schluss
 * daraus stellt sich beim Betrachten von selbst ein. Jede Bildunterschrift
 * würde diesen Schluss vorwegnehmen und damit entwerten.
 *
 * Deshalb keine Galerie und kein Raster: unterschiedliche Formate, versetzte
 * Kanten, Überlappungen, ein Bild, das aus dem Bild läuft. So liest es sich
 * als Aufnahmen einer Nacht und nicht als Portfolio.
 */
function Shot({
  image,
  sizes,
  className = "",
  priorityPosition = "50% 50%",
  scrim = false,
}: {
  image: ClubImage;
  sizes: string;
  className?: string;
  priorityPosition?: string;
  /** Grund für Schrift, die in das Bild hineinläuft. */
  scrim?: boolean;
}) {
  return (
    <figure className={`relative ${className}`}>
      <Image
        src={asset(image.src)}
        alt={image.alt}
        fill
        sizes={sizes}
        loading="lazy"
        className="graded object-cover"
        style={{ objectPosition: priorityPosition }}
        placeholder="blur"
        blurDataURL={image.lqip}
      />
      {scrim && (
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top right, rgba(5,4,6,0.88) 0%, rgba(5,4,6,0.35) 34%, transparent 62%)",
          }}
        />
      )}
    </figure>
  );
}

export default function MedusaNights() {
  return (
    <section id="nights" className="relative overflow-hidden py-20 md:py-28">
      {/* 01 — Ein breites Bild, das rechts aus der Seite läuft. */}
      <Reveal>
        <Drift amount={20} className="ml-5 md:ml-[7vw]">
          <Shot
            image={nights.tisch}
            sizes="(max-width: 768px) 118vw, 74vw"
            className="mr-[-18vw] aspect-[3/2] md:mr-[-10vw] md:aspect-[21/9]"
            priorityPosition="52% 40%"
            scrim
          />
        </Drift>
      </Reveal>

      {/* Der Titel greift von links in die Komposition — kein Kopfbereich
          über den Bildern, sondern eine Ebene zwischen ihnen. */}
      <Reveal className="relative z-10 -mt-[9vw] px-5 md:-mt-[7vw] md:px-[7vw]">
        <h2 className="display display-stack text-[clamp(3.25rem,13vw,9rem)] text-ivory">
          Medusa
          <br />
          Nights
        </h2>
      </Reveal>

      {/* 02 — Zwei Hochformate, gegeneinander versetzt. */}
      <div className="mt-8 grid grid-cols-12 gap-x-3 px-5 md:mt-4 md:gap-x-5 md:px-[7vw]">
        <Reveal className="col-span-7 md:col-span-5">
          <Drift amount={-24}>
            <Shot
              image={nights.vip}
              sizes="(max-width: 768px) 58vw, 38vw"
              className="aspect-[2/3]"
            />
          </Drift>
        </Reveal>

        <Reveal delay={0.08} className="col-span-5 col-start-8 mt-[18%] md:col-span-4 md:col-start-8 md:mt-[22%]">
          <Drift amount={26}>
            <Shot
              image={nights.glas}
              sizes="(max-width: 768px) 42vw, 30vw"
              className="aspect-[2/3]"
              priorityPosition="55% 40%"
            />
          </Drift>
        </Reveal>
      </div>

      {/* 03 — Randlos über die volle Breite: der Blick auf die Fläche. */}
      <Reveal className="mt-14 md:mt-24">
        <Shot
          image={nights.flaeche}
          sizes="100vw"
          className="aspect-[3/2] w-full sm:aspect-[2/1] md:aspect-[5/2]"
          priorityPosition="50% 45%"
        />
      </Reveal>

      {/* 04 — Ein letztes Hochformat, dazu die Frage, die sich stellt. */}
      <div className="grid grid-cols-12 items-end gap-x-3 px-5 md:gap-x-5 md:px-[7vw]">
        <Reveal className="col-span-6 col-start-7 -mt-[14%] md:col-span-4 md:col-start-9 md:-mt-[10%]">
          <Drift amount={-22}>
            <Shot
              image={nights.rot}
              sizes="(max-width: 768px) 50vw, 30vw"
              className="aspect-[2/3]"
              priorityPosition="50% 35%"
            />
          </Drift>
        </Reveal>

        <Reveal
          delay={0.1}
          className="col-span-12 mt-10 md:col-span-5 md:col-start-1 md:row-start-1 md:mb-4 md:mt-0"
        >
          <p className="display display-stack text-[clamp(2.75rem,10vw,6rem)] text-ivory">
            Next week?
          </p>
          <GuestlistButton className="mt-7 w-full sm:w-auto" />
        </Reveal>
      </div>
    </section>
  );
}
