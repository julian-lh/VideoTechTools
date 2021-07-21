import React, { useState } from 'react';
import { View } from 'react-native';
import { Text} from 'react-native-elements';
import { WFMView } from '../../components/visualizers/wfm/WFMView';

import { YCrCbGenerator } from '../../components/generators/YCrCbSignalGenerator/YCrCbSignalGenerator'


export default function WFMScreen() {
    const [signalYCRCB, setSignalYCRCB] = useState([[[100, 128, 128]]]);

    // <Text>Signal: {signalYCRCB[0][0].toString()}</Text>
      return (
        <View style={{ flex: 1}}>
            <WFMView signalYCRCB={signalYCRCB} withOverlays/>
            <YCrCbGenerator setSignal={(x) => setSignalYCRCB(x)}/>
        </View>
      );
    }