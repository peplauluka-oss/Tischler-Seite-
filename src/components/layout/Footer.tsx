import Link from "next/link";
import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-char text-wood-raw">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold">Hobbytischlerei Berlin</p>
          <address className="mt-3 text-sm not-italic leading-relaxed text-wood-raw/70">
            {site.address.street}
            <br />
            {site.address.zip} {site.address.city}
            <br />
            <a href={site.phoneHref} className="hover:text-wood-raw">
              {site.phone}
            </a>
            <br />
            <a href={`mailto:${site.email}`} className="hover:text-wood-raw">
              {site.email}
            </a>
          </address>
        </div>
        <nav aria-label="Angebote" className="text-sm">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-wood-oak">
            Angebote
          </p>
          <ul className="mt-3 space-y-2 text-wood-raw/70">
            <li><Link href="/kurse" className="hover:text-wood-raw">Kurse &amp; Workshops</Link></li>
            <li><Link href="/holzkurse-koepenick" className="hover:text-wood-raw">Holzkurse Köpenick</Link></li>
            <li><Link href="/werkstatt-mieten" className="hover:text-wood-raw">Werkstatt mieten</Link></li>
            <li><Link href="/auftragsarbeiten" className="hover:text-wood-raw">Auftragsarbeiten</Link></li>
            <li><Link href="/kontakt?anliegen=gutschein" className="hover:text-wood-raw">Gutschein verschenken</Link></li>
            {site.shopUrl ? (
              <li><a href={site.shopUrl} className="hover:text-wood-raw">Onlineshop</a></li>
            ) : (
              <li className="text-wood-raw/40">Onlineshop [PLATZHALTER: Link]</li>
            )}
          </ul>
        </nav>
        <nav aria-label="Rechtliches" className="text-sm">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-wood-oak">
            Rechtliches
          </p>
          <ul className="mt-3 space-y-2 text-wood-raw/70">
            <li><Link href="/impressum" className="hover:text-wood-raw">Impressum</Link></li>
            <li><Link href="/datenschutz" className="hover:text-wood-raw">Datenschutz</Link></li>
            <li className="text-wood-raw/40">AGB [PLATZHALTER: vom Kunden]</li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-wood-raw/10">
        <p className="mx-auto max-w-6xl px-4 py-5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-wood-raw/40 sm:px-6">
          © {new Date().getFullYear()} Hobbytischlerei Berlin · Alt-Kaulsdorf 52 · Handwerk seit [PLATZHALTER: Gründungsjahr]
        </p>
      </div>
    </footer>
  );
}
