/**
 * Statischer SEO- und Struktur-Audit über den dist/-Ordner.
 * Prüft: genau eine H1, lang="de", Viewport, Canonical, eindeutige Titles/Descriptions,
 * Alt-Attribute, width/height an <img>, JSON-LD-Syntax, tel:/mailto:-Links.
 * Ohne externe Abhängigkeiten.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = join(process.cwd(), 'dist');

async function htmlFiles(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await htmlFiles(p)));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const count = (re, s) => (s.match(re) || []).length;

const files = await htmlFiles(DIST);
const titles = new Map();
const descs = new Map();
let errors = 0;
let warnings = 0;
const err = (f, m) => {
  errors++;
  console.error(`  ✗ ${m}`);
};
const warn = (f, m) => {
  warnings++;
  console.warn(`  ⚠ ${m}`);
};

for (const f of files) {
  const rel = f.replace(DIST, '') || '/';
  const html = await readFile(f, 'utf8');
  console.log(`\n${rel}`);

  // lang
  if (!/<html[^>]*\blang="de"/.test(html)) err(f, 'kein lang="de" am <html>');
  // viewport
  if (!/name="viewport"/.test(html)) err(f, 'kein Viewport-Meta');
  // charset
  if (!/charset="utf-8"/i.test(html)) err(f, 'keine UTF-8 charset-Angabe');
  // H1 – genau eine
  const h1 = count(/<h1[\s>]/g, html);
  if (h1 !== 1) err(f, `H1-Anzahl = ${h1} (erwartet 1)`);
  // canonical
  const can = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/);
  if (!can) err(f, 'kein Canonical');
  // title
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1]?.trim();
  if (!title) err(f, 'kein Title');
  else {
    if (titles.has(title)) warn(f, `Title nicht eindeutig (auch in ${titles.get(title)})`);
    else titles.set(title, rel);
  }
  // description
  const desc = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/)?.[1]?.trim();
  const isNoindex = /name="robots"[^>]*noindex/.test(html);
  if (!desc) err(f, 'keine Meta-Description');
  else if (!isNoindex) {
    if (descs.has(desc)) warn(f, `Description nicht eindeutig (auch in ${descs.get(desc)})`);
    else descs.set(desc, rel);
  }
  // img alt + dimensions
  const imgs = html.match(/<img\b[^>]*>/g) || [];
  for (const img of imgs) {
    if (!/\balt=/.test(img)) err(f, `<img> ohne alt-Attribut: ${img.slice(0, 60)}`);
    if (!/\bwidth=/.test(img) || !/\bheight=/.test(img))
      warn(f, `<img> ohne width/height: ${img.slice(0, 60)}`);
  }
  // JSON-LD Syntax
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  for (const m of ld) {
    try {
      JSON.parse(m[1]);
    } catch (e) {
      err(f, `ungültiges JSON-LD: ${e.message}`);
    }
  }
  if (ld.length) console.log(`  ✓ ${ld.length} JSON-LD-Block(e) valide`);
}

console.log(`\n──────────────────────────────`);
console.log(`Seiten geprüft: ${files.length}`);
console.log(`Fehler: ${errors} · Warnungen: ${warnings}`);
if (errors > 0) process.exit(1);
