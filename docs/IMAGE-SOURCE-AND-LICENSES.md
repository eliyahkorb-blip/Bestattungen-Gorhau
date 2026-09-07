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
| Historischer Flyer 2009 (`public/img/content/flyer_2009.*`) | `incoming-assets/flyer_2009.jpg` (Original-Scan) | Eingebunden in Mediathek, mit Alt-Text und Kontext-Hinweis zum historischen Stand | Unternehmenseigentum (Auftraggeber), vollständige Rechte vorhanden – **siehe Datenschutz-Hinweis unten** |

Details zur technischen Aufbereitung des Logos: `docs/LOGO-SOURCE.md`.

**Datenschutz-Hinweis zum Flyer 2009:** Der Scan enthält als Teil der Gesamtseite mehrere
eingedruckte Fotos mit erkennbaren Personen (u. a. ein Familienfoto mit vermutlich damals
minderjährigen Kindern). Das Dokument wird ausschließlich als unverändertes historisches
Ganzes gezeigt (keine Ausschnitte/Vergrößerungen einzelner Personen). Diese Einzelfotos wurden
bewusst **nicht** herausgeschnitten oder als eigenständige Bilder (z. B. „Team“/„Inhaber“)
weiterverwendet. Empfehlung: Freigabe der abgebildeten Personen einholen, bevor das Dokument
weiter genutzt (z. B. vergrößert oder in Ausschnitten gezeigt) wird.

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

## 4. Allgemeine Stockmotive (Unsplash-Auswahl des Auftraggebers)

Der Auftraggeber hat eine eigene Bildauswahl bereitgestellt und für dieses Webprojekt
freigegeben. Damit ist der frühere Stand dieses Abschnitts – „es wurden keine externen
Stockfotos beschafft“ – überholt. Die Bilder wurden nicht selbst im Netz gesucht, sondern
als Paket geliefert; die Originale liegen unverändert unter
`incoming-assets/unsplash-originals/`.

Der folgende Block wird aus `scripts/stock-images.config.mjs` erzeugt
(`npm run audit:images`) und darf nicht von Hand bearbeitet werden. Die vollständige
Bewertung jedes Ausgangsbildes – inklusive der bewusst verworfenen Motive – steht in
`audit/unsplash-image-inventory.md`.

<!-- STOCK:BEGIN -->

_Automatisch erzeugt von `scripts/report-images.mjs` – nicht von Hand bearbeiten._

Der Dateiname der gelieferten Originale enthält bei den meisten Bildern Fotograf und
Unsplash-Bild-ID; daraus ergibt sich die Quellenangabe. Wo der Originaldateiname nicht
mehr vorlag, ist die Quelle als vom Auftraggeber bereitgestellt markiert und **nicht**
rekonstruiert worden.

**Keines dieser Bilder zeigt Räume, Fahrzeuge, Gebäude, Mitarbeitende oder Kundschaft des
Bestattungsinstituts Gorhau.** Alt-Texte und Bildunterschriften sind entsprechend neutral
formuliert.

### wuerzburg-panorama

- **Lokale Dateien:** `public/images/stock/wuerzburg-panorama-{Breite}.{avif,webp,jpg}`
- **Ursprünglicher Dateiname:** `salah-ait-mokhtar-EBzTou1x5WM-unsplash.jpg`
- **Fotograf:** Salah Ait Mokhtar
- **Quelle:** Unsplash – https://unsplash.com/photos/EBzTou1x5WM
- **Lizenz:** Unsplash-Lizenz (kostenlose kommerzielle Nutzung, keine Namensnennung verpflichtend); Auswahl und Freigabe durch den Auftraggeber
- **Motiv:** Blick über Würzburg im Abendlicht, Festung Marienberg auf dem Hügel
- **Eingesetzt auf:** /
- **Einsatzzweck:** Startseite – Hero
- **Alt-Text:** „Blick über Würzburg im warmen Abendlicht, im Hintergrund die Festung Marienberg“
- **Original:** 5472 × 2844 px
- **Hinweis:** allgemeines Stockmotiv, kein Gorhau-Unternehmensfoto

