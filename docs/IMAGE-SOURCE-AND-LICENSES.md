# Bildquellen und Lizenzen

Diese Übersicht dokumentiert **jede Bildquelle**, die auf der Website verwendet wird, im
Zusammenhang mit der referenzinspirierten visuellen Überarbeitung (siehe
`audit/reference-inspired-design-review.md`).

## Grundsatz

Es liegen aktuell **zwei** echte Gorhau-Bild-Assets vor – sonst keine. Für alle anderen
visuellen Elemente gilt die verbindliche Vorgabe: **keine erfundenen Fotos, keine
KI-generierten Personen/Räume/Fahrzeuge, die als echt ausgegeben werden.** Stattdessen kommt
ein selbst gestaltetes, markenkonformes Illustrationssystem zum Einsatz (siehe unten).

## 1. Echte Gorhau-Originalmedien

| Datei | Quelle | Status | Lizenz/Rechte |
|---|---|---|---|
| Logo (`public/img/logo*.png/webp`, Favicons, OG-Bild) | `incoming-assets/header_logo.png` (Original-Unternehmenslogo) | Eingebunden, pixelgenau zugeschnitten, unverändertes Markendesign | Unternehmenseigentum (Auftraggeber), vollständige Rechte vorhanden |
| Historischer Flyer 2009 (`public/img/content/flyer_2009.*`) | `incoming-assets/flyer_2009.jpg` (Original-Scan) | Eingebunden in Mediathek, mit Alt-Text und Kontext-Hinweis zum historischen Stand | Unternehmenseigentum (Auftraggeber), vollständige Rechte vorhanden |

Details zur technischen Aufbereitung des Logos: `docs/LOGO-SOURCE.md`.

## 2. Selbst gestaltetes Illustrationssystem (kein Fotomaterial)

Datei: `src/components/illustrations/Motif.astro` – 14 eigenständig gezeichnete,
farbige Linien-Illustrationen (SVG, Inline-Code, keine externen Assets), erstellt für dieses
Projekt in den Gorhau-Markenfarben (Bordeaux `#882020`, Gold `#b8933d`, gedämpftes Grün/Blau
als Naturakzent). Motive: `erdbestattung`, `feuerbestattung`, `seebestattung`,
`anonyme-bestattung`, `thanatopraxie`, `vorsorge`, `formalitaeten`, `trauerfeier`,
`ueberfuehrung`, `abschiedsraum`, `historie`, `friedhoefe`, `gebaeude`, `begleitung`.

- **Urheberschaft/Lizenz:** vollständig neu erstellt für dieses Projekt, keine Drittquelle,
  keine Lizenzfrage.
- **Zweck:** ersetzt an den Stellen, an denen laut Bildplan (Abschnitt 3 des Auftrags) ein
  „relevantes visuelles Element“ verlangt ist, aber kein echtes Foto vorliegt – entspricht
  dem Referenzprinzip „farbige Linienillustrationen als Ergänzung“.
- **Ausdrücklich keine Fotografie-Ersatz-Behauptung:** Jede Verwendung ist als Illustration
  erkennbar (reduzierte Linienzeichnung, kein realistischer Fotostil) und wird an
  entsprechender Stelle durch eine `HintBox` ergänzt, wo ein echtes Foto inhaltlich erwartet
  würde (Abschiedsraum, Über uns, Kontakt/Gebäude) – siehe `docs/PHOTO-SHOOT-LIST.md`.

## 3. Bestehendes Icon-Set (unverändert)

Datei: `src/components/icons/Icon.astro` – kleine einfarbige Linien-Icons (Navigation,
Kachel-Icons), bereits vor dieser Überarbeitung projekteigen erstellt. Keine Änderung in
diesem Auftrag, hier nur der Vollständigkeit halber gelistet.

## 4. Zusätzliche lizenzierte Bilder für allgemeine Bestattungsarten

**Es wurden keine zusätzlichen externen Stockfotos beschafft.** Grund: Diese Entwicklungsumgebung
hat keinen Zugriff auf das allgemeine Internet (ausgehende Verbindungen werden von der
Netzwerk-Policy auf wenige Entwicklungs-Domains beschränkt; Versuche, z. B. Bildagenturen oder
die Referenzseite selbst zu erreichen, wurden mit HTTP 403 auf Proxy-Ebene abgewiesen – siehe
`audit/reference-inspired-design-review.md`, Abschnitt „Zugriff auf die Referenzseite“). Anstatt
an dieser Stelle ungeprüfte oder KI-generierte Bilder einzusetzen und als lizenzierte
Stockfotos auszugeben, wurde konsequent auf das selbst gezeichnete Illustrationssystem
(Abschnitt 2) zurückgegriffen. Das ist ehrlicher als ein unbelegtes „Lizenz vorhanden“ und
entspricht der Vorgabe „nur rechtlich nutzbare Bilder, Quelle und Lizenz dokumentieren“ –
hier lautet die Quelle „projekteigene Neuerstellung“, nicht eine externe Lizenz.

**Wenn zu einem späteren Zeitpunkt echte Lizenzbilder beschafft werden sollen** (z. B. für
Erdbestattung/Friedhof, Feuerbestattung/Urne, Seebestattung/Küste, anonyme
Bestattung/Landschaft), empfiehlt sich:
1. Bildagentur mit lückenloser Lizenzkette (z. B. redaktionell/kommerziell freigegebene
   Stock-Bildagenturen), Lizenztyp (Royalty-free/Extended) und Bild-ID hier ergänzen.
2. Bilder dürfen keine erkennbaren Personen, Firmenlogos Dritter oder Markenprodukte zeigen.
3. Diese Tabelle um Zeilen mit Bildagentur, Lizenznummer, Downloaddatum und verantwortlicher
   Person ergänzen, bevor das Bild eingebunden wird.

## 5. Explizit NICHT verwendet

- Keine KI-generierten Mitarbeiter-, Team- oder Inhaberbilder.
- Keine KI-generierten Innenraum- oder Gebäudeaufnahmen, die als „echtes Gorhau-Haus“
  ausgegeben werden.
- Kein fremdes Fahrzeug, das als Gorhau-Fahrzeug dargestellt wird (die Seite „Überführungen“
  nutzt ein bewusst abstraktes Symbolmotiv, keine Fahrzeugfotografie).
- Keine erfundenen Kundenstimmen, Preisangaben oder Unternehmensgeschichten.

## 6. Prüfstatus je Bild-Einsatzort

Die vollständige Zuordnung „welches Bild/Motiv auf welcher Seite“ inkl. Alt-Texten und
offenem Fotobedarf steht in `audit/page-image-coverage.md`.
