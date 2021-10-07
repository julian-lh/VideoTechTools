# Allgemeine Komponenten (Kurze)

## ScopesCamera

```JavaScript
export const ScopesCamera = (
    {
    position,
    target = [0, 0, 0],
    initialZoomScale = 1,
    zoomOffset = 0
    }) => {...}
```

**position:**           3D Position der Kamera (Array: [ x, y, z])</br>
**target:**             Punkt auf den die Kamera Blickt (Array: [ x, y, z])</br>
**initialZoomScale:**   Zum anpassen des Standard-Zooms der Kamera, je nach Visualisierung (Fließkommazahl)</br>
**zoomOffset:**         Relativer Versatz des Kamera-Zooms (Fließkommazahl) </br>


- Eine React-Three-Fiber-Kamera, mit angepassten Funktionen für die Abbildung von Messansichten

- Orthographische projizierend, um Messvisualisierungen nicht zu verzerren.

### Hinweise

- Kann nur innerhalb eines React-Three-Fiber Canvas verwendet werden

### Optimierungen

- Für die Nutzung in 3D CIE-Normfarbtafel ggf. Wechsel zur perspektivischen Projektion zur besseren Orientierung.

</br>
</br>

---

</br>

## VideoStandardAlertView

```JavaScript
export const VideoStandardAlertView = (
    {
    signalVidStdIdx,
    scopeVidStdIdx,
    signalBitDepthIdx = 0,
    scopeBitDepthIdx = 0
    }) => {...}
```

**signalVidStdIdx:**    Videostandard des erhaltenen Videosignals (Rec.601, 709, 2020 als Index 0...2)</br>
**scopeVidStdIdx:**     Videostandard, die in der Messansicht eingestellt ist (Rec.601, 709, 2020 als Index 0...2) </br>
**signalBitDepthIdx:**  Quantisierungsgrad, des erhaltenen Videosignals  ([0..2] für 8-, 10- oder 12-Bit) </br>
**scopeBitDepthIdx:**     Quantisierungsgrad, die in der Messansicht eingestellt ist ([0..2] für 8-, 10- oder 12-Bit) </br>

- Blendet einen Hinweis ein wenn die Messansicht einen anderen Videostandard bzw. Quantisierungsstufe erwartet als für das Signal verwendet wurde.

### Hinweise

--

### Optimierungen

--

</br>
</br>

---
</br>
