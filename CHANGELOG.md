# Changelog

## 1.7.0 – Visuelle Finalisierung mit den bereitgestellten Unsplash-Bildern

### Neu
- **Bildpipeline für Stockmotive** (`scripts/stock-images.config.mjs`,
  `scripts/build-stock-images.mjs`, `npm run images:stock`): erzeugt aus den Originalen unter
  `incoming-assets/unsplash-originals/` responsive AVIF-, WebP- und JPG-Varianten in
  `public/images/stock/` – 120 Dateien, 8,7 MB. Zuschnitte werden pro Motiv festgelegt
  (2:1-Band fürs Hero, 3:2 für Inhaltsbilder), nichts wird verzerrt oder hochskaliert.
- **`StockPhoto.astro`**: `<picture>` mit AVIF/WebP/JPG, `srcset`/`sizes`, festen `width`/`height`
  aus dem generierten Manifest (`src/data/stock-images.json`), `loading="lazy"` unterhalb des
  Folds und eigener, schmalerer Zuschnitt für kleine Viewports (Art Direction beim Hero).
  Die Komponente ist bewusst von `PhotoFigure.astro` getrennt, damit Stockmotive nie mit echten
  Unternehmensfotos verwechselt werden.
- **Berichte** (`npm run audit:images`): `audit/unsplash-image-inventory.md`/`.json`,
  `audit/final-image-coverage.md` und der generierte Stock-Abschnitt in
  `docs/IMAGE-SOURCE-AND-LICENSES.md` werden aus dem tatsächlichen Build erzeugt.
- **`tests/perf.mjs`**: misst LCP, CLS und Übertragungsgewicht pro Seite nach Bildänderungen.

### Verbessert
- **Startseite**: echtes Würzburg-Panorama als Hero (eager, `fetchpriority="high"`), dazu zwei
  **echte** Gorhau-Fotos an prominenter Stelle – Außenansicht und Abschiedsraum ersetzen die
  bisherigen Illustrationen.
- **Neun Seiten neu bebildert**: Im Trauerfall, Bestattungsarten-Übersicht, Seebestattung (zwei
  Motive), anonyme Bestattung, Friedhöfe, Trauerfeier & Trauerdruck sowie Über uns erhalten
  allgemeine Stockmotive; Überführungen und Thanatopraxie bekommen **echte** Gorhau-Aufnahmen
  (Fahrzeuge, Versorgungsraum) in nativer Größe statt hochskalierter Thumbnails.
- **Screenshot-Test** deckt jetzt alle 24 indexierbaren Seiten ab (48 Aufnahmen) und liefert
  AVIF/WebP/JPG mit korrektem MIME-Typ aus.

### Geprüft
- Lighthouse (Desktop): Performance 100, Accessibility 100, Best Practices 100, SEO 100 auf
  Startseite, Im Trauerfall und Seebestattung. LCP 0,3–0,5 s, CLS 0, Startseite 156 KiB.
- Alle bisherigen Tests unverändert grün: Build, A11y (0 Verstöße), interne Links (0 defekt),
  GitHub-Pages-Vorschau (0 fehlgeschlagene Requests, kein horizontales Scrollen).

### Hinweis
- Zwei der elf gelieferten Motive wurden bewusst **nicht** eingesetzt (Kremationsofen mit
  fremder Anlagentechnik, dunkler Trauerengel mit lesbaren Namen realer Verstorbener) –
  Begründung in `audit/unsplash-image-inventory.md`.
- Ohne Bild bleiben weiterhin Bestattungsvorsorge, Benötigte Dokumente und Formalitäten: für
  diese Dokument-/Papiermotive lag im Paket kein passendes Bild vor.

## 1.5.1 – Feinkorrektur: Typografie, Header-Kontakt, Video, Farbbalance

### Verbessert
- **Globaler Abstands-/Typografie-Pass** (`src/styles/tokens.css`, `src/styles/global.css`):
  großzügigerer vertikaler Rhythmus zwischen Überschriften/Absätzen/Karten (Owl-Selector-Muster
  `* + h2`, `* + p` usw.), line-height leicht erhöht (1.7 Fließtext, 1.2 Headings), größere
  Spaltenabstände in 2-Spalten-Layouts, mehr Luft in Info-/Hinweiskästen.
