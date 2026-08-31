import Image from "next/image";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { ReserveButton } from "@/components/ui/Cta";
import { club, images } from "@/content/club";
import { asset } from "@/lib/asset";

/** Platzhalter mit klarer Kennzeichnung — Adresse und Öffnungszeiten liegen
    im Material nicht vor und werden bewusst nicht erfunden. */
function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-mute">
      {children}
      <span className="ml-2 font-mono text-[0.5625rem] tracking-[0.18em] text-ember-soft/80">
        TBC
      </span>
    </span>
  );
}

export default function Location() {
  return (
    <Section
      id="location"
      index="05"
      title="LOCATION"
      lead="Cocktailbar und Club unter einem Dach — in Berlin."
    >
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <Reveal>
          <figure className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={asset(images.eingang.src)}
              alt={images.eingang.alt}
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              loading="lazy"
              className="graded-night object-cover"
              placeholder="blur"
              blurDataURL={images.eingang.lqip}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent"
            />
            <figcaption className="absolute bottom-4 left-4 font-mono text-[0.5625rem] tracking-[0.24em] text-ivory/80">
              {images.eingang.caption}
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={0.08}>
          <dl className="border-t border-ivory/12">
            <div className="border-b border-ivory/10 py-5">
              <dt className="eyebrow text-[0.5625rem]">ADRESSE</dt>
              <dd className="mt-2 text-sm font-semibold tracking-[0.06em]">
                <Placeholder>{club.address}</Placeholder>
              </dd>
            </div>
            <div className="border-b border-ivory/10 py-5">
              <dt className="eyebrow text-[0.5625rem]">ÖFFNUNGSZEITEN</dt>
              <dd className="mt-2 text-sm font-semibold tracking-[0.06em]">
                <Placeholder>{club.hours}</Placeholder>
              </dd>
            </div>
            <div className="border-b border-ivory/10 py-5">
              <dt className="eyebrow text-[0.5625rem]">INSTAGRAM</dt>
              <dd className="mt-2 text-sm font-semibold tracking-[0.06em]">
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
            <div className="py-5">
              <dt className="eyebrow text-[0.5625rem]">TISCHRESERVIERUNG</dt>
              <dd className="mt-4">
                <ReserveButton className="w-full sm:w-auto" />
              </dd>
            </div>
          </dl>

          <p className="mt-8 max-w-sm font-mono text-[0.625rem] leading-relaxed tracking-[0.16em] text-mute">
            PLATZHALTER — HIER FOLGEN ANFAHRT, KARTE UND ÖFFNUNGSZEITEN, SOBALD
            DIE ANGABEN VOM BETREIBER VORLIEGEN.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
