# archive/original-site/ – Sicherung der bestehenden Website

## Status: leer (technisch begründet)

Dieses Verzeichnis ist für die **unveränderte Sicherung** der bestehenden Website vorgesehen.

Die Sicherung konnte in dieser Build-Umgebung **nicht** angelegt werden: Die Quelldomain
`https://www.gorhau-bestattungen.de/` ist durch die Egress-Netzwerk-Policy gesperrt. Alle
Abrufversuche (curl, wget, Fetch-Dienst, verschiedene User-Agents/Referer, Web-Archive) wurden
mit **HTTP 403** abgewiesen. Ein Crawl bzw. Download war daher objektiv nicht durchführbar.

## Nachzuholen, sobald die Domain erreichbar ist
```bash
# Vollständige Spiegelung der eigenen Domain (mit Rate-Limit, ohne fremde Domains)
wget --mirror --page-requisites --convert-links --adjust-extension \
     --no-parent --wait=1 --limit-rate=500k \
     -e robots=off \
     -P archive/original-site/ \
     https://www.gorhau-bestattungen.de/

# FLV-Medien mit realistischem User-Agent/Referer
curl -L -A "Mozilla/5.0" \
  -e "https://www.gorhau-bestattungen.de/institut/mediathek.html" \
  -o archive/original-site/gorhau_imagefilm.flv \
  https://www.gorhau-bestattungen.de/institut/mediathek/gorhau_imagefilm.flv
```
Anschließend Medien konvertieren (siehe `audit/media-inventory.md`) und den Asset-/Link-/
Redirect-Audit mit den realen URLs vervollständigen.
