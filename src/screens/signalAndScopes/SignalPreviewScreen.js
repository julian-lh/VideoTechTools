import React, { useState } from 'react';
import { View } from 'react-native';

import { SignalPreviewView } from '../../components/signalPreview/SignalPreviewView';
import { SignalGenerator } from '../../components/signalGenerator/SignalGenerator'


export default function SignalPreviewScreen() {
    const [signalYCRCB, setSignalYCRCB] = useState([[[100, 128, 128]]]);
    const [vidStdIdx, setVidStdIdx] = useState(1);

    return (
      <View style={{ flex: 1}}>
        <SignalPreviewView
            signalYCRCB={signalYCRCB}
            withOverlays={true}
            encodedVideoStandard={vidStdIdx}
        />
        <SignalGenerator
            setSignal={setSignalYCRCB}
            setEncodingVideoStandard={setVidStdIdx}
        />
      </View>
    );
  }


