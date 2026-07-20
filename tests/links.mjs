/**
 * Interner Linkchecker über dist/. Prüft, dass alle internen href-Ziele existieren.
 * Sammelt außerdem externe Links, tel:- und mailto:-Links. Ohne externe Abhängigkeiten.
 */
import { readdir, readFile, access } from 'node:fs/promises';
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

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

const files = await htmlFiles(DIST);
let broken = 0;
let internal = 0;
const external = new Set();
const tel = new Set();
const mail = new Set();

for (const f of files) {
  const html = await readFile(f, 'utf8');
  const rel = f.replace(DIST, '');
  const hrefs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((m) => m[1]);
  for (const href of hrefs) {
    if (href.startsWith('tel:')) {
      tel.add(href);
      continue;
    }
    if (href.startsWith('mailto:')) {
      mail.add(href);
      continue;
    }
    if (/^https?:\/\//.test(href)) {
      external.add(href);
      continue;
    }
    if (href.startsWith('#') || href.startsWith('data:')) continue;

    // interne URL auflösen
    let path = href.split('#')[0].split('?')[0];
    if (!path) continue;
    internal++;
    let target;
    if (path.startsWith('/')) target = join(DIST, path);
    else target = join(f, '..', path);

    let ok = await exists(target);
    if (!ok && (path.endsWith('/') || !/\.[a-z0-9]+$/i.test(path))) {
      ok = await exists(join(target, 'index.html'));
    }
    if (!ok) {
      broken++;
      console.error(`  ✗ ${rel} → ${href}`);
    }
  }
}

console.log(`Interne Links geprüft: ${internal}`);
console.log(`Defekte interne Links: ${broken}`);
console.log(`Externe Links: ${external.size}`);
[...external].sort().forEach((u) => console.log(`   ext → ${u}`));
console.log(`tel:-Links: ${[...tel].join(', ')}`);
console.log(`mailto:-Links: ${[...mail].join(', ')}`);
if (broken > 0) process.exit(1);
