import React, { useState } from "react";
import { View } from "react-native";

import { VectorscopeView } from "../../components/vectorscope/VectorscopeView";
import { SignalGeneratorView } from "../../components/signalGenerator/SignalGeneratorView";

export default function VectorscopeScreen() {
    const [signalYCBCR, setSignalYCBCR] = useState([[[100, 128, 128]]]);
    const [vidStdIdx, setVidStdIdx] = useState(1);
    const [bitDepthIdx, setBitDepthIdx] = useState(0);

    return (
        <View style={{ flex: 1 }}>
            <VectorscopeView
                signalYCBCR={signalYCBCR}
                encodedVidStdIdx={vidStdIdx}
                encodedBitDepthIdx={bitDepthIdx}
                withOverlays
            />
            <SignalGeneratorView
                setSignal={setSignalYCBCR}
                setEncodingVideoStandard={setVidStdIdx}
                setEncodingBitDepthIdx={setBitDepthIdx}
            />
        </View>
    );
}
