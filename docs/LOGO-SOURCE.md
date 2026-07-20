# Logo-Quelle und -Aufbereitung

## Status: Original-Logo integriert ✅

Das echte Gorhau-Logo wurde bereitgestellt und eingebunden.

- **Quelle:** `incoming-assets/header_logo.png`
- **Original-Abmessungen:** 979 × 115 px (RGBA, transparenter Hintergrund)
- **Original unverändert gesichert:** `src/assets/brand/logo-original/header_logo.png`
- **Optimierte Fassungen:** `public/img/logo.png` / `logo.webp` (524 × 92) sowie responsive
  Varianten `logo-240`, `logo-480` (je PNG + WebP); optimierte Kopie in
  `src/assets/brand/logo-optimized/logo.png`.
- **Meta für die Komponente:** `public/img/logo-meta.json` (Maße + srcset) – die
  Logo-Komponente (`src/components/Logo.astro`) erkennt das echte Logo automatisch und
  verwendet **ausschließlich** dieses. Das frühere typografische Platzhalterlogo ist damit
  vollständig ersetzt (Platzhalter greift nur, falls die Datei fehlt – gegenseitig
  ausschließend, nie beide gleichzeitig).

## Technische Aufbereitung (ohne Änderung des Markendesigns)
Das Original-Banner (979 × 115) enthält rechts eine **separate Telefon-Schaltfläche**
(„Jederzeit erreichbar / 0931 61 00 00") mit einer **Spiegelung** – beides sind
Web-Widget-Bestandteile, **nicht** Teil der Wort-/Bildmarke. Über eine transparente Lücke
(Spalten 548–693) wurde **pixelgenau** auf die eigentliche Marke zugeschnitten:

- **BESTATTER-Emblem** (gotisches Fenster, „vom Handwerk geprüft")
- **»GORHAU«-Wortmarke** mit dem **Kreuz** als „A" und den **Pfeilen** » «
- Untertitel **„Inh. Thomas Gorhau E.K."**

Dabei wurden **keine** Buchstaben, Symbole, Kreuz, Pfeile, Farben oder Proportionen verändert –
es handelt sich um einen reinen Rasterzuschnitt (Entfernen von Nebenelementen), keine
Neusetzung und keine generische Ersatzmarke. Ergebnis: 524 × 92 px.

## Farbfassungen
`header_logo.png` ist die **Gold-Fassung** der Marke. Der Flyer 2009 zeigt dieselbe Marke in
**Bordeaux `#882020`**. Beide sind belegt; die Website nutzt die Gold-Fassung als Header-Logo
und Bordeaux als Primärfarbe (siehe `docs/BRAND-GUIDELINES.md`).

## Favicons / Open Graph
Favicons (ICO 16/32/48, Apple-Touch 180, Manifest 192/512/maskable) und das Open-Graph-Bild
werden per Ingest **aus dem echten Logo** erzeugt (Marke mittig auf Bordeaux-`#882020`-Kachel).

## Verbindliche Regeln (eingehalten)
- Kreuz, Pfeile, Wortmarke und Proportionen **unverändert**.
- Keine KI-Neuinterpretation, keine generische Ersatzmarke.
- Nur technische Optimierung (Zuschnitt der Nebenelemente, responsive Größen, WebP).

## Optional offen
- Eine sauber nachgezeichnete **SVG-Fassung** könnte zusätzlich erstellt werden. Da bereits eine
  hochwertige, transparente PNG/WebP-Fassung vorliegt und die Marke Rasterdetails (Emblem,
  Feinschrift) enthält, ist das für die aktuelle Darstellung nicht erforderlich.
