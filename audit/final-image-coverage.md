# Bildabdeckung nach der Stockbild-Integration

Automatisch erzeugt mit `npm run build && npm run audit:images` aus dem gebauten `dist/`.
Gezählt werden Inhaltsbilder; Logo und Favicons bleiben außen vor.

- Indexierbare Seiten: **24**
- Seiten mit mindestens einem Bild: **18**
- Seiten mit echtem Gorhau-Foto: **14**
- Seiten mit allgemeinem Stockbild: **8**
- Fehlende Alt-Texte: **0**

| Seite | Bilder | einzigartig | Hero (eager) | echtes Gorhau-Foto | Stockbild | Illustrationen | Alt fehlt |
|---|---:|---:|---|---|---|---:|---:|
| `/abschiedsraum/` | 1 | 1 | abschiedsraum-bestattungen-gorhau-panorama.png | ja | nein | 0 | 0 |
| `/barrierefreiheit/` | 0 | 0 | – | nein | nein | 0 | 0 |
| `/bestattungsarten/anonyme-bestattung/` | 2 | 2 | anonyme-bestattung-rasenfeld.png | ja | ja | 1 | 0 |
| `/bestattungsarten/erdbestattung/` | 1 | 1 | erdbestattung-dekoration.png | ja | nein | 3 | 0 |
| `/bestattungsarten/feuerbestattung/` | 2 | 2 | feuerbestattung-urnen-dekoration.png | ja | nein | 2 | 0 |
| `/bestattungsarten/` | 1 | 1 | blumen-auf-sarg-1600.jpg | nein | ja | 0 | 0 |
| `/bestattungsarten/seebestattung/` | 3 | 3 | meer-horizont-1600.jpg | ja | ja | 1 | 0 |
| `/bestattungsvorsorge/` | 0 | 0 | – | nein | nein | 2 | 0 |
| `/datenschutz/` | 0 | 0 | – | nein | nein | 0 | 0 |
| `/friedhoefe-in-wuerzburg/` | 2 | 2 | friedhof-graeber-blumen-1600.jpg | ja | ja | 1 | 0 |
| `/im-trauerfall/benoetigte-dokumente/` | 0 | 0 | – | nein | nein | 2 | 0 |
| `/im-trauerfall/` | 1 | 1 | trauernde-umarmung-1600.jpg | nein | ja | 2 | 0 |
| `/impressum/` | 0 | 0 | – | nein | nein | 0 | 0 |
| `/` | 3 | 3 | wuerzburg-panorama-2400.jpg | ja | ja | 16 | 0 |
| `/kontakt/` | 1 | 1 | bestattungsinstitut-gorhau-aussenansicht-panorama.png | ja | nein | 0 | 0 |
| `/leistungen/formalitaeten/` | 0 | 0 | – | nein | nein | 2 | 0 |
| `/leistungen/` | 1 | 1 | sargausstellung-bestattungen-gorhau-panorama.png | ja | nein | 0 | 0 |
| `/leistungen/thanatopraxie/` | 1 | 1 | versorgungsraum-bestattungen-gorhau.png | ja | nein | 2 | 0 |
| `/leistungen/trauerfeier-und-trauerdruck/` | 1 | 1 | gedenkkerzen-1600.jpg | nein | ja | 0 | 0 |
| `/leistungen/ueberfuehrungen/` | 1 | 1 | fahrzeuge-vor-bestattungsinstitut.png | ja | nein | 0 | 0 |
| `/mediathek/` | 1 | 1 | – | nein | nein | 0 | 0 |
| `/ueber-uns/galerie/` | 12 | 12 | bestattungsinstitut-gorhau-aussenansicht-panorama.png | ja | nein | 0 | 0 |
| `/ueber-uns/historie/` | 4 | 4 | bestattungen-gorhau-historische-fahrzeuge-panorama.png | ja | nein | 1 | 0 |
| `/ueber-uns/` | 2 | 2 | bestattungsinstitut-gorhau-innenhof-panorama-1.png | ja | ja | 0 | 0 |

## Seiten ohne Inhaltsbild

Diesen Seiten fehlt passendes Bildmaterial. Sie brauchen zusätzliche Aufnahmen:

- `/bestattungsvorsorge/`
- `/im-trauerfall/benoetigte-dokumente/`
- `/leistungen/formalitaeten/`

Impressum, Datenschutz und Barrierefreiheit bleiben absichtlich ohne Bild – dort stört
Bildsprache die Lesbarkeit der Rechtstexte.
