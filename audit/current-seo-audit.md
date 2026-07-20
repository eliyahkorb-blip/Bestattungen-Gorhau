# Audit der bestehenden Website

## Methodik & Einschränkung
Ein vollständiger Crawl der bestehenden Website war **nicht möglich**: Die Quelldomain
`https://www.gorhau-bestattungen.de/` ist durch die Egress-Netzwerk-Policy dieser Umgebung
gesperrt (alle Direktabrufe → **HTTP 403**, auch über verschiedene User-Agents/Referer sowie
Web-Archive). Die Bestandsaufnahme stützt sich daher auf:
- die im Auftrag dokumentierten Angaben und das bekannte Seobility-Ergebnis,
- öffentlich zugängliche Unternehmensprofile (Web-Suche): u. a. bestatter.de,
  bestattung-information.de, Das Örtliche, Gelbe Seiten, 11880, Cylex, sellwerk, ortsdienst,
  firmenwissen/unternehmen24.

## Aus öffentlichen Quellen bestätigte Unternehmensdaten
- Firmierung: **Bestattungs- und Überführungsinstitut Gorhau, Inh. Thomas Gorhau e.K.**
- Anschrift: **Reuterstraße 2, 97084 Würzburg-Heidingsfeld**
- Telefon **0931 61 00 00**, Fax **0931 6 56 57**
- Gegründet **1970** (Manfred & Ingrid Gorhau; Eröffnung 11.05.1970), Umzug nach Heidingsfeld
  **1980**, hauseigener **Abschiedsraum seit 2004**.
- Handelsregister: **Amtsgericht Würzburg, HRA 3873** (öffentlich; vor Live-Schaltung final
  bestätigen — siehe `docs/LEGAL-REVIEW-REQUIRED.md`).
- Leistungen laut Profilen: Erd-/Feuer-/See-/Baum-/anonyme Bestattung, Überführungen national/
  international, Thanatopraxie, Bestattungsvorsorge (Treuhand + Sterbegeldversicherung),
  Trauerfeier/Trauerredner, Formalitäten.
- Öffnungszeiten: **Mo–Fr 08:00–16:00**; im Trauerfall Tag und Nacht erreichbar.
- Abweichung: ein Profil nennt `info@gorhau-bestattungen.de` statt `gorhau-bestattungen@t-online.de`
  → zu klären.

## Bekannte Onpage-Probleme (Seobility ≈ 56 %) und Behebung
Vollständige Tabelle in `docs/SEO-REPORT.md`. Kurz: leere/fehlende H1, kein Viewport, kein
`lang="de"`, HTTP/HTTPS- und www-Uneinheitlichkeit, fehlende Alt-Attribute, sehr dünner Text,
kein Favicon/Apple-Touch-Icon, fehlende Charset-Angabe, unklare Linktexte, veraltete
XHTML-Struktur, schwache externe Signale. **Alle technischen/Onpage-Punkte im Relaunch behoben**;
externe Signale über `docs/OFFPAGE-LOCAL-SEO-PLAN.md`.

## Legacy-URLs → neue Ziele
Siehe `audit/legacy-urls.csv` und `audit/redirect-map.csv` (28 Weiterleitungen, 301, ohne Ketten;
keine pauschale Weiterleitung auf die Startseite). Weitere reale Alt-URLs sind nach Freischaltung
der Domain per Crawl zu ergänzen.
