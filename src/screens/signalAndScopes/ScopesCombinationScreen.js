import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

import { RGBSignalPreview } from '../../components/visualizers/signalPreview/RGBSignalPreview';
import { CIEView } from '../../components/visualizers/cie/CIEView';
import { YCrCbGenerator } from '../../components/generators/YCrCbSignalGenerator/YCrCbSignalGenerator'
import { VectorscopeView } from '../../components/visualizers/vectorscope/VectorscopeView';
import { WFMView } from '../../components/visualizers/wfm/WFMView';

import { cvtSignalYCRCBtoRGB, cvtSignalRGBtoYCRCB, downscaleSignalYCRCB } from '../../calculation/ComponentSignal';


export default function ScopesCombinationScreen() {
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
        <View style={{ flex: 1, flexDirection: "row" }}>
          <CIEView signalYCRCB={signalYCRCB}/>
          <WFMView signalYCRCB={signalYCRCB}/>
        </View>
        <View style={{ flex: 1, flexDirection: "row"}}>
          <VectorscopeView signalYCRCB={signalYCRCB}/>
          <RGBSignalPreview rgbSignal={signalRGB} YCrCbSignal={signalYCRCB} labelIndex={labelIdx}/>
        </View>
        <YCrCbGenerator style={{flex: 2}} setSignal={setSignalYCRCB}/>
      </View>
    );
  }


