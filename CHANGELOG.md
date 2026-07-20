# Changelog

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
