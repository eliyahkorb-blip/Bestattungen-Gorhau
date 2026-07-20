# Multi-Page-SEO-Report

Automatisiert erzeugt am 2026-07-20 über `npm run test:multipage`. Prüft **jede** aus dem Build erzeugte HTML-Seite einzeln (kein Sampling).

## Zusammenfassung

- Eigenständige HTML-Seiten gesamt: **25**
- Davon indexierbar (nicht noindex): **24**
- Seiten mit genau einer, nicht leeren H1: **25 / 25**
- Eindeutige Meta-Titles (indexierbare Seiten): **24 / 24**
- Eindeutige Meta-Descriptions (indexierbare Seiten): **24 / 24**
- Seiten in sitemap.xml: **24 / 24**
- Defekte interne Links gesamt: **0**
- Seiten ohne eingehende interne Links (Startseite ausgenommen): **1**
- Leere Überschriften gesamt: **0**
- Bilder ohne alt-Attribut gesamt: **0**
- Leere Links gesamt: **0**
- Seiten mit mindestens einem Befund: **0 / 25**

**Architektur-Hinweis:** Alle Seiten sind eigenständige, beim Build erzeugte statische HTML-Dokumente. Es wird kein Hash-Routing und kein SPA-/Client-Routing verwendet (keine `location.hash`- oder `history.pushState`-Navigation im Quellcode, keine `client:*`-Hydration-Direktiven).

## Ergebnis je Seite

| URL | H1 | Title eindeutig | Description eindeutig | Canonical | Sitemap | Interne Links (aus/ein) | Befunde |
|---|---|---|---|---|---|---|---|
| `/404.html` | ✓ | – | – | ✓ | noindex | 49 / 0 | — |
| `/abschiedsraum/` | ✓ | ✓ | ✓ | ✓ | ✓ | 42 / 58 | — |
| `/barrierefreiheit/` | ✓ | ✓ | ✓ | ✓ | ✓ | 39 / 24 | — |
| `/bestattungsarten/anonyme-bestattung/` | ✓ | ✓ | ✓ | ✓ | ✓ | 42 / 26 | — |
| `/bestattungsarten/erdbestattung/` | ✓ | ✓ | ✓ | ✓ | ✓ | 42 / 25 | — |
| `/bestattungsarten/feuerbestattung/` | ✓ | ✓ | ✓ | ✓ | ✓ | 43 / 25 | — |
| `/bestattungsarten/` | ✓ | ✓ | ✓ | ✓ | ✓ | 47 / 86 | — |
| `/bestattungsarten/seebestattung/` | ✓ | ✓ | ✓ | ✓ | ✓ | 42 / 26 | — |
| `/bestattungsvorsorge/` | ✓ | ✓ | ✓ | ✓ | ✓ | 41 / 58 | — |
| `/datenschutz/` | ✓ | ✓ | ✓ | ✓ | ✓ | 39 / 24 | — |
| `/friedhoefe-in-wuerzburg/` | ✓ | ✓ | ✓ | ✓ | ✓ | 41 / 53 | — |
| `/im-trauerfall/benoetigte-dokumente/` | ✓ | ✓ | ✓ | ✓ | ✓ | 42 / 26 | — |
| `/im-trauerfall/` | ✓ | ✓ | ✓ | ✓ | ✓ | 40 / 81 | — |
| `/impressum/` | ✓ | ✓ | ✓ | ✓ | ✓ | 39 / 24 | — |
| `/` | ✓ | ✓ | ✓ | ✓ | ✓ | 54 / 72 | — |
| `/kontakt/` | ✓ | ✓ | ✓ | ✓ | ✓ | 39 / 52 | — |
| `/leistungen/formalitaeten/` | ✓ | ✓ | ✓ | ✓ | ✓ | 42 / 28 | — |
| `/leistungen/` | ✓ | ✓ | ✓ | ✓ | ✓ | 48 / 78 | — |
| `/leistungen/thanatopraxie/` | ✓ | ✓ | ✓ | ✓ | ✓ | 43 / 27 | — |
| `/leistungen/trauerfeier-und-trauerdruck/` | ✓ | ✓ | ✓ | ✓ | ✓ | 42 / 25 | — |
| `/leistungen/ueberfuehrungen/` | ✓ | ✓ | ✓ | ✓ | ✓ | 42 / 26 | — |
| `/mediathek/` | ✓ | ✓ | ✓ | ✓ | ✓ | 41 / 53 | — |
| `/ueber-uns/galerie/` | ✓ | ✓ | ✓ | ✓ | ✓ | 43 / 28 | — |
| `/ueber-uns/historie/` | ✓ | ✓ | ✓ | ✓ | ✓ | 44 / 29 | — |
| `/ueber-uns/` | ✓ | ✓ | ✓ | ✓ | ✓ | 44 / 78 | — |