### wuerzburg-kaeppele-herbst

- **Lokale Dateien:** `public/images/stock/wuerzburg-kaeppele-herbst-{Breite}.{avif,webp,jpg}`
- **Ursprünglicher Dateiname:** `cristian-lopez-lWMMK0teQK8-unsplash.jpg`
- **Fotograf:** Cristian López
- **Quelle:** Unsplash – https://unsplash.com/photos/lWMMK0teQK8
- **Lizenz:** Unsplash-Lizenz (kostenlose kommerzielle Nutzung, keine Namensnennung verpflichtend); Auswahl und Freigabe durch den Auftraggeber
- **Motiv:** Würzburger Hang mit Käppele und Kirche im Herbstlaub
- **Eingesetzt auf:** /ueber-uns/
- **Einsatzzweck:** Über uns – regionale Verbundenheit
- **Alt-Text:** „Herbstlicher Blick auf einen Würzburger Hang mit Kirche und Weinbergen“
- **Original:** 5672 × 3781 px
- **Hinweis:** allgemeines Stockmotiv, kein Gorhau-Unternehmensfoto

### sonnenlicht-ueber-wolken

- **Lokale Dateien:** `public/images/stock/sonnenlicht-ueber-wolken-{Breite}.{avif,webp,jpg}`
- **Ursprünglicher Dateiname:** `dan-meyers-f1WMJR8pLqo-unsplash.jpg`
- **Fotograf:** Dan Meyers
- **Quelle:** Unsplash – https://unsplash.com/photos/f1WMJR8pLqo
- **Lizenz:** Unsplash-Lizenz (kostenlose kommerzielle Nutzung, keine Namensnennung verpflichtend); Auswahl und Freigabe durch den Auftraggeber
- **Motiv:** Sonne über einer weiten Wolkendecke
- **Eingesetzt auf:** /bestattungsarten/anonyme-bestattung/
- **Einsatzzweck:** Anonyme Bestattung – weiter, ruhiger Horizont
- **Alt-Text:** „Sonnenlicht über einer weiten, ruhigen Wolkendecke“
- **Original:** 5464 × 3640 px
- **Hinweis:** allgemeines Stockmotiv, kein Gorhau-Unternehmensfoto

### trauernde-umarmung

- **Lokale Dateien:** `public/images/stock/trauernde-umarmung-{Breite}.{avif,webp,jpg}`
- **Ursprünglicher Dateiname:** `vidar-nordli-mathisen-nvlB39rzdQE-unsplash.jpg`
- **Fotograf:** Vidar Nordli-Mathisen
- **Quelle:** Unsplash – https://unsplash.com/photos/nvlB39rzdQE
- **Lizenz:** Unsplash-Lizenz (kostenlose kommerzielle Nutzung, keine Namensnennung verpflichtend); Auswahl und Freigabe durch den Auftraggeber
- **Motiv:** Zwei Trauernde von hinten, eine Person lehnt den Kopf an die Schulter
- **Eingesetzt auf:** /im-trauerfall/
- **Einsatzzweck:** Im Trauerfall – menschliche Nähe
- **Alt-Text:** „Zwei trauernde Menschen stehen eng beieinander, von hinten aufgenommen“
- **Original:** 3500 × 2597 px
- **Hinweis:** allgemeines Stockmotiv, kein Gorhau-Unternehmensfoto

### gedenkkerzen

