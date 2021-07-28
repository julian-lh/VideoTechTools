# Dokumentation VideTechTools

## Table of Contents

1. [Einstieg](#einstieg)
2. [Schnelleinstieg](#schnelleinstieg)
3. [Third Example](#third-example)
4. [Nützliche Links](#nutzliche-links)

</br>

## Einleitung

_VideoTechTools_ ist eine Sammlung von Simulationen für die Videotechnik-Vorlesung. Im Folgenden soll eine Übersicht für die Weiterentwicklung der Software gegeben werden.

## Installation

```bash
$ npm install <Add module name here>
```

## Schnelleinstieg
### Durchreichen von Daten
- Eltern nach Kind: Mittels props an child view.
- Kind nach Eltern: Mittels nach unten durchgereichter set()-Funktion
  (https://www.pluralsight.com/guides/how-to-pass-data-between-react-components)
...

## Aufbau der Software

Für die Weiterentwicklung bietet sich folgende Struktur für die direkt zu bearbeitenden Teile an

```
VideoTechTools
│   README.md
│   App.js      // Einstiegspunkt der App
│   app.json    // Metadaten etc. der App
│   ...
│
└───src
│   │
│   └───calculation // Mathematische Funktionen/Umrechnungen
│   │
│   └───components  // Wiederverwendbare Komponenten
│   │
│   └───navigation  // Alles zu Navigationen
│   │
│   └───screens     // Aus components zusammengesetzte Seiten
│
└───...
```

### Calculation

### Components

### Navigation

### Screens

## Genereller Aufbau von Komponenten

## Namensgebung
- Signale werden benannt: signalRGB, signalYCRCB

### Benennung von Funktionen

- Funktionsnamen wird aufgrund unterschiedlicher Bedeutung bei Groß- und Kleinschreibung von Farbräumen beim Original belassen. Dies ist eine bewusste Abweichung vom Pascal-/Camel-Case

### Benennung von Signalen

- Signalname wird aufgrund unterschiedlicher Bedeutung bei Groß- und Kleinschreibung beim Original belassen. Dies ist eine bewusste Abweichung vom Pascal-/Camel-Case
  </br></br>

## Visualisierungen

### SignalPreview

```JavaScript
const RGBSignalPreview = ({ rgbSignal,
                            YCrCbSignal = undefined,
                            labelIndex = 0}) => {...}
```
| Parameter    | Beschreibung | vorgesehener Signalbereich |
| ---------    | ----------- |----|
| rgbSignal    | RGB-Signal-Array 3D    |  0 ≤ rgbSignal[x][y][0..2] ≤ 1       |
| YCrCbSignal  | YCrCb-Signal-Array 3D  | 0 ≤ YCrCbSignal[x][y][0..2] ≤ 1
| labelIndex   |          | 0..1

## Nützliche Links

[Medium: Mit EsLint + Prettier Code Formatieren](https://edusutil.medium.com/eslint-with-prettier-settings-for-react-native-ce13d2aaf500)

[AirBnB Styleguide](https://airbnb.io/javascript/react/#ordering)
</br></br></br></br>

---

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter).

> Test
> 'code'
>
> `code` `Test`

```JavaScript
import { CIEView } from '../../components/visualizers/cie/CIEView';
```

- [ ] Write the press release
- [x] Update the website
- [ ] Contact the media

| Syntax    | Description |
| --------- | ----------- |
| Header    | Title       |
| Paragraph | Text        |
