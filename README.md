# Dokumentation VideTechTools

## Einleitung

_VideoTechTools_ ist eine Sammlung von Simulationen für die Videotechnik-Vorlesung. Im Folgenden soll eine Übersicht für die Weiterentwicklung der Software gegeben werden.


## Aufbau der Software

```
VideoTechTools
│   README.md
│   App.js      // Einstiegspunkt der App
│   app.json    // Metadaten etc. der App
│   ...
│
└───src
│   │
│   └───calculations // Mathematische Funktionen/Umrechnungen
│   │
│   └───components  // Wiederverwendbare Komponenten
│   │
│   └───navigation  // Alles zu Navigationen
│   │
│   └───screens     // Aus components zusammengesetzte Seiten
│
└───...
```


### [Berechnungen](README_subpages/Calculations.md)

### [Komponenten](README_subpages/Components.md)

- [CIE-Normfarbtafel](README_subpages/Components/CIE.md)

- [Vektorskop](README_subpages/Components/Vectorscope.md)

- [Waveformmonitor](README_subpages/Components/WFM.md)

- [Signal-Generator](README_subpages/Components/SignalGenerator.md)

- [Signal-Vorschau](README_subpages/Components/SignalPreview.md)

- Allgemeine Komponenten

    - [Einstellungs-Fenster](README_subpages/Components/Settings.md)

    - [ScopesCamera](README_subpages/Components/SmallGeneralComponents.md#scopescamera)

    - [VideoStandardAlertView](README_subpages/Components/SmallGeneralComponents.md#videostandardalertview)


### [Navigation](README_subpages/Navigation.md)

### [Seiten](README_subpages/Screens.md)


- [CIE-Normfarbtafel](README_subpages/Screens.md#cie-normfarbtafel)

- [Waveformmonitor](README_subpages/Screens.md#waveformmonitor)

- [Vektorskop](README_subpages/Screens.md#vektorskop)

- [Komponentensignal](README_subpages/Screens.md#komponentensignal)

- [Scopes Übersicht](README_subpages/Screens.md#scopes_ubersicht)


### [Vorkommende Signal-Arrays](README_subpages/SignalArrays.md)

</br>

## Notation

### Benennung von Funktionen

- Funktionsnamen wird aufgrund unterschiedlicher Bedeutung bei Groß- und Kleinschreibung von Farbräumen beim Original belassen. Dies ist eine bewusste Abweichung vom Pascal-/Camel-Case

- (Arrow-)Funktionen, die eine React-, React Native-, oder React-Three-Fiber-Komponente zurückgeben müssen mit einem Großbuchstaben beginnen.

- Zur besseren Unterscheidung werden Funktionen, die keine React-, React Native-, oder React-Three-Fiber-Komponente zurückgeben nicht als Arrow-Funktion geschrieben.

### Nennung von Signalen

- Signalname wird aufgrund unterschiedlicher Bedeutung bei Groß- und Kleinschreibung auch so belassen. Dies ist eine bewusste Abweichung vom Pascal-/Camel-Case. Z.B.: "signalxyY" anstatt "signalXyy".
    </br></br>


## Durchreichen von Daten

- Eltern nach Kind: Mittels props an child view.
- Kind nach Eltern: Mittels nach unten durchgereichter set()-Funktion
    (<https://www.pluralsight.com/guides/how-to-pass-data-between-react-components>)


## Nützliche Links

[Medium: Mit EsLint + Prettier Code Formatieren](https://edusutil.medium.com/eslint-with-prettier-settings-for-react-native-ce13d2aaf500)

[AirBnB Styleguide](https://airbnb.io/javascript/react/#ordering)
</br></br></br></br>
