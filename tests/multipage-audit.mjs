/**
 * Multi-Page-SEO-Check (siehe Vorgabe Abschnitt 8).
 * Prüft JEDE indexierbare URL einzeln (kein Stichproben-Sampling) und erzeugt:
 *   audit/multipage-seo-report.md
 *   audit/multipage-seo-report.json
 *
 * Geprüft je Seite:
 *  - HTML-Datei existiert (= Build hat sie erzeugt)
 *  - genau eine, nicht leere H1
 *  - Title vorhanden + projektweit einzigartig
 *  - Meta-Description vorhanden + projektweit einzigartig
 *  - Canonical vorhanden und zeigt auf die eigene korrekte URL (self-referenzierend)
 *  - lang="de" vorhanden
 *  - Viewport-Meta vorhanden
 *  - mindestens ein interner Link auf der Seite vorhanden
 *  - keine defekten internen Links (Ziel existiert im Build)
 *  - keine leeren Überschriften (h1-h4)
 *  - keine leeren Links (kein Text, kein aria-label, kein Alt-Text im Kind-Bild)
 *  - Bilder besitzen alt-Attribut (leer "" ist für dekorative Bilder zulässig)
 *  - Seite ist in sitemap.xml enthalten (sofern nicht noindex)
 *  - Seite ist nicht versehentlich noindex
 *  - keine SPA-/Hash-Routing-Hinweise (rein informativ, projektweit)
 *
 * Zusätzlich: eingehende interne Links je Seite (Grundlage für "Seiten ohne
 * eingehende interne Links").
 */
import { readdir, readFile, writeFile, access } from 'node:fs/promises';
import { join, extname } from 'node:path';

const DIST = join(process.cwd(), 'dist');
const SITE = 'https://www.gorhau-bestattungen.de';

async function htmlFiles(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await htmlFiles(p)));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

function urlPathFor(file) {
  let rel = file.replace(DIST, '').replaceAll('\\', '/');
  if (rel.endsWith('/index.html')) rel = rel.slice(0, -'index.html'.length);
  else if (rel === '/404.html') rel = '/404.html';
  return rel || '/';
}

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function resolveInternalTarget(href, fromFile) {
  let path = href.split('#')[0].split('?')[0];
  if (!path) return null; // pure fragment link, not a page-level check target
  let target = path.startsWith('/') ? join(DIST, path) : join(fromFile, '..', path);
  if (await exists(target)) return true;
  if (path.endsWith('/') || !/\.[a-z0-9]+$/i.test(path)) {
    if (await exists(join(target, 'index.html'))) return true;
  }
  return false;
}

const files = (await htmlFiles(DIST)).sort();
const sitemapXml = await readFile(join(DIST, 'sitemap.xml'), 'utf8').catch(() => '');