- **Lokale Dateien:** `public/images/stock/gedenkkerzen-{Breite}.{avif,webp,jpg}`
- **Ursprünglicher Dateiname:** `eli-solitas-q6e4zwgtUcM-unsplash.jpg`
- **Fotograf:** Eli Solitas
- **Quelle:** Unsplash – https://unsplash.com/photos/q6e4zwgtUcM
- **Lizenz:** Unsplash-Lizenz (kostenlose kommerzielle Nutzung, keine Namensnennung verpflichtend); Auswahl und Freigabe durch den Auftraggeber
- **Motiv:** Brennende Gedenkkerzen, warmes Licht
- **Eingesetzt auf:** /leistungen/thanatopraxie/
- **Einsatzzweck:** Thanatopraxie – zurückhaltendes, warmes Detail
- **Alt-Text:** „Mehrere brennende Gedenkkerzen mit warmem Licht“
- **Original:** 4592 × 3056 px
- **Hinweis:** allgemeines Stockmotiv, kein Gorhau-Unternehmensfoto

### blumen-auf-sarg

- **Lokale Dateien:** `public/images/stock/blumen-auf-sarg-{Breite}.{avif,webp,jpg}`
- **Ursprünglicher Dateiname:** `mayron-oliveira-mibn6LLm9kA-unsplash.jpg`
- **Fotograf:** Mayron Oliveira
- **Quelle:** Unsplash – https://unsplash.com/photos/mibn6LLm9kA
- **Lizenz:** Unsplash-Lizenz (kostenlose kommerzielle Nutzung, keine Namensnennung verpflichtend); Auswahl und Freigabe durch den Auftraggeber
- **Motiv:** Zarter Blumenstrauß auf einem Holzsarg, von oben fotografiert
- **Eingesetzt auf:** /leistungen/trauerfeier-und-trauerdruck/, /bestattungsarten/
- **Einsatzzweck:** Trauerfeier & Trauerdruck sowie Bestattungsarten-Übersicht
- **Alt-Text:** „Zarter Strauß aus rosa und weißen Blüten auf einem Holzsarg“
- **Original:** 5926 × 3951 px
- **Hinweis:** allgemeines Stockmotiv, kein Gorhau-Unternehmensfoto

### meer-horizont

- **Lokale Dateien:** `public/images/stock/meer-horizont-{Breite}.{avif,webp,jpg}`
- **Ursprünglicher Dateiname:** `inline-03.jpg`
- **Fotograf:** nicht überliefert
- **Quelle:** Quelle vom Auftraggeber bereitgestellt / Unsplash-Auswahl (Originaldateiname lag nicht vor)
- **Lizenz:** Unsplash-Lizenz (kostenlose kommerzielle Nutzung, keine Namensnennung verpflichtend); Auswahl und Freigabe durch den Auftraggeber
- **Motiv:** Ruhige See mit Horizont und Wolkenhimmel
- **Eingesetzt auf:** /bestattungsarten/seebestattung/
- **Einsatzzweck:** Seebestattung – Hauptmotiv
- **Alt-Text:** „Ruhige See mit weitem Horizont unter bewölktem Himmel“
- **Original:** 2000 × 1333 px
- **Hinweis:** allgemeines Stockmotiv, kein Gorhau-Unternehmensfoto

### meer-tiefblau

- **Lokale Dateien:** `public/images/stock/meer-tiefblau-{Breite}.{avif,webp,jpg}`
- **Ursprünglicher Dateiname:** `inline-02.jpg`
- **Fotograf:** nicht überliefert
- **Quelle:** Quelle vom Auftraggeber bereitgestellt / Unsplash-Auswahl (Originaldateiname lag nicht vor)
- **Lizenz:** Unsplash-Lizenz (kostenlose kommerzielle Nutzung, keine Namensnennung verpflichtend); Auswahl und Freigabe durch den Auftraggeber
- **Motiv:** Tiefblaues Meer mit heller Gischt von oben
- **Eingesetzt auf:** /bestattungsarten/seebestattung/
- **Einsatzzweck:** Seebestattung – zweites Motiv im Textverlauf
- **Alt-Text:** „Tiefblaues Meer mit heller Gischt aus der Vogelperspektive“
- **Original:** 2000 × 1333 px
- **Hinweis:** allgemeines Stockmotiv, kein Gorhau-Unternehmensfoto

