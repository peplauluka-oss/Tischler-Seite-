import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { TableButton, GuestlistLink } from "@/components/ui/Cta";
import { club, images } from "@/content/club";
import { asset } from "@/lib/asset";

/**
 * TISCH — für alle, die nicht allein kommen.
 *
 * Kein Formular, kein Konto, keine Bestätigungsmail: Der Club antwortet
 * ohnehin über WhatsApp, und jede Zwischenstufe kostet Anfragen. Der Knopf
 * öffnet dieselbe Ebene wie überall sonst, nur mit dem Tisch als Anliegen.
 *
 * Bewusst kein VIP-Vokabular und keine Beschreibung dessen, was ein Tisch
 * hier ist — das zeigt das Bild daneben.
 */
export default function TableSection({ eventSlug = null }: { eventSlug?: string | null }) {
  return (
    <section
      id="tisch"
      className="relative scroll-mt-16 overflow-hidden border-t border-ivory/10"
    >
      <div className="grid grid-cols-12 items-stretch">
        <Reveal className="col-span-12 md:col-span-6">
          <figure className="relative aspect-[4/3] w-full md:aspect-auto md:h-full md:min-h-[32rem]">
            <Image
              src={asset(images.lounge.src)}
              alt={images.lounge.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
              className="graded-strong object-cover"
              placeholder="blur"
              blurDataURL={images.lounge.lqip}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent md:bg-gradient-to-r"
            />
          </figure>
        </Reveal>

        <Reveal
          delay={0.08}
          className="col-span-12 flex flex-col justify-center px-5 py-16 md:col-span-6 md:px-[6vw] md:py-24"
        >
          <span className="label">Coming with a crew?</span>
          <h2 className="display display-stack mt-4 text-[clamp(2.75rem,9vw,5.5rem)] text-ivory">
            Reserve
            <br />
            your table
          </h2>
          <p className="mt-6 max-w-[32ch] text-[0.9375rem] leading-relaxed text-mute">
            Sag uns, wie viele ihr seid — die Bestätigung kommt über WhatsApp.
          </p>

          <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
            <TableButton filled className="w-full sm:w-auto" eventSlug={eventSlug} />
            <GuestlistLink eventSlug={eventSlug} />
          </div>

          <p className="mt-6 text-[0.8125rem] text-mute">
            Lieber direkt anrufen?{" "}
            <a
              href={club.phoneHref}
              className="text-ivory underline decoration-ember decoration-1 underline-offset-4"
            >
              {club.phone}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
