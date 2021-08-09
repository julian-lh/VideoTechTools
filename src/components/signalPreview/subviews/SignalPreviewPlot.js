// Expects an rgb-Signal-Array
import React from 'react';
import { View, Text } from 'react-native';

import { styles } from './SignalPreviewPlotStyle';

import { rgbToString, rgbToComplColorString } from '../../../calculations/CalcHelpers'


const PixelRepresentative = ({ labelIdx, labelSignal, signalDescription, idx1, idx2, rgb }) => {

  const color = rgbToComplColorString(rgb);

  return (
      <View
          style={styles.columnElement}
          backgroundColor={rgbToString(rgb)}
      >
          {labelIdx > 0 ? (
              <Text style={(styles.label, { color: color })}>
                  {labelSignal[idx1][idx2].map(
                      (v, i) => " " + signalDescription[i] + ":" + v.toFixed(1)
                  )}
              </Text>
          ) : null}
      </View>
  );
}

export const SignalPreviewPlot = ({ signalRGB, signalYCRCB = undefined, labelIdx = 0}) => {

    var labelSignal = [];
    var desctiption = [];
    switch (labelIdx){
      case 1:
        labelSignal = signalRGB;
        desctiption = ["R", "G", "B"];
        break;
      case 2:
        labelSignal = signalYCRCB;
        desctiption = ["Y", "Cr", "Cb"];
        break;
      default:
        labelSignal = [];
        break;
    }

    return (
        <View style={styles.outerContainer}>
            {signalRGB.map((x, idx1) => {
                return (
                    <View style={styles.rowContainer} key={idx1}>
                        {x.map((y, idx2) => {
                            return (
                                <PixelRepresentative
                                    labelIdx={labelIdx}
                                    labelSignal={labelSignal}
                                    signalDescription={desctiption}
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





