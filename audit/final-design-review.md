# Finaler Design-Review

> Stand nach dem UX- und Struktur-Rework: 24 indexierbare Seiten wurden auf 14
> zusammengelegt. Details siehe Abschnitt „Struktur" am Ende.

Stand nach dem Master-Design-Rework. Alle Werte stammen aus messenden Skripten, nicht
aus Schätzung. Reproduzierbar mit:

```
npm run build
npm run test:colour     # Farbgewichtung
npm run test:copy       # redaktionelle Vorgaben
npm run test:seo        # SEO und GEO
npm run test:a11y       # Barrierefreiheit
npm run test:links      # interne Links
node tests/perf.mjs     # LCP, CLS, Seitengewicht
```

## Vorbemerkung zum Bildpaket

Der Auftrag nennt „zahlreiche neue Bilder" als Kandidatenpool. **Diese Bilder sind nicht
angekommen** (Details in `audit/image-curation.md`). Der gesamte Bildteil des Auftrags
konnte daher nur am vorhandenen Bestand ausgeführt werden. Alles Übrige, also Typografie,
Farbe, Text, Abstände, CTA, Interaktion, SEO, GEO, Barrierefreiheit und Recht, wurde
vollständig umgesetzt.

## Referenzprinzipien

Die 29 genannten Referenzseiten waren aus dieser Umgebung nicht erreichbar; der
Egress-Proxy blockt ausgehende Verbindungen (HTTP 000). Gearbeitet wurde deshalb mit den
Prinzipien, die im Auftrag selbst je Referenz benannt sind. Übernommen wurde:

| Prinzip | Herkunft laut Auftrag | Umsetzung bei Gorhau |
|---|---|---|
| Bild direkt im Einstieg, kurze Vertrauenspunkte | Hörakustik Glas | Hero mit echtem Würzburg-Motiv, darunter vier knappe Einstiege |
| Starke Bildwirkung, schneller Einstieg in Leistungsbereiche | Fahrschule Undheim | Hero über volle Spaltenbreite, direkt danach die Orientierungskacheln |
| Hochwertiges Hero, saubere echte Unterseiten | Dentech | 14 eigenständige Seiten mit eigener H1, eigenem Title und eigener Description |
| Kategorien direkt sichtbar, angenehme Bild-Text-Abwechslung | Küchen Oase | Bestattungsarten als Bildauswahl, Wechsel aus Text, Bild, Fakten und Listen |
| Warmer menschlicher Einstieg, zwei verständliche Handlungen | Martin Bayer | Genau zwei Aktionen im Hero: anrufen oder Vorsorge besprechen |
| Wenige starke Fakten, weniger Text | Julian Suppelt | Faktenleiste 1970/1980/2004/24-7, keine Textwände |
| Warme Bestattungsästhetik, natürliche Bildwelt | Lichtermeer | Sandtöne statt Rotstich, Naturmotive für allgemeine Themen |

Nicht übernommen wurden Texte, Bilder, Farben, Layouts, Icons, Quellcode und
Markenelemente. Gorhau bleibt eine eigene Marke.

## Farbgewichtung

Gemessen über acht repräsentative Seiten, Fotos ausgeblendet, damit die Gestaltung
gemessen wird und nicht der Bildinhalt.

| Kategorie | vorher | nachher | Ziel |
|---|---:|---:|---|
| Weiß und Creme | 74,2 % | 72,5 % | 60 bis 70 % |
| warmes Beige | 4,6 % | 18,0 % | 15 bis 20 % |
| Bordeaux | 0,7 % | 6,6 % | 8 bis 12 % |
| Gold | 0,2 % | 0,3 % | punktuell |

Nach dem Zusammenlegen der Seiten liegt Weiß wieder etwas über und Bordeaux etwas unter
dem Zielkorridor: Die Sammelseiten sind länger, dadurch wächst die weiße Lesefläche,
während das Bordeaux-Abschlussband gleich groß bleibt. Das ist bewusst nicht durch
zusätzliche farbige Kästen ausgeglichen worden, weil der Auftrag genau davor warnt.

Bemerkenswert: Die Ausgangslage war **nicht** zu rot, sondern zu weiß und zu kalt. Die
früheren Durchgänge hatten Bordeaux fast vollständig entfernt. Der Umbau ging daher in
die andere Richtung als die Auftragsformulierung nahelegt, aber genau in Richtung des
formulierten Ziels „warm, wohnlich, nicht steril":

- Creme und Beige wurden vom Rosastich (`#f7ece9`, `#ecdcd6`) auf warme Sandtöne
  (`#faf6f1`, `#efe4d8`) gedreht. Der Rotstich in den Flächen war der eigentliche Grund
  für die Weinrot-Wirkung.
