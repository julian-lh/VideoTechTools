import React, { useState } from "react";
import { View } from "react-native";

import { VectorscopeView } from "../../components/vectorscope/VectorscopeView";
import { SignalGeneratorView } from "../../components/signalGenerator/SignalGeneratorView";

export default function VectorscopeScreen() {
    const [signalYCRCB, setSignalYCRCB] = useState([[[100, 128, 128]]]);
    const [vidStdIdx, setVidStdIdx] = useState(1);

    return (
        <View style={{ flex: 1 }}>
            <VectorscopeView
                signalYCRCB={signalYCRCB}
                encodedVidStdIdx={vidStdIdx}
                withOverlays
            />
            <SignalGeneratorView
                setSignal={setSignalYCRCB}
                setEncodingVideoStandard={setVidStdIdx}
            />
        </View>
    );
}
