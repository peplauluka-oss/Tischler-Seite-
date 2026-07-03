import ContactForm from "@/components/ContactForm";
import ConsentMap from "@/components/ConsentMap";
import { site } from "@/content/site";
import type { AnliegenKey } from "@/content/site";

/**
 * Kontakt & Anfahrt – normaler Seitenfluss NACH der 3D-Story.
 * Trust-Elemente bewusst nah am Formular.
 */
export default function KontaktSection({
  defaultAnliegen,
}: {
  defaultAnliegen?: AnliegenKey;
}) {
  return (
    <section id="kontakt" className="relative z-10 bg-cream px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="tech-label mb-6">Kontakt · Anfahrt</p>
        <h2 className="font-display text-3xl font-bold tracking-tight text-walnut sm:text-4xl">
          Sprechen wir über Ihr Projekt
        </h2>
        <div className="mt-10 grid gap-10 lg:grid-cols-[3fr_2fr]">
          <div>
            <ContactForm defaultAnliegen={defaultAnliegen} />
            {/* Trust-Elemente */}
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-char/60">
              <li>✓ {site.responseTimePromise}</li>
              <li>✓ Beratung direkt vom Tischler</li>
              <li>✓ [PLATZHALTER: Google-Bewertungslink]</li>
            </ul>
          </div>
          <div className="space-y-5">
            <div className="rounded-2xl bg-oak/15 p-6">
              <h3 className="font-display text-lg font-bold text-char">Werkstatt Kaulsdorf</h3>
              <address className="mt-2 text-sm not-italic leading-relaxed text-char/75">
                {site.address.street}
                <br />
                {site.address.zip} {site.address.city}
              </address>
              <p className="mt-3 text-sm text-char/75">
                Öffnungszeiten: {site.openingHours}
              </p>
              <a
                href={site.phoneHref}
                className="mt-4 inline-block rounded-full bg-char px-5 py-2.5 text-sm font-medium text-cream transition hover:bg-walnut"
              >
                Jetzt anrufen: {site.phone}
              </a>
              <p className="mt-2 text-sm">
                <a href={`mailto:${site.email}`} className="text-char/70 underline underline-offset-2 hover:text-char">
                  {site.email}
                </a>
              </p>
            </div>
            <ConsentMap />
          </div>
        </div>
      </div>
    </section>
  );
}