- Footer und Abschlussband trugen ein fast schwarzes Braun (`#3a1e20`). Das wirkte schwer.
  Der Footer ist jetzt hell und warm, das Abschlussband trägt echtes Bordeaux.
- Bordeaux hat damit einen festen, begrenzten Platz: ein kompaktes Band je Seite und ein
  schmaler Streifen am Seitenfuß. Keine roten Flächen hinter langen Texten.


## Typografie

- Vorher: reine System-Font-Stacks. Auf jedem Betriebssystem eine andere Schrift, damit
  kein verlässliches Schriftbild.
- Jetzt: **Source Serif 4** für Überschriften, **Source Sans 3** für Fließtext, beide
  SIL Open Font License 1.1, selbst gehostet unter `public/fonts/`. Kein Google-Fonts-
  Request, kein CDN.
- Nur drei Schnitte je Familie, keine dünnen Schnitte, 87 KB gesamt.
- Die zwei im ersten Viewport benötigten Schnitte werden vorgeladen.
- Die `size-adjust`-Werte der Ersatzschriften sind **gemessen**, nicht geschätzt:
  Source Sans 3 ist 92,8 % so breit wie Arial, Source Serif 4 113,9 % so breit wie
  Georgia. Dadurch verschiebt der Schriftwechsel den Textumbruch kaum.
- Fließtext `line-height` 1,62, Überschriften 1,18 mit leicht negativer Laufweite.

## Redaktion

Gemessen am gebauten HTML über alle 14 indexierbaren Seiten:

| Prüfung | Ergebnis |
|---|---|
| Gedankenstriche im sichtbaren Text | 0 (vorher 107) |
| Werbefloskeln aus der Verbotsliste | 0 |
| Absätze über 90 Wörter | 0 |
| Intros außerhalb 30 bis 60 Wörter | 0 |

