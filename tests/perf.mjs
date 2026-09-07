/**
 * Misst LCP, CLS und Übertragungsgewicht der wichtigsten Seiten im gebauten dist/.
 * Ergänzt den Lighthouse-Workflow um schnell reproduzierbare Zahlen nach
 * Bildänderungen.
 *
 * Aufruf: npm run build && node tests/perf.mjs
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { chromium } from 'playwright-core';

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
  '.jpeg': 'image/jpeg',
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
  '/bestattungsarten/',
  '/bestattungsarten/seebestattung/',
  '/friedhoefe-in-wuerzburg/',
  '/ueber-uns/',
  '/leistungen/trauerfeier-und-trauerdruck/',
  '/kontakt/',
];

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox'],
});

const rows = [];
for (const path of pages) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  let bytes = 0;
  let bildBytes = 0;
  page.on('response', async (res) => {
    const len = Number(res.headers()['content-length'] ?? 0);
    bytes += len;
    if (/^image\//.test(res.headers()['content-type'] ?? '')) bildBytes += len;
  });

  await page.goto(base + path, { waitUntil: 'networkidle' });
  const metrics = await page.evaluate(
    () =>
      new Promise((resolve) => {
        let lcp = 0;
        let cls = 0;
        let lcpTag = '';
        new PerformanceObserver((list) => {
          for (const e of list.getEntries()) {
            if (e.startTime >= lcp) {
              lcp = e.startTime;
              lcpTag = e.element?.tagName ?? '';
            }
          }
        }).observe({ type: 'largest-contentful-paint', buffered: true });
        new PerformanceObserver((list) => {
          for (const e of list.getEntries()) if (!e.hadRecentInput) cls += e.value;
        }).observe({ type: 'layout-shift', buffered: true });
        setTimeout(() => {
          const lcpEl = performance.getEntriesByType('largest-contentful-paint').at(-1);
          resolve({
            lcp: Math.round(lcp),
            cls: Number(cls.toFixed(4)),
            lcpUrl: lcpEl?.url ?? '',
            lcpTag,
          });
        }, 900);
      })
  );

  rows.push({
    seite: path,
    lcp_ms: metrics.lcp,
    cls: metrics.cls,
    lcp_element: metrics.lcpUrl ? metrics.lcpUrl.split('/').pop() : metrics.lcpTag || 'Text',
    gesamt_kb: Math.round(bytes / 1024),
    bilder_kb: Math.round(bildBytes / 1024),
  });
  await ctx.close();
}

await browser.close();
server.close();

console.log('Seite'.padEnd(44), 'LCP'.padStart(7), 'CLS'.padStart(8), 'Seite KB'.padStart(9), 'Bilder KB'.padStart(10), ' LCP-Element');
for (const r of rows) {
  console.log(
    r.seite.padEnd(44),
    `${r.lcp_ms}ms`.padStart(7),
    String(r.cls).padStart(8),
    String(r.gesamt_kb).padStart(9),
    String(r.bilder_kb).padStart(10),
    ' ' + r.lcp_element
  );
}
const maxCls = Math.max(...rows.map((r) => r.cls));
const maxLcp = Math.max(...rows.map((r) => r.lcp_ms));
console.log(`\nSchlechtester CLS: ${maxCls} (Ziel < 0.1) · schlechtester LCP: ${maxLcp} ms`);
if (maxCls >= 0.1) process.exitCode = 1;
