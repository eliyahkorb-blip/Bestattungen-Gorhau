/**
 * Schnelle Einzelaufnahmen zum Zwischenprüfen während der Überarbeitung.
 *
 * Aufruf: node tests/shot.mjs <pfad> <ziel.png> [breite] [hoehe] [scrollY]
 * Beispiel: node tests/shot.mjs / /tmp/start.png 1440 1100 0
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { chromium } from 'playwright-core';

const [pagePath = '/', out = '/tmp/shot.png', w = '1440', h = '1100', scrollY = '0'] =
  process.argv.slice(2);

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

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox'],
});
const ctx = await browser.newContext({
  viewport: { width: Number(w), height: Number(h) },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();
await page.goto(base + pagePath, { waitUntil: 'networkidle' });
await page.reload({ waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
if (Number(scrollY) > 0) {
  await page.evaluate((y) => window.scrollTo(0, y), Number(scrollY));
  await page.waitForTimeout(500);
}
await page.waitForTimeout(250);
await page.screenshot({ path: out });
await browser.close();
server.close();
console.log(`${pagePath} -> ${out}`);
