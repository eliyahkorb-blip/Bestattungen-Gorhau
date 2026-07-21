# Referenzinspirierte Design-Überarbeitung – Prüfbericht

Auftrag: gestalterische und redaktionelle Prinzipien von `https://www.lichtermeer-bestattungen.de/`
analysieren und eigenständig auf die bestehende Marke Gorhau übertragen – **ohne** Quellcode,
Texte, Bilder, Logo, konkrete Farben, Preise, Kundenstimmen, Unternehmensgeschichten,
spezifische Leistungen oder Layouts zu kopieren.

## Zugriff auf die Referenzseite

Diese Entwicklungsumgebung läuft hinter einer Netzwerk-Policy, die ausgehende Verbindungen auf
eine begrenzte Zulassungsliste (u. a. npm-/GitHub-Infrastruktur) beschränkt. Sowohl `curl` als
auch der interne Web-Fetch-Dienst wurden gegen `https://www.lichtermeer-bestattungen.de/`
getestet; beide Versuche wurden bereits auf Proxy-Ebene mit **HTTP 403** abgewiesen (derselbe
Befund wie zuvor bei anderen externen Domains in dieser Umgebung, z. B. `google.com` oder der
eigenen Produktivdomain `gorhau-bestattungen.de` – siehe `archive/original-site/README.md`).
Ein direkter Abruf der Referenzseite war damit technisch nicht möglich.

