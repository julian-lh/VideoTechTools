// Expects an rgb-Signal-Array
import React from 'react';
import { View, Text } from 'react-native';

import { styles } from './SignalPreviewPlotStyle';

import { rgbToString, rgbToComplColorString } from '../../../calculations/CalcHelpers'


export const SignalPreviewPlot = ({ signalRGB, signalYCRCB = undefined, labelIdx = 0 }) => {

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
            {signalRGB.map((row, rowIdx) => {
                return (
                    <View style={styles.rowContainer} key={rowIdx}>
                        {row.map((pixelVal, columnIdx) => {
                            return (
                                <PixelRepresentative
                                    labelIdx={labelIdx}
                                    labelSignal={labelSignal}
                                    signalDescription={desctiption}
                                    rowIdx={rowIdx}
                                    columnIdx={columnIdx}
                                    rgb={pixelVal}
                                    key={2000 + columnIdx}
                                />
                            );
                        })}
                    </View>
                );
            })}
        </View>
    );
}


const PixelRepresentative = ({ labelIdx, labelSignal, signalDescription, rowIdx, columnIdx, rgb }) => {

    const color = rgbToComplColorString(rgb);

    return (
        <View
            style={styles.columnElement}
            backgroundColor={rgbToString(rgb)}
        >
            {labelIdx > 0 ? (
                <Text style={(styles.label, { color: color })}>
                    {labelSignal[rowIdx][columnIdx].map(
                        (v, i) => " " + signalDescription[i] + ":" + v.toFixed(1)
                    )}
                </Text>
            ) : null}
        </View>
    );
  }



