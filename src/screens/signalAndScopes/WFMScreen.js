import React, { useState } from 'react';
import { View } from 'react-native';
import { Text} from 'react-native-elements';
import { WFMView } from '../../components/wfm/WFMView';

import { YCrCbGenerator } from '../../components/signalGenerator/SignalGenerator'


export default function WFMScreen() {
    const [signalYCRCB, setSignalYCRCB] = useState([[[100, 128, 128]]]);
    const [vidStdIdx, setVidStdIdx] = useState(1);

    // <Text>Signal: {signalYCRCB[0][0].toString()}</Text>
      return (
        <View style={{ flex: 1}}>
            <WFMView signalYCRCB={signalYCRCB} encodedVideoStandard={vidStdIdx} withOverlays={true}/>
            <YCrCbGenerator setSignal={setSignalYCRCB} setEncodingVideoStandard={setVidStdIdx}/>
        </View>
      );
    }