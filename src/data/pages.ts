/**
 * Zentrale Liste aller indexierbaren Seiten. Grundlage für sitemap.xml und QA-Checks.
 * priority/changefreq dienen der Sitemap.
 */
export interface PageEntry {
  path: string;
  priority: number;
  changefreq: 'weekly' | 'monthly' | 'yearly';
}

export const indexablePages: PageEntry[] = [
  { path: '/', priority: 1.0, changefreq: 'monthly' },
  { path: '/im-trauerfall/', priority: 0.9, changefreq: 'monthly' },
  { path: '/im-trauerfall/benoetigte-dokumente/', priority: 0.7, changefreq: 'yearly' },
  { path: '/leistungen/', priority: 0.8, changefreq: 'monthly' },
  { path: '/leistungen/ueberfuehrungen/', priority: 0.7, changefreq: 'yearly' },
  { path: '/leistungen/thanatopraxie/', priority: 0.7, changefreq: 'yearly' },
  { path: '/leistungen/trauerfeier-und-trauerdruck/', priority: 0.7, changefreq: 'yearly' },
  { path: '/leistungen/formalitaeten/', priority: 0.7, changefreq: 'yearly' },
  { path: '/bestattungsarten/', priority: 0.8, changefreq: 'monthly' },
  { path: '/bestattungsarten/erdbestattung/', priority: 0.7, changefreq: 'yearly' },
  { path: '/bestattungsarten/feuerbestattung/', priority: 0.7, changefreq: 'yearly' },
  { path: '/bestattungsarten/seebestattung/', priority: 0.7, changefreq: 'yearly' },
  { path: '/bestattungsarten/anonyme-bestattung/', priority: 0.7, changefreq: 'yearly' },
  { path: '/bestattungsvorsorge/', priority: 0.9, changefreq: 'monthly' },
  { path: '/abschiedsraum/', priority: 0.8, changefreq: 'yearly' },
  { path: '/ueber-uns/', priority: 0.8, changefreq: 'monthly' },
  { path: '/ueber-uns/historie/', priority: 0.6, changefreq: 'yearly' },
  { path: '/ueber-uns/galerie/', priority: 0.6, changefreq: 'yearly' },
  { path: '/mediathek/', priority: 0.6, changefreq: 'monthly' },
  { path: '/friedhoefe-in-wuerzburg/', priority: 0.6, changefreq: 'yearly' },
  { path: '/kontakt/', priority: 0.9, changefreq: 'monthly' },
  { path: '/impressum/', priority: 0.3, changefreq: 'yearly' },
  { path: '/datenschutz/', priority: 0.3, changefreq: 'yearly' },
  { path: '/barrierefreiheit/', priority: 0.3, changefreq: 'yearly' },
];
