# Brand Guidelines – Bestattungen Gorhau

Modernisierung, kein Rebranding. Die bestehende Markenidentität (Bordeaux, Gold, Creme,
familiengeführter Charakter, Philosophie „Zuhören – Beraten – Begleiten") bleibt erhalten.

## Farbpalette (Design-Tokens)

Die Palette wurde aus der bekannten Markenidentität (Bordeaux-/Rot-/Gold-/Creme-/Beige-Töne)
abgeleitet und zu einer konsistenten, WCAG-2.2-AA-tauglichen Palette vereinheitlicht.
Definiert in `src/styles/tokens.css`.

| Token | Hex | Verwendung |
|---|---|---|
| `--brand-bordeaux` | `#6b1f2a` | Primärfarbe, Buttons, Links, Akzent |
| `--brand-bordeaux-dark` | `#521720` | Überschriften, Hover |
| `--brand-red` | `#8b2332` | wärmerer Rotakzent, Hover |
| `--brand-gold` | `#b8933d` | dekorativer Goldakzent (Linien, auf Dunkelflächen) |
| `--brand-gold-dark` | `#8c6d28` | Gold-Button, kräftigerer Akzent |
| `--brand-gold-text` | `#7a5e1a` | Gold **für Text** auf hellen Flächen (AA-konform) |
| `--brand-cream` | `#fbf7f0` | Haupt-Hintergrundfläche |
| `--brand-beige` | `#efe6d6` | ruhige Sekundärfläche für Abschnitte |
| `--brand-white` | `#ffffff` | Karten, Flächen |
| `--brand-charcoal` | `#2a2420` | Fließtext (warmes Schwarz) |
| `--text-primary` | `#2a2420` | Fließtext |
| `--text-muted` | `#5c544c` | Sekundärtext |
| `--border-subtle` | `#e3d9c8` | Rahmen, Trennlinien |
| `--focus-color` | `#6b1f2a` | Fokusrahmen |
| `--success` | `#2e6e4e` | Erfolg |
| `--warning` | `#8a5a0f` | Warnung |
| `--error` | `#a32330` | Fehler |

### Hinweis zur Farbherleitung
Die Originaldateien (CSS, `header_logo.png`, Flyer) der bestehenden Website konnten in dieser
Umgebung **nicht heruntergeladen werden** (die Quelldomain ist durch die Netzwerk-Policy
gesperrt, alle Direktabrufe → HTTP 403). Die Werte sind daher aus der dokumentierten
Markenbeschreibung rekonstruiert und zu einer in sich stimmigen, eindeutig als „Gorhau"
erkennbaren Palette vereinheitlicht. Sobald die Originaldateien vorliegen, sollten die exakten
Hex-Werte gegengeprüft und – falls nötig – minimal angepasst werden. Die Kontraste bleiben
dabei einzuhalten.

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
