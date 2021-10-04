# Dokumentation VideTechTools

_VideoTechTools_ ist eine Sammlung von Simulationen für die Videotechnik-Vorlesung.

## Installation

Zur Entwicklung der App wird zunächst die Anwendung Expo-CLI benötigt:

```bash
yarn add expo-cli
```

Daraufhin müssen im Haupt-Verzeichnis von VideoTechTools mit folgender Anweisung alle verwendeten Bibliotheken installiert werden:
```bash
yarn install
```

Falls Node.JS nicht automatisch mitinstalliert wird, kann dies hierüber erfolgen: [Node.JS](https://nodejs.org/de/)


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


</br></br>


## Nützliche Tutorials

[React](https://reactjs.org/tutorial/tutorial.html)
[React Native](https://reactnative.dev/docs/tutorial)

[Three.JS](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene)
[React-Three-Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/your-first-scene)

[Expo](https://docs.expo.dev/introduction/walkthrough/)

[Durchreichen von Daten](<https://www.pluralsight.com/guides/how-to-pass-data-between-react-components>)

## Dokumentationen der verwendeten Bibliotheken


[React](https://reactjs.org/docs/getting-started.html)
[React Native ](https://reactnative.dev/docs/getting-started)

[Three.JS](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene)
[React-Three-Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)

[Expo](https://docs.expo.dev/guides/)

</br></br></br></br>
