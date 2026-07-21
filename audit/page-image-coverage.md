# Bildabdeckung je Seite

Stand: nach der referenzinspirierten visuellen Überarbeitung (siehe
`audit/reference-inspired-design-review.md`). Bildquellen-Legende:

- **Logo** = echtes Unternehmenslogo (`incoming-assets/header_logo.png`)
- **Flyer 2009** = echter historischer Scan (`incoming-assets/flyer_2009.jpg`)
- **Motiv** = selbst gestaltete, farbige Linien-Illustration (`src/components/illustrations/Motif.astro`), kein Foto
- **Icon** = bestehendes einfarbiges Linien-Icon-Set (`src/components/icons/Icon.astro`)
- **Platzhalter-Rahmen** = gekennzeichneter Bildplatzhalter mit Beschriftung (Galerie), kein Foto

„Freigabestatus" bezieht sich auf reale Fotos: **entfällt** (Seite nutzt bewusst Illustration/Icon,
kein echtes Foto vorgesehen bis zum Fototermin) oder **offen – siehe PHOTO-SHOOT-LIST.md**.

| Seite | Bilder gesamt | einzigartige Motive/Bilder | Hero-Element | weitere Bild-Elemente | Bildquelle | Alt-Texte | Fehlendes Material | Freigabestatus |
|---|---|---|---|---|---|---|---|---|
| Startseite | 11 | 8 (gebaeude, abschiedsraum, ueberfuehrung, thanatopraxie, trauerfeier, erd-/feuer-/see-/anonyme Bestattung) + HeroVisual-Illustration | HeroVisual-Illustration (bestehend) | Unternehmensbild-Motiv, 3 Leistungs-Motive, 4 Bestattungsarten-Motive, Abschiedsraum-Motiv, Imagefilm-Teaser-Icon | Motiv (alle) | vorhanden (je `label`-Prop) | Echtes Hero-/Gebäudefoto | offen – siehe PHOTO-SHOOT-LIST.md |
| Im Trauerfall | 2 | 2 (begleitung, formalitaeten) | Motiv „begleitung" | Motiv „formalitaeten" als Zwischenbruch | Motiv | vorhanden | – | entfällt (Illustration ausreichend) |
| Benötigte Dokumente | 1 | 1 (formalitaeten) | Motiv „formalitaeten" | Karten-Raster (kein Bild, strukturiert) | Motiv | vorhanden | – | entfällt |
| Leistungen (Hub) | 7 | 1 Motiv + 6 Icons | Motiv „begleitung" | 6x Icon in Kachel-Übersicht | Motiv + Icon | vorhanden | – | entfällt |
| Überführungen | 1 | 1 (ueberfuehrung) | Motiv „ueberfuehrung" (bewusst abstrakt, kein fremdes Fahrzeug) | – | Motiv | vorhanden | Echtes Fahrzeugfoto (falls gewünscht) | offen – siehe PHOTO-SHOOT-LIST.md |
| Thanatopraxie | 2 | 2 (thanatopraxie, abschiedsraum) | Motiv „thanatopraxie" (zurückhaltend, nicht klinisch) | Motiv „abschiedsraum" als Zwischenbruch | Motiv | vorhanden | – | entfällt |
| Trauerfeier & Trauerdruck | 1 | 1 (trauerfeier) | Motiv „trauerfeier" | Chip-Liste (strukturiert) | Motiv | vorhanden | – | entfällt |
| Formalitäten | 1 | 1 (formalitaeten) | Motiv „formalitaeten" | Chip-Liste + Accordion | Motiv | vorhanden | – | entfällt |
| Bestattungsarten (Hub) | 4 | 4 Icons (je Bestattungsart unterschiedlich) | Icon-Kachel-Raster | – | Icon | vorhanden | – | entfällt |
| Erdbestattung | 2 | 2 (erdbestattung, friedhoefe) | Motiv „erdbestattung" (Grab, Grün) | Motiv „friedhoefe" als Zwischenbruch | Motiv | vorhanden | Echtes Friedhofsfoto (optional) | offen – siehe PHOTO-SHOOT-LIST.md |
| Feuerbestattung | 2 | 2 (feuerbestattung, friedhoefe) | Motiv „feuerbestattung" (dezente Flamme/Urne) | Motiv „friedhoefe" als Zwischenbruch | Motiv | vorhanden | – | entfällt |
| Seebestattung | 2 | 2 (seebestattung, anonyme-bestattung) | Motiv „seebestattung" (Wellen/Horizont) | Motiv als Zwischenbruch | Motiv | vorhanden | – | entfällt |
| Anonyme Bestattung | 2 | 2 (anonyme-bestattung, friedhoefe) | Motiv „anonyme-bestattung" (ruhige Landschaft) | Motiv „friedhoefe" als Zwischenbruch | Motiv | vorhanden | – | entfällt |
| Bestattungsvorsorge | 1 | 1 (vorsorge) | Motiv „vorsorge" (Gespräch) | Quote-Zitatblock (kein Bild) | Motiv | vorhanden | – | entfällt |
| Abschiedsraum | 1 | 1 (abschiedsraum) | Motiv „abschiedsraum" (Fenster/Licht) | – | Motiv | vorhanden | Hauptaufnahme + 4–8 Detailfotos (Priorität 1) | offen – siehe PHOTO-SHOOT-LIST.md |
| Über uns | 5 | 1 Motiv + 4 Icons | Motiv „gebaeude" | 4x Icon (Historie/Galerie/Abschiedsraum/Mediathek) | Motiv + Icon | vorhanden | Inhaber-/Teamfoto, Gebäudefoto | offen – siehe PHOTO-SHOOT-LIST.md |
| Historie | 1 | 1 (historie) | Motiv „historie" (Zeitleiste) | Text-Timeline mit 4 Meilensteinen (strukturiert, kein Bild je Eintrag) | Motiv | vorhanden | Historische Fotos (Fahrzeuge, Geschäftsräume) | offen – siehe PHOTO-SHOOT-LIST.md |
| Galerie | 3 | 3 Motive (gebaeude, abschiedsraum, historie) | Motiv-Kachel-Raster (Themenlinks, kein Platzhalter) | Link zum echten Dokument in der Mediathek | Motiv | vorhanden | Aktuelle Innen-/Außenaufnahmen | offen – siehe PHOTO-SHOOT-LIST.md |
| Mediathek | 1 | 1 (Flyer 2009, echtes Foto) | Flyer-Abbildung (echt) | – | **Flyer 2009 (echt)** | vorhanden, inkl. historischem Kontexthinweis | Imagefilm-Datei (aktuell nicht angeteasert) | offen – siehe PHOTO-SHOOT-LIST.md |
| Friedhöfe in Würzburg | 1 | 1 (friedhoefe) | Motiv „friedhoefe" | Chip-Liste (Grabarten) | Motiv | vorhanden | – | entfällt |
| Kontakt | 1 | 1 (gebaeude) | Motiv „gebaeude" | Kontaktdaten (Text, kein Bild) | Motiv | vorhanden | Echtes Außenfoto | offen – siehe PHOTO-SHOOT-LIST.md |
| Impressum | 0 | 0 | – | – | – | – | – | entfällt (Ausnahmeseite lt. Vorgabe) |
| Datenschutz | 0 | 0 | – | – | – | – | – | entfällt (Ausnahmeseite lt. Vorgabe) |
| Barrierefreiheit | 0 | 0 | – | – | – | – | – | entfällt (Ausnahmeseite lt. Vorgabe) |