- **Header-Telefon neu gestaltet** (`src/components/Header.astro`): kein Emoji mehr, stattdessen
  SVG-Telefon-Icon in rundem Bordeaux-Badge als edler Kontaktchip; gleiche Behandlung für die
  mobile Kontaktleiste (`ContactBar.astro`) und die Telefon-Buttons in `CtaSection.astro` und auf
  der Startseite.
- **Tel-/Mail-Links ohne Unterstreichung** (global, `a[href^="tel:"]`/`a[href^="mailto:"]`):
  wirken jetzt wie hochwertige Kontaktdaten statt roher Standardlinks; normale Textlinks im
  Fließtext bleiben unverändert unterstrichen.
- **Kontaktseite aufgeräumt** (`src/pages/kontakt.astro`): klar getrennte Abschnitte, mehr
  Abstand nach der HintBox, gruppierte Anfahrt-Buttons, ruhigere Kontaktzeilen.
- **Funktionsfähiger Video-Player** (`src/components/ui/VideoPlayer.astro`, neu): Posterbild,
  Play-Overlay, Klick startet die Wiedergabe direkt im `<video>`-Element mit nativen Controls
  (inkl. Vollbild), kein Autoplay. Eingesetzt im neuen Imagefilm-Modul der Startseite und in der
  Mediathek. Es liegt noch keine echte Videodatei vor – ein Klick zeigt daher einen klaren,
  funktional wirkenden Hinweis statt eines kaputten Players oder eines erfundenen Platzhalterfilms.
- **Farbgewichtung verfeinert:** Globale Heading-Farbe (h2–h4) von Bordeaux auf ein neutrales
  Dunkelbraun umgestellt (h1 bleibt Bordeaux als einziger starker Markenmoment pro Seite);
  Chip-/Fact-/Fragen-Listen-Text auf allen Themenseiten von Bordeaux auf neutral umgestellt;
  Hero-Subline der Startseite entschärft.

### Behoben
- Entdeckter Anzeige-Bug im neuen Video-Player (Pending-Hinweis war durch `display`-Kollision mit
  dem `hidden`-Attribut dauerhaft sichtbar) noch vor dem Deployment gefunden und behoben.

## 1.5.0 – Referenzinspirierte visuelle Überarbeitung

### Neu
- **Neues Illustrationssystem** (`src/components/illustrations/Motif.astro`): 14 eigenständige,
  farbige Linien-Illustrationen (Erd-/Feuer-/See-/anonyme Bestattung, Thanatopraxie, Vorsorge,
  Formalitäten, Trauerfeier, Überführung, Abschiedsraum, Historie, Friedhöfe, Gebäude,
  Begleitung) als ehrlicher Ersatz für nicht vorhandenes echtes Fotomaterial – orientiert am
  Referenzprinzip „farbige Linienillustrationen als Ergänzung", ohne Fotos/Personen/Räume/
  Fahrzeuge zu erfinden oder als echt auszugeben.
- **Zurückhaltender Abschluss-CTA** (`src/components/ui/PageCta.astro`) ersetzt das bisher auf
  jeder Themenseite automatisch eingebundene volltonige Bordeaux-CTA-Panel; jede Seite hat
  jetzt eine passende, seitenspezifische CTA-Beschriftung statt eines generischen Buttons. Das
  volltonige Panel bleibt als einzelner „starker Moment" der Startseite vorbehalten.
- **Alle 20 Themenseiten strukturell überarbeitet:** visuelles Element direkt im oberen
  Bereich, maximal zwei aufeinanderfolgende Textblöcke ohne visuellen/strukturellen Wechsel,
  verwandte Themen, Abschluss-CTA.
- **Startseite neu sequenziert:** Hero → Orientierung → Zuhören-Beraten-Begleiten → Fakten →
  Unternehmensbild/Vorstellung → ausgewählte Leistungen (Motiv-Kacheln) → „Was uns ausmacht" →
  Bestattungsarten als visuelle Auswahl (4 Motiv-Kacheln) → Abschiedsraum → Imagefilm-Teaser →
  Vorsorge/Über uns → Historie/Mediathek → Kontakt → CTA.
- **Farbbalance angepasst:** Bordeaux-Vollflächen sitendweit von 20 auf 1 reduziert (nur noch
  der finale CTA-Block der Startseite), Weiß/Creme/Beige dominieren wie vorgegeben.
- Neue Dokumentation: `docs/IMAGE-SOURCE-AND-LICENSES.md`, `docs/PHOTO-SHOOT-LIST.md`,
  `audit/reference-inspired-design-review.md`, `audit/page-image-coverage.md`.
