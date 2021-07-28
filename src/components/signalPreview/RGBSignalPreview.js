// Expects an rgb-Signal-Array
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { rgbToComplementary, rgbToHex, rgbToString, rgbToComplColorString } from '../../calculations/Helpers'


const PixelRepresentative = ({ labelIndex, labelSignal, idx1, idx2, rgb }) => {

  //const color = rgbToHex(rgbToComplementary(rgb));
  const color = rgbToComplColorString(rgb);

  return (
      <View
          style={styles.columnElement}
          backgroundColor={rgbToString(rgb)}
      >
          {labelIndex > 0 ? (
              <Text style={(styles.label, { color: color })}>
                  {labelSignal[idx1][idx2].map(
                      (v, i) => " " + desctiption[i] + ":" + v.toFixed(1)
                  )}
              </Text>
          ) : null}
      </View>
  );
}

export const RGBSignalPreview = ({ rgbSignal, YCrCbSignal = undefined, labelIndex = 0}) => {
    //Anlehnung: https://www.digitalocean.com/community/conceptual_articles/understanding-how-to-render-arrays-in-react

    var labelSignal = [];
    var desctiption = [];
    switch (labelIndex){
      case 1:
        labelSignal = rgbSignal; //.map( x => x.map( y => y * 100 ) );
        desctiption = ["R", "G", "B"];
        break;
      case 2:
        labelSignal = YCrCbSignal;
        desctiption = ["Y", "Cr", "Cb"];
        break;
      default:
        labelSignal = [];
        break;
    }

    return (
        <View style={styles.outerContainer}>
            {rgbSignal.map((x, idx1) => {
                return (
                    <View style={styles.rowContainer} key={idx1}>
                        {x.map((y, idx2) => {
                            return (
                                <PixelRepresentative
                                    labelIndex={labelIndex}
                                    labelSignal={labelSignal}
                                    idx1={idx1}
                                    idx2={idx2}
                                    rgb={y}
                                    key={2000 + idx2}
                                />
                            );
                        })}
                    </View>
                );
            })}
        </View>
    );
  }



const styles = StyleSheet.create({

    outerContainer: {
      flex: 1
    },
    rowContainer: {
      flex: 1,
      flexDirection: "row"
    },
    columnElement: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    label: {
      fontSize: 10,
    }

});

