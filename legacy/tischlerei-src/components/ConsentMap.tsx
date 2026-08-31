"use client";

import { useState } from "react";
import { site } from "@/content/site";

/**
 * Google-Maps-Embed als DSGVO-konforme Zwei-Klick-Lösung:
 * Die Karte (und damit jede Verbindung zu Google) wird erst geladen,
 * nachdem die Besucherin aktiv zugestimmt hat.
 */
export default function ConsentMap() {
  const [consent, setConsent] = useState(false);

  const query = encodeURIComponent(
    `${site.name}, ${site.address.street}, ${site.address.zip} ${site.address.city}`
  );

  if (!consent) {
    return (
      <div className="flex h-full min-h-64 flex-col items-center justify-center rounded-2xl border border-char/15 bg-oak/10 p-6 text-center">
        <p className="max-w-xs text-sm text-char/70">
          Hier liegt eine Google-Maps-Karte. Beim Laden werden Daten an
          Google übertragen (Details in unserer{" "}
          <a href="/datenschutz" className="underline underline-offset-2">
            Datenschutzerklärung
          </a>
          ).
        </p>
        <button
          type="button"
          onClick={() => setConsent(true)}
          className="mt-4 rounded-full bg-char px-5 py-2.5 text-sm font-medium text-cream transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-walnut active:scale-[0.97] active:duration-150"
        >
          Karte laden
        </button>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${query}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 text-xs text-char/60 underline underline-offset-2 hover:text-char"
        >
          Oder direkt bei Google Maps öffnen ↗
        </a>
      </div>
    );
  }

  return (
    <iframe
      title={`Karte: Anfahrt zur ${site.name}, ${site.address.street}, ${site.address.zip} ${site.address.city}`}
      src={`https://www.google.com/maps?q=${query}&output=embed`}
      className="h-full min-h-64 w-full rounded-2xl border-0"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  );
}
