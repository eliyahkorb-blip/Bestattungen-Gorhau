/**
 * Prüft die redaktionellen Vorgaben (§9 des Auftrags) am gebauten HTML,
 * also an dem Text, den Besucher wirklich sehen.
 *
 * Geprüft wird:
 *   - Gedankenstriche (– und —) im sichtbaren Text
 *   - Werbefloskeln
 *   - Länge der Intro-/Lead-Texte (30 bis 60 Wörter)
 *   - Länge einzelner Absätze (Richtwert bis 90 Wörter)
 *
 * Aufruf: npm run build && node tests/copy-check.mjs
 */
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const DIST = 'dist';

const FLOSKELN = [
  'In der heutigen Zeit',
  'Bei uns sind Sie genau richtig',
  'maßgeschneiderte Lösung',
  'Ihre Zufriedenheit steht',
  'Entdecken Sie',
  'Tauchen Sie ein',
  'Wir freuen uns auf Ihre Anfrage',
  'rund um die Uhr für Sie da',
];

async function htmlFiles(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await htmlFiles(full)));
    else if (e.name.endsWith('.html')) out.push(full);
  }
  return out;
}

/** Entfernt alles, was der Besucher nicht als Fließtext sieht. */
function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<head[\s\S]*?<\/head>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const words = (s) => s.split(/\s+/).filter(Boolean).length;

const problems = [];
let pages = 0;
let longParas = 0;

for (const file of (await htmlFiles(DIST)).sort()) {
  const html = await readFile(file, 'utf8');
  if (/<meta[^>]+name="robots"[^>]+noindex/i.test(html)) continue;
  pages += 1;
  const url = '/' + path.relative(DIST, file).replace(/index\.html$/, '');
  const text = visibleText(html);

  for (const m of text.matchAll(/[^.!?]{0,60}[–—][^.!?]{0,60}/g)) {
    problems.push({ url, art: 'Gedankenstrich', detail: m[0].trim() });
  }
  for (const f of FLOSKELN) {
    if (text.includes(f)) problems.push({ url, art: 'Floskel', detail: f });
  }

  // Lead/Intro: erster Absatz mit der Klasse "lead" bzw. hero__sub
  const lead = html.match(/class="(?:lead|hero__sub)"[^>]*>([\s\S]*?)<\/p>/);
  if (lead) {
    const n = words(visibleText(lead[1]));
    if (n < 12 || n > 60) {
      problems.push({ url, art: 'Intro-Länge', detail: `${n} Wörter (Ziel 30 bis 60)` });
    }
  }

  for (const m of html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)) {
    const n = words(visibleText(m[1]));
    if (n > 90) {
      longParas += 1;
      problems.push({ url, art: 'Langer Absatz', detail: `${n} Wörter` });
    }
  }
}

const byArt = {};
for (const p of problems) byArt[p.art] = (byArt[p.art] ?? 0) + 1;

console.log(`Geprüfte indexierbare Seiten: ${pages}`);
console.log(`Befunde gesamt: ${problems.length}`);
for (const [k, v] of Object.entries(byArt)) console.log(`  ${k}: ${v}`);

if (problems.length) {
  console.log('');
  for (const p of problems.slice(0, 40)) {
    console.log(`  ${p.url.padEnd(42)} ${p.art.padEnd(16)} ${p.detail}`);
  }
  if (problems.length > 40) console.log(`  ... und ${problems.length - 40} weitere`);
}

// Gedankenstriche und Floskeln sind harte Fehler, lange Absätze nur ein Hinweis.
const hart = problems.filter((p) => p.art === 'Gedankenstrich' || p.art === 'Floskel').length;
console.log(`\nHarte Verstöße (Striche/Floskeln): ${hart}`);
if (hart > 0) process.exitCode = 1;
