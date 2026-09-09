# Bildabdeckung nach der Stockbild-Integration

Automatisch erzeugt mit `npm run build && npm run audit:images` aus dem gebauten `dist/`.
Gezählt werden Inhaltsbilder; Logo und Favicons bleiben außen vor.

- Indexierbare Seiten: **14**
- Seiten mit mindestens einem Bild: **11**
- Seiten mit echtem Gorhau-Foto: **8**
- Seiten mit allgemeinem Stockbild: **7**
- Fehlende Alt-Texte: **0**

| Seite | Bilder | einzigartig | Hero (eager) | echtes Gorhau-Foto | Stockbild | Illustrationen | Alt fehlt |
|---|---:|---:|---|---|---|---:|---:|
| `/abschiedsraum/` | 1 | 1 | abschiedsraum-bestattungen-gorhau-panorama.png | ja | nein | 0 | 0 |
| `/barrierefreiheit/` | 0 | 0 | – | nein | nein | 0 | 0 |
| `/bestattungsarten/` | 4 | 4 | erdbestattung-dekoration.png | ja | ja | 0 | 0 |
| `/datenschutz/` | 0 | 0 | – | nein | nein | 0 | 0 |
| `/friedhoefe/` | 2 | 2 | friedhof-graeber-blumen-1600.jpg | ja | ja | 1 | 0 |
| `/historie/` | 4 | 4 | bestattungen-gorhau-historische-fahrzeuge-panorama.png | ja | nein | 1 | 0 |
| `/im-trauerfall/` | 1 | 1 | trauernde-umarmung-1600.jpg | nein | ja | 0 | 0 |
| `/impressum/` | 0 | 0 | – | nein | nein | 0 | 0 |
| `/` | 7 | 7 | wuerzburg-panorama-2400.jpg | ja | ja | 0 | 0 |
| `/kontakt/` | 1 | 1 | bestattungsinstitut-gorhau-aussenansicht-panorama.png | ja | nein | 0 | 0 |
| `/leistungen/` | 3 | 3 | fahrzeuge-vor-bestattungsinstitut.png | ja | ja | 0 | 0 |
| `/mediathek/` | 1 | 1 | – | nein | nein | 0 | 0 |
| `/ueber-uns/` | 14 | 14 | bestattungsinstitut-gorhau-innenhof-panorama-1.png | ja | ja | 0 | 0 |
| `/vorsorge/` | 1 | 1 | wuerzburg-kaeppele-herbst-1600.jpg | nein | ja | 0 | 0 |

## Seiten ohne Inhaltsbild

Keine – abgesehen von den bewusst bildfreien Rechtstexten (Impressum, Datenschutz, Barrierefreiheit).

Impressum, Datenschutz und Barrierefreiheit bleiben absichtlich ohne Bild – dort stört
Bildsprache die Lesbarkeit der Rechtstexte.
