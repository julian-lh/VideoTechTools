# Einstellungs-Fenster


## SettingsPopOverContainer
```JavaScript
export const SettingsPopOverContainer = (props) => {...}
```
**props.children:** Einstellungs-Elemente </br>
**props.setSettingsVisible:**  Übergibt dem Eltern-Objekt mit "false" den Befehl zum Schließen.</br>

</br>

- Einstellungs-Fenster, das als Container für Einstellungs-Elemente fungiert.

### Hinweise

- (props.children) ist ein von React reservierter Parameter um React-Elemente übergeben zu bekommen. Siehe  [Containment - React Dokumentation](https://reactjs.org/docs/composition-vs-inheritance.html)

### Verwendete GeneralComponents:
--

---

</br></br>

# Subkomponenten

</br>

## ToggleElement

```JavaScript
const ToggleElement = (
    {
    elementTitle,
    title,
    onPress,
    }) => {...}
```

**elementTitle:**   Titel des Elements </br>
**title:**  Titel des Buttons </br>
**onPress:**  Funktion, die im Eltern-Objekt des SettingsPopOverContainers beim Anklicken ausgeführt wird. </br>

- Allgemein nutzbarer, einfacher Button.

### Hinweise

- braucht einen SettingsPopOverContainer.

### Optimierungen

--

</br>
</br>

---
</br>

## GamutSelectElement

```JavaScript
export const GamutSelectElement = (
    {
    showRec601,
    toggleRec601,
    showRec709,
    toggleRec709,
    showRec2020,
    toggleRec2020
    }) => {...}
```

**showRec601:** Sichtbarkeit der Rec.601-Gamuts-Grenzen im Elternobjekt des SettingsPopOverContainers (true/false)</br>
**toggleRec601:** Funktion zum Wechsel der Sichtbarkeit der Rec.601-Gamuts-Grenzen </br>
**showRec709:** Sichtbarkeit der Rec.709-Gamuts-Grenzen im Elternobjekt des SettingsPopOverContainers (true/false)</br>
**toggleRec709:** Funktion zum Wechsel der Sichtbarkeit der Rec.709-Gamuts-Grenzen  </br>
**showRec2020:** Sichtbarkeit der Rec.2020-Gamuts-Grenzen im Elternobjekt des SettingsPopOverContainers (true/false)</br>
**toggleRec2020:** Funktion zum Wechsel der Sichtbarkeit der Rec.2020-Gamuts-Grenzen  </br>

- Element um die Gamut-Grenzen für die CIE-Normfarbtafel auszuwählen.


### Hinweise

- braucht einen SettingsPopOverContainer.

### Optimierungen

--

</br>
</br>

---
</br>

## VideoStandardSelectElement

```JavaScript
export const VideoStandardSelectElement = (
    {
    vidStdIdx,
    setVidStdIdx,
    bitDepthIdx,
    setBitDepthIdx
    }) => {
```

**aspectRatio:** Bildseitenverhältnis der Waveform-Darstellung, in der es abgebildet wird </br>

- Zum Wechseln des Videostandards und des Quantisierungsgrades im Eltern-Objekt des SettingsPopOverContainers.

### Hinweise

- braucht einen SettingsPopOverContainer.

### Optimierungen

--

</br>
</br>

---
</br>
