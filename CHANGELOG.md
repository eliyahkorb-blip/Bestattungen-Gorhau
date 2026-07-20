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

### Bekannt / offen (dokumentiert)
- Original-Logo, Fotos und Medien konnten wegen gesperrter Quelldomain (HTTP 403) nicht geladen
  werden → Platzhalter-/Beschreibungszustände, siehe `docs/LOGO-SOURCE.md`,
  `audit/media-inventory.md`.
- Vor Live-Schaltung zu bestätigende Felder: `docs/LEGAL-REVIEW-REQUIRED.md`.
