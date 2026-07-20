/** Hauptnavigation und Footer-Struktur. */

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const mainNav: NavItem[] = [
  {
    label: 'Im Trauerfall',
    href: '/im-trauerfall/',
    children: [
      { label: 'Erste Schritte', href: '/im-trauerfall/' },
      { label: 'Benötigte Dokumente', href: '/im-trauerfall/benoetigte-dokumente/' },
    ],
  },
  {
    label: 'Leistungen',
    href: '/leistungen/',
    children: [
      { label: 'Überblick', href: '/leistungen/' },
      { label: 'Überführungen', href: '/leistungen/ueberfuehrungen/' },
      { label: 'Thanatopraxie', href: '/leistungen/thanatopraxie/' },
      { label: 'Trauerfeier & Trauerdruck', href: '/leistungen/trauerfeier-und-trauerdruck/' },
      { label: 'Formalitäten', href: '/leistungen/formalitaeten/' },
    ],
  },
  {
    label: 'Bestattungsarten',
    href: '/bestattungsarten/',
    children: [
      { label: 'Überblick', href: '/bestattungsarten/' },
      { label: 'Erdbestattung', href: '/bestattungsarten/erdbestattung/' },
      { label: 'Feuerbestattung', href: '/bestattungsarten/feuerbestattung/' },
      { label: 'Seebestattung', href: '/bestattungsarten/seebestattung/' },
      { label: 'Anonyme Bestattung', href: '/bestattungsarten/anonyme-bestattung/' },
    ],
  },
  { label: 'Vorsorge', href: '/bestattungsvorsorge/' },
  { label: 'Abschiedsraum', href: '/abschiedsraum/' },
  {
    label: 'Über uns',
    href: '/ueber-uns/',
    children: [
      { label: 'Unternehmen', href: '/ueber-uns/' },
      { label: 'Historie seit 1970', href: '/ueber-uns/historie/' },
      { label: 'Galerie', href: '/ueber-uns/galerie/' },
    ],
  },
  { label: 'Mediathek', href: '/mediathek/' },
  { label: 'Friedhöfe', href: '/friedhoefe-in-wuerzburg/' },
  { label: 'Kontakt', href: '/kontakt/' },
];

export const legalNav: NavItem[] = [
  { label: 'Impressum', href: '/impressum/' },
  { label: 'Datenschutz', href: '/datenschutz/' },
  { label: 'Barrierefreiheit', href: '/barrierefreiheit/' },
];
