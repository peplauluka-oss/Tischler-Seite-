import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { club, images } from "@/content/club";
import { asset } from "@/lib/asset";

/** Unbestätigte Angabe — sichtbar gekennzeichnet statt erfunden. */
function Pending({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-mute">
      {children}
      <span className="ml-2 text-[0.5625rem] font-bold tracking-[0.16em] text-ember-soft/85">
        TBC
      </span>
    </span>
  );
}

export default function Location() {
  return (
    <section id="location" className="scroll-mt-16 py-24 md:py-32">
      <div className="grid gap-10 md:grid-cols-12 md:items-end md:gap-0">
        <Reveal className="md:col-span-7 md:col-start-1">
          <figure className="relative aspect-[4/3] w-full md:aspect-[3/2]">
            <Image
              src={asset(images.eingang.src)}
              alt={images.eingang.alt}
              fill
              sizes="(max-width: 768px) 100vw, 58vw"
              loading="lazy"
              className="graded-night object-cover"
              placeholder="blur"
              blurDataURL={images.eingang.lqip}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent"
            />
          </figure>
        </Reveal>

        <Reveal delay={0.08} className="px-5 md:col-span-5 md:col-start-8 md:px-0 md:pl-12">
          <span className="label">Location</span>
          {/* Ein einziges langes Wort: Trennung erlauben und die Größe an die
              Spalte binden, sonst schiebt es die Seite seitlich auf. */}
          <p
            className="display mt-4 hyphens-auto break-words text-ivory"
            style={{ fontSize: "clamp(2.25rem, 4.6vw, 3.75rem)" }}
          >
            {club.district}
          </p>
          <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-mute">
            Cocktailbar und Club unter einem Dach — im Nordosten Berlins,
            nicht in der Innenstadt. Genau das ist der Punkt.
          </p>

          <dl className="mt-9 space-y-4 border-t border-ivory/12 pt-6 text-sm">
            <div>
              <dt className="label text-[0.625rem]">Adresse</dt>
              <dd className="mt-1.5">
                <Pending>{club.address}</Pending>
              </dd>
            </div>
            <div>
              <dt className="label text-[0.625rem]">Öffnungszeiten</dt>
              <dd className="mt-1.5">
                <Pending>{club.hours}</Pending>
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
