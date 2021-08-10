# CIE-Normfarbtafel


## CieView
```JavaScript
export const CieView = ({   signalYCRCB,
                            withOverlays = false,
                            encodedVideoStandard = 1
                            }) => {...}
```
### Input-Parameter

| Parameter   | Beschreibung          | vorgesehener Signalbereich      | Default   |
| ----------- | --------------------- | ------------------------------- |---------  |
| signalYCRCB | siehe "Signal Arrays"   | |   |
| withOverlays| Buttons und Labels anzeigen  | true/false  | false
| encodedVideoStandard  | Rec.601, 709 oder 2020 | 0..2                           |   1

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

## CiePlot

```JavaScript
const CiePlot = ({  signalxyY,
                    signalRGB,
                    dotSize = 0.01
                    }) => {...}
```

**dotSize:**                Größe, in der die Punkte im Plot erscheinen sollen. </br>
**signalxyY, signalRGB:**   siehe [Signal Arrays](../SignalArrays)

- Bringt Bildpunte des signalxyY in eine CIE-Normfarbtafel mit den entsprechenden Farben aus dem signalRGB

### Hinweise

- Kann nur innerhalb eines React-Three-Fiber Canvas verwendet werden

### Optimierungen

- Alternativ zu der aktuell relativen Darstellung der Farben: Modus um "echte Farben" darzustellen, sodass (durch sRGB-Farbraum-Begrenzung aus React Native) alle Farben außerhalb sRGB immer voll gesättigt dargestellt werden.

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

- Linien nicht bunt

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

