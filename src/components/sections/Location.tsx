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

/**
 * LOCATION — praktisch, nicht als Kontaktseite.
 *
 * Die Botschaft ist nicht „hier sind unsere Daten“, sondern: Du weißt, wo es
 * ist und wie du hinkommst. Deshalb steht die Route als Handlung da und nicht
 * als Fußnote.
 *
 * Welche Linien wirklich halten, ist nicht belegt. Bis der Club es bestätigt,
 * steht dort nichts — eine falsche Verbindung wäre schlimmer als keine.
 */
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
          <h2
            className="display mt-4 hyphens-auto break-words text-ivory"
            style={{ fontSize: "clamp(2.25rem, 4.6vw, 3.75rem)" }}
          >
            {club.district}
          </h2>
          <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-mute">
            Cocktailbar und Club unter einem Dach — im Nordosten Berlins,
            nicht in der Innenstadt. Genau das ist der Punkt.
          </p>

          <address className="mt-8 not-italic">
            <p className="display text-[clamp(1.5rem,3.4vw,2.25rem)] leading-tight text-ivory">
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

          <dl className="mt-9 space-y-4 border-t border-ivory/12 pt-6 text-sm">
            <div>
              <dt className="label text-[0.625rem]">Öffnungszeiten</dt>
              <dd className="mt-1.5">
                <Pending>{club.hours}</Pending>
              </dd>
            </div>
            {club.transit && (
              <div>
                <dt className="label text-[0.625rem]">ÖPNV</dt>
                <dd className="mt-1.5 text-mute">{club.transit}</dd>
              </div>
            )}
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
