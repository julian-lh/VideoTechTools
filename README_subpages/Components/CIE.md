# CIE-Normfarbtafel


## CieView
```JavaScript
export const CieView = ({   signalYCRCB,
                            withOverlays = false,
                            encodedVideoStandard = 1
                            }) => {...}
```
**signalYCRCB:**   siehe [Signal Arrays](../SignalArrays) </br>
**withOverlays:**  Buttons und Labels anzeigen (true/false) </br>
**encodedVidStdIdx:**  Index des Videostandards, dem signalYCRCB entspricht ([0..2] für Rec.601, 709 oder 2020) </br>

- Rechnet Signal für Visualisierung um

- Stellt Einstellungs-Menüs für Visualisierung bereit

### Optimierungen

- Einen Weg finden, um [OrbitControls](https://docs.pmnd.rs/drei/controls/orbit) zu integrieren (bisher Problem mit Paketversion von [drei](https://docs.pmnd.rs/drei/introduction))

</br>

### Verwendete GeneralComponents:
[ScopesCamera],
[VideoStandardAlertView],
[SettingsPopOver]

---

</br></br>

# Subkomponenten

</br>

## CiePlot

```JavaScript
const CiePlot = ({  signalxyY,
                    signalRGB,
                    dotSize = 0.01
                    }) => {...}
```


**signalxyY, signalRGB:**   siehe [Signal Arrays](../SignalArrays) </br>
**dotSize:**                Radius der Punkte im Plot

- Bringt Bildpunte des signalxyY in eine CIE-Normfarbtafel mit den entsprechenden Farben aus dem signalRGB

### Hinweise

- Kann nur innerhalb eines React-Three-Fiber Canvas verwendet werden

### Optimierungen

- Alternativ zu der aktuell relativen Darstellung der Farben: Modus um "echte Farben" darzustellen, sodass (durch sRGB-Farbraum-Begrenzung aus React Native) alle Farben außerhalb sRGB immer voll gesättigt dargestellt werden.

- Hier lässt sich die Performance noch deutlich optimieren, indem systematischer mit den Hooks "useMemo()", "useRef()",... gearbeitet wird und unter Verwendung eines [InstancedMesh](https://threejs.org/docs/#api/en/objects/InstancedMesh). Hier muss aber auf die Paketversion von Three geachtet werden, da neuere Versionen mit anderen Bibliotheken (wie react-three-fiber) Probleme bereiten kann.

</br>
</br>

---
</br>

## COS

```JavaScript
export const COS = (props) => {...}
```

**props:** --

- Koordinatensystem

### Hinweise

- Kann nur innerhalb eines React-Three-Fiber Canvas verwendet werden

### Optimierungen

- Achsenbeschriftungen fehlen

- Achsen dürfen nicht bunt sein

</br>
</br>

---
</br>

## CieBounds

```JavaScript
export const CieBounds = () => {
```

**props:** --

- Reine Spektrallinie des CIE inklusive Purpur-Linie

### Hinweise

- Kann nur innerhalb eines React-Three-Fiber Canvas verwendet werden

### Optimierungen

–

</br>
</br>

---
</br>

## GamutBounds

```JavaScript
export const GamutBounds = ({   showRec601,
                                showRec709,
                                showRec2020
                                }) => {...}
```

**showRec601:**     Farbraum-Grenzen für Rec.601 einblenden (true/false) </br>
**showRec709:**     Farbraum-Grenzen für Rec.709 einblenden (true/false) </br>
**showRec2020:**    Farbraum-Grenzen für Rec.2020 einblenden (true/false) </br>

- Zeichnet Farbraum-Grenzen in die CIE-Normfarbtafel

### Hinweise

- Kann nur innerhalb eines React-Three-Fiber Canvas verwendet werden

### Optimierungen

--

</br>
</br>

---
</br>

## GamutLabels

```JavaScript
export const GamutLabels = ({   showRec601,
                                showRec709,
                                showRec2020
                                }) => {...}
```

**showRec601:**     Farbraum-Beschriftung für Rec.601 einblenden (true/false) </br>
**showRec709:**     Farbraum-Beschriftung für Rec.709 einblenden (true/false) </br>
**showRec2020:**    Farbraum-Beschriftung für Rec.2020 einblenden (true/false) </br>

- Zeigt eine Legende mit den eingeblendeten Farbraum-Grenzen am Bildschirmrand an

### Hinweise

--

### Optimierungen

- könnte etwas schöner aussehen, ggf. auch direkt an die Gamut-Grenzen schreiben

</br>
</br>

---

