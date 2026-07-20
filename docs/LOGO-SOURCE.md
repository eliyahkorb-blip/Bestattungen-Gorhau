# Logo-Quelle und -Aufbereitung

## Status: Original-Logodatei nicht verfügbar (technisch begründet)

Die Original-Bildmarke sollte aus folgender Quelle gesichert werden:
`https://www.gorhau-bestattungen.de/images/header_logo.png`

**Der Abruf war in dieser Umgebung technisch nicht möglich.** Die Quelldomain ist durch die
Egress-Netzwerk-Policy der Umgebung gesperrt; sämtliche Abrufversuche über `curl`, `wget` und
den Fetch-Dienst wurden mit **HTTP 403 (CONNECT tunnel failed / Forbidden)** abgewiesen. Auch
Drittquellen und Web-Archive waren nicht erreichbar. Ein Download, eine Vektorisierung oder eine
technische Rekonstruktion der Originalmarke war daher nicht durchführbar.

## Aktueller Stand: Platzhalter-Wortmarke
In `src/components/Logo.astro` ist eine **zurückhaltende typografische Platzhalter-Darstellung**
umgesetzt: Schriftzug „GORHAU / Bestattungen · seit 1970" mit einem schlichten Kreuz-Motiv in
Markengold. Das ist **kein Redesign der Marke**, sondern ein neutraler Stand-in, damit die
Website vollständig funktioniert.

## Vor Live-Schaltung erforderlich
1. Original-Logodatei bereitstellen (bestmögliche Qualität: SVG/EPS/PDF, sonst großes PNG,
   z. B. aus Flyer-/Druckdaten).
2. Original unverändert ablegen unter `src/assets/brand/logo-original/`.
3. Optimierte Fassung (SVG bevorzugt, sauberes transparentes PNG als Fallback) unter
   `src/assets/brand/logo-optimized/` bzw. `public/img/logo.svg`.
4. In `src/components/Logo.astro` die Platzhalter-Darstellung durch die Originaldatei ersetzen
   (Bildeinbindung mit korrekter, unverzerrter Größe).

## Verbindliche Regeln (nicht verhandelbar)
- Kreuz, Pfeile, Wortmarke und deren Proportionen bleiben **unverändert**.
- Keine KI-Neuinterpretation der Wort-/Bildmarke.
- Erlaubt sind ausschließlich technische Optimierung/Rekonstruktion (Artefakte entfernen,
  saubere Nachzeichnung mit anschließendem visuellem Abgleich), kein gestalterisches Redesign.
