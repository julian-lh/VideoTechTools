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
npm install <Add module name here>
```

## Schnelleinstieg

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

## Abschnitte

## [Berechnungen](README_subpages/Calculation.md)

## [Komponenten](README_subpages/Components.md)

- [CIE-Normfarbtafel](README_subpages/Components/CIE.md)

- [Signal-Generator](README_subpages/Components.md#signalgenerator)

- [Signal-Vorschau](README_subpages/Components/SignalPreview.md)

- [Vektorskop](README_subpages/Components/Vectorscope.md)

- [Waveformmonitor](README_subpages/Components/WFM.md)

## [Navigation](README_subpages/Navigation.md)

## [Seiten](README_subpages/Screens.md)

- [CIE-Normfarbtafel](README_subpages/Screens.md#cie-normfarbtafel)

- [Waveformmonitor](README_subpages/Screens.md#waveformmonitor)

- [Vektorskop](README_subpages/Screens.md#waveformmonitor)

- [Komponentensignal](README_subpages/Screens.md#waveformmonitor)

- [Scopes Kombination](README_subpages/Screens.md#waveformmonitor)


## [Vorkommende Signal-Arrays](README_subpages/SignalArrays.md)

</br>

## Genereller Aufbau von Komponenten

### Benennung von Funktionen

- Funktionsnamen wird aufgrund unterschiedlicher Bedeutung bei Groß- und Kleinschreibung von Farbräumen beim Original belassen. Dies ist eine bewusste Abweichung vom Pascal-/Camel-Case

- (Arrow-)Funktionen, die eine React-, React Native-, oder React-Three-Fiber-Komponente zurückgeben müssen mit einem Großbuchstaben beginnen.

- Zur besseren Unterscheidung werden Funktionen, die keine React-, React Native-, oder React-Three-Fiber-Komponente zurückgeben nicht als Arrow-Funktion geschrieben.

### Nennung von Signalen

- Signalname wird aufgrund unterschiedlicher Bedeutung bei Groß- und Kleinschreibung auch so belassen. Dies ist eine bewusste Abweichung vom Pascal-/Camel-Case. Z.B.: "signalxyY" anstatt "signalXyy".
    </br></br>


## Visualisierungen

## Durchreichen von Daten

- Eltern nach Kind: Mittels props an child view.
- Kind nach Eltern: Mittels nach unten durchgereichter set()-Funktion
    (<https://www.pluralsight.com/guides/how-to-pass-data-between-react-components>)
    ...

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
