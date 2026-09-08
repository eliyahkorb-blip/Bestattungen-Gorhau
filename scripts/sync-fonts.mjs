/**
 * Kopiert die benoetigten Schriftschnitte aus den @fontsource-Paketen nach
 * public/fonts/. Dadurch liegen die Schriften lokal im Repository und es geht
 * kein Request an Google Fonts oder ein anderes CDN (§10 und §21 des Auftrags).
 *
 * Bewusst nur `latin` (deckt Umlaute und ß ab) und nur drei Schnitte je
 * Familie. Dünne Schnitte werden nicht ausgeliefert.
 *
 * Aufruf: npm run fonts:sync
 */
import { copyFile, mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const OUT = 'public/fonts';

const faces = [
  { pkg: '@fontsource/source-serif-4', file: 'source-serif-4-latin-400-normal.woff2' },
  { pkg: '@fontsource/source-serif-4', file: 'source-serif-4-latin-700-normal.woff2' },
  { pkg: '@fontsource/source-sans-3', file: 'source-sans-3-latin-400-normal.woff2' },
  { pkg: '@fontsource/source-sans-3', file: 'source-sans-3-latin-600-normal.woff2' },
  { pkg: '@fontsource/source-sans-3', file: 'source-sans-3-latin-700-normal.woff2' },
];

await mkdir(OUT, { recursive: true });

let total = 0;
for (const { pkg, file } of faces) {
  const src = path.join('node_modules', pkg, 'files', file);
  const dest = path.join(OUT, file);
  await copyFile(src, dest);
  const { size } = await stat(dest);
  total += size;
  console.log(`${file.padEnd(40)} ${(size / 1024).toFixed(0)} KB`);
}

const files = await readdir(OUT);
console.log(`\n${files.length} Dateien in ${OUT}, ${(total / 1024).toFixed(0)} KB gesamt`);
console.log('Lizenz: SIL Open Font License 1.1 (Source Serif 4, Source Sans 3)');
