import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { Logo } from "@/components/ui/Brand";
import { GuestlistButton, TableButton } from "@/components/ui/Cta";
import { club, navItems } from "@/content/club";

/**
 * Fußzeile — kompakt. Adresse, Kontakt, Wege, Aktionen. Keine zweite
 * Marketingfläche: Wer hier ankommt, hat die Seite gesehen.
 *
 * Und deshalb bewegt sich hier fast nichts mehr: ein einziges, ruhiges
 * Auftauchen. Eine Seite, die bis zur letzten Zeile etwas vorführt, hat
 * keinen Schluss, sondern hört nur auf.
 */
export default function Footer() {
  return (
    <footer className="border-t border-ivory/10 px-5 pb-28 pt-16 md:px-[7vw] md:pb-20 md:pt-20">
      <Reveal y={12} className="grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <Logo width={190} />
          <address className="mt-6 not-italic text-[0.9375rem] leading-relaxed text-mute">
            {club.address}
            <br />
            {club.postcode}
            <br />
            <a
              href={club.phoneHref}
              className="mt-1 inline-block py-2 text-ivory transition-colors hover:text-ember-soft"
            >
              {club.phone}
            </a>
          </address>
        </div>

        <nav aria-label="Fußzeile" className="md:col-span-4">
          <ul className="-my-1.5">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="block py-2.5 text-[0.6875rem] font-bold tracking-[0.2em] text-mute transition-colors hover:text-ivory"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/events"
                className="block py-2.5 text-[0.6875rem] font-bold tracking-[0.2em] text-mute transition-colors hover:text-ivory"
              >
                ALLE EVENTS
              </Link>
            </li>
            <li>
              <a
                href={club.instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="block py-2.5 text-[0.6875rem] font-bold tracking-[0.2em] text-mute transition-colors hover:text-ivory"
              >
                INSTAGRAM
              </a>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-4">
          <span className="label">Kommst du?</span>
          <div className="mt-4 flex flex-col gap-3">
            <GuestlistButton className="w-full" />
            <TableButton className="w-full" />
          </div>
        </div>
      </Reveal>

      <div className="mt-14 flex flex-col gap-3 border-t border-ivory/10 pt-6 text-[0.6875rem] leading-relaxed text-mute md:flex-row md:items-baseline md:justify-between">
        <p>
          © {new Date().getFullYear()} {club.nameFull} · {club.district}, Berlin
        </p>
        {/* Beides ist Pflicht und liegt noch nicht vor. Ein erfundener
            Rechtstext wäre schlimmer als eine offene Angabe. */}
        <p className="flex flex-wrap gap-x-5 gap-y-1">
          <span>
            Impressum
            <span className="ml-1.5 text-ember-soft/85">folgt</span>
          </span>
          <span>
            Datenschutz
            <span className="ml-1.5 text-ember-soft/85">folgt</span>
          </span>
        </p>
      </div>
    </footer>
  );
}
