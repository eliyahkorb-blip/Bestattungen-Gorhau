/**
 * Zentrale Basis-Pfad-Hilfsfunktionen.
 *
 * Diese Website läuft unter zwei möglichen Basiswerten:
 *  - Produktion:      base = "/"                        → https://www.gorhau-bestattungen.de/leistungen/
 *  - GitHub-Pages-Vorschau: base = "/Bestattungen-Gorhau/" → https://eliyahkorb-blip.github.io/Bestattungen-Gorhau/leistungen/
 *
 * `import.meta.env.BASE_URL` und `import.meta.env.SITE` werden von Astro zur Build-Zeit aus
 * astro.config.mjs injiziert (siehe DEPLOY_TARGET-Weiche dort) – kein Import nötig, aber die
 * Hilfsfunktionen hier kapseln die Verkettungslogik, damit sie nirgends per Hand dupliziert wird.
 */

/** Basiswert, garantiert mit genau einem abschließenden "/" (z. B. "/" oder "/Bestattungen-Gorhau/"). */
export function getBase(): string {
  const base = import.meta.env.BASE_URL ?? '/';
  return base.endsWith('/') ? base : `${base}/`;
}

/**
 * Verknüpft einen wurzelrelativen internen Pfad (z. B. "/leistungen/" oder "/img/logo.png")
 * mit dem aktuellen Basiswert – ohne doppelte oder fehlende Schrägstriche.
 *
 * withBase('/leistungen/')
 *   → Produktion:        "/leistungen/"
 *   → GitHub-Pages-Build: "/Bestattungen-Gorhau/leistungen/"
 */
export function withBase(path: string): string {
  const base = getBase(); // z. B. "/" oder "/Bestattungen-Gorhau/"
  const trimmedBase = base.slice(0, -1); // "" oder "/Bestattungen-Gorhau"
  if (!path.startsWith('/')) {
    // externe oder bereits absolute URLs (http…, mailto:, tel:, #anker) unverändert durchreichen
    return path;
  }
  return `${trimmedBase}${path}`;
}

/** Konfigurierte Root-Domain ohne Pfad (z. B. "https://www.gorhau-bestattungen.de"), ohne trailing slash. */
export function getSiteOrigin(): string {
  const site = import.meta.env.SITE ?? '';
  return site.endsWith('/') ? site.slice(0, -1) : site;
}

/**
 * Vollständige absolute URL für einen wurzelrelativen internen Pfad – berücksichtigt sowohl
 * Domain (site) als auch Unterverzeichnis (base). Für Canonicals, Open Graph, JSON-LD und
 * sitemap.xml.
 *
 * absoluteUrl('/leistungen/')
 *   → Produktion:        "https://www.gorhau-bestattungen.de/leistungen/"
 *   → GitHub-Pages-Build: "https://eliyahkorb-blip.github.io/Bestattungen-Gorhau/leistungen/"
 */
export function absoluteUrl(path: string): string {
  return `${getSiteOrigin()}${withBase(path)}`;
}

/** True, wenn dies der GitHub-Pages-Vorschau-Build ist (DEPLOY_TARGET=github-pages). */
export function isPreviewBuild(): boolean {
  return process.env.DEPLOY_TARGET === 'github-pages';
}

/**
 * Wendet withBase() auf jeden Pfad in einem srcset-Attributwert an, z. B.
 * "/img/logo-240.png 240w, /img/logo-480.png 480w" → mit Basis-Präfix je Eintrag.
 */
export function withBaseSrcset(srcset: string): string {
  return srcset
    .split(',')
    .map((entry) => {
      const trimmed = entry.trim();
      if (!trimmed) return trimmed;
      const [urlPart, ...descriptor] = trimmed.split(/\s+/);
      return [withBase(urlPart), ...descriptor].join(' ');
    })
    .join(', ');
}
