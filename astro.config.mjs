// @ts-check
import { defineConfig } from 'astro/config';

// Zwei Build-Ziele, gesteuert über die Umgebungsvariable DEPLOY_TARGET:
//
//   (Standard)              → Produktionsbuild: kanonische Root-Domain, base "/"
//   DEPLOY_TARGET=github-pages → Öffentliche Vorschau unter einem Repo-Unterpfad,
//                                noindex, Disallow: / (siehe src/pages/robots.txt.ts,
//                                src/layouts/BaseLayout.astro und src/utils/url.ts)
//
// Der Produktionsbuild (npm run build) ist von dieser Weiche nicht betroffen, solange
// DEPLOY_TARGET nicht gesetzt ist.
const isGithubPages = process.env.DEPLOY_TARGET === 'github-pages';

export const SITE = isGithubPages
  ? 'https://eliyahkorb-blip.github.io'
  : 'https://www.gorhau-bestattungen.de';

export const BASE = isGithubPages ? '/Bestattungen-Gorhau' : '/';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
