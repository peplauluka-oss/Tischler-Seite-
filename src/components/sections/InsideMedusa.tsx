import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import Settle from "@/components/ui/Settle";
import Drift from "@/components/ui/Drift";
import { WipeLines } from "@/components/ui/Wipe";
import { club, images, insideStory } from "@/content/club";
import { asset } from "@/lib/asset";

type Story = (typeof insideStory)[number];

/** Nur eine Ortsmarke im Bild — Nummer und Ort, kein Satz darüber.
    Sie kommt eine Spur nach ihrem Bild: erst der Raum, dann sein Name. */
function Mark({ item, className = "" }: { item: Story; className?: string }) {
  return (
    <figcaption className={`absolute z-10 ${className}`}>
      <Reveal y={8} delay={0.26} className="flex items-center gap-3">
        <span className="display text-lg leading-none text-ember">{item.no}</span>
        <span className="label text-ivory/80">{item.kicker}</span>
      </Reveal>
    </figcaption>
  );
}

function Frame({
  item,
  ratio,
  sizes,
  className = "",
  position = "50% 50%",
  settle = false,
}: {
  item: Story;
  ratio: string;
  sizes: string;
  className?: string;
  position?: string;
  /** Die Aufnahme läuft auf ihr Maß zu — Verlauf und Ortsmarke bleiben
      stehen. Nur so bleibt die Schrift im Bild gestochen. */
  settle?: boolean;
}) {
  const picture = (
    <Image
      src={asset(item.image.src)}
      alt={item.image.alt}
      fill
      sizes={sizes}
      loading="lazy"
      className="graded object-cover"
      style={{ objectPosition: position }}
      placeholder="blur"
      blurDataURL={item.image.lqip}
    />
  );

  return (
    <figure className={`relative w-full overflow-hidden ${ratio} ${className}`}>
      {settle ? <Settle layer from={1.07}>{picture}</Settle> : picture}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(5,4,6,0.82) 0%, rgba(5,4,6,0.18) 32%, transparent 58%)",
        }}
      />
      <Mark item={item} className="bottom-5 left-5 md:bottom-7 md:left-7" />
    </figure>
  );
}

/**
 * INSIDE MEDUSA.
 *
 * Keine Geschichte, keine Philosophie, kein „Über uns“ — die Frage lautet
 * „wie sieht es dort aus“, und die beantworten Bilder. Text gibt es nur, wo
 * er Orientierung schafft: vier Ortsmarken und am Ende die Adresse.
 *
 * Die Location ist bewusst kein eigener Hauptabschnitt mehr. Wo der Laden
 * steht, gehört zu der Frage, wie er aussieht — und eine Kontaktseite
 * mitten im Ablauf hätte den Sog gebrochen.
 *
 * DIE VIER BILDER sind ein Raster — das ist als Ordnung richtig, als
 * Auftritt aber die Stelle, an der eine Seite am schnellsten nach Vorlage
 * aussieht. Deshalb kommen sie nicht gemeinsam und nicht gleich: Die
 * großen Flächen laufen auf ihr Maß zu, die kleineren rücken seitlich
 * herein, und zwischen den beiden Reihen liegt eine Pause. Man liest vier
 * Räume nacheinander statt einer Galerie auf einmal.
 */
export default function InsideMedusa() {
  const [raum, flaeche, boxen, bar] = insideStory;

  return (
    <section id="inside" className="scroll-mt-16 pb-24 pt-16 md:pb-32 md:pt-24">
      <div className="px-5 md:px-[7vw]">
        <Reveal y={10}>
          <span className="label">Inside</span>
        </Reveal>
        <WipeLines
          lines={["Inside Medusa"]}
          delay={0.06}
          className="display display-stack mt-3 max-w-[14ch] text-[clamp(2.75rem,11vw,7rem)] text-ivory"
        />
      </div>

      <div className="mt-8 grid grid-cols-12 gap-3 md:mt-12 md:gap-4">
        {/* Der Raum trägt die Reihe: Er läuft auf sein Maß zu. */}
        <div className="col-span-12 md:col-span-7">
          <Frame
            item={raum}
            ratio="aspect-[4/3] md:aspect-[5/4]"
            sizes="(max-width: 768px) 100vw, 58vw"
            settle
          />
        </div>
        {/* Die Fläche rückt von rechts an ihn heran. */}
        <Reveal x={22} y={0} delay={0.1} className="col-span-12 md:col-span-5">
          <Frame
            item={flaeche}
            ratio="aspect-[4/3] md:aspect-[5/4]"
            sizes="(max-width: 768px) 100vw, 42vw"
            position="50% 45%"
          />
        </Reveal>
      </div>

      <div className="mt-3 grid grid-cols-12 gap-3 md:mt-4 md:gap-4">
        {/* Zweite Reihe, andere Richtung — sonst wäre es dieselbe Reihe. */}
        <Reveal x={-22} y={0} className="col-span-12 md:col-span-5">
          <Frame item={boxen} ratio="aspect-[4/3]" sizes="(max-width: 768px) 100vw, 42vw" />
        </Reveal>
        <div className="col-span-12 md:col-span-7">
          <Frame
            item={bar}
            ratio="aspect-[4/3] md:aspect-[16/9]"
            sizes="(max-width: 768px) 100vw, 58vw"
            position="50% 35%"
            settle
          />
        </div>
      </div>

      {/* WO ES IST.
          Praktisch, nicht als Kontaktseite: Adresse, Route, Telefon,
          Instagram. Welche Linien halten, ist nicht belegt — also steht
          hier keine Verbindung. */}
      <div id="location" className="scroll-mt-16 grid gap-8 px-5 pt-16 md:grid-cols-12 md:gap-10 md:px-[7vw] md:pt-24">
        <div className="md:col-span-6">
          <Reveal y={10}>
            <span className="label">Location</span>
          </Reveal>
          <WipeLines
            lines={[club.district]}
            as="h3"
            delay={0.06}
            className="display mt-3 hyphens-auto break-words text-[clamp(2rem,4.4vw,3.5rem)] text-ivory"
          />
          <Reveal y={12} delay={0.16}>
          <address className="mt-5 not-italic">
            <p className="display text-[clamp(1.375rem,3.2vw,2rem)] leading-tight text-ivory">
              {club.address}
              <br />
              {club.postcode}
            </p>
            <a
              href={club.mapsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="cta-quiet mt-5"
            >
              Route öffnen
              <svg viewBox="0 0 18 10" width="18" height="10" aria-hidden="true">
                <path d="M0 5h16M12 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </a>
          </address>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="md:col-span-5 md:col-start-8">
          <Drift amount={14}>
            <figure className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={asset(images.eingang.src)}
                alt={images.eingang.alt}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                loading="lazy"
                className="graded-night object-cover"
                placeholder="blur"
                blurDataURL={images.eingang.lqip}
              />
            </figure>
          </Drift>
          <dl className="mt-6 space-y-4 border-t border-ivory/12 pt-5 text-sm">
            <div>
              <dt className="label text-[0.625rem]">Kontakt</dt>
              <dd className="mt-1.5">
                <a
                  href={club.phoneHref}
                  className="text-ivory underline decoration-ember decoration-1 underline-offset-4 transition-colors hover:text-ember-soft"
                >
                  {club.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label text-[0.625rem]">Instagram</dt>
              <dd className="mt-1.5">
                <a
                  href={club.instagramUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-ivory underline decoration-ember decoration-1 underline-offset-4 transition-colors hover:text-ember-soft"
                >
                  @{club.instagram}
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
