/**
 * Zentrale Unternehmensdaten (Single Source of Truth für NAP, Kontakt, Registerangaben).
 * Diese Werte werden auf allen Seiten und in allen JSON-LD-Strukturen identisch verwendet.
 *
 * Quellen: bestehende Unternehmenswebsite (laut Auftraggeber) sowie öffentliche
 * Branchen- und Registereinträge. Vor Live-Schaltung final zu bestätigende Felder
 * sind in docs/LEGAL-REVIEW-REQUIRED.md dokumentiert.
 */

export const company = {
  // Rechtlicher und angezeigter Name
  legalName: 'Bestattungs- und Überführungsinstitut Gorhau, Inh. Thomas Gorhau e.K.',
  name: 'Bestattungs- und Überführungs-Institut Gorhau',
  shortName: 'Bestattungen Gorhau',
  owner: 'Thomas Gorhau',
  foundingYear: 1970,

  // Anschrift
  street: 'Reuterstraße 2',
  district: 'Heidingsfeld',
  postalCode: '97084',
  city: 'Würzburg',
  region: 'Bayern',
  regionCode: 'DE-BY',
  country: 'Deutschland',
  countryCode: 'DE',

  // Kontakt
  phone: '0931 61 00 00',
  phoneRaw: '+49931610000',
  fax: '0931 6 56 57',
  faxRaw: '+4993165657',
  email: 'gorhau-bestattungen@t-online.de',

  // Erreichbarkeit
  officeHours: 'Montag bis Freitag, 08:00 – 16:00 Uhr sowie nach Vereinbarung',
  emergencyNote: 'Im Trauerfall sind wir für Sie Tag und Nacht erreichbar.',

  // Register (öffentlich recherchiert – vor Live-Schaltung final bestätigen)
  register: {
    court: 'Amtsgericht Würzburg',
    number: 'HRA 3873',
  },

  // Geokoordinaten Reuterstraße 2, 97084 Würzburg (aus Kartenquelle abgeleitet;
  // vor Verwendung in Kartendiensten final gegen die Adresse prüfen).
  geo: {
    latitude: 49.7691,
    longitude: 9.9469,
  },

  // Externe Kartenlinks (Zwei-Klick / kein automatisches Laden von Drittanbietern)
  maps: {
    osm: 'https://www.openstreetmap.org/search?query=Reuterstra%C3%9Fe%202%2C%2097084%20W%C3%BCrzburg',
    google: 'https://www.google.com/maps/search/?api=1&query=Reuterstra%C3%9Fe+2%2C+97084+W%C3%BCrzburg',
  },
} as const;

/** Formatierte Postadresse in einer Zeile. */
export const addressLine = `${company.street}, ${company.postalCode} ${company.city}-${company.district}`;
