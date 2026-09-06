# Sentral Bygg AS — nettside (designforslag)

Designforslag til ny nettside for **Sentral Bygg AS**, byggmester på Haugalandet.
En statisk, responsiv one-pager med en egen visuell identitet – redaksjonelt og premium,
der norsk trehåndverk møter et rolig, teknisk uttrykk.

> **Status:** Konseptdemo. Bygget for å vise hvordan en profesjonell digital profil kan se ut.

## Designspråk «SB.02»
- **Palett:** varm beige (bone), dyp furugrønn-sort og en messing/oker aksent – hentet fra
  materialene i byggene og fra firmaprofilen.
- **Typografi:** *Fraunces* (redaksjonell serif) til overskrifter og *Schibsted Grotesk*
  (norsk grotesk) til grensesnitt og brødtekst.
- **Layout:** en «spesifikasjons»-rytme med nummererte etikett-kolonner, type-ledet hero med
  triptyk-bildebånd, auto-scrollende marquee-bånd, tjenester som bildefliser, prosjekter som
  store overlappende case-kort med parallax, og en sentrert kontaktseksjon med floating labels.

## Seksjoner
Hero · Marquee · Filosofi · Tjenester (Nybygg / Rehabilitering / Tilbygg & påbygg / Oppussing) ·
Utvalgte prosjekter · Detaljer · Om oss · Kontakt (skjema) · Footer.

## Teknisk
- Ren HTML, CSS og JavaScript – ingen rammeverk, ingen byggesteg.
- Responsivt fra 375px → 1440px+, med egen mobiltilpasning.
- Animasjoner (scroll-reveal, image-reveal, marquee, parallax) som **progressiv forbedring**:
  alt innhold er synlig også uten JavaScript, og respekterer `prefers-reduced-motion`.
- Semantisk HTML, alt-tekster, tastaturvennlig navigasjon, SEO-grunnlag (title/meta/OG).
- Fonter via Google Fonts (Fraunces + Schibsted Grotesk).

## Kjøre lokalt
```bash
node server.js
# åpne http://localhost:8123
```
`index.html` kan også åpnes direkte i en nettleser.

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
Kontaktinformasjon (telefon, e-post) er **midlertidige plassholdere** og må bekreftes/erstattes
med Sentral Bygg AS sine faktiske opplysninger før siden tas i bruk.
