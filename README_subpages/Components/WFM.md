# Waveformmonitor


## WfmView
```JavaScript
export const WfmView = ({   signalYCBCR,
                            withOverlays = false,
                            encodedVidStdIdx = 1,
                            encodedBitDepthIdx = 0 
                            }) => {...}
```
**signalYCBCR:**   siehe [Signal Arrays](../SignalArrays) </br>
**withOverlays:**  Buttons und Labels anzeigen (true/false) </br>
**encodedVidStdIdx:**  Index des Videostandards, dem signalYCBCR entspricht ([0..2] für Rec.601, 709 oder 2020) </br>
**encodedBitDepthIdx:** Quantisierungsgrad, in dem signalYCBCR vorliegt ([0..2] für 8-, 10- oder 12-Bit) </br>

</br>

- Rechnet Signal für Visualisierung um

- Stellt Einstellungs-Menüs für Visualisierung bereit

</br>

### Verwendete GeneralComponents:
[ScopesCamera],
[VideoStandardAlertView],
[SettingsPopOver]

---

</br></br>

# Subkomponenten

</br>

## WfmPlot

```JavaScript
const WfmPlot = ({  signalSmallYCBCR,
                    signalRGB,
                    representationID,
                    aspectRatio = 1.78
                    }) => {...}
```


**signalSmallYCBCR, signalRGB:**   siehe [Signal Arrays](../SignalArrays) </br>
**representationID:**  Wechsel zwischen RGB-, YCBCR-, Luma-Darstellung (0, 1, 2) </br>
**aspectRatio:**  Seitenverhältnis des Plots </br>

- Bildet Bildpunkte des signalSmallYCBCR  mit den entsprechenden Farben aus dem signalRGB als Waveformdarstellung ab. Dabei werden die Bildpunkte horizontal auf die Breite eines Vollbilds gestreckt.

### Hinweise

- Kann nur innerhalb eines React-Three-Fiber Canvas verwendet werden

### Optimierungen

- Hier lässt sich die Performance noch deutlich optimieren, indem systematischer mit den Hooks "useMemo()", "useRef()",... gearbeitet wird und unter Verwendung eines [InstancedMesh](https://threejs.org/docs/#api/en/objects/InstancedMesh). Hier muss aber auf die Paketversion von Three geachtet werden, da neuere Versionen mit anderen Bibliotheken (wie react-three-fiber) Probleme bereiten kann.

</br>
</br>

---
</br>

## signalToWfmArray

```JavaScript
function signalToWfmArray(  signalArray,
                            channelIdx,
                            hexColorString = "#555",
                            paradePosition = undefined,
                            withChromaOffset = false,
                            aspectRatio = 1.78)
                            {...}
```

**signalArray:** signalSmallYCBCR oder signalRGB, siehe [Signal Arrays](../SignalArrays) </br>
**channelIdx:** Auswahl des Signal-Kanals (0,1,2) </br>
**hexColorString:** Farbe, mit der der der Kanal im WfmPlot abgebildet werden soll (hexadezimal-String)</br>
**paradePosition:** Position in der Paraden-Darstellung. Bei undefinded wird es über die volle WFM-Breite abgebildet (undefined, 0, 1, 2) </br>
**withChromaOffset:** Vertikaler Versatz der Nullinie auf 50% für Chroma-Komponenten (true/false) </br>
**aspectRatio:** Bildseitenverhältnis der Waveform-Darstellung, in der es abgebildet wird </br>

- Erstellt aus einem Signal-Kanal ein Array, mit dessen Koordinaten für eine Waveform-Darstellung.

- Zu drei Raum-Koordinaten kommt jeweils noch die Farbe, in der der Kanal im WfmPlot dargestellt werden soll.

### Hinweise

- Die z-Koordinate wird nur zur besseren Weiterverarbeitung im WfmPlot hinzu genommen.

- Könnte auch als Arrow-Function geschrieben werden. Zur Unterscheidung, dass es nur eine Berechnung ausführt wird es als "Reguläre" Funktion geschrieben.

### Optimierungen

--

</br>
</br>

---
</br>

## WfmGrid

```JavaScript
export const WfmGrid = ({ aspectRatio = 1.78 }) => {
```

**aspectRatio:** Bildseitenverhältnis der Waveform-Darstellung, in der es abgebildet wird </br>

- Zeichnet horizontale Linien für eine 10%-Skallierung.

### Hinweise

- Kann nur innerhalb eines React-Three-Fiber Canvas verwendet werden

### Optimierungen

- Lässt sich mit den Anmerkungen zu [WfmPlot](#wfmplot) ggf. noch optimieren.

</br>
</br>

---
</br>
