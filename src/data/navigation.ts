/**
 * Hauptnavigation und Footer-Struktur.
 *
 * Bewusst flach und ohne Dropdowns: Wer gerade einen Angehörigen verloren hat,
 * soll so wenig Navigationsentscheidungen wie möglich treffen müssen. Die
 * früheren Unterseiten sind inhaltlich in die jeweilige Hauptseite integriert.
 */

export interface NavItem {
  label: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { label: 'Im Trauerfall', href: '/im-trauerfall/' },
  { label: 'Leistungen', href: '/leistungen/' },
  { label: 'Bestattungsarten', href: '/bestattungsarten/' },
  { label: 'Vorsorge', href: '/vorsorge/' },
  { label: 'Abschiedsraum', href: '/abschiedsraum/' },
  { label: 'Über uns', href: '/ueber-uns/' },
  { label: 'Historie', href: '/historie/' },
  { label: 'Mediathek', href: '/mediathek/' },
  { label: 'Friedhöfe', href: '/friedhoefe/' },
  { label: 'Kontakt', href: '/kontakt/' },
];

export const legalNav: NavItem[] = [
  { label: 'Impressum', href: '/impressum/' },
  { label: 'Datenschutz', href: '/datenschutz/' },
  { label: 'Barrierefreiheit', href: '/barrierefreiheit/' },
];
