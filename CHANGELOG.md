# Changelog

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
