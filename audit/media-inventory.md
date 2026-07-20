# Medien-Inventar

## Bereits integriert (aus incoming-assets/)
| Medium | Quelle | Status |
|---|---|---|
| **Original-Logo** | `incoming-assets/header_logo.png` (979×115) | ✅ integriert: auf Marke zugeschnitten (524×92), Header-Logo, Favicons & OG daraus erzeugt. Siehe `docs/LOGO-SOURCE.md`. |
| **Flyer/Anzeige 2009** | `incoming-assets/flyer_2009.jpg` (1200×865) | ✅ integriert: AVIF/WebP/JPG, eingebunden auf `/mediathek/` mit Alt-Text + Bildunterschrift, als historisches Material 2009 gekennzeichnet. |

## Noch ausstehend

## Wichtiger technischer Hinweis
Die bestehende Website (`https://www.gorhau-bestattungen.de/`) ist in dieser Build-Umgebung
durch die **Egress-Netzwerk-Policy gesperrt**. Sämtliche Abrufe (curl, wget, Fetch-Dienst,
mehrere User-Agents/Referer) wurden mit **HTTP 403 (CONNECT tunnel failed / Forbidden)**
abgewiesen. Ein Crawl und ein Download der Originalmedien waren daher **nicht möglich**. Die
folgenden Einträge sind aus dem Auftrag bekannt und dokumentiert, damit die Verarbeitung nach
Bereitstellung der Dateien lückenlos erfolgen kann.

## Bekannte Originalmedien und geplante Verarbeitung

| Medium | Original-URL | Typ | Kontext | Geplante Verarbeitung |
|---|---|---|---|---|
| Logo | `/images/header_logo.png` | Bild | Marke | siehe `docs/LOGO-SOURCE.md`; optimiertes SVG/PNG |
| Gebäudepanorama | `/images/1_front.png` | Bild | historisch | AVIF/WebP, als historische Aufnahme kennzeichnen |
| Imagefilm | `/institut/mediathek/gorhau_imagefilm.flv` | Video | aktuell | FLV→MP4 (H.264/AAC)+WebM, Poster, VTT-Untertitel, Transkript, `VideoObject` |
| Imagespot 2010 | `/institut/mediathek/mz_imagespot_2010.flv` | Video | historisch | FLV→MP4+WebM, als Archiv kennzeichnen |
| Fernsehspot | `/institut/mediathek/mz_fernsehspot.flv` | Video | historisch | FLV→MP4+WebM, Archiv |
| Radiospot 2009 | `/institut/mediathek/radiospot_11_2009.flv` | Audio | historisch | →MP3/OGG, Transkript, `AudioObject` |
| Flyer 2012 | `/institut/mediathek/tagderoffenentuer2012.jpg` | Bild | historisch | AVIF/WebP, Bildunterschrift + Jahr |
| Anzeige 2009 | `/institut/mediathek/flyer_2009.jpg` | Bild | historisch | AVIF/WebP, Bildunterschrift + Jahr |
| Vorsorgebroschüre | `/vorsorge/GN750.pdf` | PDF | archiv | Inhalt auf Aktualität prüfen, ggf. ersetzen |
| Urnengarten | `/bestattungsarten/urnengarten.pdf` | PDF | archiv | Preise NICHT als aktuell übernehmen |

Diese Liste ist nicht vollständig; ein vollständiger Crawl ist nach Freischaltung der Domain
nachzuholen.

## Verarbeitungsvorgaben (nach Bereitstellung der Originale)
- **Immer zuerst** die unveränderte Originaldatei sichern (`archive/original-site/`).
- **Video:** FLV → MP4 (H.264/AAC), optional WebM; Poster/Vorschaubild; Dauer/Auflösung/Größe
  ermitteln (ffprobe); HTML5-`<video>` **ohne Autoplay**, mit Controls, Download-Fallback;
  Untertitel (VTT) + Transkript; `VideoObject`-JSON-LD.
- **Audio:** → MP3, optional OGG; kein Autoplay; Transkript; `AudioObject`.
- **Bilder:** AVIF + WebP mit JPG/PNG-Fallback; `width`/`height`, `srcset`/`sizes`, Lazy-Loading;
  Alt-Texte, historische Bilder mit Bildunterschrift und Jahr.
- **Kein Flash**, keine externen Player, selbst gehostet.
- **Transkription:** Whisper o. ä. war mangels Originaldateien nicht durchführbar (dokumentiert
  in `docs/ACCESSIBILITY-REPORT.md`).

## Neu erstellte Assets (im Projekt vorhanden)
Favicons (ICO/SVG/PNG), Apple-Touch-Icon, Manifest-Icons (192/512/maskable), Open-Graph-
Standardbild (`/img/og-default.svg`).
