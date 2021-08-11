# Screens

## CIE-Normfarbtafel

```JavaScript
export default function CieScreen() {
```

Farbmodell zur Visualisierung aller vom menschlichen Auge wahrnehmbaren Farben (in 3D Ansicht) bzw. Farbwerte (in xy-Ansicht).

### Verwendete Komponenten

- [CIEView](./Components/CIE.md)

- [SignalPreviewView](./Components/SignalPreview.md)

- [SignalGeneratorView](./Components/SignalGenerator.md)

### Ideen für neue Funktionen

- "Orbit-Controls" für die Bewegung der Kameraperspektive in 3D

- 3D Gamut-Körper einblenden

- Einstellungen für die Punkt-Farbe. Also ob Farben relativ zum Farbraum dargestellt werden sollen oder ob sie immer nur den in sRGB abbildbaren Bereich in Farbe darstellen soll.

</br>
</br>

---

</br>

## Waveformmonitor

```JavaScript
export default function WfmScreen() {
```

Instrument zur Betrachtung der Pegel eines Videosignals. Beinhalgtet Darstellungsformen als Komponentensignal, Luma-Signal und RGB. Darstellungen als Paraden

### Verwendete Komponenten

- [WFMView](./Components/WFM.md)

- [SignalPreviewView](./Components/SignalPreview.md)

- [SignalGeneratorView](./Components/SignalGenerator.md)

### Ideen für neue Funktionen

- Lineinzug-Darstellung, wie im Vektorskop

- Overlay-Ansichten

</br>
</br>

---

</br>

## Vektorskop

```JavaScript
export default function VectorscopeScreen() {
```

Instrument zur Betrachtung des Chrominanzanteils eines Komponentensignals.

### Verwendete Komponenten

- [VectorscopeView](./Components/Vectorscope.md)

- [SignalPreviewView](./Components/SignalPreview.md)

- [SignalGeneratorView](./Components/SignalGenerator.md)

### Ideen für neue Funktionen

- Option zur Anzeige von Toleranzfeldern


</br>
</br>

---

</br>

## Komponentensignal

```JavaScript
export default function SignalPreviewScreen() {
```

Eine Vollbildansicht der Signalvorschau zur genaueren Betrachtung der erzeugnten Signale.
Beinhaltet eine Beschriftung über die Signalwerte in RGB und als Komponentensignal.

### Verwendete Komponenten

- [SignalPreviewView](./Components/SignalPreview.md)

- [SignalGeneratorView](./Components/SignalGenerator.md)

### Ideen für neue Funktionen

- Bessere Formatierung der Beschriftungen. Speziell bei horizontalen Farbverläufen im Signal

</br>
</br>

---

</br>

## Scopes Übersicht

```JavaScript
export default function ScopesCombinationScreen() {
```

Gesamtübersicht über alle Messinstrumente. Zeigt in welcher Bezeihung diese zueinander stehen.

### Verwendete Komponenten

- [CIEView](./Components/CIE.md)

- [WFMView](./Components/WFM.md)

- [VectorscopeView](./Components/Vectorscope.md)

- [SignalPreviewView](./Components/SignalPreview.md)

- [SignalGeneratorView](./Components/SignalGenerator.md)

### Ideen für neue Funktionen

–-