- 48 neue Screenshots (24 Seiten × Desktop/Mobil) in `audit/screenshots/`
  (`scripts/screenshot-all-pages.mjs`).
- Erneut vollständig verifiziert: axe-core 0 Verstöße auf allen 25 Seiten, 0 defekte interne
  Links, GitHub-Pages-Vorschaubuild weiterhin fehlerfrei (24/24 Status 200).

## 1.4.0 – Öffentliche GitHub-Pages-Vorschau (dualer Build)

### Neu
- **Dualer Build-Modus** über `DEPLOY_TARGET`-Umgebungsvariable in `astro.config.mjs`:
  `npm run build` (Produktion, `site: https://www.gorhau-bestattungen.de`, `base: /`,
  unverändert) und neu `npm run build:pages` (`site: https://eliyahkorb-blip.github.io`,
  `base: /Bestattungen-Gorhau`, nicht indexierbar).
- **Zentraler URL-Helfer** `src/utils/url.ts` (`withBase()`, `absoluteUrl()`,
  `withBaseSrcset()`, `isPreviewBuild()`) – alle internen Pfade (Navigation, Footer,
  Breadcrumbs, Logo, Favicons, Manifest, Browserconfig, Bilder, Flyer, Canonicals, JSON-LD,
  Sitemap) laufen jetzt zentral darüber statt über hartkodierte Wurzelpfade.
- **Dynamische Endpunkte** ersetzen statische `public/`-Dateien, die je Build-Ziel variieren
  müssen: `src/pages/robots.txt.ts`, `site.webmanifest.ts`, `browserconfig.xml.ts`.
- **GitHub-Actions-Workflow** `.github/workflows/deploy-pages-preview.yml`
  (`withastro/action@v6` + `actions/deploy-pages@v5`), läuft bei jedem Push auf den
  Entwicklungsbranch sowie manuell – kein Merge nach `main` nötig.
- **Vorschauschutz:** `noindex, nofollow` auf jeder Vorschauseite, `robots.txt` mit
  `Disallow: /`, keine `CNAME`, kein Tracking/Search-Console in der Vorschau.
- Neuer Lokal-Test `npm run test:pages-preview` (`tests/pages-preview-check.mjs`) prüft den
  `build:pages`-Output unter simuliertem Repo-Unterpfad (24 Seiten + 404): Status, defekte
  Links, fehlgeschlagene Requests, horizontales Scrollen, noindex, mobile Navigation,
  `prefers-reduced-motion`. Bericht: `audit/github-pages-preview-report.md` / `.json`.
- `docs/DEPLOYMENT.md` (Variante D) aktualisiert: Unterpfad-Problem ist gelöst, Vorschau-Workflow
  dokumentiert.

## 1.3.0 – Visuelle Neuinszenierung, weniger Textlast, mehr Bildsprache

### Neu
- **Neues Design-System** (`src/components/ui/`, `src/components/icons/`): handgezeichnete
  Linien-Icons in Markenfarbe (kein Bestatter-Clipart, kein Kerzen-/Tauben-/Blumen-Symbol –
  stattdessen abstrahierte Motive wie Geborgenheit, Blatt, Fenster mit Licht, Kompass),
  `IconFeature`-Kacheln, `Quote`-Zitatblock, `FactStrip`-Faktenleiste, barrierefreies
  `AccordionItem` (natives `<details>`/`<summary>`, Inhalt bleibt im HTML, voll
  tastaturbedienbar), `HintBox`, `WaveDivider` (organischer Sektionsübergang), `HeroVisual`
  (zurückhaltende abstrakte Illustration – da noch kein echtes Unternehmensfoto vorliegt,
  bewusst keine erfundene Stockfoto-/KI-Bildsprache).
- **Startseite komplett neu inszeniert:** kurze zweispaltige Hero-Sektion (Text + Illustration,
  zwei klare CTAs „Im Trauerfall anrufen“ / „Vorsorge besprechen“), vier Schnellzugriff-Kacheln
  (Im Trauerfall, Bestattungsarten, Vorsorge, Abschiedsraum), dreiteilige Philosophie mit Icons,
  Faktenleiste, kompakte „Was uns ausmacht“-Kacheln, alternierender Sektionsrhythmus
  (Creme/Beige/Weiß statt durchgehend Weiß). Von 10 auf 8 klar unterscheidbare Module verdichtet.
