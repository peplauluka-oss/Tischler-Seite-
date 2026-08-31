# BLACK MEDUSA BERLIN — Website-Prototyp

Erste Ausbaustufe der Website für den Club **Black Medusa** in Berlin.
Schwerpunkt dieser Iteration: der scrollgesteuerte Hero und die
Tischreservierung. Alles Weitere ist als tragfähiges Gerüst angelegt.

Konversionsziel der Seite ist die **Tischreservierung**. Es gibt bewusst
keinen Online-Ticketverkauf — der Eintritt läuft über die Abendkasse.

## Die Hero-Choreografie

Eine einzige GSAP-Timeline (`ScrollTrigger`, `scrub`) über ~380 vh Scrollweg,
gerendert in einer `sticky` Bühne. Der Ablauf:

| Fortschritt | Was passiert |
| --- | --- |
| 0–8 % | **Ankunft.** Clubclip formatfüllend, schmale Brandingleiste, sonst nichts. |
| 8–26 % | **Logo → Navigation.** Die Wortmarke wandert nach links, verblasst; an derselben Kante erscheint die permanente Navigation. |
| 20–56 % | **Das Video gibt nach.** Es verschwindet nicht, es tritt zurück: skaliert, wandert nach rechts, verliert Helligkeit; eine zweite Bildebene schiebt sich dahinter. |
| 42–70 % | **Das Event tritt auf.** SINAN → Special Guest → Eckdaten, gestaffelt. |
| 69–77 % | **Countdown.** Läuft unabhängig vom Scroll live weiter. |
| 77–90 % | **Konversion.** Reservierungs-CTA, danach der nachrangige Event-CTA. |
| 80–100 % | **Musterbruch.** Die Bildebene läuft ein Stück gegen die Scrollrichtung — kurzer Tiefenwechsel vor dem Übergang in die Eventsektion. |

Feinjustierung: `CUE` in `src/components/hero/Hero.tsx`.

### Warum das Video hochkant im Bild steht

Das Originalmaterial ist ein Hochkantclip (720 × 1280). Formatfüllend auf
Desktopbreite gezogen müsste es rund 3-fach hochskaliert werden — sichtbar
unscharf. Stattdessen steht es als vertikale Kinofläche über die volle
Bildhöhe, die Seiten füllt ein stark unscharfer Lichtabdruck desselben
Bildes. Auf dem Telefon deckt der Clip den Screen ohnehin nativ formatfüllend.

## Technik

- **Next.js 15 (App Router) + TypeScript**, statisch vorgerendert
- **Tailwind CSS v4** — Tokens in `src/app/globals.css` (`@theme`)
- **GSAP + ScrollTrigger** für die scrollgebundene Hero-Choreografie
- **Framer Motion** für UI-Bewegung: Overlay, Menü, Einblender
- **Lenis** für weiches Scrollen, an den GSAP-Ticker gekoppelt
- Kein CMS, keine Datenbank, kein Backend: Inhalte liegen typisiert in `src/content/`

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Produktionsbuild
```

## Wo was liegt

```
src/
  app/                  Layout (Schriften, Metadaten), Seite, Tokens, Favicon
  components/
    hero/               Hero, HeroVideo, HeroBrandBar, EventReveal, Countdown
    nav/SiteNav         permanente Navigation + mobiles Menü
    reservation/        Overlay + Formular
    sections/           Event, Artists, Experience, Gallery, Location
    ui/                 Marke, Buttons, Sektionsrahmen, Einblender
  content/
    event.ts            ← Eventdaten (Termin, Line-up, Tischkategorien)
    club.ts             ← Clubdaten, Navigation, Bildmaterial
  lib/                  Countdown, Scroll, Reservierungs-Kontext, Asset-Pfade
public/media/           Clubclip (mp4/webm), Poster, sechs Clubfotos (WebP)
legacy/                 archiviertes Vorprojekt (Hobbytischlerei), nicht gebaut
```

### Event austauschen

Alles in `src/content/event.ts`. Für das nächste Event genügen in der Regel
vier Zeilen: `headliner`, `startsAt`, `dateShort`, `dateLong`.

## Offene Punkte für den Betreiber

Was nicht bekannt war, wurde **nicht erfunden**, sondern als Platzhalter
markiert — sichtbar im Interface durch ein kleines `TBC`:

- **Termin und Einlasszeit** des Events (aktuell Platzhalter 05.09.2026)
- **Support-DJs / Resident** (im Line-up als TBA geführt)
- **Adresse und Öffnungszeiten**
- **Tischkategorien** (Standard / Lounge / Premium sind ein Vorschlag,
  bewusst ohne Preise und Mindestverzehr)
- **Impressum und Datenschutzerklärung** — Pflicht vor dem Livegang
- **Logodatei**: Das Haus führt ein Medusa-Signet im Mäanderring. Bis das
  Original vorliegt, steht in `src/components/ui/Brand.tsx` ein eigenes
  Zeichen aus demselben Formenkanon.

### Rechtliches zum Material

- **Nutzungsrechte** an Clip und Fotos vom Rechteinhaber freigeben lassen
  (der Clip trägt das Wasserzeichen `@blackmedusaberlin`).
- **Persönlichkeitsrechte:** Im Clip sind Gäste und ein DJ erkennbar. Ohne
  Einwilligung sollte er vor dem Livegang durch Material ohne erkennbare
  Personen ersetzt werden — die Hero-Mechanik bleibt davon unberührt, es ist
  ein Dateiaustausch in `public/media/`.

## Reservierung

Frontend-Prototyp ohne Backend: Das Formular validiert, zeigt einen
Sendezustand und einen Erfolgszustand — und sagt dort ausdrücklich, dass
nichts übertragen wurde. Für den Echtbetrieb genügt ein Submit-Handler
(`src/components/reservation/ReservationForm.tsx`), der die Daten an eine
API-Route, ein Mailrelay oder eine WhatsApp-Business-Schnittstelle gibt.

## Barrierefreiheit & Performance

- `prefers-reduced-motion`: keine Scroll-Choreografie, kein Autoplay — der
  Hero wird direkt in seinem Endzustand als ruhige Komposition ausgeliefert
- Der Clip lässt sich jederzeit anhalten und pausiert außerhalb des Sichtfelds
- Tastaturbedienung inkl. Sprunglink, Fokusfalle im Overlay, Escape schließt
- Formularfelder mit Labels, Fehlermeldungen als `role="alert"`
- Bilder als WebP mit Blur-Platzhalter, Videos in WebM (2,6 MB) und MP4 (3,1 MB)

## Deployment

Läuft auf Vercel out of the box. Für den GitHub-Pages-Export
(`.github/workflows/pages.yml`) muss dieser Branch in die `branches`-Liste
des Workflows aufgenommen werden; der Export setzt `GITHUB_PAGES=true` und
`NEXT_PUBLIC_BASE_PATH`.
