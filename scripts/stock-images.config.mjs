/**
 * Kuratierte Auswahl aus dem hochgeladenen Unsplash-Paket.
 *
 * Jeder Eintrag beschreibt, aus welcher Originaldatei eine Website-Variante
 * erzeugt wird, in welchem Zuschnitt, für welche Seite und mit welchem Alt-Text.
 * Diese Datei ist die einzige Quelle für:
 *   - scripts/build-stock-images.mjs (Erzeugung der AVIF/WebP/JPG-Varianten)
 *   - docs/IMAGE-SOURCE-AND-LICENSES.md
 *   - audit/unsplash-image-inventory.md
 *
 * WICHTIG: Alle Motive hier sind allgemeine Stockbilder, KEINE Aufnahmen des
 * Bestattungsinstituts Gorhau. Alt-Texte dürfen deshalb nie suggerieren, dass
 * ein Raum, Fahrzeug, Gebäude oder eine Person zum Unternehmen gehört.
 */

/** Breiten für normale Inhaltsbilder (Anzeige bis ca. 800 CSS-Pixel). */
export const CONTENT_WIDTHS = [480, 800, 1200, 1600];

/** Breiten für das vollflächige Hero-Bild der Startseite. */
export const HERO_WIDTHS = [800, 1200, 1600, 2000, 2400];

/** Breiten für den schmalen Mobil-Zuschnitt des Heros. */
export const HERO_MOBILE_WIDTHS = [480, 720, 960];

