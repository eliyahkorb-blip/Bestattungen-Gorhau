# Leistungs-Abdeckung (Service-Matrix)

Abgleich der zu prüfenden Leistungen mit der neuen Website. **Endgültiger Abgleich gegen die
Originalseiten ist erst nach Bereitstellung von `incoming-assets/original-site.zip` möglich**
(dann automatisch via `npm run ingest` archiviert und hier zu ergänzen). Grundlage bis dahin:
Auftragstext, öffentliche Unternehmensprofile **und der bereitgestellte Flyer 2009**.

> **Beleg aus Flyer 2009:** Der Flyer nennt ausdrücklich die Leistungen
> „Bestattungsvorsorge / Sterbegeldversicherungen / Überführungen von u. nach allen Orten /
> Erd-, Feuer-, Seebestattungen / Grabbereitungen / Umbettungen / Trägergestellungen /
> Dekorationen" sowie „Würzburgs erstes Bestattungshaus mit eigenem Abschiedsraum". Das bestätigt
> mehrere zuvor offene Punkte (Stand 2009 – aktuellen Stand vor Live-Schaltung bestätigen).

| Leistung (Prüfliste) | Auf der Website | Wo | Status |
|---|---|---|---|
| Bestattungsvorsorge | ✅ | `/bestattungsvorsorge/` | übernommen |
| Erdbestattung | ✅ | `/bestattungsarten/erdbestattung/` | übernommen |
| Feuerbestattung | ✅ | `/bestattungsarten/feuerbestattung/` | übernommen |
| Seebestattung | ✅ | `/bestattungsarten/seebestattung/` | übernommen |
| Anonyme Bestattung | ✅ | `/bestattungsarten/anonyme-bestattung/` | übernommen |
| Überführungen national/international | ✅ | `/leistungen/ueberfuehrungen/` | übernommen |
| Umbettungen | ✅ | `/leistungen/` (Weitere Leistungen) | **belegt (Flyer 2009)** – aktuellen Stand bestätigen |
| Graböffnungen / Grabbereitungen | ✅ | `/leistungen/` (Weitere Leistungen) | **belegt (Flyer 2009)** – aktuellen Stand bestätigen |
| Trägergestellung | ✅ | `/leistungen/` (Weitere Leistungen) | **belegt (Flyer 2009)** – aktuellen Stand bestätigen |
| Sterbegeldversicherungen | ✅ | `/bestattungsvorsorge/` | **belegt (Flyer 2009)** |
| Trauerreden | ✅ | `/leistungen/trauerfeier-und-trauerdruck/`, `/leistungen/` | übernommen |
| Trauerdruck | ✅ | `/leistungen/trauerfeier-und-trauerdruck/` | übernommen |
| Friedhofsdekoration | ✅ | `/leistungen/trauerfeier-und-trauerdruck/`, `/leistungen/` | übernommen |
| Behördengänge | ✅ | `/leistungen/formalitaeten/` | übernommen |
| Abschiedsraum | ✅ | `/abschiedsraum/` | übernommen |
| Hygienische Versorgung | ✅ | `/leistungen/thanatopraxie/`, `/leistungen/` | übernommen |
| Thanatopraxie | ✅ | `/leistungen/thanatopraxie/` | übernommen |
| Klimaraum / Kühlung | ✅ | `/leistungen/` („gekühlte Räumlichkeiten") | **hinzugefügt – zu bestätigen** |
| Vorsorgeverträge | ✅ | `/bestattungsvorsorge/` | übernommen |
| Treuhandlösungen | ✅ | `/bestattungsvorsorge/` | übernommen |

## Hinzugefügte Leistungen, die vor Live-Schaltung zu bestätigen sind
**Umbettungen, Graböffnungen, gekühlte Aufbewahrung (Klimaraum)** wurden aufgenommen, weil sie
in öffentlichen Profilen als Leistungen von Gorhau genannt sind und laut Vorgabe „keine
vorhandene wichtige Leistung unbemerkt entfernt" werden soll. Da sie noch nicht gegen die
Originalseiten verifiziert werden konnten, sind sie in `docs/LEGAL-REVIEW-REQUIRED.md` und
`docs/CONTENT-REVIEW.md` als **zu bestätigen** markiert. Keine Leistung wurde frei erfunden;
Formulierungen sind bewusst zurückhaltend.

## Nach Bereitstellung von original-site.zip
1. `npm run ingest` (archiviert die Originalseiten).
2. Jede Leistungsseite gegen das Original abgleichen; diese Tabelle um Spalten „im Original
   vorhanden" / „ausgelassene Inhalte" ergänzen.
3. Bestätigte Leistungen von „zu bestätigen" auf „übernommen" setzen; nicht mehr angebotene
   Leistungen entfernen.
