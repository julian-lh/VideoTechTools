import React, { useState } from 'react';
import { View } from 'react-native';

import { WfmView } from '../../components/wfm/WfmView';
import { CieView } from '../../components/cie/CieView';
import { VectorscopeView } from '../../components/vectorscope/VectorscopeView';
import { SignalPreviewView } from '../../components/signalPreview/SignalPreviewView';
import { SignalGeneratorView } from '../../components/signalGenerator/SignalGeneratorView'


export default function ScopesCombinationScreen() {

    const [vidStdIdx, setVidStdIdx] = useState(1);
    const [signalYCRCB, setSignalYCRCB] = useState([[[100, 128, 128]]]);
    const [labelIdx, setLabelIdx] = useState(1);


    return (
      <View style={{ flex: 1}}>

        <View style={{ flex: 1, flexDirection: "row" }}>
          <CieView signalYCRCB={signalYCRCB}/>
          <WfmView signalYCRCB={signalYCRCB}/>
        </View>

        <View style={{ flex: 1, flexDirection: "row"}}>
          <VectorscopeView signalYCRCB={signalYCRCB}/>
          <SignalPreviewView signalYCRCB={signalYCRCB} labelIndex={labelIdx}/>
        </View>

        <SignalGeneratorView
            style={{flex: 1.8}}
            setSignal={setSignalYCRCB}
            setEncodingVideoStandard={setVidStdIdx}
            showHideButton={true}
            />

      </View>
    );
  }


