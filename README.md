# Hobbytischlerei Berlin — Website-Relaunch

Scroll-getriebene 3D-Experience für die Erlebniswerkstatt in Berlin-Kaulsdorf:
**Ein massiver Eichenstamm bricht beim Scrollen/Swipen in sieben dicke
Scheiben auf** — dunkler Editorial-Hero, danach warme One-Pager-Sektionen
(Angebote → Werkstatt → Prozess → Referenzen → CTA → Kontakt → FAQ).

## Tech-Stack

- **Next.js 15 (App Router) + TypeScript** — SSR/SSG, aller Text ist echtes HTML (SEO)
- **React Three Fiber + drei** — eine persistente 3D-Szene, vollständig prozedural
  (Holz-Maserung & Jahresringe per Custom Shader, keine 3D-Modelle, keine Texturen)
- **GSAP ScrollTrigger** (scrub) + **Lenis** Smooth Scrolling
- **Tailwind CSS v4** (Design-Tokens in `src/app/globals.css`)
- Kein CMS: Inhalte als typisierte Content-Objekte in `src/content/`

## Starten

```bash
npm install
npm run dev        # Entwicklung → http://localhost:3000
npm run build      # Produktions-Build
npm start          # Produktionsserver
```

## Inhalte austauschen (ohne Programmierkenntnisse)

Alle Texte, Adressen und Angebote liegen als einfache Listen in `src/content/`:

| Datei | Inhalt |
| --- | --- |
| `src/content/site.ts` | Name, Adresse, Telefon, E-Mail, Öffnungszeiten, Links |
| `src/content/angebote.ts` | Die drei Angebots-Karten (Kurse / Miete / Auftrag) |
| `src/content/kurse.ts` | Kursliste mit Dauer & Preis |
| `src/content/prozess.ts` | Die 4 Prozess-Schritte |
| `src/content/referenzen.ts` | Galerie-Projekte & Kundenstimmen |
| `src/content/faq.ts` | FAQ (erzeugt automatisch das FAQPage-JSON-LD) |

Alles, was noch vom Kunden kommen muss, ist im Code und auf der Seite als
`[PLATZHALTER: …]` markiert — einfach danach suchen:

```bash
grep -rn "PLATZHALTER" src/
```

**Fotos:** Referenzbilder liegen in `public/referenzen/` (aktuell SVG-Platzhalter).
Echte Fotos (JPG/WebP, ~1200 px breit) hineinlegen, Pfade in
`src/content/referenzen.ts` anpassen und in `src/components/ReferenzGalerie.tsx`
das `unoptimized`-Attribut entfernen. Deutsche Alt-Texte nicht vergessen!

**Kontaktformular:** `src/app/api/kontakt/route.ts` protokolliert Anfragen bisher
nur serverseitig. Vor Livegang einen Mail-Dienst anbinden (z. B. Resend/Postmark)
— die Stelle ist im Code markiert.

## Die 3D-Swipe-Interaktion (Architektur, `src/components/intro/`)

- `IntroStage.tsx` — Bühne: 340vh-Track mit sticky 100vh-Screen, Lenis
  (Swipe-Trägheit), Master-ScrollTrigger (scrub → Fortschritt 0–1) und den
  drei HTML-Overlay-Phasen (Headline → CAD-Labels → Abbinder).
- `LogScene.tsx` — die Szene: sieben unterschiedlich dicke Stamm-Scheiben,
  Aufbruch-Choreografie mit Stagger von der Mitte nach außen, wandernde
  Präzisions-Lichtlinie, 60°-Umrundung, Beruhigung zur Skulptur; dazu
  Kamerafahrt (inkl. Portrait-Anpassung für Mobile) und Staub im Gegenlicht.
- `materials.ts` — EIN prozeduraler Shader für Rinde (fbm-Borke mit
  analytischen Relief-Normalen, wasserdichtes Displacement) und Stirnholz
  (Jahresringe mit Noise-Wobble, glühender Kern beim Aufbrechen). uShift
  hält Borke & Ringe über alle Scheiben hinweg kontinuierlich.
- `progress.ts` — Fortschritts-Store + Geräte-Heuristik. Sämtliche Bewegung
  wird pro Frame aus dem Scroll-Fortschritt berechnet → beliebig
  vor-/zurückswipbar, kein eigener Timer.

### Fallback-Kaskade (automatisch, `progress.ts → detectDeviceTier()`)

1. `prefers-reduced-motion` → keine Scroll-Kopplung: Der Track kollabiert
   auf einen normalen Hero mit statischem SVG-Keyvisual, kein Canvas.
2. Schwache Geräte (Kerne/RAM/DPR-Heuristik) → reduzierte Geometrie, kein
   Staub, DPR 1, keine Kontaktschatten.
3. Kein WebGL / kein JavaScript → wie (1). Der komplette Inhalt bleibt lesbar.

### Performance-Regeln

- 3D lädt per `next/dynamic` — die Hero-Headline (LCP) ist reines HTML.
- `frameloop="demand"`: gerendert wird nur bei Scroll-Änderung + sparsamer
  ~30fps-Idle-Ticker fürs Kamera-„Atmen“ am Seitenanfang.
- DPR geclampt auf 1–1.75, Staub als ein InstancedMesh, Schatten ≤ 512 px.
- Sektions-Animationen unterhalb des Intros: reines CSS + ein
  IntersectionObserver (`Reveal.tsx`) — kein GSAP außerhalb der Bühne.

## SEO

- Sprechende URLs: `/kurse`, `/werkstatt-mieten`, `/auftragsarbeiten`,
  `/holzkurse-koepenick` (bestehende Köpenick-Seite bleibt erhalten!), `/kontakt`.
- JSON-LD: `LocalBusiness` (Layout), `Course` (/kurse), `FAQPage` (FAQ-Sektion).
  **Kein** `aggregateRating` ohne echte, belegbare Bewertungen.
- `sitemap.xml` & `robots.txt` werden automatisch generiert
  (`src/app/sitemap.ts`, `src/app/robots.ts`). Domain in `src/content/site.ts`.

## Rechtliches

`/impressum` und `/datenschutz` enthalten **strukturierte Platzhalter** —
die verbindlichen Texte liefert der Kunde/Anwalt. Google Maps lädt erst nach
aktiver Einwilligung (Zwei-Klick-Lösung, `ConsentMap.tsx`). Es laufen keine
Tracking-Tools, daher ist kein Cookie-Banner nötig.

## Deployment (Vercel)

1. Repository bei [vercel.com](https://vercel.com) importieren — Framework
   „Next.js“ wird automatisch erkannt, keine Sonderkonfiguration nötig.
2. Finale Domain in `src/content/site.ts` (`url`) eintragen → Canonicals,
   OpenGraph und Sitemap stimmen dann automatisch.
3. Nach Livegang: Search Console anmelden, `sitemap.xml` einreichen,
   JSON-LD mit dem Rich-Results-Test prüfen.

## Vor Livegang vom Kunden benötigt

Logo (SVG) · 10–15 Werkstatt-/Referenzfotos · Kursliste mit Terminen & Preisen ·
Mietkonditionen · Öffnungszeiten · Impressums-/Datenschutzangaben · echte
Kundenstimmen · Google-Bewertungslink · Entscheidung Shop (verlinken/integrieren).
