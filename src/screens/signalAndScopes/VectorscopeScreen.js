import React, { useState } from "react";
import { View } from "react-native";

import { VectorscopeView } from "../../components/vectorscope/VectorscopeView";
import { SignalGenerator } from "../../components/signalGenerator/SignalGenerator";

export default function VectorscopeScreen() {
    const [signalYCRCB, setSignalYCRCB] = useState([[[100, 128, 128]]]);
    const [vidStdIdx, setVidStdIdx] = useState(1);

    return (
        <View style={{ flex: 1 }}>
            <VectorscopeView
                signalYCRCB={signalYCRCB}
                encodedVideoStandard={vidStdIdx}
                withOverlays
            />
            <SignalGenerator
                setSignal={setSignalYCRCB}
                setEncodingVideoStandard={setVidStdIdx}
            />
        </View>
    );
}
