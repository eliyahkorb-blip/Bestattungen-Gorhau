# GEO-Review: Auffindbarkeit in generativen Antwortsystemen

Automatisch erzeugt mit `npm run build && node tests/seo-geo-check.mjs`.

GEO meint hier: Kann ein Antwortsystem die Fakten dieses Unternehmens eindeutig
entnehmen und eine Nutzerfrage korrekt beantworten, ohne zu raten?

## Konsistente Unternehmensdaten (NAP)

| Merkmal | Wert | Abdeckung |
|---|---|---|
| Name | Bestattungs- und Überführungsinstitut Gorhau, Inh. Thomas Gorhau e.K. | alle Seiten (Footer) |
| Anschrift | Reuterstraße 2, 97084 Würzburg-Heidingsfeld | 0/0 Seiten |
| Telefon | 0931 61 00 00 | 0/0 Seiten |

Die Daten stammen aus einer einzigen Quelle (`src/data/company.ts`) und können
deshalb nicht auseinanderlaufen.

## Strukturierte Daten

Eingesetzte Typen: 

Bewusst **nicht** eingesetzt:

- `AggregateRating` und `Review`: es liegen keine echten Bewertungen vor
- `Offer` und `PriceSpecification`: es werden keine Preise genannt
- `Award`: keine belegbaren Auszeichnungen
- `VideoObject`: erst sinnvoll, wenn der Imagefilm tatsächlich vorliegt

`FAQPage` wird nur auf der Seite „Im Trauerfall" ausgezeichnet, weil dort echte,
sichtbare Fragen und Antworten stehen.

## Direkt beantwortete Nutzerfragen

| Frage | Seite | vorhanden |
|---|---|---|
| Was ist im Trauerfall zuerst zu tun? | `/im-trauerfall/` | FEHLT |
| Welche Unterlagen werden benötigt? | `/im-trauerfall/benoetigte-dokumente/` | FEHLT |
| Welche Bestattungsarten gibt es? | `/bestattungsarten/` | FEHLT |
| Wie läuft eine Überführung ab? | `/leistungen/ueberfuehrungen/` | FEHLT |
| Was ist eine Bestattungsvorsorge? | `/bestattungsvorsorge/` | FEHLT |
| Kann ich mich im Abschiedsraum persönlich verabschieden? | `/abschiedsraum/` | FEHLT |

## Seitenumfang

Antwortsysteme bevorzugen Seiten, die eine Frage vollständig, aber ohne Füllmaterial
beantworten.

| Seite | Wörter |
|---|---:|
