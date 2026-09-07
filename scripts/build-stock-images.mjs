/**
 * Erzeugt aus den Originalen in incoming-assets/unsplash-originals/ die
 * optimierten Website-Varianten in public/images/stock/.
 *
 * Pro Motiv entstehen AVIF, WebP und ein JPG-Fallback in mehreren Breiten.
 * Die Originale bleiben unverändert und gehen nicht in den Produktionsbuild.
 *
 * Aufruf: node scripts/build-stock-images.mjs
 */
import { mkdir, rm, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import {
  stockImages,
  CONTENT_WIDTHS,
  HERO_WIDTHS,
  HERO_MOBILE_WIDTHS,
} from './stock-images.config.mjs';

const SRC_DIR = 'incoming-assets/unsplash-originals';
const OUT_DIR = 'public/images/stock';

const FORMATS = [
  { ext: 'avif', apply: (p) => p.avif({ quality: 50, effort: 6 }) },
  { ext: 'webp', apply: (p) => p.webp({ quality: 78 }) },
  { ext: 'jpg', apply: (p) => p.jpeg({ quality: 80, mozjpeg: true, progressive: false }) },
];

/** Schneidet auf ein Zielseitenverhältnis zu, ohne zu verzerren. */
function cropToRatio(pipeline, meta, zuschnitt) {
  if (!zuschnitt) return { pipeline, width: meta.width, height: meta.height };
  const { ratio, position = 'center' } = zuschnitt;
  let width = meta.width;
  let height = Math.round(meta.width / ratio);
  if (height > meta.height) {
    height = meta.height;
    width = Math.round(meta.height * ratio);
  }
  return {
    pipeline: pipeline.extract(computeRegion(meta, width, height, position)),
    width,
    height,
  };
}

function computeRegion(meta, width, height, position) {
  const left =
    position === 'left' ? 0 : position === 'right' ? meta.width - width : Math.round((meta.width - width) / 2);
  const top =
    position === 'top' ? 0 : position === 'bottom' ? meta.height - height : Math.round((meta.height - height) / 2);
  return { left, top, width, height };
}

/** Erzeugt alle Format-/Breitenkombinationen für eine Variante. */
async function renderVariant({ file, baseName, zuschnitt, widths }) {
  const meta = await sharp(file).metadata();
  const cropped = cropToRatio(sharp(file), meta, zuschnitt);
  const ratio = cropped.width / cropped.height;
  const useWidths = widths.filter((w) => w <= cropped.width);
  if (useWidths.length === 0) useWidths.push(cropped.width);

  const written = [];
  for (const w of useWidths) {
    const h = Math.round(w / ratio);
    for (const { ext, apply } of FORMATS) {
      const out = path.join(OUT_DIR, `${baseName}-${w}.${ext}`);
      const pipeline = cropToRatio(sharp(file), meta, zuschnitt)
        .pipeline.resize(w, h, { fit: 'cover' })
        .withMetadata({});
      await apply(pipeline).toFile(out);
      written.push(out);
    }
  }
  return {
    baseName,
    widths: useWidths,
    intrinsic: { width: useWidths.at(-1), height: Math.round(useWidths.at(-1) / ratio) },
    ratio: Number(ratio.toFixed(4)),
    written,
  };
}

await rm(OUT_DIR, { recursive: true, force: true });
await mkdir(OUT_DIR, { recursive: true });

const results = [];
for (const img of stockImages) {
  const file = path.join(SRC_DIR, img.quelle);
  const isHero = img.rolle === 'hero';

  const main = await renderVariant({
    file,
    baseName: img.name,
    zuschnitt: img.zuschnitt,
    widths: isHero ? HERO_WIDTHS : CONTENT_WIDTHS,
  });
  results.push({ ...img, variante: 'desktop', ...main });

  if (img.zuschnittMobil) {
    const mobile = await renderVariant({
      file,
      baseName: `${img.name}-hochkant`,
      zuschnitt: img.zuschnittMobil,
      widths: HERO_MOBILE_WIDTHS,
    });
    results.push({ ...img, variante: 'mobil', ...mobile });
  }
}

// Manifest für die StockPhoto-Komponente: garantiert, dass width/height im
// Markup immer den tatsächlich erzeugten Dateien entsprechen.
const manifest = {};
for (const r of results) {
  manifest[r.baseName] = {
    widths: r.widths,
    width: r.intrinsic.width,
    height: r.intrinsic.height,
    ratio: r.ratio,
    alt: r.alt,
    mobil: r.variante === 'mobil',
  };
}
await writeFile('src/data/stock-images.json', JSON.stringify(manifest, null, 2) + '\n');

const files = await readdir(OUT_DIR);
let bytes = 0;
for (const f of files) bytes += (await stat(path.join(OUT_DIR, f))).size;

for (const r of results) {
  console.log(
    `${r.baseName.padEnd(30)} ${r.variante.padEnd(8)} ${String(r.intrinsic.width).padStart(4)}x${String(
      r.intrinsic.height
    ).padEnd(4)} ratio=${r.ratio}  ${r.widths.length} Breiten x 3 Formate`
  );
}
console.log(`\n${files.length} Dateien, ${(bytes / 1024 / 1024).toFixed(2)} MB gesamt in ${OUT_DIR}`);
