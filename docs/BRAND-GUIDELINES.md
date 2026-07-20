# Brand Guidelines – Bestattungen Gorhau

Modernisierung, kein Rebranding. Die bestehende Markenidentität (Bordeaux, Gold, Creme,
familiengeführter Charakter, Philosophie „Zuhören – Beraten – Begleiten") bleibt erhalten.

## Farbpalette (Design-Tokens)

Die Palette wurde aus den **tatsächlichen Originaldateien** extrahiert: dem Original-Logo
(`incoming-assets/header_logo.png`) und dem Flyer 2009 (`incoming-assets/flyer_2009.jpg`).
Rohwerte: `docs/BRAND-COLORS-EXTRACTED.md`. Definiert in `src/styles/tokens.css`.

| Token | Hex | Herkunft / Verwendung |
|---|---|---|
| `--brand-bordeaux` | `#882020` | »GORHAU«-Wortmarke & Headline im Flyer → Primärfarbe, Buttons, Links |
| `--brand-bordeaux-dark` | `#6e1a1a` | Überschriften, Hover (abgedunkelt aus #882020) |
| `--brand-red` | `#a02828` | wärmerer Rotakzent |
| `--brand-gold` | `#b8933d` | Gold-Treatment des Logos (header_logo.png), dekorativer Akzent |
| `--brand-gold-dark` | `#8c6d28` | Gold-Button, kräftigerer Akzent |
| `--brand-gold-text` | `#7a5e1a` | Gold **für Text** auf hellen Flächen (AA-konform) |
| `--brand-cream` | `#f7ece9` | warmes Creme (Flyer-Papier ≈ #f0e0e0, für Flächen aufgehellt) |
| `--brand-beige` | `#ecdcd6` | ruhige Sekundärfläche für Abschnitte |
| `--brand-white` | `#ffffff` | Karten, Flächen |
| `--brand-charcoal` | `#2a2420` | Fließtext (warmes Schwarz) |
| `--text-primary` | `#2a2420` | Fließtext |
| `--text-muted` | `#5c544c` | Sekundärtext |
| `--border-subtle` | `#e6d7d1` | Rahmen, Trennlinien |
| `--focus-color` | `#882020` | Fokusrahmen |
| `--surface-dark` | `#3a1e20` | dunkle Flächen (Footer, CTA), bordeaux-getönt |
| `--success` | `#2e6e4e` | Erfolg |
| `--warning` | `#8a5a0f` | Warnung |
| `--error` | `#a32330` | Fehler |

### Wichtige Erkenntnis: zwei Farb-Treatments derselben Marke
Die Marke existiert in **zwei Farbfassungen**, die beide aus den Originaldateien belegt sind:
- **Bordeaux/Rot `#882020`** – die »GORHAU«-Wortmarke und die Headline im Flyer 2009 (Druck).
- **Gold `#b8933d`** – die Fassung in `header_logo.png` (Web-Header).

Kreuz, Pfeile (» «), Wortmarke und das BESTATTER-Emblem sind in beiden identisch. Die Website
nutzt **beides** markengerecht: die **Gold-Fassung als echtes Logo im Header** (unverändert, siehe
`docs/LOGO-SOURCE.md`) und **Bordeaux `#882020` als Primärfarbe** für Überschriften, Buttons und
Links – exakt wie im Original-Flyer. Creme/Beige entsprechen dem warmen Flyer-Papier.

### Kontrast-Anpassungen (WCAG 2.2 AA)
Alle Kombinationen wurden nachgerechnet und mit axe-core geprüft (0 Verstöße):
Bordeaux `#882020` auf Creme 7,97:1 · auf Weiß 9,23:1 · Weiß auf Bordeaux-Button 9,23:1 ·
Gold-Text `#7a5e1a` auf Beige 4,58:1 · Charcoal auf Creme 13,2:1. Reines Gold `#b8933d` wird
für Text auf Hell nicht verwendet (nur dekorativ / im Logo).

## Kontraste (WCAG 2.2 AA)
Alle Text-/Hintergrund-Kombinationen der Website wurden mit axe-core geprüft: **0 Verstöße**.
Kritische Paare:
- Bordeaux `#6b1f2a` auf Weiß/Creme: ≥ 8:1
- Charcoal `#2a2420` auf Creme `#fbf7f0`: ≥ 13:1
- Gold-Text `#7a5e1a` auf Beige `#efe6d6`: 4.93:1 (AA)
- Weiß auf Gold-Button `#8c6d28`: 4.65:1 (AA)

Gold `#b8933d` ist **nicht** für kleinen Text auf hellem Grund geeignet und wird dort nur
dekorativ (Linien, Symbole) oder als Textfarbe auf dunklen Flächen eingesetzt.

## Typografie
- **Überschriften:** Serifenschrift über System-Font-Stack (Iowan Old Style / Palatino /
  Georgia). Ruhig, seriös, mit Charakter.
- **Fließtext:** System-Sans (system-ui / Segoe UI / Roboto). Sehr gut lesbar.
- **Maximal zwei Schriftfamilien.** Keine Schreibschrift für Fließtext, keine extrem dünnen
  Stärken.
- **Warum System-Fonts:** Externe Google Fonts sind aus Datenschutzgründen ausgeschlossen und
  Font-CDNs sind in dieser Umgebung nicht erreichbar. System-Font-Stacks liefern hochwertige
  Typografie **ohne Netzwerk-Request, ohne CLS und ohne Datenschutzproblem**. Möchte man später
  eine lizenzfreie Webschrift (z. B. eine Open-Source-Serifen­schrift) lokal hosten, kann sie
  in `--font-heading` ergänzt und unter `public/fonts/` mit Lizenzdatei abgelegt werden.

## Logo
Siehe `docs/LOGO-SOURCE.md`. Das Original-Logo (Kreuz, Pfeile, Wortmarke) wird **nicht
gestalterisch verändert**. Derzeit ist eine zurückhaltende typografische Platzhalter-Wortmarke
(`src/components/Logo.astro`) im Einsatz, bis die Originaldatei vorliegt.

## Designprinzipien
- Großzügige Weißräume; Bordeaux und Gold als Akzent, nicht flächendeckend.
- Creme-/Beigeflächen für längere Inhalte.
- Ruhig, würdevoll, warm, regional – kein schwarzes Luxus-Bestatter-Template.
- Keine grellen Farben, keine dramatischen Animationen, keine kitschigen Trauerbilder,
  keine Autoplay-Medien.
- `prefers-reduced-motion` wird respektiert.
