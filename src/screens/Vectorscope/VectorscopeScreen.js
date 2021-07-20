import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

import { VectorscopeView } from '../../components/displays/Vectorscope/VectorscopeView';
import { YCrCbGenerator } from '../../components/generators/YCrCbSignalGenerator/YCrCbSignalGenerator'


export default function VectorscopeScreen() {
  const [signalYCRCB, setSignalYCRCB] = useState([[[100, 128, 128]]]);

    return (
      <View style={{ flex: 1}}>
        <VectorscopeView signalYCRCB={signalYCRCB}/>
        <Text>Signal: {signalYCRCB[0][0].toString()}</Text>
        <YCrCbGenerator setSignal={(x) => setSignalYCRCB(x)}/>
      </View>
    );
  }


