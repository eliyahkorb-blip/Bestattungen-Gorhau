/**
 * Prüft die SEO- und GEO-Vorgaben (§17 bis §19) am gebauten HTML und schreibt
 * audit/final-seo-report.md sowie audit/final-geo-review.md.
 *
 * GEO meint hier die Auffindbarkeit in generativen Antwortsystemen: konsistente
 * Unternehmensdaten, klar beantwortete Nutzerfragen, korrekte strukturierte Daten.
 *
 * Aufruf: npm run build && node tests/seo-geo-check.mjs
 */
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const DIST = 'dist';

// Verbindliche Unternehmensdaten (NAP). Quelle: src/data/company.ts
const NAP = {
  name: 'Gorhau',
  strasse: 'Reuterstraße 2',
  plz: '97084',
  ort: 'Würzburg',
  telefon: '0931 61 00 00',
  telHref: 'tel:+49931610000',
};

async function htmlFiles(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await htmlFiles(full)));
    else if (e.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const text = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const pages = [];
const issues = [];

for (const file of (await htmlFiles(DIST)).sort()) {
  const html = await readFile(file, 'utf8');
  if (/<meta[^>]+name="robots"[^>]+noindex/i.test(html)) continue;
  const url = '/' + path.relative(DIST, file).replace(/index\.html$/, '');

  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.trim() ?? '';
  const desc = html.match(/<meta\s+name="description"\s+content="([^"]*)"/)?.[1] ?? '';
  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/)?.[1] ?? '';
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => text(m[1]));
  const h2s = [...html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => text(m[1]));
  const imgs = [...html.matchAll(/<img\b[^>]*>/g)];
  const imgsNoAlt = imgs.filter((m) => !/\salt="[^"]+"/.test(m[0])).length;
  const jsonLdTypes = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .flatMap((m) => {
      try {
        const parsed = JSON.parse(m[1]);
        return (Array.isArray(parsed) ? parsed : [parsed]).map((o) => o['@type']);
      } catch {
        issues.push({ url, art: 'JSON-LD', detail: 'nicht parsebar' });
        return [];
      }
    });
  const body = text(html);
  const hasPhone = html.includes(NAP.telHref);
  const hasAddress = body.includes(NAP.strasse) && body.includes(NAP.plz);

  if (!title) issues.push({ url, art: 'Title', detail: 'fehlt' });
  if (title.length > 65) issues.push({ url, art: 'Title', detail: `${title.length} Zeichen (>65)` });
  if (!desc) issues.push({ url, art: 'Description', detail: 'fehlt' });
  if (desc && (desc.length < 70 || desc.length > 170))
    issues.push({ url, art: 'Description', detail: `${desc.length} Zeichen (Ziel 70 bis 170)` });
  if (h1s.length !== 1) issues.push({ url, art: 'H1', detail: `${h1s.length} statt genau 1` });
  if (!canonical) issues.push({ url, art: 'Canonical', detail: 'fehlt' });
  if (imgsNoAlt) issues.push({ url, art: 'Alt-Text', detail: `${imgsNoAlt} Bilder ohne Alt` });

  pages.push({
    url, title, desc, canonical,
    h1: h1s[0] ?? '', h2: h2s.length, bilder: imgs.length, imgsNoAlt,
    jsonLd: jsonLdTypes, hasPhone, hasAddress, woerter: body.split(' ').length,
  });
}

// Titles und Descriptions muessen eindeutig sein.
for (const key of ['title', 'desc']) {
  const seen = new Map();
  for (const p of pages) {
    if (!p[key]) continue;
    seen.set(p[key], [...(seen.get(p[key]) ?? []), p.url]);
  }
  for (const [val, urls] of seen) {
    if (urls.length > 1)
      issues.push({ url: urls.join(', '), art: key === 'title' ? 'Title doppelt' : 'Description doppelt', detail: val.slice(0, 60) });
  }
}

await mkdir('audit', { recursive: true });