export const stockImages = [
  {
    name: 'wuerzburg-panorama',
    quelle: 'salah-ait-mokhtar-EBzTou1x5WM-unsplash.jpg',
    fotograf: 'Salah Ait Mokhtar',
    unsplashId: 'EBzTou1x5WM',
    motiv: 'Blick über Würzburg im Abendlicht, Festung Marienberg auf dem Hügel',
    stimmung: 'warm, golden, weit, regional verankert',
    einsatz: 'Startseite – Hero',
    seiten: ['/'],
    alt: 'Blick über Würzburg im warmen Abendlicht, im Hintergrund die Festung Marienberg',
    // 2:1-Band für Desktop, 3:2 für Mobil (Art Direction)
    zuschnitt: { ratio: 2 / 1, position: 'center' },
    zuschnittMobil: { ratio: 3 / 2, position: 'center' },
    rolle: 'hero',
  },
  {
    name: 'wuerzburg-kaeppele-herbst',
    quelle: 'cristian-lopez-lWMMK0teQK8-unsplash.jpg',
    fotograf: 'Cristian López',
    unsplashId: 'lWMMK0teQK8',
    motiv: 'Würzburger Hang mit Käppele und Kirche im Herbstlaub',
    stimmung: 'warm, herbstlich, ruhig, regional',
    einsatz: 'Über uns – regionale Verbundenheit',
    seiten: ['/ueber-uns/'],
    alt: 'Herbstlicher Blick auf einen Würzburger Hang mit Kirche und Weinbergen',
    zuschnitt: { ratio: 3 / 2, position: 'center' },
    rolle: 'content',
  },
  {
    name: 'sonnenlicht-ueber-wolken',
    quelle: 'dan-meyers-f1WMJR8pLqo-unsplash.jpg',
    fotograf: 'Dan Meyers',
    unsplashId: 'f1WMJR8pLqo',
    motiv: 'Sonne über einer weiten Wolkendecke',
    stimmung: 'hell, weit, tröstlich, offen',
    einsatz: 'Anonyme Bestattung – weiter, ruhiger Horizont',
    seiten: ['/bestattungsarten/anonyme-bestattung/'],
    alt: 'Sonnenlicht über einer weiten, ruhigen Wolkendecke',
    zuschnitt: { ratio: 3 / 2, position: 'center' },
    rolle: 'content',
  },
  {
    name: 'trauernde-umarmung',
    quelle: 'vidar-nordli-mathisen-nvlB39rzdQE-unsplash.jpg',
    fotograf: 'Vidar Nordli-Mathisen',
    unsplashId: 'nvlB39rzdQE',
    motiv: 'Zwei Trauernde von hinten, eine Person lehnt den Kopf an die Schulter',
    stimmung: 'menschlich, nah, getragen, nicht aufdringlich',
    einsatz: 'Im Trauerfall – menschliche Nähe',
    seiten: ['/im-trauerfall/'],
    // Keine Gesichter erkennbar; bewusst ohne Zuschnitt, damit keine Köpfe angeschnitten werden.
    alt: 'Zwei trauernde Menschen stehen eng beieinander, von hinten aufgenommen',
    zuschnitt: null,
    rolle: 'content',
  },
  {
    name: 'gedenkkerzen',
    quelle: 'eli-solitas-q6e4zwgtUcM-unsplash.jpg',
    fotograf: 'Eli Solitas',
    unsplashId: 'q6e4zwgtUcM',
    motiv: 'Brennende Gedenkkerzen, warmes Licht',
    stimmung: 'warm, still, würdevoll',
    einsatz: 'Thanatopraxie – zurückhaltendes, warmes Detail',
    seiten: ['/leistungen/thanatopraxie/'],
    alt: 'Mehrere brennende Gedenkkerzen mit warmem Licht',
    zuschnitt: { ratio: 3 / 2, position: 'center' },
    rolle: 'content',
  },
  {
    name: 'blumen-auf-sarg',
    quelle: 'mayron-oliveira-mibn6LLm9kA-unsplash.jpg',
    fotograf: 'Mayron Oliveira',
    unsplashId: 'mibn6LLm9kA',
    motiv: 'Zarter Blumenstrauß auf einem Holzsarg, von oben fotografiert',
    stimmung: 'hell, zart, respektvoll',
    einsatz: 'Trauerfeier & Trauerdruck sowie Bestattungsarten-Übersicht',
    seiten: ['/leistungen/trauerfeier-und-trauerdruck/', '/bestattungsarten/'],
    alt: 'Zarter Strauß aus rosa und weißen Blüten auf einem Holzsarg',
    zuschnitt: { ratio: 3 / 2, position: 'center' },
    rolle: 'content',
  },
  {
    name: 'meer-horizont',
    quelle: 'inline-03.jpg',
    fotograf: null,
    unsplashId: null,
    motiv: 'Ruhige See mit Horizont und Wolkenhimmel',
    stimmung: 'weit, ruhig, hell',
    einsatz: 'Seebestattung – Hauptmotiv',
    seiten: ['/bestattungsarten/seebestattung/'],
    alt: 'Ruhige See mit weitem Horizont unter bewölktem Himmel',
    zuschnitt: { ratio: 3 / 2, position: 'center' },
    rolle: 'content',
  },
  {
    name: 'meer-tiefblau',
    quelle: 'inline-02.jpg',
    fotograf: null,
    unsplashId: null,
    motiv: 'Tiefblaues Meer mit heller Gischt von oben',
    stimmung: 'tief, klar, bewegt',
    einsatz: 'Seebestattung – zweites Motiv im Textverlauf',
    seiten: ['/bestattungsarten/seebestattung/'],
    alt: 'Tiefblaues Meer mit heller Gischt aus der Vogelperspektive',
    zuschnitt: { ratio: 3 / 2, position: 'center' },
    rolle: 'content',
  },
  {
    name: 'friedhof-graeber-blumen',
    quelle: 'inline-04.jpg',
    fotograf: null,
    unsplashId: null,
    motiv: 'Gepflegte Gräberreihe mit Blumenbepflanzung und Grablichtern im Sonnenlicht',
    stimmung: 'hell, gepflegt, ruhig',
    einsatz: 'Friedhöfe in Würzburg – Hauptmotiv',
    seiten: ['/friedhoefe-in-wuerzburg/'],
    // Grabinschriften sind im Original teils lesbar; die Website-Varianten sind so
    // klein, dass keine Namen entzifferbar sind (siehe audit/unsplash-image-inventory.md).
    alt: 'Gepflegte Gräberreihe mit Blumenbepflanzung und Grablichtern im Sonnenlicht',
    zuschnitt: { ratio: 3 / 2, position: 'center' },
    rolle: 'content',
  },
];

/**
 * Bewusst nicht eingesetzte Motive – die Begründung wandert in die Inventur.
 */
export const abgelehnt = [
  {
    quelle: 'inline-01.jpg',
    motiv: 'Blumengeschmückter Weidensarg vor einem Kremationsofen',
    grund:
      'Zeigt technische Anlagentechnik eines fremden Krematoriums samt englischsprachiger ' +
      'Sicherheitsaufkleber. Für die Feuerbestattungsseite zu konfrontierend und nicht zur ' +
      'angestrebten warmen, hellen Bildsprache passend. Die Seite hat bereits ein echtes ' +
      'Gorhau-Foto mit Urnendekoration.',
    status: 'nicht verwenden',
  },
  {
    quelle: 'inline-05.jpg',
    motiv: 'Trauerengel aus Bronze auf einem historischen Grabmal, Herbststimmung',
    grund:
      'Sehr dunkel (Helligkeit 20 %) und mit Trauerengel-Symbolik deutlich schwermütig – ' +
      'gegenläufig zur angestrebten hellen, einladenden Wirkung. Zusätzlich sind auf den ' +
      'Grabmalen Namen realer Verstorbener gut lesbar.',
    status: 'nicht verwenden',
  },
];
