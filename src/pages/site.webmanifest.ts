import type { APIRoute } from 'astro';
import { withBase } from '../utils/url';

/**
 * Als Endpoint statt statischer public/-Datei umgesetzt, damit start_url, scope und die
 * Icon-Pfade im GitHub-Pages-Vorschau-Build korrekt auf den Unterpfad /Bestattungen-Gorhau/
 * zeigen (ein Web-App-Manifest löst relative/absolute Pfade nicht automatisch gegen Astros
 * "base" auf).
 */
export const GET: APIRoute = () => {
  const manifest = {
    name: 'Bestattungen Gorhau Würzburg',
    short_name: 'Gorhau',
    description:
      'Bestattungs- und Überführungs-Institut Gorhau in Würzburg-Heidingsfeld, familiengeführt seit 1970.',
    lang: 'de',
    start_url: withBase('/'),
    scope: withBase('/'),
    display: 'standalone',
    background_color: '#f7ece9',
    theme_color: '#882020',
    icons: [
      { src: withBase('/img/icon-192.png'), sizes: '192x192', type: 'image/png' },
      { src: withBase('/img/icon-512.png'), sizes: '512x512', type: 'image/png' },
      {
        src: withBase('/img/icon-512-maskable.png'),
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' },
  });
};
