# Deployment-Anleitung

Die Website ist eine **statische Astro-Site**. Das Build-Ergebnis (`dist/`) läuft auf jedem
normalen Webhosting **ohne Node-Server**.

## Build erzeugen
```bash
npm install
npm run build     # erzeugt dist/
npm run preview   # lokale Vorschau von dist/ (http://localhost:4321)
```

## Variante A – Klassisches Webhosting / Hostinger (Apache)
1. `npm run build` ausführen.
2. **Gesamten Inhalt** von `dist/` in das Web-Root hochladen (z. B. `public_html/`).
   Die Datei `dist/.htaccess` ist enthalten und **muss mit hochgeladen werden** (versteckte
   Datei – im FTP-Client „versteckte Dateien anzeigen" aktivieren).
3. Fertig. `.htaccess` erzwingt HTTPS + www, leitet alte URLs weiter, setzt Sicherheits-Header,
   Kompression, Caching und die 404-Seite.

Upload z. B. per FTP oder – falls SSH vorhanden:
```bash
rsync -avz --delete dist/ user@server:/home/user/public_html/
```

> HSTS ist in `.htaccess` auskommentiert. Erst aktivieren, wenn HTTPS für die **gesamte** Domain
> dauerhaft sichergestellt ist.

## Variante B – Netlify
- `public/_redirects` ist enthalten (301-Weiterleitungen).
- Build command: `npm run build` · Publish directory: `dist`.
- Oder Drag & Drop des `dist/`-Ordners in Netlify.

## Variante C – Vercel
- `vercel.json` ist enthalten (Redirects + Header).
- Framework-Preset: Astro. Build: `npm run build`, Output: `dist`.

## Variante D – GitHub Pages (öffentliche Vorschau)
- Die Site unterstützt jetzt einen **zweiten, eigenständigen Build-Modus** für GitHub-Pages-
  Projekt-Hosting unter einem Repo-Unterpfad (`https://<user>.github.io/<repo>/`), gesteuert über
  die Umgebungsvariable `DEPLOY_TARGET` in `astro.config.mjs`:
  - `npm run build` → Produktionsbuild, `site: https://www.gorhau-bestattungen.de`, `base: /`,
    indexierbar, normale `robots.txt`, Canonicals/Sitemap/JSON-LD zeigen auf die Produktivdomain.
    **Unverändert** durch die Pages-Unterstützung.
  - `npm run build:pages` → `DEPLOY_TARGET=github-pages`, `site: https://eliyahkorb-blip.github.io`,
    `base: /Bestattungen-Gorhau`, alle internen Pfade (Navigation, Footer, Breadcrumbs, Logo,
    Favicons, Manifest, Bilder, Flyer) laufen über den zentralen Helfer `src/utils/url.ts`
    (`withBase()`/`absoluteUrl()`) und funktionieren korrekt unter dem Unterpfad.
    Vorschau-Build ist **nicht indexierbar**: `<meta name="robots" content="noindex, nofollow">`
    auf jeder Seite, `robots.txt` liefert `Disallow: /`, kein Search-Console-Tracking, kein
    Analytics, keine `CNAME`-Datei.
- **Automatisches Deployment:** `.github/workflows/deploy-pages-preview.yml` baut bei jedem Push
  auf den aktuellen Branch (und manuell via „Run workflow“) mit `withastro/action@v6` und
  veröffentlicht über `actions/deploy-pages@v5` unter GitHub-Pages-Environment `github-pages`.
  Erfordert kein Merge nach `main`. Voraussetzung: In den Repository-Einstellungen unter
  **Settings → Pages** muss „Source: GitHub Actions“ ausgewählt sein (einmalig, vor dem ersten
  erfolgreichen Deployment).
- Achtung: `.htaccess` wirkt auf GitHub Pages nicht (kein Apache) – für den Vorschau-Zweck
  unerheblich. Für produktives Hosting mit vollständigen Server-Redirects/Headern bleibt
  Variante A/B/C maßgeblich; GitHub Pages dient hier ausschließlich als öffentlich erreichbare,
  nicht indexierte Design-Vorschau.

## Kanonische Domain
`https://www.gorhau-bestattungen.de` — alle Varianten (http, non-www, alte `/*.html`-URLs)
leiten per 301 dorthin (siehe `audit/redirect-map.csv`).

## Nach dem Deployment
1. Redirects stichprobenartig prüfen (z. B. `curl -I http://gorhau-bestattungen.de/index.html`
   → 301 auf `https://www.gorhau-bestattungen.de/`).
2. Lighthouse mobil + Desktop laufen lassen (siehe `docs/PERFORMANCE-REPORT.md`).
3. Google Search Console: neue Sitemap `…/sitemap.xml` einreichen.
4. Google-Unternehmensprofil und Verzeichnisse mit einheitlicher NAP aktualisieren
   (`docs/OFFPAGE-LOCAL-SEO-PLAN.md`).
5. Offene Punkte aus `docs/LEGAL-REVIEW-REQUIRED.md` abarbeiten.