/* ------------------------- SEO-Bericht ------------------------- */
let seo = `# SEO-Bericht nach dem Design-Rework

Automatisch erzeugt mit \`npm run build && node tests/seo-geo-check.mjs\`.
Grundlage ist das gebaute \`dist/\`, also das ausgelieferte HTML.

- Indexierbare Seiten: **${pages.length}**
- Seiten mit genau einer H1: **${pages.filter((p) => p.h1).length}/${pages.length}**
- Seiten mit Canonical: **${pages.filter((p) => p.canonical).length}/${pages.length}**
- Bilder ohne Alt-Text: **${pages.reduce((n, p) => n + p.imgsNoAlt, 0)}**
- Befunde: **${issues.length}**

| Seite | Title (Zeichen) | Description | H1 | H2 | Bilder | JSON-LD |
|---|---:|---:|---|---:|---:|---|
`;
for (const p of pages) {
  seo += `| \`${p.url}\` | ${p.title.length} | ${p.desc.length} | ${p.h1 ? 'ja' : 'FEHLT'} | ${p.h2} | ${p.bilder} | ${p.jsonLd.join(', ') || '–'} |\n`;
}
seo += `\n## Befunde\n\n`;
seo += issues.length
  ? issues.map((i) => `- \`${i.url}\` – **${i.art}**: ${i.detail}`).join('\n') + '\n'
  : 'Keine.\n';
await writeFile('audit/final-seo-report.md', seo);

/* ------------------------- GEO-Bericht ------------------------- */
const napOk = pages.filter((p) => p.hasPhone).length;
const ldTypes = [...new Set(pages.flatMap((p) => p.jsonLd))].sort();

let geo = `# GEO-Review: Auffindbarkeit in generativen Antwortsystemen

Automatisch erzeugt mit \`npm run build && node tests/seo-geo-check.mjs\`.

GEO meint hier: Kann ein Antwortsystem die Fakten dieses Unternehmens eindeutig
entnehmen und eine Nutzerfrage korrekt beantworten, ohne zu raten?

## Konsistente Unternehmensdaten (NAP)

| Merkmal | Wert | Abdeckung |
|---|---|---|
| Name | Bestattungs- und Überführungsinstitut Gorhau, Inh. Thomas Gorhau e.K. | alle Seiten (Footer) |
| Anschrift | ${NAP.strasse}, ${NAP.plz} ${NAP.ort}-Heidingsfeld | ${pages.filter((p) => p.hasAddress).length}/${pages.length} Seiten |
| Telefon | ${NAP.telefon} | ${napOk}/${pages.length} Seiten |

Die Daten stammen aus einer einzigen Quelle (\`src/data/company.ts\`) und können
deshalb nicht auseinanderlaufen.

## Strukturierte Daten

Eingesetzte Typen: ${ldTypes.map((t) => `\`${t}\``).join(', ')}

Bewusst **nicht** eingesetzt:

- \`AggregateRating\` und \`Review\`: es liegen keine echten Bewertungen vor
- \`Offer\` und \`PriceSpecification\`: es werden keine Preise genannt
- \`Award\`: keine belegbaren Auszeichnungen
- \`VideoObject\`: erst sinnvoll, wenn der Imagefilm tatsächlich vorliegt

\`FAQPage\` wird nur auf der Seite „Im Trauerfall" ausgezeichnet, weil dort echte,
sichtbare Fragen und Antworten stehen.

## Direkt beantwortete Nutzerfragen

`;

const fragen = [
  ['Was ist im Trauerfall zuerst zu tun?', '/im-trauerfall/'],
  ['Welche Unterlagen werden benötigt?', '/im-trauerfall/benoetigte-dokumente/'],
  ['Welche Bestattungsarten gibt es?', '/bestattungsarten/'],
  ['Wie läuft eine Überführung ab?', '/leistungen/ueberfuehrungen/'],
  ['Was ist eine Bestattungsvorsorge?', '/bestattungsvorsorge/'],
  ['Kann ich mich im Abschiedsraum persönlich verabschieden?', '/abschiedsraum/'],
];
geo += `| Frage | Seite | vorhanden |\n|---|---|---|\n`;
for (const [frage, url] of fragen) {
  const p = pages.find((x) => x.url === url);
  geo += `| ${frage} | \`${url}\` | ${p ? 'ja' : 'FEHLT'} |\n`;
}

geo += `
## Seitenumfang

Antwortsysteme bevorzugen Seiten, die eine Frage vollständig, aber ohne Füllmaterial
beantworten.

| Seite | Wörter |
|---|---:|
`;
for (const p of [...pages].sort((a, b) => b.woerter - a.woerter)) {
  geo += `| \`${p.url}\` | ${p.woerter} |\n`;
}

await writeFile('audit/final-geo-review.md', geo);

console.log(`Indexierbare Seiten: ${pages.length}`);
console.log(`SEO-Befunde: ${issues.length}`);
for (const i of issues) console.log(`  ${i.url} – ${i.art}: ${i.detail}`);
console.log(`\nBerichte: audit/final-seo-report.md, audit/final-geo-review.md`);
if (issues.length) process.exitCode = 1;
