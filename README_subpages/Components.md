# CIEView

```JavaScript
export const CIEView = ({   signalYCRCB,
                            withOverlays = false,
                            encodedVideoStandard = 1
                            }) => {...}
```
## Input-Parameter

| Parameter   | Beschreibung          | vorgesehener Signalbereich      | Default   |
| ----------- | --------------------- | ------------------------------- |---------  |
| signalYCRCB | YCrCb-Signal-Array 3D | 0 ≤ signalYCRCB[x][y][0..2] ≤ 1 |   --      |
| withOverlays| Buttons und Labels anzeigen  | true/false  | false
| encodedVideoStandard  | Rec. 601, 709 oder 2020 | 0..2                           |   1


## Plot

```JavaScript
const CIEPlot = ({  signalxyY,
                    signalRGB,
                    dotSize = 0.01
                    }) => {...}
```
signalxyY : xyY-Array, normierte Werte (0..1)
## Graphen-Beschriftungen

- Koordinatensystem

- Begrenzungslinien der Gamuts von Rec. 601, 709 und 2020 mit Legende und Weißpunkt

</br>
</br>
</br>

---

</br>

# SignalGenerator

```JavaScript

```

# SignalPreview

```JavaScript
const RGBSignalPreview = ({ rgbSignal,
                            YCrCbSignal = undefined,
                            labelIndex = 0
                            }) => {...}
                    // Videostandard mit übergeben
```

# VectorscopeView

# WFMView
