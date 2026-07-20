# Bestattungen Gorhau – Website-Relaunch

Moderne, statisch generierte Website für das **Bestattungs- und Überführungs-Institut Gorhau**,
Würzburg-Heidingsfeld (Familienunternehmen seit 1970). Modernisierung der bestehenden Marke –
kein Rebranding. Leitgedanke: **Zuhören · Beraten · Begleiten**.

## Tech-Stack
- **Astro** (statischer Output), **TypeScript**, semantisches HTML5, eigenes CSS mit Design-Tokens.
- **Kein Framework-Runtime, keine externen Fonts, keine Drittanbieter-Requests** beim Erstaufruf.
- Barrierefreiheit nach WCAG 2.2 AA (axe-core: 0 Verstöße).

## Befehle
```bash
npm install
npm run dev            # Entwicklungsserver
npm run build          # Produktions-Build → dist/
npm run preview        # Vorschau von dist/
npm run check          # TypeScript/Astro-Check
npm run test           # Smoke-Tests (node:test) über dist/
npm run test:a11y      # axe-core-Accessibility-Test (Chromium)
npm run test:links     # interner Linkcheck
npm run audit          # SEO-/Struktur-Audit (H1, Titles, Alt, JSON-LD …)
npm run test:multipage # Multi-Page-SEO-Check je Einzelseite → audit/multipage-seo-report.md
npm run test:screenshots  # Desktop/Mobil-Screenshots → audit/screenshots/
npm run ingest         # Originaldateien aus incoming-assets/ verarbeiten (Logo, Bilder, Medien)
npm run format         # Prettier
```

## Originaldateien einspielen (Logo, Fotos, Medien)
Legen Sie die Originale in **`incoming-assets/`** ab (Details: `incoming-assets/README.md`) und
führen Sie aus:
```bash
npm run ingest && npm run build
```
Der Ingest ist idempotent und überschreibt keine Originale. Er integriert das echte Logo
(ersetzt automatisch den Platzhalter), erzeugt Favicons/OG-Bild aus dem echten Logo, optimiert
Bilder (AVIF/WebP), konvertiert Medien (FLV→MP4/WebM, Audio→MP3/OGG, via mitgeliefertem ffmpeg)
und extrahiert Markenfarben. Benötigt Python 3 mit Pillow und `imageio-ffmpeg`
(`pip install Pillow imageio-ffmpeg`).
> `test:a11y` und `test:screenshots` benötigen ein Chromium. In dieser Umgebung ist es unter
> `/opt/pw-browsers/chromium-1194/chrome-linux/chrome` vorinstalliert; sonst `CHROMIUM_PATH` setzen.

## Projektstruktur
```
src/
  components/   Header, Footer, Logo, Seo, Breadcrumbs, ContactBar, CtaSection
  layouts/      BaseLayout, PageLayout
  pages/        alle Seiten (Astro) + sitemap.xml.ts
  data/         company.ts (NAP – Single Source of Truth), navigation, pages, jsonld
  styles/       tokens.css, global.css
public/         favicons, manifest, robots.txt, _redirects, .htaccess, img/
docs/           Brand, SEO, Accessibility, Performance, Deployment, Legal, Content, Offpage
audit/          Inventare, Redirect-Map, Screenshots
tests/          audit / links / a11y / screenshots / build.test
archive/        Platz für Original-Site-Sicherung
```

## Wichtige Rahmenbedingung dieses Builds
Die bestehende Domain war während des Builds durch die Netzwerk-Policy **gesperrt (HTTP 403)**.
Deshalb konnten Original-**Logo, Fotos und Medien nicht heruntergeladen** werden. Diese Stellen
sind ehrlich dokumentiert (`docs/LOGO-SOURCE.md`, `audit/media-inventory.md`,
`archive/original-site/README.md`) und mit sauberen Platzhalter-/Beschreibungszuständen versehen,
die vor der Live-Schaltung durch die Originaldateien ersetzt werden.

## Vor der Live-Schaltung
Siehe **`docs/LEGAL-REVIEW-REQUIRED.md`** – konkrete, noch zu bestätigende Felder
(Registerangaben, USt-IdNr., Hoster, offizielle E-Mail, Fachqualifikationen).

## Deployment
Siehe **`docs/DEPLOYMENT.md`** (Hostinger/Apache, Netlify, Vercel, GitHub Pages).
Kanonische Domain: `https://www.gorhau-bestattungen.de`.
