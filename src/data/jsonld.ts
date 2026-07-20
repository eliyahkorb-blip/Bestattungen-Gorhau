import { company } from './company';

const site = 'https://www.gorhau-bestattungen.de';

/** LocalBusiness (FuneralHome) – zentrale, überall identische Unternehmensdaten. */
export function localBusinessLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FuneralHome',
    '@id': `${site}/#organization`,
    name: company.name,
    legalName: company.legalName,
    url: `${site}/`,
    telephone: company.phoneRaw,
    faxNumber: company.faxRaw,
    email: company.email,
    foundingDate: String(company.foundingYear),
    slogan: 'Zuhören, beraten, begleiten',
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.street,
      addressLocality: `${company.city}-${company.district}`,
      postalCode: company.postalCode,
      addressRegion: company.region,
      addressCountry: company.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: company.geo.latitude,
      longitude: company.geo.longitude,
    },
    areaServed: {
      '@type': 'City',
      name: 'Würzburg',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '16:00',
      },
    ],
    availableService: [
      'Erdbestattung',
      'Feuerbestattung',
      'Seebestattung',
      'Anonyme Bestattung',
      'Überführungen national und international',
      'Thanatopraxie',
      'Bestattungsvorsorge',
      'Trauerfeier und Trauerdruck',
      'Behördengänge und Formalitäten',
    ],
  };
}

/** Organization. */
export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site}/#organization`,
    name: company.name,
    legalName: company.legalName,
    url: `${site}/`,
    foundingDate: String(company.foundingYear),
    telephone: company.phoneRaw,
    email: company.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.street,
      addressLocality: `${company.city}-${company.district}`,
      postalCode: company.postalCode,
      addressCountry: company.countryCode,
    },
  };
}

/** WebSite. */
export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site}/#website`,
    url: `${site}/`,
    name: company.name,
    inLanguage: 'de-DE',
    publisher: { '@id': `${site}/#organization` },
  };
}

/** BreadcrumbList aus einer Liste von {name, path}. */
export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: new URL(item.path, site + '/').href,
    })),
  };
}

/** WebPage. */
export function webPageLd(title: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: new URL(path, site + '/').href,
    inLanguage: 'de-DE',
    isPartOf: { '@id': `${site}/#website` },
    about: { '@id': `${site}/#organization` },
  };
}
