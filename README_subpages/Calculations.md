# Calculations

## CalcColorSpaceTransform

- Funktionen zum Umrechnen von Farbmodellen.

</br>

**Für einzelne Tripel:**

```JavaScript
export function cvtRGBtoXYZ(rgb_array, colorSpace = "709") {...}
export function cvtHSVtoRGB(HSV_array) {...}
export function cvtRGBtoHSV(RGB_array) {...}

export function cvtXYZtoxy(XYZ_array) {...}
export function cvtXYZtoxyY(XYZ_array) {...}
```

**Für Singal-Arrays:**

```JavaScript
export function cvtSignalRGBtoXYZ(signalRGB, colorSpace = "709") {...}

export function cvtSignalXYZtoxy(signalXYZ) {...}
export function cvtSignalXYZtoxyY(signalXYZ) {...}
```

</br>
</br>

---

</br>

## CalcColorSpaceTransform

- Funktionen zum Rechnen mit Komponentensignalen.

</br>

**Für einzelne Tripel:**

```JavaScript
export function cvtRGBtoYCRCB(RGB, standard = "709") {...}
export function cvtYCRCBtoRGB(YCRCB, standard = "709") {...}

export function upscaleYCRCB(YCRCB, bitDepth = 10) {...}
export function downscaleYCRCB(YCRCB, bitDepth = 10) {...}

export function limiterYCRCB(YCRCB, bitDepth, fullVideoData = false) {...}
```

**Für Singal-Arrays:**

```JavaScript
export function cvtSignalRGBtoYCRCB(signalRGB, videoStandard = "709" ) {...}
export function cvtSignalYCRCBtoRGB(signalYCRCB, videoStandard = "709" ) {...}

export function upscaleSignalYCRCB(signalSmallYCRCB, bitDepth = 10 ) {...}
export function downscaleSignalYCRCB(signalYCRCB, bitDepth = 10 ) {...}

export function limiterSignalYCRCB(signalYCRCB, bitDepth, fullVideoData = false) {...}
export function limiterSignalSmallRGB(signalSmallRGB, fullVideoData = false) {...}
```

</br>
</br>

---

</br>

## CalcSignalCorrector

- Funktionen des Correctors.

</br>

**Für einzelne Tripel:**

```JavaScript
function offsetContrast(pixelValue = [0, 0, 0], m = 1) {...}
function offsetBrightness(pixelValue = [0, 0, 0], b = 0) {...}
function offsetGamma(pixelValue = [0, 0, 0], gamma = 1, maxValue = 1) {...}
```

**Für Singal-Arrays:**

```JavaScript
export function offsetSignalContrast(signalRGB, m = 1) {...}
export function offsetSignalBrightness(signalRGB, b = 0) {...}
export function offsetSignalGamma(signalRGB, gamma = 1, maxValue = 1) {...}
```

</br>
</br>

---

</br>

## CalcSignalCorrector

- Funktionen des Correctors.

</br>

**Für einzelne Tripel:**

```JavaScript
function offsetContrast(pixelValue = [0, 0, 0], m = 1) {...}
function offsetBrightness(pixelValue = [0, 0, 0], b = 0) {...}
function offsetGamma(pixelValue = [0, 0, 0], gamma = 1, maxValue = 1) {...}
```

**Für Singal-Arrays:**

```JavaScript
export function offsetSignalContrast(signalRGB, m = 1) {...}
export function offsetSignalBrightness(signalRGB, b = 0) {...}
export function offsetSignalGamma(signalRGB, gamma = 1, maxValue = 1) {...}
```

</br>
</br>

---

</br>

## CalcSignalGenerator

- Funktionen der Signal-Generatoren.

</br>


```JavaScript
export function generateRGBSignalFullColor(valueRGB, width, height){
export function generateRGBSignalBars(width = 8, height = 1, type100 = true){
export function generateRGBSignalGradient(startRGB, endRGB, width, height, directionHorizontal=true){

function blendPixel(firstRGB, secondRGB, ratio = 0.5){
```

</br>
</br>

---

</br>

## CalcHelpers

- Sonstige Hilfs-Funktionen.

</br>


```JavaScript
export function rgbToString(rgbArray){...}

export function rgbToComplColorString(rgbArray){...}

export function clamp(value, min = 0, max = 1) {...}

```

</br>
</br>

---

</br>