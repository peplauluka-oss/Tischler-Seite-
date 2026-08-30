# Medienmaterial „Black Medusa“ (Berlin)

Übernommen aus <https://github.com/webwithluka/Medusa-Club> (Branch `main`,
Stand Commit `e2ea04f`). Das ist der **komplette** Medienbestand dieses
Repositories – mehr Bilder oder Videos existieren dort nicht, auch nicht in
der Git-Historie.

| Datei | Inhalt | Format |
| --- | --- | --- |
| `black-medusa-bar.jpg` | Tresen mit hinterleuchteten Rot-Paneelen, Glitter-Front, Rückbuffet und „BLACK MEDUSA“-Schriftzug | JPEG, 3014 × 4096 px (hochkant), 713 KB |
| `black-medusa-lounge.jpg` | Loungebereich: rot hinterleuchtetes Onyx-/Kunststein-Band, Sternenhimmel-Decke, dunkle Wandverkleidung | JPEG, 4096 × 3256 px (quer), 741 KB |
| `black-medusa-clip.mp4` | Club-Clip: Logo-Wand, DJ-Pult, Tanzfläche, Lichtanlage (Instagram-Wasserzeichen `@blackmedusaberlin` eingebrannt) | H.264/AAC, 720 × 1280 px, 30 fps, 10,9 s, 3,5 MB |
| `black-medusa-clip-poster.jpg` | Standbild aus dem Clip als `poster`-Attribut für `<video>` | JPEG, 720 × 1280 px, 75 KB |

## Bearbeitungshinweise

- Die beiden Fotos sind **unveränderte Originale** (iPhone, inkl. EXIF).
  `next/image` skaliert sie beim Build – keine Vorab-Verkleinerung nötig.
- Das Video lag im Original als QuickTime-Container (`.mov`, 8,7 MB) vor.
  QuickTime wird von Chrome und Firefox nicht zuverlässig abgespielt, deshalb
  nach MP4 umkodiert (leichtes Entrauschen, CRF 26, `+faststart` für
  Progressive Download). SSIM gegenüber dem Original ≈ 0,99, Dateigröße −60 %.
- Wegen der Dateigröße das Video nur mit `preload="none"` und `poster`
  einbinden – nicht als Autoplay-Hintergrund auf Mobilgeräten.

## Vor dem Livegang klären

- **Nutzungsrechte:** Die Aufnahmen stammen erkennbar vom Club-Account
  (Wasserzeichen). Freigabe des Rechteinhabers einholen.
- **Persönlichkeitsrechte:** Im Clip sind Gäste und ein DJ erkennbar
  (DJ-Pult, Tanzfläche). Ohne Einwilligung nicht auf der Website verwenden –
  die beiden Fotos zeigen dagegen nur den leeren Innenausbau.