**Vorgehen:** Die Umsetzung basiert stattdessen auf der ausführlichen, im Auftrag selbst
enthaltenen Prinzipienliste (Abschnitt 1 der Vorgabe: „zahlreiche echte Bilder, individuell
bebilderte Unterseiten, helle/menschliche/einladende Gestaltung, wechselnde
Bild-Text-Kompositionen, kompakte Orientierungselemente, kurze Nutzenaussagen, unterschiedliche
Motive je Bestattungsart, farbige Linienillustrationen als Ergänzung, klar sichtbare
Kontaktmöglichkeiten, individuelle Inhaltsmodule statt Kartenraster" u. a.) sowie auf den sehr
konkreten Struktur-, Bildplan- und Farbvorgaben in den Abschnitten 2–9 der Vorgabe. Diese
Vorgaben sind bereits eine Prinzipien-Extraktion, keine Kopie von Layout/Code/Bildern der
Referenz – sie wurden hier direkt und eigenständig auf Gorhau übertragen.

## 1. Übernommene Gestaltungsprinzipien

| Prinzip aus der Referenz | Umsetzung bei Gorhau |
|---|---|
| Individuell bebilderte Unterseiten statt Textwänden | Jede Themenseite erhält ein eigenes visuelles Element direkt im oberen Bereich (siehe `audit/page-image-coverage.md`) |
| Unterschiedliche Motive je Bestattungsart | 14 eigenständige Motiv-Illustrationen (`src/components/illustrations/Motif.astro`) – Erd-/Feuer-/See-/anonyme Bestattung erhalten je ein eigenes, inhaltlich passendes Bild statt austauschbarer Karten |
| Farbige Linienillustrationen als Ergänzung | Zentrales Gestaltungsmittel dieser Überarbeitung – bewusst gewählt, weil kein echtes Fotomaterial über Logo/Flyer hinaus vorliegt (siehe „Ehrlichkeit" unten) |
| Wechselnde Bild-Text-Kompositionen | Startseiten-Sektionen wechseln zwischen Bild-links/-rechts (`.split`, `.split--reverse`), Kachel-Rastern und reinen Text-Sektionen |
| Kompakte Orientierungselemente | Bestehende „Schnelle Orientierung"-Kacheln (4 Stück) auf der Startseite beibehalten und um neue Motiv-Kachel-Raster (Leistungen, Bestattungsarten) ergänzt |
| Kurze Nutzenaussagen statt langer Absätze | Nach max. 2 aufeinanderfolgenden Textblöcken folgt auf jeder Themenseite ein visueller oder struktureller Wechsel (Motiv, Fact-Grid, Chip-Liste, Checkliste, HintBox) |
| Klar sichtbare Kontaktmöglichkeiten | Zurückhaltender Abschluss-CTA auf jeder Themenseite (neue `PageCta`-Komponente), mit seitenspezifischer Beschriftung statt generischem „Mehr erfahren" |
| Individuelle Inhaltsmodule statt gleicher Kartenraster | U. a. Timeline (Historie), Schrittfolge (Im Trauerfall), Karten nach Familienstand (Dokumente), Zeitleiste-Motiv statt Fließtext |
| Testimonials/Vertrauenselemente | Bestehendes `Quote`-Zitatmodul (Vorsorge) beibehalten; **keine** neuen/erfundenen Kundenstimmen ergänzt (siehe Abschnitt „Was bewusst nicht übernommen wurde") |

## 2. Wie sich Gorhau weiterhin klar unterscheidet

- **Original-Logo** unverändert (Kreuz, Pfeile, Wortmarke, Emblem) – keine Neuinterpretation.
- **Markenfarben unverändert:** Bordeaux `#882020`, Gold `#b8933d`, Creme `#f7ece9`,
  Beige `#ecdcd6` – keine der Referenzfarben übernommen.
- **Ruhigerer, traditionellerer Ton:** keine bunten Akzentfarben zusätzlich zu Bordeaux/Gold,
  keine verspielte Typografie, keine Marketing-Sprache mit Ausrufezeichen.
- **„ZUHÖREN – BERATEN – BEGLEITEN"** bleibt zentrales Leitmotiv (Startseite, Footer).
- **Regionale Identität und Tradition seit 1970** durchgängig präsent (Fakten-Leiste, Historie,
  Über-uns-Seite) – kein Element, das wie eine austauschbare Kette wirkt.
- **Keine Preisangaben, keine Kundenstimmen, keine Unternehmensgeschichten** der Referenz
  übernommen – alle Fakten stammen ausschließlich aus vorhandenen Gorhau-Quellen
  (`src/data/company.ts`, Flyer 2009, bisherige Website-Inhalte).
- **Kein pixelgenaues Layout-Kopieren:** eigenständige Sektionsreihenfolge, eigene
  Komponentennamen/-struktur, eigenes Illustrationssystem statt Fotografie der Referenz.

## 3. Ehrlichkeit statt Kopieren: der Umgang mit fehlendem Fotomaterial

Die Vorgabe verlangt für mehrere Seiten (insbesondere Abschiedsraum, Über uns) „zwingend echte
Aufnahmen". Diese liegen in der aktuellen Projektumgebung **nicht** vor – einzige echte
Bild-Assets sind das Logo und ein historischer Flyer-Scan von 2009 (siehe
`docs/IMAGE-SOURCE-AND-LICENSES.md`). Anstatt KI-generierte oder fremde Stockfotos als „echtes
Gorhau-Material" auszugeben (was die Vorgabe ausdrücklich verbietet), wurde durchgängig:

1. das neue, projekteigene Illustrationssystem als ehrliches Platzhaltermittel eingesetzt, und
2. an jeder betroffenen Stelle eine sichtbare `HintBox` ergänzt, die auf den offenen
   Fotobedarf hinweist (z. B. Abschiedsraum, Über uns, Kontakt).

Diese Entscheidung priorisiert Wahrhaftigkeit gegenüber optischer Vollständigkeit und
entspricht damit sowohl der aktuellen Vorgabe als auch der bereits in früheren Baurunden
etablierten Projektlinie („keine erfundene Stockfoto-/KI-Bildsprache").

## 4. Farbbalance

Ausgezählt im finalen Produktionsbuild (`dist/`, 24 Seiten):

| Sektionstyp | Vorkommen sitendweit |
|---|---|
| `section--white` | 19 |
| `section--cream` | 3 |
| `section--beige` | 3 |
| `section--dark` (volltoniges Bordeaux-Panel) | **1** (nur der finale CTA-Block auf der Startseite) |

Vor dieser Überarbeitung band `PageLayout` auf **jeder** der 20 Themenseiten automatisch ein
volltoniges dunkles Bordeaux-CTA-Panel ein. Das widersprach der Zielvorgabe „Bordeaux bleibt
Hauptmarkenfarbe, darf aber nicht die Seite dominieren" und wurde durch einen zurückhaltenden,
einzeiligen Abschluss-Link (`PageCta`) ersetzt; das volltonige Panel ist jetzt auf die
Startseite als einzigen, bewussten „starken Moment" konzentriert – siehe
`src/layouts/PageLayout.astro`.

## 5. Seitenrhythmus – Stichprobe

Am Beispiel `Erdbestattung` (`src/pages/bestattungsarten/erdbestattung.astro`):
Hero (Creme) → Motiv-Illustration → Einleitung (1 Textblock) → Fact-Grid (Reihen-/Wahlgrab,
visueller Wechsel) → H2 „Ablauf" (1 Textblock) → Motiv-Illustration (Zwischenbruch) → H2
„Grabpflege" (1 Textblock) → HintBox (visueller Wechsel) → verwandtes Thema (Link) →
Abschluss-CTA. Kein Abschnitt mit mehr als zwei aufeinanderfolgenden reinen Textblöcken.
Diese Prüfung wurde für alle 20 Themenseiten durchgeführt (Ausnahme: Impressum, Datenschutz,
Barrierefreiheit, 404 – laut Vorgabe ausgenommen).

## 6. CTA-Übersicht je Seite

| CTA-Beschriftung | Anzahl Seiten |
|---|---|
| Bestattungsarten besprechen | 5 (Hub + 4 Bestattungsarten) |
| Persönliche Beratung anfragen (Standard) | 7 (Leistungen-Hub + 4 Leistungsunterseiten, Über uns, Historie) |
| Im Trauerfall anrufen | 2 (Im Trauerfall, Benötigte Dokumente) |
| Vorsorgegespräch vereinbaren | 1 (Bestattungsvorsorge) |
| Fragen zum Abschiedsraum | 1 (Abschiedsraum) |
| Anfahrt öffnen | 1 (Friedhöfe in Würzburg) |
| Weitere Eindrücke ansehen | 1 (Galerie) |
| Imagefilm ansehen | 1 (Mediathek) |
| Kein Abschluss-CTA (page IS die Kontaktseite bzw. Rechtsseite) | 4 (Kontakt, Impressum, Datenschutz, Barrierefreiheit) |

Jede Themenseite hat **maximal einen** primären CTA im oberen Bereich (sofern vorhanden, z. B.
„Anrufen“/„E-Mail“ im mobilen Header) und **maximal einen** Abschluss-CTA – keine Seite
enthält mehrere konkurrierende Buttons.

## 7. Visuelle Abnahme – Screenshots

Desktop- und Mobil-Screenshot für alle 24 indexierbaren Seiten (nach der Überarbeitung, gegen
den finalen Produktionsbuild `dist/` erzeugt): `audit/screenshots/<seite>-desktop.png` /
`-mobile.png` (48 Dateien, erzeugt mit `scripts/screenshot-all-pages.mjs`). Stichprobenartig
manuell geprüft (Startseite, Erdbestattung, Abschiedsraum) auf: echtes/relevantes visuelles
Element vorhanden, keine Textwand, klare Einleitung, individueller Seitencharakter, passende
CTA-Anzahl, ausgewogene Farben, ausreichend Weißraum, keine irreführenden Bilder, korrekte
mobile Darstellung – alle Stichproben unauffällig.

## 8. Automatisierte Prüfungen

Ergebnis der bestehenden Test-Suite nach der Überarbeitung (siehe `audit/`-Verzeichnis für
Einzelberichte): Produktionsbuild und GitHub-Pages-Vorschaubuild wurden nach der Überarbeitung
erneut erzeugt und verifiziert (siehe Abschlussbericht im Chat für die aktuellen Kennzahlen).
