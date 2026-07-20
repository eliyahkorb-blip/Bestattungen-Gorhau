# SEO-Report – Bestattungen Gorhau

## Multi-Page-Architektur (kein One-Pager, kein SPA-Routing)
Die Website besteht aus **25 eigenständigen, beim Build erzeugten HTML-Dokumenten** (24
indexierbare Seiten + 404), jeweils mit eigener URL, eigenem Title, eigener Description, eigenem
Canonical und eigenständigem Inhalt. Es kommt **kein** Hash-Routing (`/#leistungen`) und **keine**
Single-Page-Application zum Einsatz – geprüft per Quellcode-Suche (keine `location.hash`-/
`history.pushState`-Navigation, keine `client:*`-Hydration-Direktiven) und per automatisiertem
Multi-Page-Check (`npm run test:multipage` → `audit/multipage-seo-report.md`). Jede Hauptseite ist
über die Hauptnavigation oder interne Links erreichbar; keine Hauptinformation existiert nur als
Startseiten-Abschnitt.

## Ausgangslage (Seobility-Onpage ≈ 56 %) und Behebung

| Bekanntes Problem (alt) | Status neu | Umsetzung |
|---|---|---|
| H1 leer / fehlend | ✅ behoben | Jede Seite hat genau **eine** aussagekräftige H1 (per Audit geprüft). |
| Leere/teilweise leere Überschriften | ✅ behoben | Durchgängig gefüllte, logische H1–H3-Struktur. |
| Keine mobile Optimierung | ✅ behoben | Responsive Layout, mobile Navigation, Kontaktleiste. |
| Kein Viewport-Meta | ✅ behoben | `<meta name="viewport" …>` in jedem Dokument. |
| Fehlendes `lang="de"` | ✅ behoben | `<html lang="de">` überall. |
| HTTP/HTTPS-Weiterleitung | ✅ behoben | `.htaccess` erzwingt HTTPS. |
| www/Non-www uneinheitlich | ✅ behoben | Einheitliche Weiterleitung auf `www` (ein Redirect-Schritt). |
| Fehlende Alt-Attribute (≥ 11 Bilder) | ✅ behoben | Alle `<img>` mit Alt; dekorative Elemente ohne Textbild. |
| Nur ~135 Wörter auf Startseite | ✅ behoben | Deutlich ausgebaute, hilfreiche Inhalte. |
| Titelbegriffe fehlen im Inhalt | ✅ behoben | Keywords sprachlich sinnvoll integriert. |
| Kein Favicon / Apple-Touch-Icon | ✅ behoben | `favicon.ico`, `favicon.svg`, `apple-touch-icon.png`, Manifest-Icons. |
| Fehlende Zeichensatzangabe | ✅ behoben | `<meta charset="utf-8">` + `AddDefaultCharset UTF-8`. |
| Links ohne verständlichen Linktext | ✅ behoben | Sprechende Linktexte, versteckte Zusatztexte für Kontext. |
| Veraltete XHTML-Struktur | ✅ behoben | Semantisches HTML5, statisch generiert (Astro). |
| Schwache Seitenqualität | ✅ behoben | Neu geschriebene, fachlich fundierte Inhalte. |
| Schwache externe Signale / Backlinks | ⚠️ Strategie | Nicht per Code lösbar → `docs/OFFPAGE-LOCAL-SEO-PLAN.md`. |

## Technisches SEO
- **Meta-Titles & -Descriptions:** je Seite einzigartig (per Audit auf Duplikate geprüft – 0
  Duplikate). Zentral gepflegt über `src/components/Seo.astro`.
- **Canonicals:** selbstreferenzierend, absolute HTTPS-www-URLs.
- **Open Graph / Twitter:** vollständig, mit Standard-Vorschaubild (`/img/og-default.svg`).
- **Strukturierte Daten (JSON-LD, valide):**
  - `FuneralHome` (spezifischster LocalBusiness-Untertyp) mit NAP, Öffnungszeiten, Geo,
    Leistungen – global identisch aus `src/data/company.ts`.
  - `Organization`, `WebSite`, `WebPage`, `BreadcrumbList` (auf allen Unterseiten).
  - `FAQPage` nur dort, wo FAQs **sichtbar** sind (`/im-trauerfall/`).
  - **Keine** erfundenen AggregateRatings, Bewertungen, Preise, Auszeichnungen oder
    Social-Profile.
