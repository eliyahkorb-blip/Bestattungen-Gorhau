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

## Variante D – GitHub Pages
- Statisches `dist/` deploybar (z. B. via GitHub Action `withastro/action` oder Upload des
  `dist/`-Inhalts in den `gh-pages`-Branch).
- Achtung: `.htaccess` wirkt auf GitHub Pages nicht (kein Apache). Redirects/Canonical-Domain
  dann über DNS/Custom-Domain-Konfiguration bzw. den Hosting-Layer lösen. Für vollständige
  Server-Redirects und Header ist Variante A/B/C vorzuziehen.

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
