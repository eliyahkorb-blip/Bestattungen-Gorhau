# Fotobedarf: konkrete Aufnahmen für einen späteren Fototermin

Diese Liste dokumentiert, welches echte Fotomaterial noch fehlt, um die in der
referenzinspirierten Überarbeitung vorgesehenen Bildplätze mit echten Gorhau-Fotos statt
Illustrationen zu füllen (siehe `docs/IMAGE-SOURCE-AND-LICENSES.md`). Aktuell liegen **nur**
das Unternehmenslogo und ein historischer Flyer-Scan von 2009 als echtes Bildmaterial vor.

## Priorität 1 – zwingend für Abschiedsraum-Seite

Vorgabe verlangt hier ausdrücklich echte Aufnahmen (großes Hauptbild + 4–8 weitere Detailbilder).

- [ ] Abschiedsraum: Hauptaufnahme (Raum vollständig, Tageslicht, aufgeräumt/vorbereitet)
- [ ] Abschiedsraum: Detail – Sitzgelegenheit / Bestuhlung
- [ ] Abschiedsraum: Detail – Lichtsituation / Fenster
- [ ] Abschiedsraum: Detail – Blumen-/Dekorationsmöglichkeit
- [ ] Abschiedsraum: Detail – Eingang zum Raum
- [ ] Abschiedsraum: ggf. weiteres Detail nach Absprache mit Inhaber (z. B. Aufbahrungsbereich,
      sofern für Außendarstellung gewünscht)

## Priorität 2 – Über uns / Kontakt / Historie

- [ ] Porträtfoto Inhaber Thomas Gorhau (freigegeben zur Veröffentlichung)
- [ ] Teamfoto (alle Mitarbeitenden, die einer Veröffentlichung zustimmen)
- [ ] Gebäude-Außenansicht Reuterstraße 2 (Tageslicht, Vorderansicht)
- [ ] Gebäude-Außenansicht mit Eingangsbereich (für Kontakt-Seite/Anfahrt)
- [ ] Innenraum – Empfangs-/Beratungsbereich
- [ ] Aktuelles Foto vom Fahrzeug (für Überführungen), sofern für Außendarstellung gewünscht

## Priorität 3 – Galerie/Mediathek (Ergänzung, kein Blocker)

- [ ] Aktuelle Innen-/Außenaufnahmen für eine spätere Bildergalerie
- [ ] Digitalisierung weiterer historischer Aufnahmen/Anzeigen aus dem Firmenarchiv (falls
      vorhanden), zusätzlich zum bereits eingebundenen Flyer 2009
- [ ] Imagefilm: Aufnahme/Produktion (aktuell nirgends auf der Website angeteasert – wird erst
      nach Vorliegen einer echten Videodatei ergänzt)

## Hinweise für den Fototermin

- Format: Querformat bevorzugt (16:9 oder 4:3) für konsistente Bildausschnitte in den
  bestehenden Layout-Rastern.
- Auflösung: mindestens 2400 px auf der langen Kante, damit AVIF/WebP-Varianten in mehreren
  Größen erzeugt werden können (siehe bestehende Pipeline `scripts/ingest-assets.py`).
- Personenfotos: schriftliche Einwilligung zur Veröffentlichung vor dem Shooting einholen.
- Nach Erhalt: Dateien in `incoming-assets/images/` ablegen und `npm run ingest` (bzw.
  `python3 scripts/ingest-assets.py`) ausführen – die bestehende Pipeline erzeugt automatisch
  optimierte AVIF/WebP-Varianten mit den passenden Größen.
- Sobald echte Fotos vorliegen, können sie die entsprechenden `Motif`-Illustrationen 1:1
  ersetzen (siehe Zuordnung in `audit/page-image-coverage.md`) – die Seitenstruktur muss dafür
  nicht verändert werden.

## Aktueller Status

Bis diese Aufnahmen vorliegen, zeigen die betroffenen Seiten transparente Hinweise
(`HintBox`-Komponente) sowie das eigens gestaltete Illustrationssystem als Platzhalter –
niemals ein KI-generiertes oder fremdes Foto, das als echtes Gorhau-Material ausgegeben wird.
