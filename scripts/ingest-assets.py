#!/usr/bin/env python3
"""
Asset-Ingestion für den Gorhau-Relaunch.

Verarbeitet die in incoming-assets/ bereitgestellten Originaldateien:
  1. original-site.zip -> archive/original-site/ (ohne Überschreiben)
  2. SHA-256-Hash-Inventar + Duplikaterkennung
  3. Logo-Integration (header_logo.png -> optimiert, Favicons/OG neu)
  4. Bilder -> AVIF + WebP + Fallback (+ Klassifizierung)
  5. Medien -> MP4/WebM bzw. MP3/OGG (statisches ffmpeg), Poster, Dauer
  6. Markenfarben aus Logo/Flyer extrahieren

Idempotent und sicher: Originale werden nie überschrieben. Fehlende Dateien werden am Ende
aufgelistet, kein Abbruch. Erfindet keine Inhalte.
"""
from __future__ import annotations
import csv
import hashlib
import json
import os
import shutil
import subprocess
import sys
import zipfile
from collections import Counter
from pathlib import Path

ROOT = Path(os.environ.get("GORHAU_ROOT", Path(__file__).resolve().parent.parent))
INCOMING = ROOT / "incoming-assets"
ARCHIVE = ROOT / "archive" / "original-site"
AUDIT = ROOT / "audit"
PUBLIC = ROOT / "public"
BRAND_ORIG = ROOT / "src" / "assets" / "brand" / "logo-original"
BRAND_OPT = ROOT / "src" / "assets" / "brand" / "logo-optimized"

# Aus Original-Logo/Flyer 2009 extrahierte Markenfarben (siehe docs/BRAND-GUIDELINES.md)
BORDEAUX = (136, 32, 32)  # #882020
GOLD = (184, 147, 61)  # #b8933d
CREAM = (247, 236, 233)  # #f7ece9

missing: list[str] = []
did: list[str] = []


def log(msg: str) -> None:
    print(msg, flush=True)


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 16), b""):
            h.update(chunk)
    return h.hexdigest()


def ffmpeg_exe() -> str | None:
    try:
        import imageio_ffmpeg

        return imageio_ffmpeg.get_ffmpeg_exe()
    except Exception:
        return shutil.which("ffmpeg")


# ---------------------------------------------------------------- Stage 1: ZIP
def stage_zip() -> None:
    z = INCOMING / "original-site.zip"
    if not z.exists():
        missing.append("incoming-assets/original-site.zip (komplette Alt-Website)")
        return
    ARCHIVE.mkdir(parents=True, exist_ok=True)
    extracted = 0
    with zipfile.ZipFile(z) as zf:
        for name in zf.namelist():
            if name.endswith("/"):
                continue
            # Zip-Slip-Schutz
            target = (ARCHIVE / name).resolve()
            if not str(target).startswith(str(ARCHIVE.resolve())):
                continue
            if target.exists():  # Originale nie überschreiben
                continue
            target.parent.mkdir(parents=True, exist_ok=True)
            with zf.open(name) as src, open(target, "wb") as out:
                shutil.copyfileobj(src, out)
            extracted += 1
    did.append(f"original-site.zip entpackt ({extracted} neue Dateien) -> archive/original-site/")


# ------------------------------------------------------------ Stage 2: Inventar
def iter_files(base: Path):
    for p in base.rglob("*"):
        if p.is_file() and p.name != ".gitkeep":
            yield p