Die 107 Gedankenstriche wurden **einzeln gelesen und umformuliert**, nicht ersetzt. Je
nach Satzbau wurde daraus ein Punkt, ein Komma, ein Doppelpunkt oder ein neuer Satz.
Zeitspannen sind ausgeschrieben („08:00 bis 16:00 Uhr").

## CTA-Dichte

| Seitentyp | Buttons | Bewertung |
|---|---:|---|
| Startseite | 4 | zwei im Hero, zwei im Abschlussband |
| Themenseiten | 1 | ein zurückhaltender Abschluss-CTA |
| Rechtstexte | 0 | korrekt |

Vorher hatte die Startseite 7 Buttons. Drei mittig platzierte wurden zu Textlinks
abgestuft. Auf den Unterseiten ersetzt der dauerhaft sichtbare Telefon-Chip im Header den
sonst üblichen zweiten CTA oben.

## Interaktion

- Sehr zurückhaltendes Einblenden von Bildern beim Scrollen, rein per CSS über eine
  Scroll-Timeline, ohne JavaScript.
- Nur die Deckkraft ändert sich, dadurch kein Layout-Sprung.
- An `@supports` gebunden: Browser ohne Unterstützung zeigen die Bilder sofort. Es wird
  nie Inhalt versteckt.
- Bildunterschriften sind ausgenommen, damit Text nie mit reduziertem Kontrast steht.
- `prefers-reduced-motion` schaltet Animationen und weiches Scrollen global ab.

## Barrierefreiheit

- axe-core über alle 14 indexierbaren Seiten: **0 kritische, 0 schwere Verstöße**.
- Zwei Kontrastfehler, die durch das neue Bordeaux-Band entstanden waren, wurden behoben:
  Gold als Textfarbe erreichte dort nur 3,72:1. Buttons tragen dort jetzt helleres Gold
  bzw. eine Creme-Kontur.
- Skip-Link, `lang="de"`, sichtbarer Fokus, Touch-Targets mit 48 px Mindesthöhe.
- Kein Accessibility-Overlay.

## Performance

Lighthouse, Desktop-Preset, gegen den Produktionsbuild:

| Seite | Performance | Accessibility | Best Practices | SEO | LCP | CLS |
|---|---:|---:|---:|---:|---:|---:|
| `/` | 100 | 100 | 100 | 100 | 0,5 s | 0 |
| `/im-trauerfall/` | 100 | 100 | 100 | 100 | 0,4 s | 0 |
| `/bestattungsarten/` | 100 | 100 | 100 | 100 | 0,5 s | 0 |
| `/leistungen/` | 100 | 100 | 100 | 100 | 0,4 s | 0 |
| `/vorsorge/` | 100 | 100 | 100 | 100 | 0,4 s | 0 |
| `/kontakt/` | 100 | 100 | 100 | 100 | 0,5 s | 0 |

Alle Zielwerte des Auftrags erreicht: Performance mindestens 95, Accessibility 100,
Best Practices mindestens 95, SEO 100, CLS unter 0,1, LCP unter 2,5 Sekunden.

### Ein Layout-Sprung, der beim Messen auffiel

Nach dem Einbau der eigenen Schriften fiel die Startseite auf **CLS 0,235** und
Performance 88. Der Weg zur Ursache ist dokumentiert, weil er nicht offensichtlich war:

1. Lokal ohne Drosselung war CLS 0. Erst Lighthouse mit Drosselung zeigte den Sprung.
2. Lighthouse wies den Sprung dem Hero-Bild zu. Naheliegender Verdacht war der
   `object-fit`-Zuschnitt. Der wurde entfernt und das Bild direkt im Anzeigeverhältnis
   3:1 geschnitten. **Der Wert blieb exakt gleich.**
3. Genau gleichbleibende Werte über drei verschiedene Bildkonfigurationen hinweg wiesen
   darauf hin, dass nicht das Bild selbst die Ursache ist, sondern etwas darüber. Das war
   die H1: Sie brach mit Ersatzschrift und mit geladener Schrift unterschiedlich um und
   schob dadurch alles darunter.
4. Behoben mit `font-display: optional` statt `swap`. Zusammen mit dem Preload steht die
   Schrift praktisch immer rechtzeitig bereit; ist sie es einmal nicht, bleibt der Browser
   bei der Ersatzschrift, statt nachträglich umzubrechen.

Ergebnis: CLS 0, Performance 100. Der Zuschnitt im echten Anzeigeverhältnis wurde
beibehalten, weil er unabhängig davon Bandbreite spart.

## Bekannte Lücken

- **Imagefilm**: Es liegt keine Video- oder Audiodatei im Projekt. Das Modul bleibt
  ausgeblendet, statt einen leeren Player zu zeigen.
- **Drei Seiten ohne Bild**: Vorsorge, Benötigte Dokumente, Formalitäten. Es fehlen
  Dokument- und Papiermotive.
- **Beige leicht über Zielkorridor** (21,1 % statt maximal 20 %).

## Struktur nach dem UX-Rework

Von 24 auf **14 indexierbare Seiten**. Zusammengelegt wurde:

| aufgelöst | jetzt Teil von |
|---|---|
| `/bestattungsarten/erdbestattung/` | `/bestattungsarten/` (H2-Abschnitt) |
| `/bestattungsarten/feuerbestattung/` | `/bestattungsarten/` (H2-Abschnitt) |
| `/bestattungsarten/seebestattung/` | `/bestattungsarten/` (H2-Abschnitt) |
| `/bestattungsarten/anonyme-bestattung/` | `/bestattungsarten/` (H2-Abschnitt) |
| `/im-trauerfall/benoetigte-dokumente/` | `/im-trauerfall/` (Checkliste) |
| `/leistungen/formalitaeten/` | `/im-trauerfall/` und `/leistungen/` |
| `/leistungen/ueberfuehrungen/` | `/leistungen/` |
| `/leistungen/thanatopraxie/` | `/leistungen/` |
| `/leistungen/trauerfeier-und-trauerdruck/` | `/leistungen/` |
| `/ueber-uns/galerie/` | `/ueber-uns/` (Bildraster) |

Umbenannt zu kürzeren Adressen: `/bestattungsvorsorge/` zu `/vorsorge/`,
`/ueber-uns/historie/` zu `/historie/`, `/friedhoefe-in-wuerzburg/` zu `/friedhoefe/`.

Alle 13 alten Adressen sind in `.htaccess` und `public/_redirects` als 301 hinterlegt.
Bestehende Legacy-Regeln wurden mit angepasst, damit keine Weiterleitungsketten entstehen.
Geprüft: keine Kette, keine defekten internen Links.

## Entfernte künstliche Grafiken

- Die Motif-Illustrationen (gezeichnete Häuser, Dokumente, Urnen, Sprechblasen) sind von
  allen Seiten verschwunden, auf denen sie die visuelle Hauptrolle hatten.
- Die Icon-in-Kreis-Karten der Startseite sind durch ruhige Textkarten ersetzt
  (`QuickLink.astro`). Die Information funktioniert vollständig ohne Icons.
- Die dekorativen Icons in der Haltungs-Sektion sind entfallen.
- Geblieben ist ausschließlich funktionales Beiwerk: das Telefon-Icon im Kontakt-Chip.

Stattdessen im Einsatz: echte Gorhau-Aufnahmen (Fahrzeuge, Versorgungsraum, Erd- und
Feuerbestattung, anonyme Grabstätte, Galerie) sowie Checklisten und schlichte Listen.
