# Signal-Vorschau


## SignalPreviewView

```JavaScript
export const SignalPreviewView = ({ signalYCRCB,
                                    withOverlays = false,
                                    encodedVideoStandard = 1
                                    }) => {...}
```

**signalYCRCB:**   siehe [Signal Arrays](../SignalArrays) </br>
**withOverlays:**  Buttons und Labels anzeigen (true/false) </br>
**encodedVideoStandard:**  Videostandard, dem signalYCRCB entspricht ([0..2] für Rec.601, 709 oder 2020) </br>

</br>

- Rechnet Signal für Visualisierung um

- Stellt Einstellungs-Menüs für Visualisierung bereit

### Optimierungen

- Settings und VideoStandardAlertView einbinden

- Hinzufügen von Videostandard-Wechsel erfordert, dass für die Vorschau ein Wechsel zwischen relativer Farb-Darstellung und absoluter Farb-Darstellung besteht (alles über sRGB hinaus klippt)

### Verwendete GeneralComponents:
--

---

</br></br>

# Subkomponenten

</br>

## SignalPreviewPlot

```JavaScript
const SignalPreviewPlot = ({    signalRGB,
                                signalYCRCB = undefined
                                labelIdx = 0
                                }) => {...}
```

**signalRGB, signalYCRCB:**   siehe [Signal Arrays](../SignalArrays) </br>
**labelIdx:**  Auswahl welche Beschriftung auf Bildpunkt-Gruppe eingeblendet werden soll: keins, signalRGB oder signalYCRCB (0, 1, 2)

- Erzeugt eine Vorschau des signalRGB, indem die Bildpunkt-Werte auf ein Vollbild gestreckt werden.

- Blendet optional die Signalwerte von signalRGB oder signalYCRCB ein.

### Hinweise

- Kann außerhalb von React-Three-Fiber Canvas verwendet werden, weil React Native Views verwendet werden.

### Optimierungen

- Hier lässt sich die Performance noch deutlich optimieren, indem systematischer mit den Hooks "useMemo()", "useRef()",... gearbeitet wird.

- Manchmal erscheinen weiße Linien zwischen den Bildpunkt-Gruppen.

</br>
</br>

---
</br>
