# Dokumentation VideTechTools

_VideoTechTools_ ist eine Sammlung von Simulationen für die Videotechnik-Vorlesung.

## Wie liest man diese Dokumentation am besten?

Für eine ideale Darstellung dieser Markdown-Datei (.md) empfiehlt es sich z.B. [Microsoft Virtual Code](https://code.visualstudio.com) zu verwenden. Beim Öffnen dieser Datei erscheint in der Symbolleiste in der oberen rechten Ecke des Fensters ein entsprechender Vorschau-Button. Auf macOS funktioniert auch der Shortcut `shift + cmd + v`. So lassen sich alle Verlinkungen nutzen.

## Installation

Grundlage für die Entwicklung mit React Native ist die Verwendung von [Node.JS](https://nodejs.org/de/). Dazu empfiehlt sich die LTS-Version.

Um die einzelnen Bibliotheken zu verwalten kommt der Paket Manager [Yarn](https://classic.yarnpkg.com/en/docs/install/) zum Einsatz. Dieser lässt sich im Terminal z.B. über folgenden Befehl installieren:

```bash
npm install --global yarn
```

Ggf. muss der Befehl `sudo` vorangestellt werden.

Sind die Voraussetzungen erfüllt, wird über folgenden Befehl die Anwendung Expo-CLI installiert. Dies kann einige Minuten dauern:

```bash
yarn add expo-cli
```

Zum Schluss müssen im Haupt-Verzeichnis von VideoTechTools mit folgender Anweisung alle verknüpften Bibliotheken installiert werden:
```bash
yarn install
```

## Ausführen der App mit Expo

Um die App mit Expo auszuführen muss im Haupt-Verzeichnis lediglich folgender Befehl ausgeführt werden:

```bash
expo start
```

Alternativ funktioniert auch:

```bash
yarn start
```

Daraufhin öffnet sich im Webbrowser eine Benutzeroberfläche mit einem QR-Code, der mit dem Smartphone gescant werden kann, sofern die App _Expo Go_ darauf installiert ist.

Sollte es hier zur Fehlermeldung `ERROR watch EMFILE` kommen, so muss die Anwendung [Watchman](https://facebook.github.io/watchman/docs/install.html) installiert werden. Hierzu kann mittels [Homebrew](https://brew.sh/index_de) erfolgen: `brew install watchman`


</br></br>


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
</br></br>

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

## Wie füge ich eine neue Simulation hinzu?

1. **NEUER SCREEN:** Wenn ein neues Themengebiet entsteht empfiehtl es sich zunächst in _screens_ einen neuen Ordner auf gleicher Ebene wie _signalAndScopes_ angzulegen.
Erstelle dann eine neue JavaScript-Datei. Für den Inhalt der Datei empfiehlt es sich an den bestehenden Simulationen zu orientieren.

2. **IN NAVIGATOR VERKNÜPFEN:** Unter _navigation_ in _AppNavagation.js_ muss zunächst der neue Screen importiert werden. Um eine Header-Bar zu erhalten kann nach dem Vorbild der bestehenden Seiten eine neue StackWrap-Funktion angelegt werden. Daraufhin muss diese einen eigenen Drawer.Screen-Eintrag in der Funktion `Navigation` erhalten. Um ein neues Icon hinzuzufügen muss nur der switch-Ausdruck nach Vorbild der bestehenden einträge erweitert werden.

3. **SCREEN GESTALTEN:** Um die App so Variabel wie möglich zu machen sind alle verwendeten Komponenten in _components_ untergebracht. Es kann sich also entweder hieraus mittels Import im Screen bedient oder neue Komponenten erstellt werden. Mathematische Funktionen kommen im Ordner _calculations_ unter.

</br>

## Wie veröffentliche ich eine neue App-Version in Expo?

Vor veröffentlichung einer neuen Version ermpfiehlt es sich in _app.json_ zunächst drei Versionsnummern erhöht werden:  expo.version, expo.ios.buildNumber und expo.android.versionCode

Verpflichtend ist dies aber nur wenn eine Version für die Veröffentlichung außerhalb Expo mittels Build-Feature vorgesehen wird (siehe Expo Dokumentation).

Dazu bietet Expo eine umfassende Dokumentation. Wichtig ist dabei zu beachten, dass es Release Channel gibt, mit denen man für unterschiedliche App-Versionen einen anderen Link erzeugen kann.
Wird kein Release-Channel angegeben, so wird der "Default"-Channel verwendet.
Im Allgemeinen gilt der Befehl

```bash
expo publish --release-channel <your-channel>
```
Siehe [Expo Release Channels](https://docs.expo.dev/distribution/release-channels/)

</br>

## Nützliche Tutorials

[React](https://reactjs.org/tutorial/tutorial.html)
[React Native](https://reactnative.dev/docs/tutorial)
[Durchreichen von Daten](<https://www.pluralsight.com/guides/how-to-pass-data-between-react-components>)

[Three.JS](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene)
[React-Three-Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/your-first-scene)

[Expo](https://docs.expo.dev/introduction/walkthrough/)

## Dokumentationen der verwendeten Bibliotheken

[React](https://reactjs.org/docs/getting-started.html)
[React Native ](https://reactnative.dev/docs/getting-started)

[Three.JS](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene)
[React-Three-Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)

[Expo](https://docs.expo.dev/guides/)

</br></br></br></br>
