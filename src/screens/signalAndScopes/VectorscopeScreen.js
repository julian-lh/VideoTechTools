import React, { useState } from "react";
import { View } from "react-native";

import { VectorscopeView } from "../../components/vectorscope/VectorscopeView";
import { SignalGeneratorView } from "../../components/signalGenerator/SignalGeneratorView";

export default function VectorscopeScreen() {
    const [signalYCBCR, setSignalYCBCR] = useState([[[100, 128, 128]]]);
    const [vidStdIdx, setVidStdIdx] = useState(1);

    return (
        <View style={{ flex: 1 }}>
            <VectorscopeView
                signalYCBCR={signalYCBCR}
                encodedVidStdIdx={vidStdIdx}
                withOverlays
            />
            <SignalGeneratorView
                setSignal={setSignalYCBCR}
                setEncodingVideoStandard={setVidStdIdx}
            />
        </View>
    );
}
