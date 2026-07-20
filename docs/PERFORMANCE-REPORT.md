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

## Lighthouse – tatsächlich durchgeführte Läufe (Lab)

Ausgeführt mit **Lighthouse 13.4.0** im vorinstallierten Chromium gegen den lokal
ausgelieferten `dist/`-Ordner (Lab-Daten, nicht Feld/CrUX), **jeweils als eigener Desktop- und
Mobil-Lauf**:

| Seite | Perf (Desktop) | A11y (Desktop) | BP (Desktop) | SEO (Desktop) | Perf (Mobil) | A11y (Mobil) | BP (Mobil) | SEO (Mobil) |
|---|---|---|---|---|---|---|---|---|
| Startseite | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 |
| Im Trauerfall | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 |
| Leistungen | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 |
| Bestattungsart (Feuerbestattung) | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 |
| Abschiedsraum | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 |
| Über uns | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 |
| Mediathek | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 |
| Kontakt | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 |

LCP durchgehend ≈ 0,4–1,1 s, CLS 0, TBT ≤ 10 ms auf allen gemessenen Seiten.

Im Verlauf der Arbeit behobene, real gemessene Befunde: 9 Farbkontrast-Verstöße (erster
axe-Lauf), Label-in-Name am Logo-Link, Touch-Target-Abstand der Telefon-Schaltfläche im Header
sowie eine Bild-Seitenverhältnis-Abweichung im responsiven Logo-`srcset` (Best Practices fiel
dadurch zwischenzeitlich auf 96) und ein Heading-Order-Verstoß auf der Startseite (die
„Zuhören · Beraten · Begleiten“-Zeile fehlte als H2 zwischen H1 und den neu ergänzten H3
-Unterpunkten, Accessibility fiel dadurch zwischenzeitlich auf 98). Alle Befunde wurden behoben;
der zuletzt ausgeführte Lauf zeigt auf allen 8 geprüften Seitentypen (Desktop + Mobil) durchgehend
100/100/100/100.

> **Einordnung:** Dies sind **lokale Lab-Werte** gegen den statischen Build. Nach dem Deployment
> sollten die Läufe gegen die Live-URL wiederholt werden (reale Serverlatenz/Kompression), am
> besten mehrfach:
> ```bash
> npx lighthouse https://www.gorhau-bestattungen.de/ --preset=desktop --view
> npx lighthouse https://www.gorhau-bestattungen.de/ --form-factor=mobile --view
> ```
> Automatisiert in CI: `.github/workflows/lighthouse.yml` (Lighthouse CI, 8 Seitentypen,
> 3 Läufe je Seite, Accessibility als Fehlerschwelle).

## Datenschutz-Netzwerkcheck
Beim Erstaufruf jeder Seite werden **keine** Drittanbieter kontaktiert (kein Google Fonts, kein
Analytics, keine Maps-Einbettung, keine externen Player). Verifiziert über die HTML-Ausgabe:
einziger externer Verweis ist ein **nutzerinitiierter** Link zur Kartenansicht.
