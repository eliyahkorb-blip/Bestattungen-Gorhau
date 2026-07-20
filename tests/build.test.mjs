/**
 * Smoke-Tests über den gebauten dist/-Ordner (node:test).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = join(process.cwd(), 'dist');
const read = (p) => readFile(join(DIST, p), 'utf8');
const has = async (p) => {
  try {
    await access(join(DIST, p));
    return true;
  } catch {
    return false;
  }
};

test('Kernseiten wurden gebaut', async () => {
  for (const p of [
    'index.html',
    'im-trauerfall/index.html',
    'leistungen/index.html',
    'bestattungsarten/index.html',
    'bestattungsvorsorge/index.html',
    'abschiedsraum/index.html',
    'ueber-uns/index.html',
    'mediathek/index.html',
    'friedhoefe-in-wuerzburg/index.html',
    'kontakt/index.html',
    'impressum/index.html',
    'datenschutz/index.html',
    'barrierefreiheit/index.html',
    '404.html',
  ]) {
    assert.ok(await has(p), `fehlt: ${p}`);
  }
});

test('SEO-Basisdateien vorhanden', async () => {
  for (const p of ['sitemap.xml', 'robots.txt', 'favicon.ico', 'favicon.svg', 'site.webmanifest', 'apple-touch-icon.png', '.htaccess']) {
    assert.ok(await has(p), `fehlt: ${p}`);
  }
});

test('Startseite hat H1, lang=de, Viewport, Canonical, LocalBusiness-JSON-LD', async () => {
  const html = await read('index.html');
  assert.match(html, /<html[^>]*lang="de"/);
  assert.match(html, /name="viewport"/);
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
  assert.match(html, /rel="canonical"[^>]*https:\/\/www\.gorhau-bestattungen\.de\//);
  assert.match(html, /"@type":"FuneralHome"/);
});

test('Telefonnummer als tel:-Link vorhanden', async () => {
  const html = await read('index.html');
  assert.match(html, /href="tel:\+49931610000"/);
});

test('sitemap.xml enthält alle Kernpfade', async () => {
  const xml = await read('sitemap.xml');
  for (const p of ['/', '/kontakt/', '/impressum/', '/mediathek/']) {
    assert.ok(xml.includes(`<loc>https://www.gorhau-bestattungen.de${p}</loc>`), `fehlt in sitemap: ${p}`);
  }
});
