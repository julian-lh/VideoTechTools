import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

import { VectorscopeView } from '../../components/vectorscope/VectorscopeView';
import { YCrCbGenerator } from '../../components/generators/YCrCbSignalGenerator/YCrCbSignalGenerator'


export default function VectorscopeScreen() {
  const [signalYCRCB, setSignalYCRCB] = useState([[[100, 128, 128]]]);
  const [vidStdIdx, setVidStdIdx] = useState(1);

    return (
      <View style={{ flex: 1}}>
        <VectorscopeView signalYCRCB={signalYCRCB} encodedVideoStandard={vidStdIdx} withOverlays/>
        <YCrCbGenerator setSignal={setSignalYCRCB} setEncodingVideoStandard={setVidStdIdx}/>
      </View>
    );
  }


