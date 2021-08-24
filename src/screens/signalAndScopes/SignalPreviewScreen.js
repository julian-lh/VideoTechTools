import React, { useState } from 'react';
import { View } from 'react-native';

import { SignalPreviewView } from '../../components/signalPreview/SignalPreviewView';
import { SignalGeneratorView } from '../../components/signalGenerator/SignalGeneratorView'


export default function SignalPreviewScreen() {
    const [signalYCBCR, setSignalYCBCR] = useState([[[100, 128, 128]]]);
    const [vidStdIdx, setVidStdIdx] = useState(1);
    const [bitDepthIdx, setBitDepthIdx] = useState(0);

    return (
      <View style={{ flex: 1}}>
        <SignalPreviewView
            signalYCBCR={signalYCBCR}
            withOverlays={true}
            encodedVidStdIdx={vidStdIdx}
            encodedBitDepthIdx={bitDepthIdx}
        />
        <SignalGeneratorView
            setSignal={setSignalYCBCR}
            setEncodingVideoStandard={setVidStdIdx}
            setEncodingBitDepthIdx={setBitDepthIdx}
        />
      </View>
    );
  }


