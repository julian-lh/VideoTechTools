// Expects an rgb-Signal-Array
import React from 'react';
import { View, Text } from 'react-native';

import { styles } from './SignalPreviewPlotStyle';

import { rgbToString, rgbToComplColorString } from '../../../calculations/CalcHelpers'


export const SignalPreviewPlot = ({ signalSmallRGB, signalRGB = undefined, signalYCBCR = undefined, labelIdx = 0 }) => {

    var labelSignal = [];
    switch (labelIdx){
      case 1:
        labelSignal = signalRGB;
        break;
      case 2:
        labelSignal = signalYCBCR;
        break;
      default:
        labelSignal = [];
        break;
    }

    return (
        <View style={styles.outerContainer}>
            {signalSmallRGB.map((row, rowIdx) => {
                return (
                    <View style={styles.rowContainer} key={rowIdx}>
                        {row.map((pixelVal, columnIdx) => {
                            return (
                                <PixelRepresentative
                                    labelIdx={labelIdx}
                                    labelSignal={labelSignal}
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


const PixelRepresentative = ({ labelIdx, labelSignal, rowIdx, columnIdx, rgb }) => {

    const color = rgbToComplColorString(rgb);

    return (
        <View
            style={styles.columnElement}
            backgroundColor={rgbToString(rgb)}
        >
            {labelIdx > 0 ? (
                <Text style={(styles.label, { color: color })}>
                    {labelSignal[rowIdx][columnIdx].map(
                        (v, i) => Math.abs( v.toFixed(0) ) + ( i < 2 ? " | " : "")
                    )}
                </Text>
            ) : null}
        </View>
    );
  }


