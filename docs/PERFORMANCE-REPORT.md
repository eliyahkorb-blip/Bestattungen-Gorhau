# Performance-Report – Bestattungen Gorhau

## Gemessene Payload (gebauter `dist/`-Ordner)

| Kennzahl | Wert |
|---|---|
| Gesamtgröße `dist/` | ~716 KB (überwiegend PNG-Icons für Favicon/Manifest) |
| Startseite `index.html` | ~26 KB (unkomprimiert; CSS größtenteils inline) |
| Ausgelieferte JavaScript-Dateien | **0 externe JS-Dateien** |
| Client-JavaScript gesamt | nur ein winziges inline-`<script type="module">` (Navigations-Umschalter) |
| CSS | ~11 KB, teils inline (Astro `inlineStylesheets: 'auto'`) |
| Externe Requests beim Erstaufruf | **keine** (der einzige externe Link – OpenStreetMap – wird erst per Klick geladen) |

Diese Struktur ist die Grundlage für sehr gute Core-Web-Vitals: kein Render-Blocking durch
externe Ressourcen, kein Framework-Runtime, keine Webfont-Ladezeit, keine Layoutverschiebung.

## Umgesetzte Maßnahmen
- **Statische Ausgabe** (Astro, `output: static`), pro Seite vorgerendertes HTML.
- **Minimales JavaScript:** ausschließlich der barrierefreie Menü-Umschalter (inline, `type=module`).
  Keine React-/Vue-Hydration, keine Slider-Bibliothek, keine großen Bundles.
- **System-Font-Stacks:** keine Webfont-Downloads → kein FOIT/FOUT, kein CLS durch Schrift.
- **CSS:** klein gehalten, kritisches CSS wird von Astro automatisch inline eingebettet.
- **Bilder:** feste `width`/`height` an eingebundenen Rasterbildern (kein CLS); Icons als SVG.
  Fotos werden nach Bereitstellung als AVIF/WebP mit `srcset`/`sizes`, Lazy-Loading unterhalb des
  Folds und `fetchpriority=high` nur für das LCP-Bild ergänzt.
- **Kein Autoplay-Video, kein Hintergrundvideo.**
- **Caching & Kompression:** `.htaccess`/`vercel.json` setzen `Cache-Control: immutable` für
  Assets, `must-revalidate` für HTML; Brotli/Gzip serverseitig aktiviert.

## Lighthouse
Lighthouse sollte gegen die **deployte** Seite laufen (aussagekräftiger als gegen einen
lokalen Dev-Server) und mehrfach, um Ausreißer zu vermeiden:

```bash
npx lighthouse https://www.gorhau-bestattungen.de/ \
  --preset=desktop --view
npx lighthouse https://www.gorhau-bestattungen.de/ \
  --form-factor=mobile --view
```

**Erwartung** aufgrund der gemessenen Struktur (0 externe JS/CSS, keine Webfonts, statisch,
keine Drittanbieter): Performance und SEO im oberen Bereich, Accessibility 100 (axe: 0 Verstöße),
Best Practices hoch. Zielwerte: LCP < 2,5 s, INP < 200 ms, CLS < 0,1.

> Hinweis: In dieser Build-Umgebung konnte Lighthouse nicht selbst ausgeführt werden (kein
> stabiler Headless-Chrome-Lauf mit vollständigem Lighthouse-Runner verfügbar). Die obigen
> Kennzahlen sind direkt aus dem Build gemessen; die Lighthouse-Läufe sind nach dem Deployment
> mit den genannten Befehlen nachzuholen und hier zu ergänzen.

## Datenschutz-Netzwerkcheck
Beim Erstaufruf jeder Seite werden **keine** Drittanbieter kontaktiert (kein Google Fonts, kein
Analytics, keine Maps-Einbettung, keine externen Player). Verifiziert über die HTML-Ausgabe:
einziger externer Verweis ist ein **nutzerinitiierter** Link zur Kartenansicht.