### friedhof-graeber-blumen

- **Lokale Dateien:** `public/images/stock/friedhof-graeber-blumen-{Breite}.{avif,webp,jpg}`
- **Ursprünglicher Dateiname:** `inline-04.jpg`
- **Fotograf:** nicht überliefert
- **Quelle:** Quelle vom Auftraggeber bereitgestellt / Unsplash-Auswahl (Originaldateiname lag nicht vor)
- **Lizenz:** Unsplash-Lizenz (kostenlose kommerzielle Nutzung, keine Namensnennung verpflichtend); Auswahl und Freigabe durch den Auftraggeber
- **Motiv:** Gepflegte Gräberreihe mit Blumenbepflanzung und Grablichtern im Sonnenlicht
- **Eingesetzt auf:** /friedhoefe-in-wuerzburg/
- **Einsatzzweck:** Friedhöfe in Würzburg – Hauptmotiv
- **Alt-Text:** „Gepflegte Gräberreihe mit Blumenbepflanzung und Grablichtern im Sonnenlicht“
- **Original:** 2000 × 1333 px
- **Hinweis:** allgemeines Stockmotiv, kein Gorhau-Unternehmensfoto

### Nicht eingesetzte Motive

#### `inline-01.jpg`

- **Motiv:** Blumengeschmückter Weidensarg vor einem Kremationsofen
- **Status:** nicht verwenden
- **Begründung:** Zeigt technische Anlagentechnik eines fremden Krematoriums samt englischsprachiger Sicherheitsaufkleber. Für die Feuerbestattungsseite zu konfrontierend und nicht zur angestrebten warmen, hellen Bildsprache passend. Die Seite hat bereits ein echtes Gorhau-Foto mit Urnendekoration.

#### `inline-05.jpg`

- **Motiv:** Trauerengel aus Bronze auf einem historischen Grabmal, Herbststimmung
- **Status:** nicht verwenden
- **Begründung:** Sehr dunkel (Helligkeit 20 %) und mit Trauerengel-Symbolik deutlich schwermütig – gegenläufig zur angestrebten hellen, einladenden Wirkung. Zusätzlich sind auf den Grabmalen Namen realer Verstorbener gut lesbar.

### Originaldateien

Die unbearbeiteten Originale liegen unter `incoming-assets/unsplash-originals/` und
gehen nicht in den Produktionsbuild ein. Ausgeliefert werden ausschließlich die
optimierten Varianten unter `public/images/stock/`, erzeugt mit `npm run images:stock`.

<!-- STOCK:END -->

## 5. Explizit NICHT verwendet

- Keine KI-generierten Mitarbeiter-, Team- oder Inhaberbilder.
- Keine KI-generierten Innenraum- oder Gebäudeaufnahmen, die als „echtes Gorhau-Haus“
  ausgegeben werden.
- Kein fremdes Fahrzeug, das als Gorhau-Fahrzeug dargestellt wird. Die Seite „Überführungen“
  zeigt inzwischen eine **echte** Aufnahme der Gorhau-Fahrzeuge aus dem Medienpaket des
  Auftraggebers, in nativer Größe und ohne Hochskalierung.
- Keine erfundenen Kundenstimmen, Preisangaben oder Unternehmensgeschichten.
- Kein Stockbild wird als Gorhau-Raum, -Gebäude, -Fahrzeug, -Personal oder -Kundschaft
  ausgegeben. Die Stockmotive stehen ausschließlich für allgemeine Themen (Natur, Meer,
  Blumen, Kerzen, Stadtansicht Würzburg, Trauer als Situation).

## 6. Prüfstatus je Bild-Einsatzort

Die vollständige Zuordnung „welches Bild/Motiv auf welcher Seite“ inkl. Alt-Texten und
offenem Fotobedarf steht in `audit/page-image-coverage.md` sowie – auf dem aktuellen Stand
nach der Stockbild-Integration – in `audit/final-image-coverage.md`.
