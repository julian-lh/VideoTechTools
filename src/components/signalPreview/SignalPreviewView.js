import React, { useState } from 'react';
import { View } from 'react-native';
import { Button  } from 'react-native-elements';

import { styles } from './SignalPreviewViewStyle';

import { SignalPreviewPlot } from './subComponents/SignalPreviewPlot';
import { cvtSignalYCBCRtoRGB, downscaleSignalYCBCR } from '../../calculations/CalcComponentSignal';


export const SignalPreviewView = ({ signalYCBCR, withOverlays = false, encodedVidStdIdx = 1 }) => {

    // appearance
    const labels = ["Keine", "RGB", "YCbCr"];
    const [labelIdx, setLabelIdx] = useState(0);
    const switchLabelIdx = () => {labelIdx < 2 ? setLabelIdx(labelIdx + 1) : setLabelIdx(0)};

    // video standard
    const videoStandards = ["601", "709", "2020"];

    const bitDepths = (encodedVidStdIdx == 2 ? [10, 12] : [10, 8]);
    const [bitDepthIdx, setBitDepthIdx] = useState(0);

    // YCbCr -> RGB
    const signalSmallYCBCR = downscaleSignalYCBCR(signalYCBCR, bitDepths[bitDepthIdx]);
    const signalRGB = cvtSignalYCBCRtoRGB(signalSmallYCBCR, videoStandards[encodedVidStdIdx]);


    return (
        <View style={{flex: 1}}>
            <View style={styles.canvas}>
                <SignalPreviewPlot
                        signalRGB={signalRGB}
                        signalYCBCR={signalYCBCR}
                        labelIdx={labelIdx}
                />
            </View>
            <View style={styles.overlaysContainer}>
              <Button
                    title={labels[labelIdx]}
                    onPress={switchLabelIdx}
                    style={{alignSelf: 'flex-end', paddingEnd: 10}}
                />
            </View>

        </View>
    );
  }





