import React, { useState } from 'react';
import { View } from 'react-native';

import { WfmView } from '../../components/wfm/WfmView';
import { CieView } from '../../components/cie/CieView';
import { VectorscopeView } from '../../components/vectorscope/VectorscopeView';
import { SignalPreviewView } from '../../components/signalPreview/SignalPreviewView';
import { SignalGeneratorView } from '../../components/signalGenerator/SignalGeneratorView'


export default function ScopesCombinationScreen() {

    const [signalYCBCR, setSignalYCBCR] = useState( [[[ 64, 512, 512 ]]] );
    const [vidStdIdx, setVidStdIdx] = useState(1);
    const [bitDepthIdx, setBitDepthIdx] = useState(0);
    const [labelIdx, setLabelIdx] = useState(1);


    return (
      <View style={{ flex: 1}}>

        <View style={{ flex: 1, flexDirection: "row" }}>
          <CieView signalYCBCR={signalYCBCR}/>
          <WfmView signalYCBCR={signalYCBCR}/>
        </View>

        <View style={{ flex: 1, flexDirection: "row"}}>
          <VectorscopeView signalYCBCR={signalYCBCR}/>
          <SignalPreviewView signalYCBCR={signalYCBCR} labelIndex={labelIdx} />
        </View>

        <SignalGeneratorView
            style={{flex: 1.8}}
            setSignal={setSignalYCBCR}
            setEncodingVideoStandard={setVidStdIdx}
            setEncodingBitDepthIdx={setBitDepthIdx}
            showHideButton={true}
            />

      </View>
    );
  }


