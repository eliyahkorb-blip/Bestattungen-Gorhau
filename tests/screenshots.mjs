/**
 * Erstellt Screenshots der wichtigsten Seiten (Desktop + Mobil) unter audit/screenshots/.
 * Nutzt das vorinstallierte Chromium via playwright-core.
 */
import { createServer } from 'node:http';
import { readFile, stat, mkdir } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { chromium } from 'playwright-core';

const DIST = join(process.cwd(), 'dist');
const OUT = join(process.cwd(), 'audit', 'screenshots');
await mkdir(OUT, { recursive: true });

const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.json': 'application/json', '.xml': 'application/xml', '.webmanifest': 'application/manifest+json', '.avif': 'image/avif', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg' };

const server = createServer(async (req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  let full = join(DIST, p);
  try {
    if ((await stat(full)).isDirectory()) full = join(full, 'index.html');
    const b = await readFile(full);
    res.writeHead(200, { 'Content-Type': MIME[extname(full)] || 'application/octet-stream' });
    res.end(b);
  } catch {
    res.writeHead(404);
    res.end('not found');
  }
});
await new Promise((r) => server.listen(0, r));
const base = `http://127.0.0.1:${server.address().port}`;

// Alle indexierbaren Seiten, Desktop und Mobil ergeben zusammen 28 Aufnahmen.
const pages = [
  ['/', 'startseite'],
  ['/im-trauerfall/', 'im-trauerfall'],
  ['/leistungen/', 'leistungen'],
  ['/bestattungsarten/', 'bestattungsarten'],
  ['/vorsorge/', 'vorsorge'],
  ['/abschiedsraum/', 'abschiedsraum'],
  ['/ueber-uns/', 'ueber-uns'],
  ['/historie/', 'historie'],
  ['/mediathek/', 'mediathek'],
  ['/friedhoefe/', 'friedhoefe'],
  ['/kontakt/', 'kontakt'],
  ['/impressum/', 'impressum'],
  ['/datenschutz/', 'datenschutz'],
  ['/barrierefreiheit/', 'barrierefreiheit'],
];

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox'],
});

for (const [w, name, isMobile] of [[1440, 'desktop', false], [390, 'mobile', true]]) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: isMobile ? 844 : 900 },
    deviceScaleFactor: isMobile ? 2 : 1,
    isMobile,
  });
  for (const [path, slug] of pages) {
    const page = await ctx.newPage();
    // Zweimal laden: die Schriften sind mit font-display: optional gesetzt und
    // werden dadurch erst angewandt, wenn sie im Cache liegen. Der zweite Aufruf
    // entspricht dem normalen Zustand beim Weiterklicken auf der Website.
    await page.goto(base + path, { waitUntil: 'networkidle' });
    await page.reload({ waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    // Lazy-Bilder unterhalb des Folds durch Durchscrollen auslösen, dann zurück nach oben.
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let y = 0;
        const step = () => {
          window.scrollTo(0, y);
          y += window.innerHeight;
          if (y < document.body.scrollHeight) setTimeout(step, 60);
          else {
            window.scrollTo(0, 0);
            setTimeout(resolve, 200);
          }
        };
        step();
      });
    });
    await page.waitForTimeout(300);
    await page.screenshot({ path: join(OUT, `${slug}-${name}.png`), fullPage: true });
    await page.close();
  }
  await ctx.close();
}

await browser.close();
server.close();
console.log(`Screenshots erstellt in audit/screenshots/`);
