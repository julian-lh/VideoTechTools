
# CIE-Normfarbtafel

Farbmodell zur Visualisierung aller vom menschlichen Auge wahrnehmbaren Farben (in 3D Ansicht) bzw. Farbwerte (in xy-Ansicht).

## Verwendete Komponenten

- [CIEView](Components.md#cieview)

- [SignalPreview](Components.md#signalpreview)

- [SignalGenerator](Components.md#signalgenerator)

## Ideen für neue Funktionen

- "Orbit-Controls" für die Bewegung der Kameraperspektive in 3D

- 3D Gamut-Körper einblenden

- Einstellungen für die Punkt-Farbe. Also ob Farben relativ zum Farbraum dargestellt werden sollen oder ob sie immer nur den in sRGB abbildbaren Bereich in Farbe darstellen soll.

</br>
</br>

---

</br>

# Waveformmonitor

Instrument zur Betrachtung der Pegel eines Videosignals. Beinhalgtet mehrere Darstellungsformen als Komponenten und in RGB. Darstellungen als Paraden-Ansicht

## Verwendete Komponenten

- [WFMView](Components.md#wfmview)

- [SignalPreview](Components.md#signalpreview)

- [SignalGenerator](Components.md#signalgenerator)

## Ideen für neue Funktionen

- Lineinzug-Darstellung, wie im Vektorskop

- Overlay-Ansichten

</br>
</br>

---

</br>

# Vektorskop

Instrument zur Betrachtung des Chrominanzanteils eines Komponentensignals.

## Verwendete Komponenten

- [VectorscopeView](Components.md#vectorscopeview)

- [SignalPreview](Components.md#signalpreview)

- [SignalGenerator](Components.md#signalgenerator)

## Ideen für neue Funktionen

- Option zur Anzeige von Toleranzfeldern


</br>
</br>

---

</br>

# Komponentensignal

Eine Vollbildansicht der Signalvorschau zur genaueren Betrachtung der erzeugnten Signale.
Beinhaltet eine Beschriftung über die Signalwerte in RGB und als Komponentensignal.

## Verwendete Komponenten

- [SignalPreview](Components.md#signalpreview)

- [SignalGenerator](Components.md#signalgenerator)

## Ideen für neue Funktionen

- Bessere Formatierung der Beschriftungen. Speziell bei horizontalen Farbverläufen im Signal

</br>
</br>

---

</br>

# Scopes Kombination

Gesamtübersicht über alle Messinstrumente. Zeigt in welcher Bezeihung diese zueinander stehen.

## Verwendete Komponenten

- [CIEView](Components.md#cieview)

- [WFMView](Components.md#wfmview)

- [VectorscopeView](Components.md#vectorscopeview)

- [SignalPreview](Components.md#signalpreview)

- [SignalGenerator](Components.md#signalgenerator)

## Ideen für neue Funktionen

–