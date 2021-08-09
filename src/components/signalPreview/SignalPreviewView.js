import React, { useState } from 'react';
import { View } from 'react-native';
import { Button  } from 'react-native-elements';

import { styles } from './SignalPreviewViewStyle';

import { SignalPreviewPlot } from './subComponents/SignalPreviewPlot';
import { cvtSignalYCRCBtoRGB, downscaleSignalYCRCB } from '../../calculations/CalcComponentSignal';


export const SignalPreviewView = ({ signalYCRCB, withOverlays = false, encodedVideoStandard = 1 }) => {

    // appearance
    const labels = ["Keine", "RGB", "YCrCb"];
    const [labelIdx, setLabelIdx] = useState(1);
    const switchLabelIdx = () => {labelIdx < 2 ? setLabelIdx(labelIdx + 1) : setLabelIdx(0)};

    // video standard
    const videoStandards = ["601", "709", "2020"];

    const bitDepths = (encodedVideoStandard == 2 ? [10, 12] : [10, 8]);
    const [bitDepthIdx, setBitDepthIdx] = useState(0);

    // YCrCb -> RGB
    const signalSmallYCRCB = downscaleSignalYCRCB(signalYCRCB, bitDepths[bitDepthIdx]);
    const signalRGB = cvtSignalYCRCBtoRGB(signalSmallYCRCB, videoStandards[encodedVideoStandard]);


    return (
        <View style={{flex: 1}}>
            <View style={styles.canvas}>
                <SignalPreviewPlot
                        signalRGB={signalRGB}
                        signalYCRCB={signalYCRCB}
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





