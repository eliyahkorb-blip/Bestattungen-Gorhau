import { chromium } from 'playwright-core';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const OUT = 'audit/screenshots';
fs.mkdirSync(OUT, { recursive: true });

const pages = [
  ['/', 'startseite'],
  ['/im-trauerfall/', 'im-trauerfall'],
  ['/im-trauerfall/benoetigte-dokumente/', 'benoetigte-dokumente'],
  ['/leistungen/', 'leistungen'],
  ['/leistungen/ueberfuehrungen/', 'ueberfuehrungen'],
  ['/leistungen/thanatopraxie/', 'thanatopraxie'],
  ['/leistungen/trauerfeier-und-trauerdruck/', 'trauerfeier-und-trauerdruck'],
  ['/leistungen/formalitaeten/', 'formalitaeten'],
  ['/bestattungsarten/', 'bestattungsarten'],
  ['/bestattungsarten/erdbestattung/', 'erdbestattung'],
  ['/bestattungsarten/feuerbestattung/', 'feuerbestattung'],
  ['/bestattungsarten/seebestattung/', 'seebestattung'],
  ['/bestattungsarten/anonyme-bestattung/', 'anonyme-bestattung'],
  ['/bestattungsvorsorge/', 'bestattungsvorsorge'],
  ['/abschiedsraum/', 'abschiedsraum'],
  ['/ueber-uns/', 'ueber-uns'],
  ['/ueber-uns/historie/', 'historie'],
  ['/ueber-uns/galerie/', 'galerie'],
  ['/mediathek/', 'mediathek'],
  ['/friedhoefe-in-wuerzburg/', 'friedhoefe-in-wuerzburg'],
  ['/kontakt/', 'kontakt'],
  ['/impressum/', 'impressum'],
  ['/datenschutz/', 'datenschutz'],
  ['/barrierefreiheit/', 'barrierefreiheit'],
];

const types = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp',
  '.avif': 'image/avif', '.jpg': 'image/jpeg', '.ico': 'image/x-icon',
  '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain',
  '.webmanifest': 'application/manifest+json',
};

const server = http.createServer((req, res) => {
  let p = req.url.split('?')[0];
  if (p.endsWith('/')) p += 'index.html';
  const fp = path.join(DIST, p);
  fs.readFile(fp, (err, data) => {
    if (err) { res.writeHead(404); res.end('not found'); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(fp)] || 'application/octet-stream' });
    res.end(data);
  });
});

await new Promise((resolve) => server.listen(4174, resolve));

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox'],
});

for (const [route, slug] of pages) {
  for (const [suffix, viewport] of [
    ['desktop', { width: 1440, height: 900 }],
    ['mobile', { width: 390, height: 844 }],
  ]) {
    const page = await browser.newPage({ viewport });
    await page.goto(`http://localhost:4174${route}`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(OUT, `${slug}-${suffix}.png`), fullPage: true });
    await page.close();
    console.log(`✓ ${slug}-${suffix}.png`);
  }
}

await browser.close();
server.close();
console.log(`Fertig: ${pages.length} Seiten x 2 = ${pages.length * 2} Screenshots in ${OUT}/`);
