# Vor Live-Schaltung zu bestätigende Angaben

Diese Liste enthält **ausschließlich konkrete Felder**, die vom Unternehmen bestätigt oder
ergänzt werden müssen. Es handelt sich nicht um einen pauschalen „Bitte alles anwaltlich prüfen"-
Hinweis.

## 1. Impressum

| Feld | Aktueller Stand im Code | Zu tun |
|---|---|---|
| Registergericht | „Amtsgericht Würzburg" (aus öffentlichen Verzeichnissen) | Gegen aktuellen Handelsregisterauszug bestätigen. |
| Registernummer | „HRA 3873" (aus öffentlichen Verzeichnissen) | Bestätigen. HRA ist für e.K. korrekt; Nummer verifizieren. |
| Umsatzsteuer-ID (§ 27a UStG) | **nicht angegeben** (kein Fantasiewert) | Tatsächliche USt-IdNr. eintragen oder Abschnitt entfernen, falls keine vorhanden. |
| Inhaber-/Vertretungsname | „Thomas Gorhau" | Bestätigen. |

Die entsprechenden Stellen sind in `src/pages/impressum.astro` mit nicht sichtbaren
HTML-Kommentaren „HINWEIS ZUR PRÜFUNG" markiert. Im **sichtbaren** Impressum steht keine
irreführende Fantasieangabe.

## 2. Datenschutzerklärung

| Feld | Aktueller Stand | Zu tun |
|---|---|---|
| Hosting-Anbieter | Platzhalter-Hinweis (Name/Anschrift offen) | Tatsächlichen Hoster (z. B. Hostinger, Netlify, Vercel) mit Anschrift eintragen; AV-Vertrag bestätigen. |
| Server-Logfiles | allgemein beschrieben | An die konkrete Log-Praxis des gewählten Hosters anpassen. |

Markiert in `src/pages/datenschutz.astro` (Abschnitt „Hosting und Server-Logfiles").

## 3. Kontaktdaten (NAP) – zur Bestätigung
- E-Mail: `gorhau-bestattungen@t-online.de` (aus Auftrag). Ein Branchenverzeichnis nennt
  abweichend `info@gorhau-bestattungen.de` → **welche Adresse ist die offizielle?**
- Telefon `0931 61 00 00`, Fax `0931 6 56 57` – bestätigen.
- Öffnungszeiten Mo–Fr 08:00–16:00 – bestätigen.

## 4. Geokoordinaten
`49.7691, 9.9469` – vor Nutzung in Kartendiensten final gegen die exakte Hausadresse prüfen.

## 5. Fachliche Angaben (inhaltlich zu bestätigen)
- Qualifikationen wie „Bestattermeister" / „geprüfter Thanatopraktiker": nur nennen, wenn
  weiterhin zutreffend. Derzeit allgemein als „fachliche Qualifikation" formuliert, ohne
  konkrete unbestätigte Titel.
- Thanatopraxie / nationale und internationale Überführungen: als Leistung dargestellt –
  bestätigen, dass diese weiterhin angeboten werden.

## 6. Medien & Bilder
- Original-Logo, Fotos, Videos und Audios bereitstellen (siehe `docs/LOGO-SOURCE.md`,
  `audit/media-inventory.md`). Bis dahin Platzhalter-/Beschreibungszustände in Galerie und
  Mediathek.
