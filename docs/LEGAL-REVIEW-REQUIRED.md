# Offene rechtliche Punkte vor der Live-Schaltung

Diese Datei sammelt die Angaben, die **nur der Auftraggeber verbindlich liefern kann**.
Sie wurden bewusst nicht erfunden und nicht geschätzt.

Wichtig zur Einordnung: Diese Website ist nach aktuellem Stand datensparsam umgesetzt
(siehe „Technischer Stand" unten). Das ist keine Zusage von Rechtssicherheit und ersetzt
keine anwaltliche Prüfung. Die folgenden Punkte sind vor der Veröffentlichung unter der
Domain zu klären.

Die Datenschutzerklärung verweist an einer Stelle ausdrücklich auf dieses Dokument
(Abschnitt „Hosting und Server-Logfiles").

---

## 1. Hosting: fehlt vollständig

Die Datenschutzerklärung nennt derzeit keinen konkreten Hoster, weil er nicht feststeht.

Zu ergänzen, sobald der Hostingvertrag steht:

- Name und vollständige Anschrift des Hosting-Anbieters
- Bestätigung, dass ein **Auftragsverarbeitungsvertrag** nach Art. 28 DSGVO vorliegt
- Serverstandort; bei Verarbeitung außerhalb der EU zusätzlich die Rechtsgrundlage für
  den Drittlandtransfer
- tatsächliche **Speicherdauer der Server-Logfiles** und ob die IP-Adresse dort gekürzt
  gespeichert wird. Der aktuelle Text sagt „nach kurzer Zeit gelöscht" und „anonymisiert
  bzw. gekürzt". Beides muss zur realen Konfiguration des Hosters passen, sonst ist die
  Erklärung falsch.

## 2. Impressum: zu bestätigende Angaben

Die folgenden Angaben stehen bereits im Impressum, stammen aber aus den übernommenen
Bestandsunterlagen und sind **vom Auftraggeber gegenzuprüfen**:

| Angabe | aktueller Stand | zu tun |
|---|---|---|
| Firmierung | Bestattungs- und Überführungsinstitut Gorhau, Inh. Thomas Gorhau e.K. | Schreibweise mit Handelsregisterauszug abgleichen |
| Registergericht | Amtsgericht Würzburg | bestätigen |
| Registernummer | HRA 3873 | bestätigen |
| Vertretungsberechtigter | Thomas Gorhau | bestätigen |
| Inhaltlich Verantwortlicher (§ 18 Abs. 2 MStV) | Thomas Gorhau | bestätigen |

Noch **offen**:

- **Umsatzsteuer-Identifikationsnummer** nach § 27a UStG. Im Impressum steht derzeit nur
  ein Hinweis, dass sie ergänzt wird. Entweder die echte Nummer nachtragen oder bestätigen,
  dass keine vorhanden ist. Dann sollte der Platzhaltersatz entfallen.
- **Berufshaftpflichtversicherung**: Für Dienstleister verlangt die DL-InfoV Angaben zu
  Name und Anschrift des Versicherers sowie zum räumlichen Geltungsbereich. Bitte klären,
  ob das hier einschlägig ist, und die Daten liefern.
- **Berufsrechtliche Angaben**: Falls eine Meisterqualifikation, eine Eintragung bei der
  Handwerkskammer oder eine Mitgliedschaft in einem Bestatterverband geführt wird und im
  Impressum genannt werden soll, bitte die genaue Bezeichnung und die zuständige Kammer
  angeben. Bisher steht dazu nichts auf der Website, und es wurde nichts angenommen.

## 3. § 25 TDDDG: derzeit nicht einschlägig

Ein Einwilligungsbanner ist nach aktuellem Stand **nicht erforderlich**, weil die Website
keinerlei Informationen im Endgerät speichert oder ausliest:

- keine Cookies
- kein `localStorage`, `sessionStorage` oder IndexedDB
- kein JavaScript im Produktionsbuild (0 Skriptdateien)
- keine automatisch geladenen Inhalte Dritter

Das gilt nur so lange, wie das so bleibt. Sobald ein Kartendienst, ein eingebettetes
Video eines Drittanbieters, ein Chat, ein Analysewerkzeug oder ein Schriftarten-CDN
hinzukommt, ist § 25 TDDDG neu zu bewerten und in der Regel eine vorherige Einwilligung
nötig.

## 4. Barrierefreiheit (BFSG)

Die Website ist derzeit eine reine Informationsseite ohne Onlineshop, ohne Buchung, ohne
Vertragsabschluss und ohne Kontaktformular. Ob das Barrierefreiheitsstärkungsgesetz
greift, hängt an den tatsächlich angebotenen elektronischen Geschäftsfunktionen und an
der Unternehmensgröße (Kleinstunternehmen-Ausnahme). Das ist eine Frage an den
Auftraggeber und gegebenenfalls an die Rechtsberatung.

Unabhängig davon wird **WCAG 2.2 AA angestrebt und technisch umgesetzt**, ohne
Accessibility-Overlay. Der aktuelle Prüfstand steht in `audit/` und auf der Seite
„Barrierefreiheit".

## 5. Bildrechte

- **Echte Unternehmensbilder** stammen aus dem Medienpaket des Auftraggebers. Für Fotos
  mit erkennbaren Personen ist die Einwilligung der Abgebildeten erforderlich. Offene
  Punkte dazu stehen in `docs/IMAGE-SOURCE-AND-LICENSES.md` und
  `audit/unsplash-image-inventory.md`. Insbesondere: das Porträt des Inhabers, der
  Flyer 2009 mit abgebildeten Personen sowie historische Aufnahmen mit Familienmitgliedern.
- **Allgemeine Stockmotive** stehen unter der Unsplash-Lizenz. Auswahl und Freigabe
  erfolgten durch den Auftraggeber. Die Herkunft ist in
  `docs/IMAGE-SOURCE-AND-LICENSES.md` dokumentiert. Bei fünf Motiven lag der
  Originaldateiname nicht mehr vor; dort ist die Quelle als vom Auftraggeber
  bereitgestellt gekennzeichnet und wurde **nicht** rekonstruiert.

## 6. Inhaltliche Aussagen

Auf der Website stehen bewusst **keine** Preise, keine Kundenstimmen, keine Bewertungen
und keine Auszeichnungen, weil dafür keine belastbaren Angaben vorliegen. Falls solche
Inhalte gewünscht sind, müssen sie belegbar sein.

---

## Technischer Stand (Grundlage der Datenschutzerklärung)

Automatisch überprüfbar mit `npm run build` und anschließender Kontrolle des `dist/`-Ordners:

| Merkmal | Stand |
|---|---|
| JavaScript im Produktionsbuild | 0 Dateien |
| Cookies / Storage-Zugriff | keiner |
| Schriften | lokal unter `public/fonts/`, keine Fremdserver |
| Bilder und Medien | lokal, keine Hotlinks |
| Externe Einbettungen | keine |
| Links zu Dritten | nur anklickbare Links zu OpenStreetMap und Google Maps, nichts lädt automatisch |
| Kontaktformular | keines |
