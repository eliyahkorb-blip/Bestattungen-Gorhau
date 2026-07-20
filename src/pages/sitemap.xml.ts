import type { APIRoute } from 'astro';
import { indexablePages } from '../data/pages';
import { absoluteUrl } from '../utils/url';

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().split('T')[0];
  const urls = indexablePages
    .map(
      (p) => `  <url>
    <loc>${absoluteUrl(p.path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority.toFixed(1)}</priority>
  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
