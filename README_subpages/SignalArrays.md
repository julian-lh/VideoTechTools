# Signal-Arrays
Zur Kommunikation zwischen den Komponenten und bei internen Berechnungen gibt es wiederkehrende Signalarten, die mit deren Notation hier zusammengefasst sind.
</br>
Allgemein gilt:

- Aus Gründen der Datenersparnis können Höhe und Breite des Arrays von der Auflösung der Videostandards abweichen. Sie repräsentieren dennoch ein Vollbild und sind als relative Bildpositionen zu betrachten. Für eine korrekte Darstellung muss das Array auf ein Vollbild gestreckt werden (meist 16:9).

</br>

## Allgemeiner Signal-Aufbau:

signalXXX [rowIdx] [columnIdx] [subPixelIdx]

|            |       | |
|-----------  |-------|---|
| rowIdx      | Index der Zeile. Entspricht relativer vertikaler Bildposition.      | [0...] |
| columnIdx   | Index der Spalte. Entspricht relativer horizontaler Bildposition.   | [0...] |
| subPixelIdx | Index der XXX-Subpixel eines Bildpunkts bzw. Bildfläche.                   | [0...2] |

### Beispiel:

```
[ [ [X X X],  [X X X],  [X X X] ],
  [ [X X X],  [X X X],  [X X X] ],
  [ [X X X],  [X X X],  [X X X] ] ]
```


</br>

---
</br>
</br>

## signalYCRCB

- Haupt-Kommunikations-Array zwischen App-Komponenten der Signalerzeugung oder -Messung.

- Repräsentiert Komponentensignal in 8-, 10- oder 12-Bit nach Rec.601, Rec.709 oder Rec.2020.

- Der verwendete Videostandard und Quantisierungsgrad müssen separat mitgeteilt werden

- Subpixel: Y, Cr, Cb


|Subpixel-Werte | 8-Bit    | 10-Bit   | 12-Bit      |
|-              |--        |--        |--           |
| Y Peak        | 235      | 940      | 3760        |
| Y Schwarz     | 16       | 64       | 256         |
| CrCb Farblos  | 128      | 512      | 2048        |
| CrCb Max Farbe| 16 & 240 | 64 & 960 | 256 & 3840  |

(Siehe ITU-R BT.601, ITU-R BT.709 und ITU-R BT.2020)


### Beispiel 8-Bit Quantisierung (Schwarz-Weiß-Muster):

```
[ [ [16 128 128],   [235 128 128],  [16 128 128],   [235 128 128] ],
  [ [235 128 128],  [16 128 128],   [235 128 128],  [16 128 128]  ],
  [ [16 128 128],   [235 128 128],  [16 128 128],   [235 128 128] ] ]
```

</br>
</br>

## signalSmallYCRCB

- Wie *signalYCRCB*, aber Subpixel sind unabhängig von Quantisierungs-Grad normiert (legaler Videobereich).

- Entsteht als Zwischenschritt der Signalumrechnung: </br>
    signalRGB -> signalSmallYCRCB -> signalYCRCB

- Findet zur Darstellung in Messinstrumenten Anwendung

|               | |
|-              |--    |
| Y Peak        | 1    |
| Y Schwarz     | 0    |
| CrCb Farblos  | 0    |
| CrCb Voll*     | C < 0 & C > 0 |

\* Genaue Grenzen hängen von Videostandard ab

</br>
</br>

## signalRGB

- Subpixel: R, G, B

|               | |
|-              |--      |
| R/G/B Peak    | 1      |
| R/G/B Schwarz | 0    |


### Beispiel Schwarz-Weiß-Muster:
```
[ [ [0 0 0], [1 1 1] ],
  [ [1 1 1], [0 0 0] ],
  [ [0 0 0], [1 1 1] ] ]
```

</br>
</br>

## signalXYZ

- Signal, in dem einzelne Bildpunkte als Farbwerte in XYZ-System notiert sind

</br>
</br>

## signalxyY

- Signal, in dem einzelne Bildpunkte als Farbwerte in xyY-System notiert sind.
- zur Visualisierung in CIE-Normfarbtafel.
