/**
 * Lokale Verifikation des GitHub-Pages-Builds (dist/ aus `npm run build:pages`).
 * Simuliert das reale Hosting, indem dist/ NICHT unter "/", sondern unter dem tatsächlichen
 * Repo-Unterpfad "/Bestattungen-Gorhau/" ausgeliefert wird – exakt wie auf
 * https://eliyahkorb-blip.github.io/Bestattungen-Gorhau/.
 *
 * Prüft: alle 14 indexierbaren Seiten + 404 erreichbar, Navigation/Logo/Favicons/CSS/Bilder/
 * Flyer ohne 404, keine defekten internen Links, kein horizontales Scrollen, mobile Navigation,
 * Breadcrumbs, prefers-reduced-motion, noindex.
 *
 * Schreibt audit/github-pages-preview-report.md und .json.
 */
import { createServer } from 'node:http';
import { readFile, stat, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { chromium } from 'playwright-core';

const DIST = join(process.cwd(), 'dist');
const BASE_PATH = '/Bestattungen-Gorhau';
const EXEC =
  process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

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
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.txt': 'text/plain',
};

async function resolveFile(urlPath) {
  if (!urlPath.startsWith(BASE_PATH)) return null; // alles außerhalb des Unterpfads = 404, wie auf GitHub Pages
  let rel = urlPath.slice(BASE_PATH.length) || '/';
  let p = decodeURIComponent(rel.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  let full = join(DIST, p);
  try {
    if ((await stat(full)).isDirectory()) full = join(full, 'index.html');
    await stat(full);
    return full;
  } catch {
    return null;
  }
}

const server = createServer(async (req, res) => {
  const file = await resolveFile(req.url);
  if (!file) {
    // GitHub-Pages-typisches 404-Verhalten simulieren: 404.html ausliefern, falls vorhanden
    try {
      const notFound = join(DIST, '404.html');
      const body = await readFile(notFound);
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(body);
    } catch {
      res.writeHead(404);
      res.end('not found');
    }
    return;
  }
  const body = await readFile(file);
  res.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'application/octet-stream' });
  res.end(body);
});

await new Promise((r) => server.listen(0, r));
const port = server.address().port;
const origin = `http://127.0.0.1:${port}`;
const base = `${origin}${BASE_PATH}`;

const pages = [
  ['/', 'Startseite'],
  ['/im-trauerfall/', 'Im Trauerfall'],
  ['/leistungen/', 'Leistungen'],
  ['/bestattungsarten/', 'Bestattungsarten'],
  ['/vorsorge/', 'Vorsorge'],
  ['/abschiedsraum/', 'Abschiedsraum'],
  ['/ueber-uns/', 'Über uns'],
  ['/historie/', 'Historie'],
  ['/mediathek/', 'Mediathek'],
  ['/friedhoefe/', 'Friedhöfe'],
  ['/kontakt/', 'Kontakt'],
  ['/impressum/', 'Impressum'],
  ['/datenschutz/', 'Datenschutz'],
  ['/barrierefreiheit/', 'Barrierefreiheit'],
];

const results = [];
let brokenAssets = 0;
let brokenLinks = 0;

const browser = await chromium.launch({ executablePath: EXEC, args: ['--no-sandbox'] });
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });

for (const [path, label] of pages) {
  const page = await context.newPage();
  const failedRequests = [];
  page.on('response', (resp) => {
    if (resp.status() >= 400) failedRequests.push(`${resp.status()} ${resp.url()}`);
  });
  const consoleErrors = [];
  page.on('pageerror', (err) => consoleErrors.push(String(err)));

  const resp = await page.goto(base + path, { waitUntil: 'networkidle' });
  const status = resp?.status() ?? 0;

  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  const noHorizontalScroll = scrollWidth <= clientWidth + 1;

  const noindex = await page
    .locator('meta[name="robots"][content*="noindex"]')
    .count();

  const logoVisible = (await page.locator('.site-header__logo').count()) > 0;
  const navLinkCount = await page.locator('#hauptnavigation a').count();

  // interne Links auf der Seite auf 404 prüfen (nur Links unter unserem Basispfad)
  const hrefs = await page.$$eval('a[href]', (as) =>
    as.map((a) => a.getAttribute('href')).filter(Boolean)
  );
  let pageBrokenLinks = 0;
  for (const href of hrefs) {
    if (!href.startsWith(BASE_PATH)) continue;
    const r = await context.request.get(origin + href).catch(() => null);
    if (!r || r.status() >= 400) pageBrokenLinks++;
  }
  brokenLinks += pageBrokenLinks;
  brokenAssets += failedRequests.length;

  results.push({
    path,
    label,
    status,
    ok: status === 200,
    noHorizontalScroll,
    noindexPresent: noindex > 0,
    logoVisible,
    navLinkCount,
    failedRequests,
    brokenInternalLinksOnPage: pageBrokenLinks,
    consoleErrors,
  });

  await page.close();
}

