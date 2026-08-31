import Image from "next/image";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { MeanderRule } from "@/components/ui/Brand";
import { experience, images } from "@/content/club";
import { asset } from "@/lib/asset";

/** Was den Raum ausmacht — beschrieben anhand dessen, was die Aufnahmen zeigen. */
export default function Experience() {
  return (
    <Section
      id="experience"
      index="03"
      title="DER RAUM"
      lead="Dunkler Grundton, rotes Licht, Sternenhimmel — und Tische, an denen der Abend stattfindet."
    >
      <div className="grid gap-x-16 gap-y-10 md:grid-cols-2">
        {experience.map((item, i) => (
          <Reveal key={item.no} delay={i * 0.06}>
            <article className="border-t border-ivory/12 pt-6">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[0.6875rem] text-ember">{item.no}</span>
                <h3
                  className="display text-ivory"
                  style={{ fontSize: "clamp(1.5rem, 2.6vw, 2rem)", letterSpacing: "0.02em" }}
                >
                  {item.title}
                </h3>
              </div>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-mute">
                {item.text}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <figure className="relative mt-16 aspect-[21/9] overflow-hidden md:mt-20">
          <Image
            src={asset(images.ambiente.src)}
            alt={images.ambiente.alt}
            fill
            sizes="(max-width: 768px) 100vw, 86vw"
            loading="lazy"
            className="graded object-cover"
            placeholder="blur"
            blurDataURL={images.ambiente.lqip}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(5,4,6,0.8) 0%, transparent 45%, rgba(5,4,6,0.6) 100%)",
            }}
          />
          <figcaption className="absolute bottom-5 left-5 font-mono text-[0.5625rem] tracking-[0.24em] text-ivory/75">
            {images.ambiente.caption}
          </figcaption>
        </figure>
      </Reveal>

      <MeanderRule className="mt-16 text-ivory" />
    </Section>
  );
}
