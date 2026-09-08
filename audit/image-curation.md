# Bildkuratierung

## Stand dieses Durchgangs

Der Auftrag zum Master-Design-Rework nennt „zahlreiche neue Bilder" als Kandidatenpool.
**Diese Bilder sind hier nicht angekommen.** Geprüft wurde:

- der Upload-Ordner der Sitzung: enthält nur die ZIP vom Vortag
  (`Gorhau_Bilder_unsplash.zip`, 6 Motive)
- das Dateisystem auf neue Bild- oder Archivdateien: keine seit dem Vortag
- die Sitzung selbst auf eingebettete Bildanhänge: keine neuen

Kuratiert werden konnte deshalb nur der **bereits vorhandene Pool**. Sobald die neuen
Bilder vorliegen, greift dieselbe Bewertungslogik, und diese Datei wird ergänzt.

## Bewerteter Bestand

| Quelle | Anzahl | Bewertung |
|---|---:|---|
| Echte Gorhau-Aufnahmen (Medienpaket des Auftraggebers) | 24 im Einsatz | Vorrang für alles, was Unternehmensrealität zeigt |
| Allgemeine Stockmotive (Unsplash-Auswahl des Auftraggebers) | 9 im Einsatz | nur für allgemeine Themen |
| Geprüft, aber bewusst nicht eingesetzt | 2 | Begründung siehe unten |

Die vollständige Einzelbewertung jedes Ausgangsbildes, mit Auflösung, Seitenverhältnis,
Motiv, Stimmung, vorherrschenden Farben, Personen, Marken, rechtlichen Punkten und
Eignung für Hero, Content und Mobil, steht in:

- `audit/unsplash-image-inventory.md` (lesbar)
- `audit/unsplash-image-inventory.json` (maschinenlesbar)

## Nicht verwendet

| Datei | Motiv | Grund |
|---|---|---|
| `inline-01.jpg` | Weidensarg vor einem Kremationsofen | Fremde Anlagentechnik mit englischsprachigen Sicherheitsaufklebern. Zu konfrontierend und passt nicht zur hellen, warmen Bildsprache. |
| `inline-05.jpg` | Bronzener Trauerengel, Herbst | Sehr dunkel (Helligkeit 20 %), schwermütige Symbolik. Auf den Grabmalen sind Namen realer Verstorbener lesbar. |

## Trennung der Bildwelten

Diese Trennung ist im Code verankert, nicht nur dokumentiert:

- `PhotoFigure.astro` zeigt **ausschließlich echte Gorhau-Aufnahmen**
- `StockPhoto.astro` zeigt **ausschließlich allgemeine Motive** und trägt im Quelltext den
  ausdrücklichen Hinweis, dass Alt-Texte nie einen Gorhau-Raum, ein Gorhau-Fahrzeug oder
  Gorhau-Personal behaupten dürfen

Räume, Gebäude, Fahrzeuge, Ausstellung, Versorgungsraum, Historie und Kontakt werden
deshalb durchgehend mit echten Aufnahmen belegt. Stockmotive stehen nur für Natur, Meer,
Blumen, Kerzen, Friedhof allgemein und die Stadtansicht Würzburg.

## Offener Bildbedarf

Drei Seiten haben weiterhin kein Bild, weil im Bestand kein passendes Motiv liegt:

- `/bestattungsvorsorge/` braucht Papier, Gespräch, ruhige Beratungssituation
- `/im-trauerfall/benoetigte-dokumente/` braucht Dokumente, Stift, ruhige Oberfläche
- `/leistungen/formalitaeten/` braucht Dokumente, Ordnung, Checkliste

Zusätzlich wären höher aufgelöste Aufnahmen von Beratungsbüro, Versorgungsraum und
Fahrzeugen wünschenswert. Die vorhandenen liegen nur als 208×126-Pixel-Thumbnails vor und
werden deshalb bewusst klein und ohne Hochskalierung eingesetzt.