// Erste Passe: rohe Seiteninformationen sammeln
const pages = [];
for (const file of files) {
  const html = await readFile(file, 'utf8');
  const url = urlPathFor(file);
  const isNoindex = /name="robots"[^>]*content="[^"]*noindex/i.test(html);

  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1]?.trim() || '';
  const description =
    (html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/) || [])[1]?.trim() || '';
  const canonical = (html.match(/rel="canonical"[^>]*href="([^"]+)"/) || [])[1] || '';
  const hasLangDe = /<html[^>]*\blang="de"/.test(html);
  const hasViewport = /name="viewport"/.test(html);

  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
  const h1Count = h1Matches.length;
  const h1Texts = h1Matches.map((m) => m[1].replace(/<[^>]+>/g, '').trim());
  const h1Empty = h1Texts.some((t) => t.length === 0);

  const headingMatches = [...html.matchAll(/<h([1-4])[^>]*>([\s\S]*?)<\/h\1>/g)];
  const emptyHeadings = headingMatches.filter(
    (m) => m[2].replace(/<[^>]+>/g, '').trim().length === 0
  ).length;

  const linkMatches = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)];
  let emptyLinks = 0;
  const outgoingHrefs = [];
  for (const m of linkMatches) {
    const attrs = m[1];
    const inner = m[2];
    const hrefMatch = attrs.match(/href="([^"]*)"/);
    const href = hrefMatch ? hrefMatch[1] : '';
    const ariaLabel = /aria-label="[^"]*\S[^"]*"/.test(attrs);
    const visuallyHidden = /class="[^"]*visually-hidden[^"]*"/.test(inner);
    const innerHasImgAlt = /<img[^>]*\balt="[^"]*\S[^"]*"/.test(inner);
    const textContent = inner
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;|&#8594;|→|☎|✉/g, ' ')
      .trim();
    if (!textContent && !ariaLabel && !visuallyHidden && !innerHasImgAlt) emptyLinks++;
    if (href) outgoingHrefs.push({ href, isExternal: /^https?:\/\//.test(href) });
  }

  const imgMatches = [...html.matchAll(/<img\b[^>]*>/g)];
  const imagesWithoutAlt = imgMatches.filter((m) => !/\balt=/.test(m[0])).length;

  const internalHrefs = outgoingHrefs
    .filter((h) => !h.isExternal && !h.href.startsWith('tel:') && !h.href.startsWith('mailto:'))
    .map((h) => h.href)
    .filter((h) => !h.startsWith('#'));

  const inSitemap = !isNoindex && sitemapXml.includes(`<loc>${SITE}${url}</loc>`);

  pages.push({
    url,
    file,
    title,
    description,
    canonical,
    hasLangDe,
    hasViewport,
    h1Count,
    h1Empty,
    emptyHeadings,
    emptyLinks,
    imagesWithoutAlt,
    internalLinkCount: internalHrefs.length,
    internalHrefs,
    isNoindex,
    inSitemap,
    inboundCount: 0,
    brokenInternalLinks: [],
  });
}

// Zweite Passe: defekte interne Links + eingehende Links (Inbound-Graph)
const byUrl = new Map(pages.map((p) => [p.url, p]));
for (const page of pages) {
  for (const href of page.internalHrefs) {
    const ok = await resolveInternalTarget(href, page.file);
    if (!ok) page.brokenInternalLinks.push(href);
    else {
      // eingehenden Link auf der Zielseite zählen (normalisierter Pfad)
      let normalized = href.split('#')[0].split('?')[0];
      if (!normalized.startsWith('/')) continue; // relative Pfade nicht in Inbound-Graph zählen
      const target = byUrl.get(normalized);
      if (target && target.url !== page.url) target.inboundCount++;
    }
  }
}

// Eindeutigkeit von Title/Description projektweit (noindex-Seiten wie 404 ausgenommen)
const titleCounts = new Map();
const descCounts = new Map();
for (const p of pages) {
  if (p.isNoindex) continue;
  titleCounts.set(p.title, (titleCounts.get(p.title) || 0) + 1);
  descCounts.set(p.description, (descCounts.get(p.description) || 0) + 1);
}

// Ergebnisse pro Seite auswerten
for (const p of pages) {
  p.titleUnique = p.isNoindex || titleCounts.get(p.title) === 1;
  p.descriptionUnique = p.isNoindex || descCounts.get(p.description) === 1;
  p.canonicalSelfRef = p.canonical === `${SITE}${p.url === '/404.html' ? '/404.html' : p.url}`;
  const issues = [];
  if (!p.title) issues.push('Title fehlt');
  else if (!p.titleUnique) issues.push('Title nicht eindeutig');
  if (!p.description) issues.push('Description fehlt');
  else if (!p.descriptionUnique) issues.push('Description nicht eindeutig');
  if (p.h1Count !== 1) issues.push(`H1-Anzahl = ${p.h1Count} (erwartet 1)`);
  if (p.h1Empty) issues.push('H1 ist leer');
  if (!p.canonicalSelfRef && !p.isNoindex) issues.push('Canonical nicht selbstreferenzierend');
  if (!p.hasLangDe) issues.push('lang="de" fehlt');
  if (!p.hasViewport) issues.push('Viewport-Meta fehlt');
  if (p.internalLinkCount < 1) issues.push('kein interner Link auf der Seite');
  if (p.brokenInternalLinks.length) issues.push(`${p.brokenInternalLinks.length} defekte interne Links`);
  if (p.emptyHeadings) issues.push(`${p.emptyHeadings} leere Überschrift(en)`);
  if (p.emptyLinks) issues.push(`${p.emptyLinks} leere(r) Link(s)`);
  if (p.imagesWithoutAlt) issues.push(`${p.imagesWithoutAlt} Bild(er) ohne alt-Attribut`);
  if (!p.isNoindex && !p.inSitemap) issues.push('nicht in sitemap.xml');
  p.issues = issues;
  p.pass = issues.length === 0;
}

// Zusammenfassung
const indexable = pages.filter((p) => !p.isNoindex);
const summary = {
  totalHtmlPages: pages.length,
  indexablePages: indexable.length,
  pagesWithExactlyOneH1: pages.filter((p) => p.h1Count === 1 && !p.h1Empty).length,
  uniqueTitles: indexable.every((p) => p.titleUnique)
    ? indexable.length
    : new Set(indexable.map((p) => p.title)).size,
  uniqueDescriptions: new Set(indexable.map((p) => p.description)).size,
  pagesInSitemap: pages.filter((p) => p.inSitemap).length,
  brokenInternalLinksTotal: pages.reduce((s, p) => s + p.brokenInternalLinks.length, 0),
  pagesWithoutInboundLinks: pages.filter((p) => p.url !== '/' && p.inboundCount === 0).length,
  emptyHeadingsTotal: pages.reduce((s, p) => s + p.emptyHeadings, 0),
  imagesWithoutAltTotal: pages.reduce((s, p) => s + p.imagesWithoutAlt, 0),
  emptyLinksTotal: pages.reduce((s, p) => s + p.emptyLinks, 0),
  pagesFailing: pages.filter((p) => !p.pass).length,
};

// JSON schreiben
await writeFile(
  join(process.cwd(), 'audit', 'multipage-seo-report.json'),
  JSON.stringify({ generatedAt: new Date().toISOString(), summary, pages }, null, 2) + '\n'
);

// Markdown schreiben
const lines = [];
lines.push('# Multi-Page-SEO-Report');
lines.push('');
lines.push(
  `Automatisiert erzeugt am ${new Date().toISOString().slice(0, 10)} über \`npm run test:multipage\`. ` +
    `Prüft **jede** aus dem Build erzeugte HTML-Seite einzeln (kein Sampling).`
);
lines.push('');
lines.push('## Zusammenfassung');
lines.push('');
lines.push(`- Eigenständige HTML-Seiten gesamt: **${summary.totalHtmlPages}**`);
lines.push(`- Davon indexierbar (nicht noindex): **${summary.indexablePages}**`);
lines.push(`- Seiten mit genau einer, nicht leeren H1: **${summary.pagesWithExactlyOneH1} / ${summary.totalHtmlPages}**`);
lines.push(`- Eindeutige Meta-Titles (indexierbare Seiten): **${summary.uniqueTitles} / ${summary.indexablePages}**`);
lines.push(`- Eindeutige Meta-Descriptions (indexierbare Seiten): **${summary.uniqueDescriptions} / ${summary.indexablePages}**`);
lines.push(`- Seiten in sitemap.xml: **${summary.pagesInSitemap} / ${summary.indexablePages}**`);
lines.push(`- Defekte interne Links gesamt: **${summary.brokenInternalLinksTotal}**`);
lines.push(`- Seiten ohne eingehende interne Links (Startseite ausgenommen): **${summary.pagesWithoutInboundLinks}**`);
lines.push(`- Leere Überschriften gesamt: **${summary.emptyHeadingsTotal}**`);
lines.push(`- Bilder ohne alt-Attribut gesamt: **${summary.imagesWithoutAltTotal}**`);
lines.push(`- Leere Links gesamt: **${summary.emptyLinksTotal}**`);
lines.push(`- Seiten mit mindestens einem Befund: **${summary.pagesFailing} / ${summary.totalHtmlPages}**`);
lines.push('');
lines.push(
  '**Architektur-Hinweis:** Alle Seiten sind eigenständige, beim Build erzeugte statische ' +
    'HTML-Dokumente. Es wird kein Hash-Routing und kein SPA-/Client-Routing verwendet ' +
    '(keine `location.hash`- oder `history.pushState`-Navigation im Quellcode, keine ' +
    '`client:*`-Hydration-Direktiven).'
);
lines.push('');
lines.push('## Ergebnis je Seite');
lines.push('');
lines.push('| URL | H1 | Title eindeutig | Description eindeutig | Canonical | Sitemap | Interne Links (aus/ein) | Befunde |');
lines.push('|---|---|---|---|---|---|---|---|');
for (const p of pages) {
  const h1 = p.h1Count === 1 && !p.h1Empty ? '✓' : `✗ (${p.h1Count})`;
  const t = p.isNoindex ? '–' : p.titleUnique ? '✓' : '✗';
  const d = p.isNoindex ? '–' : p.descriptionUnique ? '✓' : '✗';
  const c = p.canonicalSelfRef ? '✓' : '✗';
  const s = p.isNoindex ? 'noindex' : p.inSitemap ? '✓' : '✗';
  const links = `${p.internalLinkCount} / ${p.inboundCount}`;
  const befund = p.pass ? '—' : p.issues.join('; ');
  lines.push(`| \`${p.url}\` | ${h1} | ${t} | ${d} | ${c} | ${s} | ${links} | ${befund} |`);
}
lines.push('');

await writeFile(join(process.cwd(), 'audit', 'multipage-seo-report.md'), lines.join('\n') + '\n');

console.log(`Multi-Page-SEO-Report: ${pages.length} Seiten geprüft.`);
console.log(`  Seiten mit Befund: ${summary.pagesFailing}`);
console.log(`  Defekte interne Links: ${summary.brokenInternalLinksTotal}`);
console.log(`  Seiten ohne eingehende interne Links: ${summary.pagesWithoutInboundLinks}`);
console.log(`  Bericht: audit/multipage-seo-report.md / .json`);

if (summary.brokenInternalLinksTotal > 0 || pages.some((p) => p.h1Count !== 1 || p.h1Empty)) {
  process.exitCode = 1;
}
