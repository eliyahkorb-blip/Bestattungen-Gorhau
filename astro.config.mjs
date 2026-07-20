// @ts-check
import { defineConfig } from 'astro/config';

// Kanonische Domain – alle anderen Varianten leiten hierher weiter.
export const SITE = 'https://www.gorhau-bestattungen.de';

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
