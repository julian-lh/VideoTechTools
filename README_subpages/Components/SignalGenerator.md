# Signal-Generator


## SignalGeneratorView
```JavaScript
export const SignalGeneratorView = ({   setSignal,
                                        setEncodingVideoStandard,
                                        setEncodingBitDepthIdx,
                                        showHideButton = false,
                                        style=undefined
                                        }) => {...}
```

**setSignal:**  Signal-Ausgang: Übergibt ein signalYCBCR siehe [Signal Arrays](../SignalArrays) über diesen Parameter an Eltern-Objekt. </br>
**setEncodingVideoStandard:**  Index des Videostandards, dem signalYCBCR entspricht ([0..2] für Rec.601, 709 oder 2020) </br>
**setEncodingBitDepthIdx:**  Index des Quantisierungsgrads, dem signalYCBCR entspricht ([0..2] für 8-, 10- oder 12-Bit) </br>
**showHideButton:**  Button zum Ausblenden des Generators einblenden (true/false) </br>
**style:**  Zum annehmen von Style-Parametern </br>

- Errechnet ein signalYCBCR aus einem signalSmallRGB.

- Buttons zum Wechsel des Videostandards und Quantisierung des signalYCBCR

- Beinhaltet einen GeneratorContainer um das signalSmallRGB zu beschreiben.

- Beinhaltet Corrector um das signalSmallRGB zu verändern.


### Optimierungen

- Benutzeroberfläche überarbeiten und Platz besser ausnutzen, damit die ScrollView weg kann.

- Wenn ScrollView weg ist und Performance optimiert wurde können Slider zum Einstellen der entsprechenden Parameter verwendet werden.

- Zur Vereinheitlichung den Parameter "setSignal" in "setSignalYCBCR" und "setEncodingVideoStandard" in "setEncodingVidStdIdx" umbenennen (und entsprechende Parameter inden Screens). Aus unerklärlichen Gründen führt dies zu dem Fehler "setSignalYCBCR is not a function.".

</br>

### Verwendete GeneralComponents:
--

---

</br></br>

# Subkomponenten

</br>

## GeneratorContainer

```JavaScript
const GeneratorContainer = ({   setSignalSmallRGB,
                                generatorIdx,
                                setGeneratorIdx
                                }) => {...}
```


**setSignalSmallRGB:** Signal-Ausgang: Übergibt ein signalSmallRGB (siehe [Signal Arrays](../SignalArrays.md)) über diesen Parameter an Eltern-Objekt. </br>
**generatorIdx:** Index des Generators, der verwendet und angezeigt werden soll. </br>
**setGeneratorIdx:**  Veränderund des Generator-Index beim Eltern-Objekt.</br>

- Sammelt alle Generator-Typen und stellt Schaltflächen zum Wechsel des anzuzeigenden Generators bereit.

### Hinweise

--

### Optimierungen

- Ggf. mittels ["Containment"](https://reactjs.org/docs/composition-vs-inheritance.html) umsetzen, um alles kompakter und flexibler für neue Signalarten zu machen. Gleiches Prinzip wie mit den Settings-Objekten.

</br>
</br>

---
</br>

## FullColorGenerator

```JavaScript
export const FullColorGenerator = ({ setSignalSmallRGB })=> {...}
```

**setSignalSmallRGB:** Signal-Ausgang: Übergibt ein signalSmallRGB (siehe [Signal Arrays](../SignalArrays.md)) über diesen Parameter an Eltern-Objekt. </br>

- Erzeugt ein einfarbiges Vollbild als signalSmallRGB.

- Benutzeroberfläche mit RGB- und HSV-Modus.

### Hinweise

- showingRgbControls dient neben dem Wechsel der Anzeige vor Allem dazu, dass sich die useLaysoutEffect()-Hooks nicht in einer Endlosschleife verfangen.

### Optimierungen

- TapButtons durch Slider ersetzen wenn Optimierungen in [SignalGeneratorView](#signalgeneratorview) erfüllt sind.

- Option um Überpegel mit den RGB-Parametern zu erzeugen.

</br>
</br>

---
</br>

## GradientGenerator

```JavaScript
export const GradientGenerator = ({ setSignalSmallRGB })=> {...}
```

**setSignalSmallRGB:** Signal-Ausgang: Übergibt ein signalSmallRGB siehe [Signal Arrays](../SignalArrays) über diesen Parameter an Eltern-Objekt. </br>

- Erzeugt ein Farbverlauf als signalSmallRGB.

- Wechsel von horizontalen und vertikalen Verlauf

- Schnellauswahl wichtiger Farbwerte durch Button-Matrix (ColorPad).

### Hinweise

--

### Optimierungen

- Ggf. zusätzliche Ansicht mit detaillierteren Einstellungsmöglichkeiten der Farbwerte (mit RGB und HSV-Slidern)

</br>
</br>

---
</br>

## BarsGenerator

```JavaScript
export const BarsGenerator = ({ setSignalSmallRGB })=> {...}
```

**setSignalSmallRGB:** Signal-Ausgang: Übergibt ein signalSmallRGB siehe [Signal Arrays](../SignalArrays) über diesen Parameter an Eltern-Objekt. </br>

- Erzeugt EBU-Farbbalken als signalSmallRGB.

- Benutzeroberfläche mit Wechsel zwischen 100/100 und 100/75

### Hinweise

--

### Optimierungen

- Weitere Test-Bilder

</br>
</br>

---
</br>

## Corrector

```JavaScript
export const Corrector = ({ contrastOffset,
                            setContrastOffset,
                            gammaOffset,
                            setGammaOffset,
                            brightnessOffset,
                            setBrightnessOffset
                            }) => {
```

**contrastOffset:**     Aktueller Wert des Kontrast-Versatz-Parameters des Eltern-Objekts.</br>
**setContrastOffset:**  Übergibt neuen Wert des Kontrast-Versatz-Parameters ans Eltern-Objekt.</br>
**gammaOffset:**        Aktueller Wert des Gamma-Versatz-Parameters des Eltern-Objekts.</br>
**setGammaOffset:**     Übergibt neuen Wert des Gamma-Versatz-Parameters ans Eltern-Objekt.</br>
**brightnessOffset:**   Aktueller Wert des Helligkeit-Versatz-Parameters des Eltern-Objekts.</br>
**setBrightnessOffset:** Übergibt neuen Wert des Helligkeit-Versatz-Parameters ans Eltern-Objekt.</br>

- Benutzeroberfläche zum Verändern der Corrector-Parameter im Eltern-Objekt.

### Hinweise

--

### Optimierungen

- TapButtons durch Slider ersetzen wenn Optimierungen in [SignalGeneratorView](#signalgeneratorview) erfüllt sind.

- Sättigungs-Regler hinzufügen.

</br>
</br>

---
</br>
