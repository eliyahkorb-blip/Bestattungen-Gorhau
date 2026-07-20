# incoming-assets/ – Ablage für Originaldateien

Legen Sie die Originaldateien der bestehenden Website hier ab. Nach dem Ablegen wird die
Verarbeitung mit **einem Befehl** ausgeführt:

```bash
npm run ingest        # bzw. python3 scripts/ingest-assets.py
npm run build
```

Der Ingest-Lauf ist **idempotent** und **überschreibt keine Originaldateien** – er sichert die
Originale unverändert in `archive/` und legt nur optimierte Ableitungen in `public/` an.

## Erwartete Struktur

```
incoming-assets/
├── header_logo.png            ← Original-Logo (Pflicht für Logo-Austausch)
├── flyer_2009.jpg             ← Anzeige/Flyer (für Logo-/Farbextraktion)
├── original-site.zip          ← komplette alte Website (wird nach archive/original-site/ entpackt)
├── images/                    ← Fotos: Haus, Räume, Abschiedsraum, Fahrzeuge, historisch …
├── media/                     ← Videos/Audios (u. a. gorhau_imagefilm.flv, mz_imagespot_2010.flv,
│                                 mz_fernsehspot.flv, radiospot_11_2009.flv)
└── documents/                 ← PDFs (Vorsorgebroschüre, Urnengarten …)
```

Sie müssen **nicht** alles auf einmal liefern. Der Ingest verarbeitet, was vorhanden ist, und
listet am Ende, was noch fehlt.

## Was der Ingest-Lauf tut
1. **original-site.zip** → entpackt nach `archive/original-site/` (ohne Überschreiben).
2. **Hash-Inventar** aller Dateien (SHA-256), Duplikaterkennung → `audit/asset-inventory.csv`,
   `audit/assets.json`.
3. **Logo:** `header_logo.png` → Original nach `src/assets/brand/logo-original/`, optimierte
   PNG-/WebP-Varianten + neues `public/img/logo.png`/`.webp`; Favicons und OG-Bild werden aus dem
   echten Logo neu erzeugt. Das Platzhalterlogo wird dann automatisch nicht mehr verwendet.
4. **Bilder** (`images/`) → AVIF + WebP + Fallback, mit Größen für `srcset`; Kategorisierung in
   `audit/image-classification.csv` zur redaktionellen Einbindung.
5. **Medien** (`media/`) → FLV→MP4 (H.264/AAC) + WebM (VP9/Opus), Audio→MP3/OGG, Poster-Frame,
   Dauer/Größe → `public/media/`; Metadaten → `audit/media-inventory-processed.csv`.
6. **Markenfarben** aus Logo/Flyer extrahiert → Vorschlag für `src/styles/tokens.css` in
   `docs/BRAND-COLORS-EXTRACTED.md`.

## Hinweise
- **Keine** erfundenen Fotos von Mitarbeitenden, Räumen oder Fahrzeugen – nur echte Originale.
- Historische Aufnahmen werden als solche gekennzeichnet (Jahr + Bildunterschrift).
- Transkripte/Untertitel für Videos/Audios werden erstellt, soweit zuverlässig möglich; sonst
  wird die Lücke in `docs/ACCESSIBILITY-REPORT.md` dokumentiert.
