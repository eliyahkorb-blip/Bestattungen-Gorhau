/**
 * Technische Analyse der Ausgangsbilder in incoming-assets/unsplash-originals/.
 * Liefert Abmessungen, Seitenverhältnis, Dateigröße, Helligkeit und die
 * vorherrschenden Farben als JSON – Grundlage für audit/unsplash-image-inventory.*
 *
 * Aufruf: node scripts/analyse-source-images.mjs
 */
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'incoming-assets/unsplash-originals';

/** Grobe Farbfamilie aus HSL ableiten – reicht für eine Inventurbeschreibung. */
function colourName(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2 / 255;
  const d = max - min;
  const s = d === 0 ? 0 : d / (255 - Math.abs(max + min - 255));
  if (s < 0.12) return l > 0.75 ? 'Weiß' : l > 0.45 ? 'Hellgrau' : l > 0.2 ? 'Grau' : 'Anthrazit';
  let h;
  if (max === r) h = 60 * (((g - b) / d) % 6);
  else if (max === g) h = 60 * ((b - r) / d + 2);
  else h = 60 * ((r - g) / d + 4);
  if (h < 0) h += 360;
  const dark = l < 0.3;
  if (h < 15 || h >= 345) return dark ? 'Dunkelrot' : 'Rot';
  if (h < 45) return dark ? 'Braun' : l > 0.7 ? 'Creme' : 'Orange';
  if (h < 70) return dark ? 'Olive' : 'Gelb';
  if (h < 160) return dark ? 'Dunkelgrün' : 'Grün';
  if (h < 200) return dark ? 'Petrol' : 'Türkis';
  if (h < 255) return dark ? 'Dunkelblau' : 'Blau';
  if (h < 290) return 'Violett';
  return 'Magenta';
}

/** Dominante Farben über eine 16x16-Miniatur und Quantisierung auf 32er-Raster. */
async function dominantColours(file) {
  const { data } = await sharp(file)
    .resize(16, 16, { fit: 'inside' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const buckets = new Map();
  for (let i = 0; i < data.length; i += 3) {
    const key = [data[i], data[i + 1], data[i + 2]].map((v) => Math.round(v / 32) * 32).join(',');
    const entry = buckets.get(key) ?? { n: 0, r: 0, g: 0, b: 0 };
    entry.n += 1;
    entry.r += data[i];
    entry.g += data[i + 1];
    entry.b += data[i + 2];
    buckets.set(key, entry);
  }
  const total = data.length / 3;
  return [...buckets.values()]
    .sort((a, b) => b.n - a.n)
    .slice(0, 4)
    .map((e) => {
      const r = Math.round(e.r / e.n);
      const g = Math.round(e.g / e.n);
      const b = Math.round(e.b / e.n);
      return {
        hex: '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join(''),
        name: colourName(r, g, b),
        anteil: Math.round((e.n / total) * 100),
      };
    });
}

const files = (await readdir(SRC)).filter((f) => /\.jpe?g$/i.test(f)).sort();
const out = [];

for (const file of files) {
  const full = path.join(SRC, file);
  const meta = await sharp(full).metadata();
  const { size } = await stat(full);
  const stats = await sharp(full).stats();
  const brightness = Math.round(
    (stats.channels.slice(0, 3).reduce((sum, c) => sum + c.mean, 0) / 3 / 255) * 100
  );
  const ratio = meta.width / meta.height;
  out.push({
    datei: file,
    breite: meta.width,
    hoehe: meta.height,
    seitenverhaeltnis: Number(ratio.toFixed(3)),
    seitenverhaeltnis_text:
      ratio > 1.85 ? '~2:1 Panorama' : ratio > 1.6 ? '~16:9' : ratio > 1.4 ? '~3:2' : ratio > 1.2 ? '~4:3' : ratio > 0.9 ? 'quadratisch' : 'Hochformat',
    dateigroesse_bytes: size,
    dateigroesse_kb: Math.round(size / 1024),
    megapixel: Number(((meta.width * meta.height) / 1e6).toFixed(1)),
    helligkeit_prozent: brightness,
    hero_tauglich_technisch: meta.width >= 2400 && ratio >= 1.5,
    farben: await dominantColours(full),
  });
}

console.log(JSON.stringify(out, null, 2));
