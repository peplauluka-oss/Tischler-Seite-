import Image from "next/image";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { ClubImage, images } from "@/content/club";
import { asset } from "@/lib/asset";

/** Asymmetrisches Raster statt Kartengalerie — die Bilder sollen wie eine
    Bildstrecke wirken, nicht wie eine Produktübersicht. */
const layout: { image: ClubImage; span: string; ratio: string }[] = [
  { image: images.lounge, span: "md:col-span-7", ratio: "aspect-[4/5]" },
  { image: images.tresen, span: "md:col-span-5", ratio: "aspect-[4/5]" },
  { image: images.sitzbereich, span: "md:col-span-5", ratio: "aspect-[3/4]" },
  { image: images.bar, span: "md:col-span-7", ratio: "aspect-[3/4]" },
];

export default function Gallery() {
  return (
    <Section
      id="gallery"
      index="04"
      title="GALERIE"
      lead="Aufnahmen aus dem Haus. Weitere Nächte kommen laufend dazu."
    >
      <div className="grid gap-3 md:grid-cols-12 md:gap-4">
        {layout.map(({ image, span, ratio }, i) => (
          <Reveal key={image.src} delay={(i % 2) * 0.08} className={span}>
            <figure className={`group relative overflow-hidden ${ratio}`}>
              <Image
                src={asset(image.src)}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                loading="lazy"
                className="graded object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                placeholder="blur"
                blurDataURL={image.lqip}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/85 via-transparent to-transparent"
              />
              <figcaption className="absolute bottom-4 left-4 font-mono text-[0.5625rem] tracking-[0.24em] text-ivory/80">
                {image.caption}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
