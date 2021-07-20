import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

import { CIEView } from '../../components/visualizers/cie/CIEView';
import { YCrCbGenerator } from '../../components/generators/YCrCbSignalGenerator/YCrCbSignalGenerator'


export default function SignalDisplayYCrCbScreen() {
  const [signalYCRCB, setSignalYCRCB] = useState([[[100, 128, 128]]]);

    return (
      <View style={{ flex: 1}}>
        <CIEView signalYCRCB={signalYCRCB}/>
        <Text>Signal: {signalYCRCB[0][0].toString()}</Text>
        <YCrCbGenerator setSignal={(x) => setSignalYCRCB(x)}/>
      </View>
    );
  }