- **Textlast auf allen Detailseiten reduziert:** Leistungs- und Bestattungsarten-Unterseiten von
  je 5–7 aufeinanderfolgenden H2-Textblöcken auf 2–4 kondensiert; lange Zusatzlisten in
  Akkordeons verschoben (Inhalt bleibt crawlbar, ist aber nicht mehr als Textwand sichtbar);
  einheitliche Chip-Listen statt Aufzählungspunkte für kurze Fakten.
- Generische weiße 3-Spalten-Kartenraster (identisch auf mehreren Seiten) durch `IconFeature`-
  Kacheln, Chip-Listen, Mini-Step-Listen und Fact-Strips ersetzt – visuelle Sprache variiert
  jetzt je Seite statt sich zu wiederholen.
- WCAG-Regression durch neue Hero-Buttons behoben (Touch-Target-Abstand auf Mobil).
- Erneut vollständig verifiziert: axe-core auf allen 25 Seiten 0 Verstöße, Lighthouse auf allen
  8 Kern-Seitentypen (Desktop + Mobil) 100/100/100/100, Multi-Page-SEO-Report weiterhin 0 Befunde.

## 1.2.0 – Multi-Page-Vertiefung, Inhaltsausbau, vollständige Einzelseiten-Prüfung

### Neu
- **Echtes Logo integriert:** `header_logo.png` (979×115) pixelgenau auf die Marke zugeschnitten
  (524×92, Telefon-Widget + Spiegelung entfernt, Kreuz/Pfeile/Wortmarke/Proportionen
  unverändert). Platzhalterlogo vollständig ersetzt. Favicons, Apple-Touch-Icon, OG-Bild und
  Webmanifest aus dem echten Logo neu erzeugt.
- **Markenfarben aus Original übernommen:** Bordeaux `#882020` (Wortmarke/Headline im Flyer
  2009), Gold `#b8933d` (Logo-Fassung), warmes Creme `#f7ece9`/Beige `#ecdcd6`
  (Flyer-Papier) – in globalen CSS-Tokens, Header, Footer, Buttons, Fokuszuständen, Favicons und
  OG-Bild konsistent umgesetzt. Alle Kontraste WCAG AA.
- **Flyer 2009 eingebunden** auf `/mediathek/` (AVIF/WebP/JPG, Alt-Text, Bildunterschrift, klar
  als historisches Material 2009 gekennzeichnet).
- **Inhaltsausbau aller Kernseiten** auf die vorgegebenen Wortumfänge, ohne künstliches
  Aufblähen: Startseite 498→836 Wörter, Leistungsseiten und Bestattungsarten je auf 400–800
  Wörter, Vorsorge/Abschiedsraum/Über uns/Friedhöfe entsprechend erweitert – mit echten
  Zwischenüberschriften, Listen, Hinweiskästen und thematischen internen Verlinkungen
  (Content-Cluster: Trauerfall ↔ Dokumente ↔ Formalitäten ↔ Bestattungsarten ↔ Kontakt;
  Vorsorge ↔ Bestattungsarten ↔ Abschiedsraum; Leistungsübersicht ↔ alle Leistungsunterseiten
  und zurück).
- **Multi-Page-SEO-Check** (`tests/multipage-audit.mjs`, `npm run test:multipage`): prüft jede
  der 25 gebauten Einzelseiten automatisiert auf H1, Title-/Description-Eindeutigkeit,
  selbstreferenzierenden Canonical, lang/Viewport, interne Links (aus- und eingehend), defekte
  Links, leere Überschriften/Links, Alt-Attribute und Sitemap-Eintrag. Ergebnis:
  `audit/multipage-seo-report.md` / `.json` – **0 Seiten mit Befund**.
- Bestätigt: **keine** Single-Page-Application, **kein** Hash-/Client-Routing – 25 eigenständige,
  beim Build erzeugte HTML-Dokumente, alle über Navigation/interne Links erreichbar.
- WCAG-Regression durch neue Inhalte behoben (Heading-Order auf der Startseite: „Zuhören ·
  Beraten · Begleiten“ von `<p>` zu `<h2>` aufgewertet) – danach wieder axe 0 Verstöße und
  Lighthouse Accessibility 100 auf allen geprüften Seiten.
- Lighthouse erneut für alle 8 Kern-Seitentypen **einzeln für Desktop und Mobil** ausgeführt:
  durchgehend 100/100/100/100.

