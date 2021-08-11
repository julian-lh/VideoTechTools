# Vektorskop


## VectorscopeView
```JavaScript
export const VectorscopeView = ({   signalYCRCB,
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

</br>

### Verwendete GeneralComponents:
[ScopesCamera],
[VideoStandardAlertView],
[SettingsPopOver]

---

</br></br>

# Subkomponenten

</br>

## VectorscopePlot

```JavaScript
const VectorscopePlot = ({  signalSmallYCRCB,
                            signalRGB,
                            useDiscreteSignalRepresentation
                            }) => {...}
```


**signalSmallYCRCB, signalRGB:**   siehe [Signal Arrays](../SignalArrays) </br>
**useDiscreteSignalRepresentation:**  Signal als diskrete Punkte oder als Linienzug darstellen (true/false)

- Bildet Bildpunkte des signalSmallYCRCB mit den entsprechenden Farben aus dem signalRGB im Vektorskop ab.

### Hinweise

- Kann nur innerhalb eines React-Three-Fiber Canvas verwendet werden

### Optimierungen

- Hier lässt sich die Performance noch deutlich optimieren, indem systematischer mit den Hooks "useMemo()", "useRef()",... gearbeitet wird und unter Verwendung eines [InstancedMesh](https://threejs.org/docs/#api/en/objects/InstancedMesh). Hier muss aber auf die Paketversion von Three geachtet werden, da neuere Versionen mit anderen Bibliotheken (wie react-three-fiber) Probleme bereiten kann.

</br>
</br>

---
</br>

## LinePlot

```JavaScript
export const LinePlot = ({ signalSmallYCRCB }) => {...}
```

**signalSmallYCRCB:** siehe [Signal Arrays](../SignalArrays)

- Zeichnet die Bildpunkte wie ein analoges Vektorskop als Linienzug über die Bildzeilen ein.

### Hinweise

- Kann nur innerhalb eines React-Three-Fiber Canvas verwendet werden

### Optimierungen

- Achsenbeschriftungen fehlen

</br>
</br>

---
</br>

## VectorscopeBounds

```JavaScript
export const CieBounVectorscopeBoundsds = () => {
```

**props:** --

- Zeichnet Achsen und Kreis mit Radius 1.

### Hinweise

- Kann nur innerhalb eines React-Three-Fiber Canvas verwendet werden

### Optimierungen

– Lässt sich mit den Anmerkungen zu [VectorscopePlot](#vectorscopeplot) ggf. noch optimieren.

</br>
</br>

---
</br>

## PeakSignalHexagon

```JavaScript
export const PeakSignalHexagon = ({ videoStandard }) => {...}
```

**videoStandard:**  Videostandard abgekürzt als String ("601", "709", "2020") </br>

- Zeichnet abhängig vom Videostandard die Chroma-Signal-Grenzen als Hexagon ein.

### Hinweise

- Kann nur innerhalb eines React-Three-Fiber Canvas verwendet werden

### Optimierungen

– Lässt sich mit den Anmerkungen zu [VectorscopePlot](#vectorscopeplot) ggf. noch optimieren.

</br>
</br>

---