- **Sitemap:** `/sitemap.xml` (eigener Endpoint, alle 24 indexierbaren Seiten).
- **robots.txt:** erlaubt alles, verweist auf Sitemap.
- **404-Seite:** hilfreich, `noindex`.
- **URLs:** sprechend, kleingeschrieben, mit Trailing Slash; Verzeichnisstruktur.
- **Breadcrumbs:** auf allen Unterseiten (nicht auf der Startseite), inkl. `BreadcrumbList`.

## NAP-Konsistenz
Name, Adresse und Telefonnummer stammen aus einer einzigen Quelle (`src/data/company.ts`) und
sind auf allen Seiten sowie in allen JSON-LD-Blöcken identisch.

## Geokoordinaten
`49.7691, 9.9469` (Reuterstraße 2, 97084 Würzburg), aus Kartenquelle abgeleitet. **Vor
Verwendung in produktiven Kartendiensten final gegen die exakte Hausadresse prüfen.**

## Keyword-Fokus (sprachlich integriert, kein Stuffing)
Bestatter Würzburg · Bestattungen Würzburg · Bestattungsinstitut Würzburg · Bestatter
Würzburg-Heidingsfeld · Bestattungsvorsorge Würzburg · Abschiedsraum Würzburg · Überführungen
Würzburg · Thanatopraxie Würzburg · Hilfe im Trauerfall Würzburg.

## Prüfergebnisse
- `npm run audit` (statischer SEO-/Struktur-Audit über dist): **0 Fehler, 0 Warnungen**,
  JSON-LD auf allen Seiten valide.
- `npm run test:links`: **0 defekte interne Links** (1221 geprüft).
- `npm run test:multipage` (siehe `audit/multipage-seo-report.md`): **alle 25 Seiten einzeln
  geprüft** – 25/25 mit genau einer nicht-leeren H1, 24/24 eindeutige Titles, 24/24 eindeutige
  Descriptions, 24/24 in der Sitemap, 0 defekte interne Links, 0 leere Überschriften, 0 leere
  Links, 0 Bilder ohne Alt-Attribut, 0 Seiten mit Befund.
- Lighthouse-SEO-Kategorie: **100** auf allen 8 geprüften Seitentypen, jeweils Desktop **und**
  Mobil (LH 13.4.0, lokal).

## SEO-Realität: was diese Werte bedeuten (und was nicht)
Verschiedene „SEO-Scores" messen Unterschiedliches. Ein grüner eigener Audit ist **keine**
Garantie für einen bestimmten Seobility-Score oder für Google-Rankings.

| Signal | Was es misst | Status hier |
|---|---|---|
| **Eigener statischer Audit** (`npm run audit`) | technische Onpage-Struktur (H1, Meta, Alt, JSON-LD) | 0 Fehler – vollständig kontrollierbar |
| **Lighthouse SEO** | technische Crawlbarkeit/Basics einer Seite | 100 (lokal) – Lab-Wert |
| **Seobility Onpage** | eigener, breiterer Kriterienkatalog | **nicht garantiert 100**; erst nach Live-Crawl messbar. Der Relaunch behebt die bekannten 56-%-Mängel, der reale Score ist nach Deployment zu prüfen. |
| **Google Search Console** | echte Indexierung/Performance bei Google | erst nach Deployment + Sitemap-Einreichung verfügbar |
| **Externe Faktoren / Backlinks** | Autorität, Erwähnungen | **nicht per Code lösbar** → `OFFPAGE-LOCAL-SEO-PLAN.md` |

Kurz: Der eigene Audit mit 0 Fehlern und Lighthouse-SEO 100 sind belastbare technische
Grundlagen. Ein „garantierter Seobility-Score von 100" wird **ausdrücklich nicht** behauptet.
