import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Header, Text, Slider } from 'react-native-elements';
import { WFMView} from '../../Components/Scopes/WFMView';

import { YCrCbGenerator } from '../../Components/Generators/YCrCbGenerator'


export default function WFMScreen() {
    const [signalYCRCB, setSignalYCRCB] = useState([[[100, 128, 128]]]);

      return (
        <View style={{ flex: 1}}>
            <WFMView signalYCRCB={signalYCRCB}/>
            <Text>Signal: {signalYCRCB[0][0].toString()}</Text>
            <YCrCbGenerator setSignal={(x) => setSignalYCRCB(x)}/>
        </View>
      );
    }