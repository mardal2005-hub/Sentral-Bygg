# Sentral Bygg AS — nettside (designforslag)

Et komplett designforslag til ny nettside for **Sentral Bygg AS**, byggmester på Haugalandet.
Siden er bygget som en statisk, responsiv one-pager med fokus på et premium, redaksjonelt
uttrykk – «arkitektstudio møter byggmester».

> **Status:** Konseptdemo. Bygget for å vise hvordan en profesjonell digital profil kan se ut.

## Innhold og seksjoner
- **Hero** – stort arkitekturfoto med slagord *«Bygg som tåler tiden.»*
- **Statement** – *«Et godt bygg starter med gode valg.»*
- **Tjenester** – Nybygg · Rehabilitering · Tilbygg & påbygg · Oppussing (redaksjonell liste med hover-bilde)
- **Utvalgte prosjekter** – asymmetrisk magasinoppsett med bildezoom
- **Om oss** – kort, ærlig profiltekst
- **Detaljene betyr noe** – materialer og håndverk
- **Kontakt** – stor kontaktseksjon med skjema (validering + bekreftelse)
- **Footer**

## Teknisk
- Ren HTML, CSS og JavaScript – ingen rammeverk, ingen byggesteg.
- Responsivt for 375px → 1440px+, egen mobiltilpasning.
- Animasjoner: intro, scroll-reveal, image-reveal, hover – med `prefers-reduced-motion`-støtte.
- Semantisk HTML, alt-tekster, tastaturvennlig navigasjon, SEO-grunnlag (title/meta/OG).
- Fonter: Archivo (display) + Inter (brødtekst) via Google Fonts.

## Kjøre lokalt
```bash
node server.js
# åpne http://localhost:8123
```
Eventuelt kan `index.html` åpnes direkte i en nettleser.

## Struktur
```
index.html
server.js            # enkel lokal statisk server (kun for utvikling)
assets/
  css/styles.css
  js/main.js
  img/               # prosjekt- og referansefoto
```

## Bilder
Foto er hentet fra Sentral Bygg AS sine egne publiseringer og beskåret/optimalisert for web.

## Merk før publisering
Kontaktinformasjon (telefon, e-post) er **midlertidige plassholdere** og må
bekreftes/erstattes med Sentral Bygg AS sine faktiske opplysninger før siden tas i bruk.
