import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import Drift from "@/components/ui/Drift";
import Settle from "@/components/ui/Settle";
import Curtain from "@/components/ui/Curtain";
import { WipeLines } from "@/components/ui/Wipe";
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
 *
 * DIE CHOREOGRAFIE dieses Abschnitts ist absichtlich uneinheitlich, weil
 * eine Nacht es auch ist: Das erste Bild ist einfach da, der Titel steigt,
 * die beiden Hochformate rücken gegeneinander herein, der breite Streifen
 * wird aufgezogen. Vier Auftritte, vier Gesten — käme alles gleich, hätte
 * man eine Vorlage gesehen und keinen Abend.
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
    <section id="nights" className="relative overflow-hidden pb-10 md:pb-14">
      {/* DIE ÜBERGABE AUS DEM HERO.
          Die Bühne darüber endet dunkel — also fängt hier nichts an, es geht
          weiter. Das erste Bild blendet deshalb NICHT ein: Ein Aufblenden an
          dieser Stelle wäre genau die Naht, die es nicht geben soll. Es liegt
          da, wenn die Bühne es freigibt, und läuft nur langsam auf sein Maß
          zu. Darüber ein Rest Dunkelheit, aus der es auftaucht. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[18svh]"
        style={{
          background:
            "linear-gradient(180deg, var(--color-void) 0%, rgba(5,4,6,0.55) 42%, rgba(5,4,6,0) 100%)",
        }}
      />

      {/* 01 — Ein breites Bild, das rechts aus der Seite läuft. */}
      <Drift amount={20} className="ml-5 md:ml-[7vw]">
        <Settle className="mr-[-18vw] md:mr-[-10vw]" from={1.05}>
          <Shot
            image={nights.tanz}
            sizes="(max-width: 768px) 118vw, 74vw"
            className="aspect-[3/2] md:aspect-[21/9]"
            priorityPosition="52% 40%"
            scrim
          />
        </Settle>
      </Drift>

      {/* Der Titel greift von links in die Komposition — kein Kopfbereich
          über den Bildern, sondern eine Ebene zwischen ihnen. Er steigt
          hinter seiner eigenen Grundlinie hervor, wie der Satz im Hero. */}
      <div className="relative z-10 -mt-[9vw] px-5 md:-mt-[7vw] md:px-[7vw]">
        <WipeLines
          lines={["Medusa", "Nights"]}
          className="display display-stack text-[clamp(3.25rem,13vw,9rem)] text-ivory"
        />
      </div>

      {/* 02 — Zwei Hochformate, gegeneinander versetzt. Sie rücken beim
          Auftauchen aufeinander zu; das erzählt ihre Nachbarschaft. */}
      <div className="mt-8 grid grid-cols-12 gap-x-3 px-5 md:mt-4 md:gap-x-5 md:px-[7vw]">
        <Reveal x={-26} y={0} className="col-span-7 md:col-span-5">
          <Drift amount={-24}>
            <Shot
              image={nights.vip}
              sizes="(max-width: 768px) 58vw, 38vw"
              className="aspect-[2/3]"
            />
          </Drift>
        </Reveal>

        <Reveal
          x={26}
          y={0}
          delay={0.1}
          className="col-span-5 col-start-8 mt-[18%] md:col-span-4 md:col-start-8 md:mt-[22%]"
        >
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

      {/* 03 — DER MOMENT.
          Randlos über die volle Breite, und die Fläche wird beim Scrollen
          aufgezogen statt eingeblendet. Es ist die einzige Stelle der Seite
          mit dieser Geste. */}
      <Curtain className="mt-14 md:mt-24">
        <Shot
          image={nights.karte}
          sizes="100vw"
          className="aspect-[3/2] w-full sm:aspect-[2/1] md:aspect-[5/2]"
          priorityPosition="50% 45%"
        />
      </Curtain>

      {/* 04 — Ein letztes Hochformat, dazu die Frage, die sich stellt.
          Danach wird es ruhig: Der Abschnitt endet nicht, er beruhigt sich. */}
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

        <div className="col-span-12 mt-10 md:col-span-5 md:col-start-1 md:row-start-1 md:mb-4 md:mt-0">
          <WipeLines
            lines={["Next week?"]}
            as="p"
            className="display display-stack text-[clamp(2.75rem,10vw,6rem)] text-ivory"
          />
          <Reveal delay={0.22}>
            <GuestlistButton className="mt-7 w-full sm:w-auto" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