def stage_inventory() -> None:
    rows = []
    seen: dict[str, str] = {}
    bases = [b for b in (INCOMING, ARCHIVE) if b.exists()]
    for base in bases:
        for p in iter_files(base):
            digest = sha256(p)
            dup = seen.get(digest, "")
            if not dup:
                seen[digest] = str(p.relative_to(ROOT))
            rows.append(
                {
                    "path": str(p.relative_to(ROOT)),
                    "size": p.stat().st_size,
                    "sha256": digest,
                    "duplicate_of": dup,
                    "ext": p.suffix.lower().lstrip("."),
                }
            )
    AUDIT.mkdir(parents=True, exist_ok=True)
    with open(AUDIT / "ingest-inventory.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["path", "size", "sha256", "duplicate_of", "ext"])
        w.writeheader()
        w.writerows(rows)
    (AUDIT / "ingest-inventory.json").write_text(
        json.dumps(rows, indent=2, ensure_ascii=False), encoding="utf-8"
    )
    dups = sum(1 for r in rows if r["duplicate_of"])
    kinds = Counter(r["ext"] for r in rows)
    if rows:
        did.append(
            f"Inventar: {len(rows)} Dateien, {dups} Duplikate. Typen: "
            + ", ".join(f"{k}:{v}" for k, v in sorted(kinds.items()))
        )
    else:
        log("  (keine Dateien für das Inventar gefunden)")


# ---------------------------------------------------------------- Stage 3: Logo
def find_logo() -> Path | None:
    cand = INCOMING / "header_logo.png"
    if cand.exists():
        return cand
    # Fallback: erstes plausibles Logo-Bild
    for p in list(iter_files(INCOMING)):
        if "logo" in p.name.lower() and p.suffix.lower() in (".png", ".svg"):
            return p
    return None


def stage_logo() -> None:
    from PIL import Image

    logo = find_logo()
    if not logo:
        missing.append("incoming-assets/header_logo.png (Original-Logo)")
        return
    BRAND_ORIG.mkdir(parents=True, exist_ok=True)
    BRAND_OPT.mkdir(parents=True, exist_ok=True)
    (PUBLIC / "img").mkdir(parents=True, exist_ok=True)

    # Original unverändert sichern
    if not (BRAND_ORIG / logo.name).exists():
        shutil.copy2(logo, BRAND_ORIG / logo.name)

    if logo.suffix.lower() == ".svg":
        shutil.copy2(logo, PUBLIC / "img" / "logo.svg")
        did.append("SVG-Logo übernommen -> public/img/logo.svg")
        return

    img = Image.open(logo).convert("RGBA")
    img = _crop_brand_mark(img)
    w, h = img.size
    # optimierte, responsive Rasterfassungen – nur echte Breiten (keine Hochskalierung),
    # damit srcset-Deskriptoren exakt der tatsächlichen Bildbreite entsprechen.
    variant_widths = [vw for vw in (240, 480) if vw < w] + [w]
    srcset_png, srcset_webp = [], []
    for vw in variant_widths:
        if vw == w:
            out = img
            name = "logo"
        else:
            out = img.resize((vw, max(1, round(h * vw / w))), Image.LANCZOS)
            name = f"logo-{vw}"
        out.save(PUBLIC / "img" / f"{name}.png")
        out.save(PUBLIC / "img" / f"{name}.webp", quality=90, method=6)
        srcset_png.append(f"/img/{name}.png {vw}w")
        srcset_webp.append(f"/img/{name}.webp {vw}w")
    img.save(PUBLIC / "img" / "logo.png")
    img.save(PUBLIC / "img" / "logo.webp", quality=92, method=6)
    img.save(BRAND_OPT / "logo.png")
    # Meta-Datei für die Logo-Komponente (verzerrungsfreie Darstellung, kein CLS)
    (PUBLIC / "img" / "logo-meta.json").write_text(
        json.dumps({"present": True, "width": w, "height": h,
                    "src": "/img/logo.png", "webp": "/img/logo.webp",
                    "srcset": ", ".join(srcset_png),
                    "srcsetWebp": ", ".join(srcset_webp)},
                   ensure_ascii=False),
        encoding="utf-8",
    )
    did.append(f"Logo integriert (Marke {w}×{h}px) -> public/img/logo.png/.webp + responsive Größen")

    _favicons_from_logo(img)
    _og_from_logo(img)


def _crop_brand_mark(img):
    """Beschneidet das Header-Banner pixelgenau auf die eigentliche Wort-/Bildmarke.

    Das Original-Banner enthält rechts eine separate Telefon-Schaltfläche mit Spiegelung,
    die kein Bestandteil der Marke ist. Findet sich im rechten Bereich eine breite
    transparente Lücke, wird auf das linke Segment (Emblem + »GORHAU«-Wortmarke) zugeschnitten.
    Die Marke selbst (Kreuz, Pfeile, Buchstaben, Proportionen) bleibt unverändert –
    es werden nur Rand/Nebenelemente entfernt.
    """
    bbox = img.getbbox()
    if not bbox:
        return img
    img = img.crop(bbox)
    w, h = img.size
    px = img.load()
    # Opazität je Spalte
    col_op = [sum(1 for y in range(h) if px[x, y][3] > 30) for x in range(w)]
    # breite transparente Lücke suchen (mind. 60 px), die rechts ein Nebenelement abtrennt
    gap_start = None
    run = 0
    boundary = None
    for x in range(w):
        if col_op[x] == 0:
            if run == 0:
                gap_start = x
            run += 1
        else:
            if run >= 60 and gap_start is not None and gap_start > int(w * 0.4):
                boundary = gap_start
                break
            run = 0
    if boundary:
        img = img.crop((0, 0, boundary, h))
        # nach dem Zuschnitt erneut auf Inhalt trimmen
        b2 = img.getbbox()
        if b2:
            img = img.crop(b2)
    return img


def _rounded_tile(size: int, bg: tuple[int, int, int]):
    from PIL import Image, ImageDraw

    S = size * 4
    tile = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(tile)
    d.rounded_rectangle([0, 0, S - 1, S - 1], radius=int(S * 0.18), fill=bg + (255,))
    return tile, S


def _favicons_from_logo(logo_rgba) -> None:
    from PIL import Image

    # Logo (getrimmt) mittig auf Bordeaux-Kachel platzieren
    def compose(size: int):
        tile, S = _rounded_tile(size, BORDEAUX)
        lw, lh = logo_rgba.size
        scale = (S * 0.66) / max(lw, lh)
        lg = logo_rgba.resize((max(1, int(lw * scale)), max(1, int(lh * scale))), Image.LANCZOS)
        tile.alpha_composite(lg, ((S - lg.width) // 2, (S - lg.height) // 2))
        return tile.resize((size, size), Image.LANCZOS)

    ico = [compose(s) for s in (16, 32, 48)]
    ico[0].save(PUBLIC / "favicon.ico", sizes=[(s, s) for s in (16, 32, 48)], append_images=ico[1:])
    compose(180).save(PUBLIC / "apple-touch-icon.png")
    compose(192).save(PUBLIC / "img" / "icon-192.png")
    compose(512).save(PUBLIC / "img" / "icon-512.png")
    compose(512).save(PUBLIC / "img" / "icon-512-maskable.png")
    did.append("Favicons/Touch-/Manifest-Icons aus echtem Logo neu erzeugt")


def _og_from_logo(logo_rgba) -> None:
    from PIL import Image, ImageDraw

    W, H = 1200, 630
    og = Image.new("RGB", (W, H), CREAM)
    d = ImageDraw.Draw(og)
    d.rectangle([0, 0, W, 12], fill=BORDEAUX)
    d.rectangle([0, H - 12, W, H], fill=GOLD)
    lw, lh = logo_rgba.size
    scale = min((W * 0.5) / lw, (H * 0.4) / lh)
    lg = logo_rgba.resize((int(lw * scale), int(lh * scale)), Image.LANCZOS)
    og.paste(lg, (110, 120), lg)
    d.text((115, 360), "Zuhören · Beraten · Begleiten", fill=(42, 36, 32))
    d.text((115, 420), "Bestattungen Gorhau · Würzburg-Heidingsfeld · seit 1970", fill=(92, 84, 76))
    og.save(PUBLIC / "img" / "og-default.png")
    did.append("Open-Graph-Bild aus echtem Logo neu erzeugt -> public/img/og-default.png")


# -------------------------------------------------------------- Stage 4: Bilder
IMG_EXT = {".jpg", ".jpeg", ".png", ".tif", ".tiff", ".bmp", ".webp"}


def stage_images() -> None:
    from PIL import Image

    src_dir = INCOMING / "images"
    imgs = [p for p in iter_files(src_dir)] if src_dir.exists() else []
    # zusätzlich lose Bilder direkt in incoming-assets (z. B. flyer_2009.jpg)
    for p in INCOMING.glob("*"):
        if p.is_file() and p.suffix.lower() in IMG_EXT and "logo" not in p.name.lower():
            imgs.append(p)
    if not imgs:
        missing.append("incoming-assets/images/ (Fotos) – noch keine Bilder vorhanden")
        return
    out_dir = PUBLIC / "img" / "content"
    out_dir.mkdir(parents=True, exist_ok=True)
    rows = [["source", "slug", "width", "height", "avif", "webp", "fallback", "suggested_category"]]
    for p in imgs:
        try:
            im = Image.open(p).convert("RGB")
        except Exception as e:
            log(f"  ! Bild nicht lesbar: {p} ({e})")
            continue
        slug = p.stem.lower().replace(" ", "-")
        w, h = im.size
        base = out_dir / slug
        im.save(f"{base}.avif", quality=55)
        im.save(f"{base}.webp", quality=82, method=6)
        fallback = f"{base}.jpg"
        im.save(fallback, quality=85, progressive=True)
        cat = _guess_category(p.name)
        rows.append([str(p.relative_to(ROOT)), slug, w, h, f"{slug}.avif", f"{slug}.webp", f"{slug}.jpg", cat])
    with open(AUDIT / "image-classification.csv", "w", newline="", encoding="utf-8") as f:
        csv.writer(f).writerows(rows)
    did.append(
        f"{len(rows)-1} Bild(er) -> AVIF/WebP/JPG in public/img/content/ "
        f"(Klassifizierung: audit/image-classification.csv – redaktionell einzubinden)"
    )


def _guess_category(name: str) -> str:
    n = name.lower()
    for key, cat in [
        ("front", "geschaeftsraum/aussen"),
        ("haus", "geschaeftsraum/aussen"),
        ("abschied", "abschiedsraum"),
        ("raum", "geschaeftsraum"),
        ("fahrzeug", "fahrzeug"),
        ("auto", "fahrzeug"),
        ("team", "mitarbeiter"),
        ("mitarbeit", "mitarbeiter"),
        ("flyer", "dokument/flyer"),
        ("anzeige", "dokument/anzeige"),
        ("logo", "logo/marke"),
        ("historic", "historisch"),
        ("alt", "historisch"),
    ]:
        if key in n:
            return cat
    return "unbestimmt (bitte redaktionell einordnen)"


# --------------------------------------------------------------- Stage 5: Medien
def _duration(ff: str, path: Path) -> str:
    try:
        r = subprocess.run([ff, "-i", str(path)], capture_output=True, text=True)
        for line in r.stderr.splitlines():
            line = line.strip()
            if line.startswith("Duration:"):
                return line.split("Duration:")[1].split(",")[0].strip()
    except Exception:
        pass
    return ""


def stage_media() -> None:
    src_dir = INCOMING / "media"
    media = [p for p in iter_files(src_dir)] if src_dir.exists() else []
    if not media:
        missing.append("incoming-assets/media/ (Videos/Audios) – noch keine Medien vorhanden")
        return
    ff = ffmpeg_exe()
    if not ff:
        log("  ! Kein ffmpeg verfügbar – Medienkonvertierung übersprungen.")
        missing.append("ffmpeg mit H.264/AAC (z. B. `pip install imageio-ffmpeg`) für Medienkonvertierung")
        return
    out_dir = PUBLIC / "media"
    out_dir.mkdir(parents=True, exist_ok=True)
    (out_dir / "posters").mkdir(exist_ok=True)
    rows = [["source", "slug", "kind", "duration", "outputs", "poster", "size_bytes"]]
    vid_ext = {".flv", ".mp4", ".mov", ".avi", ".mkv", ".webm", ".m4v"}
    aud_ext = {".mp3", ".wav", ".ogg", ".aac", ".m4a", ".flac"}
    for p in media:
        slug = p.stem.lower().replace(" ", "-")
        dur = _duration(ff, p)
        ext = p.suffix.lower()
        outputs = []
        poster = ""
        if ext in vid_ext:
            mp4 = out_dir / f"{slug}.mp4"
            webm = out_dir / f"{slug}.webm"
            pos = out_dir / "posters" / f"{slug}.jpg"
            _run([ff, "-y", "-i", str(p), "-c:v", "libx264", "-preset", "medium", "-crf", "23",
                  "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", str(mp4)])
            _run([ff, "-y", "-i", str(p), "-c:v", "libvpx-vp9", "-crf", "34", "-b:v", "0",
                  "-c:a", "libopus", "-b:a", "128k", str(webm)])
            _run([ff, "-y", "-ss", "00:00:01", "-i", str(p), "-frames:v", "1", str(pos)])
            outputs = [x.name for x in (mp4, webm) if x.exists()]
            poster = pos.name if pos.exists() else ""
        elif ext in aud_ext:
            mp3 = out_dir / f"{slug}.mp3"
            ogg = out_dir / f"{slug}.ogg"
            _run([ff, "-y", "-i", str(p), "-c:a", "libmp3lame", "-q:a", "3", str(mp3)])
            _run([ff, "-y", "-i", str(p), "-c:a", "libvorbis", "-q:a", "4", str(ogg)])
            outputs = [x.name for x in (mp3, ogg) if x.exists()]
        else:
            continue
        total = sum((out_dir / o).stat().st_size for o in outputs if (out_dir / o).exists())
        rows.append([str(p.relative_to(ROOT)), slug, "video" if ext in vid_ext else "audio",
                     dur, ";".join(outputs), poster, total])
    with open(AUDIT / "media-inventory-processed.csv", "w", newline="", encoding="utf-8") as f:
        csv.writer(f).writerows(rows)
    did.append(
        f"{len(rows)-1} Medium/Medien konvertiert -> public/media/ "
        f"(MP4/WebM bzw. MP3/OGG, Poster; Metadaten: audit/media-inventory-processed.csv). "
        f"Transkripte/Untertitel noch redaktionell zu ergänzen."
    )


def _run(cmd: list[str]) -> None:
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        log(f"  ! ffmpeg-Fehler ({' '.join(cmd[:6])} …): {r.stderr.strip().splitlines()[-1] if r.stderr else ''}")


# ----------------------------------------------------------- Stage 6: Farbanalyse
def stage_colors() -> None:
    from PIL import Image

    sources = []
    for cand in (BRAND_ORIG / "header_logo.png", INCOMING / "header_logo.png", INCOMING / "flyer_2009.jpg"):
        if cand.exists():
            sources.append(cand)
    if not sources:
        return
    palette: Counter = Counter()
    for src in sources:
        try:
            im = Image.open(src).convert("RGB").resize((160, 160))
        except Exception:
            continue
        data = im.tobytes()
        for i in range(0, len(data) - 2, 3):
            r, g, b = data[i], data[i + 1], data[i + 2]
            # nahezu Weiß/Schwarz überspringen
            if (r > 240 and g > 240 and b > 240) or (r < 15 and g < 15 and b < 15):
                continue
            palette[(r // 16 * 16, g // 16 * 16, b // 16 * 16)] += 1
    top = palette.most_common(12)
    lines = ["# Aus Originaldateien extrahierte Markenfarben\n",
             "Automatisch extrahierte dominante Farbtöne aus Logo/Flyer. **Redaktionell mit den",
             "Design-Tokens (`src/styles/tokens.css`) abzugleichen**; WCAG-Kontraste sind einzuhalten.\n",
             "Quellen: " + ", ".join(str(s.relative_to(ROOT)) for s in sources) + "\n",
             "| # | Hex | RGB | Häufigkeit |", "|---|---|---|---|"]
    for i, ((r, g, b), n) in enumerate(top, 1):
        lines.append(f"| {i} | `#{r:02x}{g:02x}{b:02x}` | {r},{g},{b} | {n} |")
    lines.append("\n## Abgleich mit aktueller Palette")
    lines.append("- `--brand-bordeaux #6b1f2a`, `--brand-gold #b8933d`, `--brand-cream #fbf7f0` ")
    lines.append("  gegen obige Werte prüfen und bei Abweichung angleichen (Kontraste erhalten).")
    (ROOT / "docs" / "BRAND-COLORS-EXTRACTED.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    did.append("Markenfarben aus Logo/Flyer extrahiert -> docs/BRAND-COLORS-EXTRACTED.md")


# ------------------------------------------------------------------------ main
def main() -> int:
    if not INCOMING.exists():
        log("incoming-assets/ existiert nicht – nichts zu tun.")
        return 0
    log("== Asset-Ingestion ==")
    stage_zip()
    stage_inventory()
    try:
        stage_logo()
    except Exception as e:
        log(f"  ! Logo-Stage fehlgeschlagen: {e}")
    try:
        stage_images()
    except Exception as e:
        log(f"  ! Bild-Stage fehlgeschlagen: {e}")
    try:
        stage_media()
    except Exception as e:
        log(f"  ! Medien-Stage fehlgeschlagen: {e}")
    try:
        stage_colors()
    except Exception as e:
        log(f"  ! Farb-Stage fehlgeschlagen: {e}")

    log("\n-- Erledigt --")
    for d in did:
        log(f"  ✓ {d}")
    if missing:
        log("\n-- Noch fehlend / offen --")
        for m in missing:
            log(f"  • {m}")
    if not did:
        log("  (keine Originaldateien gefunden – bitte incoming-assets/ befüllen)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
