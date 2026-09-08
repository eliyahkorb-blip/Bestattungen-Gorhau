/**
 * Misst die Farbgewichtung der gebauten Seiten (§3 des Auftrags).
 *
 * Fotos werden ausgeblendet, damit gemessen wird, wie die *Gestaltung* wirkt und
 * nicht, welche Motive gerade im Bild sind. Gezählt werden nur die Flächen, die
 * das Design selbst setzt.
 *
 * Zielkorridor laut Auftrag:
 *   Weiss/Creme  60-70 %
 *   Beige        15-20 %
 *   Bordeaux      8-12 %
 *   Gold         punktuell
 *
 * Aufruf: npm run build && node tests/colour-balance.mjs
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { chromium } from 'playwright-core';
import sharp from 'sharp';

const DIST = join(process.cwd(), 'dist');
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.webmanifest': 'application/manifest+json',
};

const server = createServer(async (req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  let full = join(DIST, p);
  try {
    if ((await stat(full)).isDirectory()) full = join(full, 'index.html');
    const body = await readFile(full);
    res.writeHead(200, {
      'Content-Type': MIME[extname(full)] || 'application/octet-stream',
      'Content-Length': body.length,
    });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end('not found');
  }
});
await new Promise((r) => server.listen(0, r));
const base = `http://127.0.0.1:${server.address().port}`;

const pages = [
  '/',
  '/im-trauerfall/',
  '/leistungen/',
  '/bestattungsarten/',
  '/bestattungsvorsorge/',
  '/abschiedsraum/',
  '/ueber-uns/',
  '/kontakt/',
];

/** Ordnet einen Pixel einer der Marken-/Flächenkategorien zu. */
function classify(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const sat = max === 0 ? 0 : (max - min) / max;
  const redDominance = r - Math.max(g, b);

  // Kräftiges Rot/Bordeaux: klar rotdominant und nicht hell.
  if (redDominance > 40 && l < 190) return 'bordeaux';
  // Gold: rot und grün deutlich über blau, mittlere Helligkeit.
  if (r - b > 45 && g - b > 25 && l >= 90 && l < 210) return 'gold';
  // Dunkle Flächen und Text.
  if (l < 90) return 'text/dunkel';
  // Sehr helle, kaum gesättigte Flächen: Weiss und Creme.
  if (l >= 232 && sat < 0.09) return 'weiss/creme';
  // Warme, leicht gesättigte Mitteltöne: Beige.
  if (l >= 190) return 'beige';
  return 'sonstige';
}

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox'],
});

const totals = {};
const perPage = [];

for (const path of pages) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(base + path, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  // Fotos ausblenden: gemessen wird die Gestaltung, nicht der Bildinhalt.
  await page.addStyleTag({
    content: 'img, picture, video, svg.motif { visibility: hidden !important; }',
  });
  await page.waitForTimeout(150);
  const buf = await page.screenshot({ fullPage: true });
  await ctx.close();

  const { data, info } = await sharp(buf)
    .resize(360, null, { fit: 'inside' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const counts = {};
  const n = info.width * info.height;
  for (let i = 0; i < data.length; i += 3) {
    const k = classify(data[i], data[i + 1], data[i + 2]);
    counts[k] = (counts[k] ?? 0) + 1;
    totals[k] = (totals[k] ?? 0) + 1;
  }
  perPage.push({
    path,
    pct: Object.fromEntries(Object.entries(counts).map(([k, v]) => [k, (v / n) * 100])),
  });
}

await browser.close();
server.close();

const order = ['weiss/creme', 'beige', 'bordeaux', 'gold', 'text/dunkel', 'sonstige'];
const pad = (s, n) => String(s).padEnd(n);

console.log(pad('Seite', 26) + order.map((o) => o.padStart(13)).join(''));
for (const p of perPage) {
  console.log(pad(p.path, 26) + order.map((o) => `${(p.pct[o] ?? 0).toFixed(1)}%`.padStart(13)).join(''));
}

const grand = Object.values(totals).reduce((a, b) => a + b, 0);
const gp = (k) => ((totals[k] ?? 0) / grand) * 100;
console.log('\n' + pad('GESAMT', 26) + order.map((o) => `${gp(o).toFixed(1)}%`.padStart(13)).join(''));

const ziel = [
  ['weiss/creme', 60, 70],
  ['beige', 15, 20],
  ['bordeaux', 8, 12],
];
console.log('\nZielkorridor laut Auftrag:');
for (const [k, lo, hi] of ziel) {
  const v = gp(k);
  const ok = v >= lo && v <= hi;
  console.log(`  ${pad(k, 14)} ${v.toFixed(1).padStart(5)}%  Ziel ${lo}-${hi}%  ${ok ? 'erreicht' : 'ABWEICHUNG'}`);
}
