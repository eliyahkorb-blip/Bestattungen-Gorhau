/**
 * Erzeugt die Bilddokumentation aus dem tatsächlichen Stand:
 *
 *   audit/unsplash-image-inventory.md   Inventur aller hochgeladenen Ausgangsbilder
 *   audit/unsplash-image-inventory.json dieselbe Inventur maschinenlesbar
 *   audit/final-image-coverage.md       Bildabdeckung pro indexierbarer Seite
 *   docs/IMAGE-SOURCE-AND-LICENSES.md   Quellen und Lizenzen der Stockbilder
 *
 * Die Seitenabdeckung wird aus dem gebauten dist/ gelesen, nicht aus den
 * Quelldateien – so beschreibt der Bericht, was Besucher wirklich sehen.
 *
 * Aufruf: npm run build && npm run audit:images
 */
import { readFile, writeFile, readdir, stat, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { stockImages, abgelehnt } from './stock-images.config.mjs';

const SRC_DIR = 'incoming-assets/unsplash-originals';
const DIST = 'dist';

/* ------------------------------------------------------------------ *
 * 1. Inventur der Ausgangsbilder
 * ------------------------------------------------------------------ */

const verwendung = new Map();
for (const img of stockImages) verwendung.set(img.quelle, img);
const verworfen = new Map();
for (const a of abgelehnt) verworfen.set(a.quelle, a);

function colourName(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2 / 255;
  const d = max - min;
  const s = d === 0 ? 0 : d / (255 - Math.abs(max + min - 255));
  if (s < 0.12) return l > 0.75 ? 'Weiß' : l > 0.45 ? 'Hellgrau' : l > 0.2 ? 'Grau' : 'Anthrazit';
  let h;
  if (max === r) h = 60 * (((g - b) / d) % 6);
  else if (max === g) h = 60 * ((b - r) / d + 2);
  else h = 60 * ((r - g) / d + 4);
  if (h < 0) h += 360;
  const dark = l < 0.3;
  if (h < 15 || h >= 345) return dark ? 'Dunkelrot' : 'Rot';
  if (h < 45) return dark ? 'Braun' : l > 0.7 ? 'Creme' : 'Orange';
  if (h < 70) return dark ? 'Olive' : 'Gelb';
  if (h < 160) return dark ? 'Dunkelgrün' : 'Grün';
  if (h < 200) return dark ? 'Petrol' : 'Türkis';
  if (h < 255) return dark ? 'Dunkelblau' : 'Blau';
  if (h < 290) return 'Violett';
  return 'Magenta';
}

async function dominantColours(file) {
  const { data } = await sharp(file)
    .resize(16, 16, { fit: 'inside' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const buckets = new Map();
  for (let i = 0; i < data.length; i += 3) {
    const key = [data[i], data[i + 1], data[i + 2]].map((v) => Math.round(v / 32) * 32).join(',');
    const e = buckets.get(key) ?? { n: 0, r: 0, g: 0, b: 0 };
    e.n += 1;
    e.r += data[i];
    e.g += data[i + 1];
    e.b += data[i + 2];
    buckets.set(key, e);
  }
  const total = data.length / 3;
  return [...buckets.values()]
    .sort((a, b) => b.n - a.n)
    .slice(0, 3)
    .map((e) => {
      const r = Math.round(e.r / e.n);
      const g = Math.round(e.g / e.n);
      const b = Math.round(e.b / e.n);
      return {
        hex: '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join(''),
        name: colourName(r, g, b),
        anteil: Math.round((e.n / total) * 100),
      };
    });
}

/**
 * Beobachtungen, die sich nicht aus Pixeln ableiten lassen, sondern aus der
 * Sichtprüfung jedes einzelnen Bildes stammen.
 */
const sichtpruefung = {
  'salah-ait-mokhtar-EBzTou1x5WM-unsplash.jpg': {
    motiv: 'Weiter Blick über Würzburg im Abendlicht, Festung Marienberg auf dem Hügel, Weinberge rechts',
    stimmung: 'warm, golden, weit, regional verankert',
    personen: false,
    marken: false,
    recht: 'Öffentliche Stadtansicht aus der Distanz; keine Personen, keine lesbaren Marken.',
    mobil: 'gut – 3:2-Zuschnitt hält die Stadt vollständig im Bild',
  },
  'cristian-lopez-lWMMK0teQK8-unsplash.jpg': {
    motiv: 'Würzburger Hang mit Käppele und Kirche, Herbstlaub, Weinberg und Festungsmauer',
    stimmung: 'warm, herbstlich, ruhig, regional',
    personen: false,
    marken: false,
    recht: 'Öffentliche Stadtansicht; parkende Autos nur klein und ohne lesbare Kennzeichen.',
    mobil: 'gut',
  },
  'dan-meyers-f1WMJR8pLqo-unsplash.jpg': {
    motiv: 'Sonne über einer geschlossenen Wolkendecke, Blick von oben',
    stimmung: 'hell, weit, tröstlich, offen',
    personen: false,
    marken: false,
    recht: 'Reines Naturmotiv, unkritisch.',
    mobil: 'gut',
  },
  'vidar-nordli-mathisen-nvlB39rzdQE-unsplash.jpg': {
    motiv: 'Zwei Trauernde von hinten, eine Person lehnt den Kopf an die Schulter der anderen',
    stimmung: 'menschlich, nah, getragen',
    personen: true,
    marken: false,
    recht:
      'Personen sind ausschließlich von hinten zu sehen, keine Gesichter erkennbar und damit ' +
      'nicht identifizierbar. Darf nie als Gorhau-Kundschaft oder -Personal bezeichnet werden.',
    mobil: 'gut – bewusst ohne Zuschnitt, damit keine Köpfe angeschnitten werden',
  },
  'eli-solitas-q6e4zwgtUcM-unsplash.jpg': {
    motiv: 'Reihe brennender Opferkerzen, warmes Licht vor dunklem Hintergrund',
    stimmung: 'warm, still, würdevoll',
    personen: false,
    marken: false,
    recht: 'Unkritisches Detailmotiv.',
    mobil: 'gut',
  },
  'mayron-oliveira-mibn6LLm9kA-unsplash.jpg': {
    motiv: 'Zarter Strauß aus rosa Lisianthus und weißen Astern auf einem Holzsarg, von oben',
    stimmung: 'hell, zart, respektvoll',
    personen: false,
    marken: false,
    recht: 'Unkritisches Detailmotiv, kein Bezug zu einer konkreten Person.',
    mobil: 'gut',
  },
  'inline-01.jpg': {
    motiv: 'Blumengeschmückter Weidensarg auf einem Rollwagen vor einem geöffneten Kremationsofen',
    stimmung: 'technisch, kühl trotz Blumenschmuck',
    personen: false,
    marken: true,
    recht:
      'Englischsprachige Sicherheitsaufkleber und Anlagentechnik eines fremden Krematoriums ' +
      'deutlich sichtbar – könnte fälschlich als Gorhau-Ausstattung gelesen werden.',
    mobil: 'eingeschränkt',
  },
  'inline-02.jpg': {
    motiv: 'Tiefblaues Meer mit heller Gischt, Blick von oben',
    stimmung: 'tief, klar, bewegt',
    personen: false,
    marken: false,
    recht: 'Reines Naturmotiv, unkritisch.',
    mobil: 'gut',
  },
  'inline-03.jpg': {
    motiv: 'Ruhige See mit weitem Horizont unter Wolkenhimmel',
    stimmung: 'weit, ruhig, hell',
    personen: false,
    marken: false,
    recht: 'Reines Naturmotiv, unkritisch.',
    mobil: 'gut',
  },
  'inline-04.jpg': {
    motiv: 'Gepflegte Gräberreihe mit Blumenbepflanzung und Grablichtern im Sonnenlicht',
    stimmung: 'hell, gepflegt, ruhig',
    personen: false,
    marken: false,
    recht:
      'Auf den Grabsteinen stehen Namen realer Verstorbener. In den ausgelieferten Größen sind ' +
      'sie nicht entzifferbar; das Original wird nicht veröffentlicht.',
    mobil: 'gut',
  },
  'inline-05.jpg': {
    motiv: 'Bronzener Trauerengel auf einem historischen Grabmal, Herbstlaub',
    stimmung: 'dunkel, schwermütig, melancholisch',
    personen: false,
    marken: false,
    recht: 'Namen realer Verstorbener auf den umliegenden Grabmalen sind gut lesbar.',
    mobil: 'eingeschränkt',
  },
};

const dateien = (await readdir(SRC_DIR)).filter((f) => /\.jpe?g$/i.test(f)).sort();
const inventar = [];

for (const datei of dateien) {
  const full = path.join(SRC_DIR, datei);
  const meta = await sharp(full).metadata();
  const { size } = await stat(full);
  const stats = await sharp(full).stats();
  const helligkeit = Math.round(
    (stats.channels.slice(0, 3).reduce((s, c) => s + c.mean, 0) / 3 / 255) * 100
  );
  const ratio = meta.width / meta.height;
  const genutzt = verwendung.get(datei);
  const abgelehntEintrag = verworfen.get(datei);
  const sicht = sichtpruefung[datei] ?? {};

  inventar.push({
    datei,
    herkunft: datei.startsWith('inline-')
      ? 'Vom Auftraggeber bereitgestellt (Einzel-Upload, ohne Originaldateinamen)'
      : 'Unsplash-Auswahl des Auftraggebers (Originaldateiname erhalten)',
    breite: meta.width,
    hoehe: meta.height,
    seitenverhaeltnis: Number(ratio.toFixed(3)),
    seitenverhaeltnis_text:
      ratio > 1.85 ? '~2:1' : ratio > 1.6 ? '~16:9' : ratio > 1.4 ? '~3:2' : ratio > 1.2 ? '~4:3' : 'quadratisch/hoch',
    megapixel: Number(((meta.width * meta.height) / 1e6).toFixed(1)),
    dateigroesse_kb: Math.round(size / 1024),
    helligkeit_prozent: helligkeit,
    farben: await dominantColours(full),
    motiv: sicht.motiv ?? null,
    stimmung: sicht.stimmung ?? null,
    personen_sichtbar: sicht.personen ?? null,
    marken_logos_sichtbar: sicht.marken ?? null,
    rechtliche_hinweise: sicht.recht ?? null,
    eignung_hero: genutzt?.rolle === 'hero' ? 'ja – als Hero eingesetzt' : meta.width >= 2400 && ratio >= 1.5 ? 'technisch möglich' : 'nein (zu klein oder zu hoch)',
    eignung_content: meta.width >= 1600 ? 'ja' : 'eingeschränkt',
    eignung_mobil: sicht.mobil ?? null,
    moegliche_seiten: genutzt?.seiten ?? [],
    status: genutzt ? 'verwenden' : abgelehntEintrag ? 'nicht verwenden' : 'eventuell verwenden',
    eingesetzt_als: genutzt?.name ?? null,
    begruendung: abgelehntEintrag?.grund ?? genutzt?.einsatz ?? null,
  });
}

await mkdir('audit', { recursive: true });
await writeFile('audit/unsplash-image-inventory.json', JSON.stringify(inventar, null, 2) + '\n');

const ja = (v) => (v === true ? 'ja' : v === false ? 'nein' : '–');
let md = `# Bildinventur – hochgeladenes Unsplash-Paket

Automatisch erzeugt mit \`npm run audit:images\`. Technische Werte stammen aus der
Bildanalyse, die Motiv- und Rechtsangaben aus der Sichtprüfung jedes einzelnen Bildes.

**${inventar.length} Ausgangsbilder** · verwendet: **${inventar.filter((i) => i.status === 'verwenden').length}** ·
verworfen: **${inventar.filter((i) => i.status === 'nicht verwenden').length}**

Alle Motive dieses Pakets sind allgemeine Stockbilder. Keines zeigt das
Bestattungsinstitut Gorhau, seine Räume, Fahrzeuge, Mitarbeitenden oder Kundschaft.

`;

for (const i of inventar) {
  md += `## ${i.datei}

| | |
|---|---|
| Herkunft | ${i.herkunft} |
| Abmessungen | ${i.breite} × ${i.hoehe} px (${i.seitenverhaeltnis_text}, ${i.megapixel} MP) |
| Dateigröße | ${i.dateigroesse_kb} KB |
| Helligkeit | ${i.helligkeit_prozent} % |
| Vorherrschende Farben | ${i.farben.map((f) => `${f.name} \`${f.hex}\` (${f.anteil} %)`).join(', ')} |
| Motiv | ${i.motiv ?? '–'} |
| Stimmung | ${i.stimmung ?? '–'} |
| Personen sichtbar | ${ja(i.personen_sichtbar)} |
| Marken/Logos sichtbar | ${ja(i.marken_logos_sichtbar)} |
| Rechtliche Vorsichtspunkte | ${i.rechtliche_hinweise ?? '–'} |
| Eignung Hero | ${i.eignung_hero} |
| Eignung Content | ${i.eignung_content} |
| Eignung Mobil | ${i.eignung_mobil ?? '–'} |
| Mögliche Seiten | ${i.moegliche_seiten.length ? i.moegliche_seiten.join(', ') : '–'} |
| **Bewertung** | **${i.status}** |
| Begründung | ${i.begruendung ?? '–'} |

`;
}

await writeFile('audit/unsplash-image-inventory.md', md);

/* ------------------------------------------------------------------ *
 * 2. Bildabdeckung pro Seite (aus dist/)
 * ------------------------------------------------------------------ */

async function htmlFiles(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await htmlFiles(full)));
    else if (e.name === 'index.html') out.push(full);
  }
  return out;
}

const ohneBildAbsicht = new Set(['/impressum/', '/datenschutz/', '/barrierefreiheit/']);
const seiten = [];

for (const file of (await htmlFiles(DIST)).sort()) {
  const html = await readFile(file, 'utf8');
  if (/<meta[^>]+name="robots"[^>]+noindex/i.test(html)) continue;
  const url = '/' + path.relative(DIST, file).replace(/index\.html$/, '');

  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  const srcs = imgs
    .map((tag) => tag.match(/\ssrc="([^"]+)"/)?.[1])
    .filter(Boolean)
    // Logo und Favicons zählen nicht als Inhaltsbild
    .filter((s) => !/\/(logo|favicon|apple-touch)/i.test(s));
  const alts = imgs.map((tag) => tag.match(/\salt="([^"]*)"/)?.[1]).filter((a) => a !== undefined);
  const stock = srcs.filter((s) => s.includes('/images/stock/'));
  const echte = srcs.filter((s) => s.includes('/images/') && !s.includes('/images/stock/'));
  const illus = (html.match(/class="[^"]*\bmotif\b/g) ?? []).length;
  const heroTag = imgs.find((t) => /loading="eager"/.test(t));

  seiten.push({
    url,
    bilder: srcs.length,
    einzigartig: new Set(srcs).size,
    hero: heroTag ? (heroTag.match(/\ssrc="([^"]+)"/)?.[1] ?? '').split('/').pop() : null,
    echtesGorhauBild: echte.length > 0,
    stockbild: stock.length > 0,
    illustrationen: illus,
    altFehlend: imgs.length - alts.filter((a) => a.trim().length > 0).length,
    absichtlichOhneBild: ohneBildAbsicht.has(url),
  });
}

const ohneBilder = seiten.filter((s) => s.bilder === 0 && !s.absichtlichOhneBild);

let cov = `# Bildabdeckung nach der Stockbild-Integration

Automatisch erzeugt mit \`npm run build && npm run audit:images\` aus dem gebauten \`dist/\`.
Gezählt werden Inhaltsbilder; Logo und Favicons bleiben außen vor.

- Indexierbare Seiten: **${seiten.length}**
- Seiten mit mindestens einem Bild: **${seiten.filter((s) => s.bilder > 0).length}**
- Seiten mit echtem Gorhau-Foto: **${seiten.filter((s) => s.echtesGorhauBild).length}**
- Seiten mit allgemeinem Stockbild: **${seiten.filter((s) => s.stockbild).length}**
- Fehlende Alt-Texte: **${seiten.reduce((n, s) => n + s.altFehlend, 0)}**

| Seite | Bilder | einzigartig | Hero (eager) | echtes Gorhau-Foto | Stockbild | Illustrationen | Alt fehlt |
|---|---:|---:|---|---|---|---:|---:|
`;
for (const s of seiten) {
  cov += `| \`${s.url}\` | ${s.bilder} | ${s.einzigartig} | ${s.hero ?? '–'} | ${s.echtesGorhauBild ? 'ja' : 'nein'} | ${s.stockbild ? 'ja' : 'nein'} | ${s.illustrationen} | ${s.altFehlend} |\n`;
}

cov += `
## Seiten ohne Inhaltsbild

`;
if (ohneBilder.length === 0) {
  cov += 'Keine – abgesehen von den bewusst bildfreien Rechtstexten (Impressum, Datenschutz, Barrierefreiheit).\n';
} else {
  cov += 'Diesen Seiten fehlt passendes Bildmaterial. Sie brauchen zusätzliche Aufnahmen:\n\n';
  for (const s of ohneBilder) cov += `- \`${s.url}\`\n`;
}

cov += `
Impressum, Datenschutz und Barrierefreiheit bleiben absichtlich ohne Bild – dort stört
Bildsprache die Lesbarkeit der Rechtstexte.
`;

await writeFile('audit/final-image-coverage.md', cov);

/* ------------------------------------------------------------------ *
 * 3. Quellen und Lizenzen
 * ------------------------------------------------------------------ */

let lic = `
_Automatisch erzeugt von \`scripts/report-images.mjs\` – nicht von Hand bearbeiten._

Der Dateiname der gelieferten Originale enthält bei den meisten Bildern Fotograf und
Unsplash-Bild-ID; daraus ergibt sich die Quellenangabe. Wo der Originaldateiname nicht
mehr vorlag, ist die Quelle als vom Auftraggeber bereitgestellt markiert und **nicht**
rekonstruiert worden.

**Keines dieser Bilder zeigt Räume, Fahrzeuge, Gebäude, Mitarbeitende oder Kundschaft des
Bestattungsinstituts Gorhau.** Alt-Texte und Bildunterschriften sind entsprechend neutral
formuliert.

`;

for (const img of stockImages) {
  const inv = inventar.find((i) => i.datei === img.quelle);
  lic += `### ${img.name}

- **Lokale Dateien:** \`public/images/stock/${img.name}-{Breite}.{avif,webp,jpg}\`
- **Ursprünglicher Dateiname:** \`${img.quelle}\`
- **Fotograf:** ${img.fotograf ?? 'nicht überliefert'}
- **Quelle:** ${
    img.unsplashId
      ? `Unsplash – https://unsplash.com/photos/${img.unsplashId}`
      : 'Quelle vom Auftraggeber bereitgestellt / Unsplash-Auswahl (Originaldateiname lag nicht vor)'
  }
- **Lizenz:** Unsplash-Lizenz (kostenlose kommerzielle Nutzung, keine Namensnennung verpflichtend); Auswahl und Freigabe durch den Auftraggeber
- **Motiv:** ${img.motiv}
- **Eingesetzt auf:** ${img.seiten.join(', ')}
- **Einsatzzweck:** ${img.einsatz}
- **Alt-Text:** „${img.alt}“
- **Original:** ${inv ? `${inv.breite} × ${inv.hoehe} px` : '–'}
- **Hinweis:** allgemeines Stockmotiv, kein Gorhau-Unternehmensfoto

`;
}

lic += `### Nicht eingesetzte Motive

`;
for (const a of abgelehnt) {
  lic += `#### \`${a.quelle}\`

- **Motiv:** ${a.motiv}
- **Status:** ${a.status}
- **Begründung:** ${a.grund}

`;
}

lic += `### Originaldateien

Die unbearbeiteten Originale liegen unter \`incoming-assets/unsplash-originals/\` und
gehen nicht in den Produktionsbuild ein. Ausgeliefert werden ausschließlich die
optimierten Varianten unter \`public/images/stock/\`, erzeugt mit \`npm run images:stock\`.
`;

// Nur den markierten Block ersetzen – der handgeschriebene Rest der Datei
// (Logo, Flyer, Illustrationssystem, Datenschutzhinweise) bleibt erhalten.
const LIC_FILE = 'docs/IMAGE-SOURCE-AND-LICENSES.md';
const BEGIN = '<!-- STOCK:BEGIN -->';
const END = '<!-- STOCK:END -->';
const bestand = await readFile(LIC_FILE, 'utf8');
const von = bestand.indexOf(BEGIN);
const bis = bestand.indexOf(END);
if (von === -1 || bis === -1) {
  throw new Error(`${LIC_FILE}: Markierungen ${BEGIN} / ${END} fehlen.`);
}
await writeFile(
  LIC_FILE,
  bestand.slice(0, von + BEGIN.length) + '\n' + lic + '\n' + bestand.slice(bis)
);

console.log(`Inventur:    audit/unsplash-image-inventory.md (${inventar.length} Bilder)`);
console.log(`Abdeckung:   audit/final-image-coverage.md (${seiten.length} Seiten, ${ohneBilder.length} ohne Bild)`);
console.log(`Quellen:     docs/IMAGE-SOURCE-AND-LICENSES.md (${stockImages.length} Stockmotive)`);