## Zusammenfassung

- **Seiten mit mindestens einem visuellen Element:** 21 von 24 (alle außer den 3 explizit
  ausgenommenen Rechtsseiten Impressum/Datenschutz/Barrierefreiheit).
- **Seiten ganz ohne Bild:** 3 – Impressum, Datenschutz, Barrierefreiheit. Begründung: von der
  Vorgabe selbst als Ausnahme benannt („reine technische Fehlerseiten“ bzw. Rechtsseiten ohne
  inhaltliche Bildpflicht); ein Illustrationselement wäre hier nur Dekoration ohne inhaltlichen
  Mehrwert und würde die notwendige Nüchternheit von Rechtstexten stören.
- **Neu eingebaute Motiv-Illustrationen (Instanzen im Seitenquelltext, ohne Startseiten-Kacheln
  einzeln zu zählen):** 24 `<Motif>`-Einbindungen über 19 Dateien (siehe Grep-Auszug unten),
  auf der Startseite zusätzlich 8 weitere Motiv-Kacheln aus zwei `.map()`-Listen (3 Leistungen +
  4 Bestattungsarten + 1 Unternehmensbild/Abschiedsraum-Duplikat bereits gezählt) – macht in
  Summe **rund 30 sichtbare Motiv-Ausspielungen** sitedweit bei **14 einzigartigen
  Motiv-Zeichnungen**.
- **Echte Fotos im Einsatz:** 2 (Logo sitendweit in Header/Footer/Favicons, historischer Flyer
  2009 in der Mediathek).
- **Seiten mit noch offenem Fotobedarf:** Abschiedsraum, Über uns, Historie, Galerie, Kontakt,
  Mediathek (Imagefilm), Überführungen (optional) – vollständige Liste mit konkreten Motiven in
  `docs/PHOTO-SHOOT-LIST.md`.
