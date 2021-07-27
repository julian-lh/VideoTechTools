import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';

import { RGBSignalPreview } from '../../components/signalPreview/RGBSignalPreview';
import { YCrCbGenerator } from '../../components/signalGenerator/SignalGenerator'
import { cvtSignalYCRCBtoRGB, cvtSignalRGBtoYCRCB, downscaleSignalYCRCB } from '../../calculations/ComponentSignal';


export default function SignalDisplayYCrCbScreen() {
    const videoStandards = ["601", "709", "2020"];
    const [vidStdIdx, setVidStdIdx] = useState(1);
    const switchVidStd = () => {vidStdIdx < 2 ? setVidStdIdx(vidStdIdx + 1) : setVidStdIdx(0)};

    const bitDepths = (vidStdIdx == 2 ? [10, 12] : [10, 8]);
    const [bitDepthIdx, setBitDepthIdx] = useState(0);
    const switchBitDepth = () => setBitDepthIdx(1 - bitDepthIdx);

    const [signalYCRCB, setSignalYCRCB] = useState([[[100, 128, 128]]]);
    const smallSignalYCRCB = downscaleSignalYCRCB(signalYCRCB, bitDepths[bitDepthIdx]);
    const signalRGB = cvtSignalYCRCBtoRGB(smallSignalYCRCB, videoStandards[vidStdIdx]);

    const labels = ["Keine", "RGB", "YCrCb", ];
    const [labelIdx, setLabelIdx] = useState(1);
    const switchLabelIdx = () => {labelIdx < 2 ? setLabelIdx(labelIdx + 1) : setLabelIdx(0)};


    return (
      <View style={{ flex: 1}}>
        <RGBSignalPreview rgbSignal={signalRGB} YCrCbSignal={signalYCRCB} labelIndex={labelIdx}/>
        <Button title={labels[labelIdx]} onPress={switchLabelIdx} style={{alignSelf: 'flex-end', paddingEnd: 10}} type="clear"/>
        <YCrCbGenerator setSignal={setSignalYCRCB} setEncodingVideoStandard={setVidStdIdx}/>
      </View>
    );
  }


