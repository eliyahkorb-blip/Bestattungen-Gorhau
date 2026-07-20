// @ts-check
import { defineConfig } from 'astro/config';

export const SITE = 'https://eliyahkorb-blip.github.io';

export default defineConfig({
  site: SITE,
  base: '/Bestattungen-Gorhau',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