## 1.0.0 – Relaunch

### Neu
- Vollständige statische Astro-Website mit 24 indexierbaren Seiten + 404 gemäß neuer
  Informationsarchitektur (Startseite, Im Trauerfall, Leistungen, Bestattungsarten, Vorsorge,
  Abschiedsraum, Über uns/Historie/Galerie, Mediathek, Friedhöfe, Kontakt, Impressum,
  Datenschutz, Barrierefreiheit).
- Design-System mit Marken-Tokens (Bordeaux/Gold/Creme) und System-Font-Typografie.
- Barrierefreie, tastaturbedienbare Navigation (Desktop-Dropdowns + mobiles Menü mit
  `aria-expanded`/Escape), Skip-Link, mobile Kontaktleiste.
- SEO: zentrale Meta-/JSON-LD-Verwaltung, `FuneralHome`/`Organization`/`WebSite`/`WebPage`/
  `BreadcrumbList`/`FAQPage`, Canonicals, Open Graph, `sitemap.xml`, `robots.txt`.
- Favicons (ICO/SVG/PNG), Apple-Touch-Icon, Web-App-Manifest, browserconfig, OG-Standardbild.
- Hosting-Konfiguration: `.htaccess` (HTTPS+www, 301-Redirects, Security-Header, CSP,
  Kompression, Caching, 404), `public/_redirects` (Netlify), `vercel.json` (Vercel).
- 28 Legacy-URL-Weiterleitungen (`audit/redirect-map.csv`), ohne Ketten/Loops, keine pauschale
  Startseiten-Weiterleitung.
- Rechtstexte an den tatsächlichen Stack angepasst (DDG-Impressum, DSGVO-Datenschutz,
  Barrierefreiheitserklärung) – ohne erfundene Register-/Steuerangaben.
- QA: axe-core (0 Verstöße), SEO-Audit (0 Fehler), interner Linkcheck (0 defekt),
  Smoke-Tests, Desktop/Mobil-Screenshots.
- Dokumentation unter `docs/` und Inventare unter `audit/`.

## 1.1.0 – Vorbereitung Originaldateien & echte Audits

### Neu
- **Asset-Ingestion-Pipeline** (`scripts/ingest-assets.py`, `npm run ingest`): entpackt
  `original-site.zip` nach `archive/`, erstellt Hash-Inventar/Duplikaterkennung, integriert das
  echte Logo, erzeugt Favicons/OG-Bild daraus, optimiert Bilder (AVIF/WebP), konvertiert Medien
  (FLV→MP4/WebM, Audio→MP3/OGG mit mitgeliefertem ffmpeg), extrahiert Markenfarben. Idempotent,
  mit synthetischen Fixtures end-to-end getestet.
- **`incoming-assets/`**-Ablage mit Anleitung; Logo-Komponente erkennt und verwendet das echte
  Logo automatisch, sobald es eingespielt ist (Platzhalter nur als Fallback).
- **Echte Lighthouse-Läufe** (LH 13.4.0, lokal): Startseite + 7 weitere Seitentypen und mobil –
  **Performance/Accessibility/Best-Practices/SEO je 100**, LCP ~1,1 s, CLS 0.
- **Lighthouse CI** GitHub-Actions-Workflow (`.github/workflows/lighthouse.yml`, `lighthouserc.json`).
- axe-Test deckt jetzt **alle 25 Seiten** automatisch ab (statt 12).
- Zwei WCAG-2.2-Punkte behoben: Label-in-Name am Logo-Link, Touch-Target der Telefon-Schaltfläche.
- Zusätzliche Leistungen aufgenommen (Umbettungen, Graböffnungen, gekühlte Aufbewahrung) mit
  Bestätigungs-Flag; Leistungs-Matrix `docs/SERVICE-COVERAGE.md`.
- SEO-Report um „SEO-Realität"-Abschnitt (eigener Audit vs. Lighthouse vs. Seobility vs. GSC vs.
  Backlinks) ergänzt.

### Bekannt / offen (dokumentiert)
- Original-Logo, Fotos und Medien konnten wegen gesperrter Quelldomain (HTTP 403) nicht geladen
  werden → Platzhalter-/Beschreibungszustände, siehe `docs/LOGO-SOURCE.md`,
  `audit/media-inventory.md`.
- Vor Live-Schaltung zu bestätigende Felder: `docs/LEGAL-REVIEW-REQUIRED.md`.
