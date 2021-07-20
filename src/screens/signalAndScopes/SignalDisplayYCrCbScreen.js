import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

import { RGBSignalPreview } from '../../components/visualizers/signalPreview/RGBSignalPreview';
import { YCrCbGenerator } from '../../components/generators/YCrCbSignalGenerator/YCrCbSignalGenerator'
import { cvtSignalYCRCBtoRGB, cvtSignalRGBtoYCRCB, downscaleSignalYCRCB } from '../../calculation/ComponentSignal';


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

    return (
      <View style={{ flex: 1}}>
        <RGBSignalPreview rgbSignal={signalRGB}/>
        <Text>Signal: {signalYCRCB[0][0].toString()}</Text>
        <YCrCbGenerator setSignal={(x) => setSignalYCRCB(x)}/>
      </View>
    );
  }


