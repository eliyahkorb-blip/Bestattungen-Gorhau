/**
 * Zentrale Liste aller indexierbaren Seiten. Grundlage für sitemap.xml und QA-Checks.
 * priority/changefreq dienen der Sitemap.
 *
 * Seit dem UX-Rework deutlich flacher: die früheren Unterseiten zu Bestattungsarten,
 * Dokumenten, Formalitäten und einzelnen Leistungen sind in ihre Hauptseite
 * integriert und werden per 301 dorthin geleitet.
 */
export interface PageEntry {
  path: string;
  priority: number;
  changefreq: 'weekly' | 'monthly' | 'yearly';
}

export const indexablePages: PageEntry[] = [
  { path: '/', priority: 1.0, changefreq: 'monthly' },
  { path: '/im-trauerfall/', priority: 0.9, changefreq: 'monthly' },
  { path: '/leistungen/', priority: 0.8, changefreq: 'monthly' },
  { path: '/bestattungsarten/', priority: 0.8, changefreq: 'monthly' },
  { path: '/vorsorge/', priority: 0.9, changefreq: 'monthly' },
  { path: '/abschiedsraum/', priority: 0.8, changefreq: 'yearly' },
  { path: '/ueber-uns/', priority: 0.8, changefreq: 'monthly' },
  { path: '/historie/', priority: 0.6, changefreq: 'yearly' },
  { path: '/mediathek/', priority: 0.6, changefreq: 'monthly' },
  { path: '/friedhoefe/', priority: 0.6, changefreq: 'yearly' },
  { path: '/kontakt/', priority: 0.9, changefreq: 'monthly' },
  { path: '/impressum/', priority: 0.3, changefreq: 'yearly' },
  { path: '/datenschutz/', priority: 0.3, changefreq: 'yearly' },
  { path: '/barrierefreiheit/', priority: 0.3, changefreq: 'yearly' },
];