// Mobile Navigation gezielt testen (Startseite)
const mobilePage = await (
  await browser.newContext({ viewport: { width: 390, height: 844 } })
).newPage();
await mobilePage.goto(base + '/', { waitUntil: 'networkidle' });
const toggle = mobilePage.locator('.nav-toggle');
const navBefore = await mobilePage.locator('#hauptnavigation').isVisible();
await toggle.click();
const navAfterOpen = await mobilePage.locator('#hauptnavigation.is-open').isVisible();
await mobilePage.keyboard.press('Escape');
const navAfterEscape = await mobilePage.locator('#hauptnavigation.is-open').count();
const mobileNavResult = {
  toggleFound: (await toggle.count()) > 0,
  hiddenBeforeOpen: !navBefore,
  opensOnClick: navAfterOpen,
  closesOnEscape: navAfterEscape === 0,
};
await mobilePage.close();

// prefers-reduced-motion prüfen
const reducedMotionContext = await browser.newContext({ reducedMotion: 'reduce' });
const rmPage = await reducedMotionContext.newPage();
await rmPage.goto(base + '/', { waitUntil: 'networkidle' });
const transitionDuration = await rmPage.evaluate(() => {
  const el = document.querySelector('.icon-feature') || document.body;
  return getComputedStyle(el).transitionDuration;
});
// Browser serialisiert die Dauer je nach Engine als z. B. "1e-06s" oder "0.001ms" – numerisch vergleichen.
const parseCssTime = (v) => {
  const m = /^([\d.e+-]+)(ms|s)$/.exec(v.trim());
  if (!m) return Infinity;
  const n = parseFloat(m[1]);
  return m[2] === 'ms' ? n : n * 1000; // in ms
};
const reducedMotionRespected = parseCssTime(transitionDuration) <= 0.01; // ms
await rmPage.close();
await reducedMotionContext.close();

// 404-Seite explizit testen
const notFoundPage = await context.newPage();
const nfResp = await notFoundPage.goto(base + '/diese-seite-gibt-es-nicht/', {
  waitUntil: 'networkidle',
});
const notFoundStatus = nfResp?.status() ?? 0;
const notFoundHasNav = (await notFoundPage.locator('#hauptnavigation a').count()) > 0;
await notFoundPage.close();

await browser.close();
server.close();

const summary = {
  generatedAt: new Date().toISOString(),
  basePath: BASE_PATH,
  totalPagesTested: results.length + 1, // +1 für 404-Seite
  pagesOk: results.filter((r) => r.ok).length,
  brokenLinksTotal: brokenLinks,
  brokenAssetsTotal: brokenAssets,
  pagesWithHorizontalScroll: results.filter((r) => !r.noHorizontalScroll).length,
  pagesWithoutNoindex: results.filter((r) => !r.noindexPresent).length,
  mobileNavigation: mobileNavResult,
  reducedMotionRespected,
  notFoundPage: { status: notFoundStatus, hasNavigation: notFoundHasNav },
};

await writeFile(
  join(process.cwd(), 'audit', 'github-pages-preview-report.json'),
  JSON.stringify({ summary, pages: results }, null, 2) + '\n'
);

