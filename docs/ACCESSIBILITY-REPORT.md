# Accessibility-Report – Bestattungen Gorhau

**Ziel:** WCAG 2.2 Level AA. Keine Accessibility-Overlays – Zugänglichkeit ist direkt in die
Website integriert.

## Automatisierte Tests (axe-core)
Getestet mit `@axe-core/playwright` im vorinstallierten Chromium über den gebauten `dist/`-Ordner
(`npm run test:a11y`). Regelsätze: `wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa`.

| Seite | Verstöße | kritisch | schwer |
|---|---|---|---|
| / | 0 | 0 | 0 |
| /im-trauerfall/ | 0 | 0 | 0 |
| /leistungen/ | 0 | 0 | 0 |
| /bestattungsarten/ | 0 | 0 | 0 |
| /bestattungsvorsorge/ | 0 | 0 | 0 |
| /abschiedsraum/ | 0 | 0 | 0 |
| /ueber-uns/ | 0 | 0 | 0 |
| /mediathek/ | 0 | 0 | 0 |
| /kontakt/ | 0 | 0 | 0 |
| /impressum/ | 0 | 0 | 0 |
| /datenschutz/ | 0 | 0 | 0 |
| /barrierefreiheit/ | 0 | 0 | 0 |

**Ergebnis: 0 kritische, 0 schwere Verstöße.** (Erst-Lauf zeigte 9 color-contrast-Verstöße –
alle behoben durch `--brand-gold-text` #7a5e1a für Gold-Text auf hellem Grund und Korrektur der
Button-Farbe in dunklen Sektionen.)

## Umgesetzte Maßnahmen
- Semantisches HTML5 mit Landmarks (`header`, `nav`, `main`, `footer`), `main#hauptinhalt`.
- „Zum Inhalt springen"-Skip-Link als erstes fokussierbares Element.
- Genau eine H1 pro Seite, logische Überschriftenhierarchie (per Audit geprüft).
- Vollständige Tastaturbedienung inkl. mobiler Navigation (`aria-expanded`, `aria-controls`,
  Escape schließt Menü und gibt Fokus zurück).
- Sichtbare Fokusmarkierungen (`:focus-visible`, 3 px Outline), nicht durch Sticky-Header verdeckt.
- Farbkontraste ≥ AA; Information nie allein über Farbe.
- Skalierbarer Text (rem/clamp), nutzbar bis ≥ 200 % Zoom, Reflow in schmaler Ansicht.
- Große Touchflächen (Buttons min. 48 px, mobile Kontaktleiste 52 px).
- `aria-current="page"` für aktive Navigations- und Breadcrumb-Einträge.
- `prefers-reduced-motion`: Animationen/Transitions werden reduziert; `scroll-behavior` auf auto.
- Keine Autoplay-Medien, kein automatischer Ton, keine blinkenden Elemente.
- Dekorative Grafiken rein per CSS (kein Alt-Text nötig); informative Bilder erhalten Alt-Texte,
  sobald die Originaldateien vorliegen.
- Kein Text-als-Bild außer dem geschützten Logo.

## Manuelle Prüfungen
- Tastatur-Only-Bedienung (Tab-Reihenfolge, Fokus, Menü, Escape): bestanden.
- 200 %-Zoom / schmale Ansicht (Reflow): kein Inhaltsverlust.
- Kontrast (axe + manuell): bestanden.
- Fokusreihenfolge logisch: bestanden.
- Screenshots Desktop + Mobil unter `audit/screenshots/`.

## Bekannte, dokumentierte Einschränkungen
1. **Medien-Transkripte/Untertitel:** Die Original-Videos (FLV) und -Audios liegen auf der
   gesperrten Quelldomain und konnten nicht heruntergeladen werden (HTTP 403). Daher konnte
   **keine Transkription** (Whisper o. ä.) erstellt werden. Die Mediathek beschreibt die Inhalte
   textlich und weist die fehlende Einbindung aus. Geplanter Weg nach Bereitstellung der
   Originaldateien: FLV → MP4 (H.264/AAC) + WebM, Audio → MP3/OGG; je Medium Vorschaubild,
   HTML5-Player ohne Autoplay mit zugänglichen Controls, **Untertitel (VTT) und Volltext-
   Transkript**, `VideoObject`/`AudioObject`-JSON-LD.
2. **Bildergalerien:** informative Fotos werden mit beschreibenden Alt-Texten und – bei
   historischen Aufnahmen – mit Bildunterschrift und Jahr ergänzt, sobald die Originale vorliegen.

## Rechtliche Einordnung (BFSG)
Die Website ist ein reines **Informationsangebot** ohne Onlinebuchung, Checkout oder digitalen
Vertragsabschluss (siehe `/barrierefreiheit/`). Unabhängig von der gesetzlichen Einordnung wird
technisch nach WCAG 2.2 AA umgesetzt. Es wird **keine** pauschale BFSG-Konformität behauptet.
