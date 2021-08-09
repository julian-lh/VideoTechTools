import React, { useState } from 'react';
import { View } from 'react-native';

import { WFMView } from '../../components/wfm/WFMView';
import { CieView } from '../../components/cie/CieView';
import { VectorscopeView } from '../../components/vectorscope/VectorscopeView';
import { SignalPreviewView } from '../../components/signalPreview/SignalPreviewView';
import { SignalGenerator } from '../../components/signalGenerator/SignalGenerator'


export default function ScopesCombinationScreen() {
    const [vidStdIdx, setVidStdIdx] = useState(1);

    const [signalYCRCB, setSignalYCRCB] = useState([[[100, 128, 128]]]);

    const [labelIdx, setLabelIdx] = useState(1);


    return (
      <View style={{ flex: 1}}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <CieView signalYCRCB={signalYCRCB}/>
          <WFMView signalYCRCB={signalYCRCB}/>
        </View>
        <View style={{ flex: 1, flexDirection: "row"}}>
          <VectorscopeView signalYCRCB={signalYCRCB}/>
          <SignalPreviewView signalYCRCB={signalYCRCB} labelIndex={labelIdx}/>
        </View>
        <SignalGenerator setSignal={setSignalYCRCB} setEncodingVideoStandard={setVidStdIdx} showHideButton={true}/>
      </View>
    );
  }