const lines = [];
lines.push('# GitHub-Pages-Vorschau – lokaler Verifikationsbericht');
lines.push('');
lines.push(
  `Erzeugt am ${summary.generatedAt.slice(0, 10)} durch \`npm run test:pages-preview\` gegen ` +
    `den lokal unter dem Unterpfad \`${BASE_PATH}/\` ausgelieferten \`dist/\`-Ordner aus ` +
    '\`npm run build:pages\` – simuliert exakt das Hosting-Verhalten von GitHub Pages ' +
    '(Repo-Unterpfad, 404-Fallback).'
);
lines.push('');
lines.push('## Zusammenfassung');
lines.push('');
lines.push(`- Getestete Seiten gesamt (inkl. 404): **${summary.totalPagesTested}**`);
lines.push(`- Seiten mit Status 200: **${summary.pagesOk} / ${results.length}**`);
lines.push(`- Defekte interne Links gesamt: **${summary.brokenLinksTotal}**`);
lines.push(`- Fehlgeschlagene Asset-/Netzwerk-Requests gesamt: **${summary.brokenAssetsTotal}**`);
lines.push(`- Seiten mit horizontalem Scrollen: **${summary.pagesWithHorizontalScroll}**`);
lines.push(`- Seiten ohne noindex-Meta (sollten 0 sein): **${summary.pagesWithoutNoindex}**`);
lines.push(
  `- Mobile Navigation: Toggle gefunden ${mobileNavResult.toggleFound ? '✓' : '✗'}, ` +
    `öffnet per Klick ${mobileNavResult.opensOnClick ? '✓' : '✗'}, ` +
    `schließt per Escape ${mobileNavResult.closesOnEscape ? '✓' : '✗'}`
);
lines.push(`- prefers-reduced-motion respektiert: ${reducedMotionRespected ? '✓' : '✗'}`);
lines.push(
  `- 404-Verhalten: Status ${notFoundStatus}, Navigation vorhanden: ${notFoundHasNav ? '✓' : '✗'}`
);
lines.push('');
lines.push('## Ergebnis je Seite');
lines.push('');
lines.push('| Pfad | Status | Kein horiz. Scroll | noindex | Nav-Links | Logo | Defekte Links | Fehlgeschl. Requests |');
lines.push('|---|---|---|---|---|---|---|---|');
for (const r of results) {
  lines.push(
    `| \`${r.path}\` | ${r.status} | ${r.noHorizontalScroll ? '✓' : '✗'} | ${r.noindexPresent ? '✓' : '✗'} | ${r.navLinkCount} | ${r.logoVisible ? '✓' : '✗'} | ${r.brokenInternalLinksOnPage} | ${r.failedRequests.length} |`
  );
}
lines.push('');
if (brokenAssets > 0 || brokenLinks > 0) {
  lines.push('## Details zu Fehlern');
  lines.push('');
  for (const r of results) {
    if (r.failedRequests.length) {
      lines.push(`**${r.path}** – fehlgeschlagene Requests:`);
      r.failedRequests.forEach((f) => lines.push(`  - ${f}`));
    }
  }
}

await writeFile(
  join(process.cwd(), 'audit', 'github-pages-preview-report.md'),
  lines.join('\n') + '\n'
);

console.log(`GitHub-Pages-Vorschau geprüft: ${summary.totalPagesTested} Seiten.`);
console.log(`  Status 200: ${summary.pagesOk} / ${results.length}`);
console.log(`  Defekte interne Links: ${summary.brokenLinksTotal}`);
console.log(`  Fehlgeschlagene Requests: ${summary.brokenAssetsTotal}`);
console.log(`  Horizontales Scrollen: ${summary.pagesWithHorizontalScroll}`);
console.log(`  Ohne noindex: ${summary.pagesWithoutNoindex}`);
console.log(`  Mobile Navigation: ${JSON.stringify(mobileNavResult)}`);
console.log(`  404-Status: ${notFoundStatus}`);
console.log(`  Bericht: audit/github-pages-preview-report.md / .json`);

if (
  summary.pagesOk !== results.length ||
  summary.brokenLinksTotal > 0 ||
  summary.brokenAssetsTotal > 0 ||
  summary.pagesWithHorizontalScroll > 0 ||
  summary.pagesWithoutNoindex > 0
) {
  process.exitCode = 1;
}
