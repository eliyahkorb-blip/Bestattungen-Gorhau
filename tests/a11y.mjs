/**
 * Automatisierter Accessibility-Test mit axe-core über den gebauten dist/-Ordner.
 * Startet einen lokalen statischen Server, öffnet repräsentative Seiten im
 * (vorinstallierten) Chromium und prüft auf WCAG-2.x-AA-Verstöße.
 *
 * Nutzt playwright-core mit der Umgebungs-Chromium-Binary; kein Browser-Download.
 */
import { createServer } from 'node:http';
import { readFile, stat, readdir } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { chromium } from 'playwright-core';
import { AxeBuilder } from '@axe-core/playwright';

const DIST = join(process.cwd(), 'dist');
const EXEC =
  process.env.CHROMIUM_PATH ||
  '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.webmanifest': 'application/manifest+json',
};

async function resolveFile(urlPath) {
  let p = decodeURIComponent(urlPath.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  let full = join(DIST, p);
  try {
    if ((await stat(full)).isDirectory()) full = join(full, 'index.html');
    return full;
  } catch {
    try {
      const alt = join(DIST, p, 'index.html');
      await stat(alt);
      return alt;
    } catch {
      return null;
    }
  }
}

const server = createServer(async (req, res) => {
  const file = await resolveFile(req.url);
  if (!file) {
    res.writeHead(404);
    res.end('not found');
    return;
  }
  try {
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(500);
    res.end('error');
  }
});

// Alle gebauten Seiten automatisch ermitteln (jede index.html -> URL-Pfad, plus 404).
async function discoverPages(dir, prefix = '') {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      out.push(...(await discoverPages(join(dir, e.name), `${prefix}/${e.name}`)));
    } else if (e.name === 'index.html') {
      out.push(prefix === '' ? '/' : `${prefix}/`);
    } else if (e.name === '404.html') {
      out.push('/404.html');
    }
  }
  return out;
}
const pages = (await discoverPages(DIST)).sort();

await new Promise((r) => server.listen(0, r));
const port = server.address().port;
const base = `http://127.0.0.1:${port}`;

let browser;
try {
  browser = await chromium.launch({ executablePath: EXEC, args: ['--no-sandbox'] });
} catch (e) {
  console.error('Chromium konnte nicht gestartet werden:', e.message);
  console.error('Setzen Sie ggf. CHROMIUM_PATH auf die Chromium-Binary.');
  server.close();
  process.exit(2);
}

const ctx = await browser.newContext();
let totalCritical = 0;
let totalSerious = 0;

for (const path of pages) {
  const page = await ctx.newPage();
  await page.goto(base + path, { waitUntil: 'networkidle' });
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  const crit = results.violations.filter((v) => v.impact === 'critical');
  const ser = results.violations.filter((v) => v.impact === 'serious');
  totalCritical += crit.length;
  totalSerious += ser.length;
  const flag = crit.length || ser.length ? '✗' : '✓';
  console.log(
    `${flag} ${path} – Verstöße: ${results.violations.length} (kritisch ${crit.length}, schwer ${ser.length})`
  );
  for (const v of results.violations) {
    console.log(`    [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length}×)`);
  }
  await page.close();
}

await browser.close();
server.close();

console.log(`\n──────────────────────────────`);
console.log(`Kritische Verstöße: ${totalCritical} · Schwere Verstöße: ${totalSerious}`);
if (totalCritical > 0 || totalSerious > 0) process.exit(1);
