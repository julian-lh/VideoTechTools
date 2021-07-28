import React, { useState } from "react";
import { View } from "react-native";

import { WFMView } from "../../components/wfm/WFMView";
import { SignalGenerator } from "../../components/signalGenerator/SignalGenerator";

export default function WFMScreen() {
    const [signalYCRCB, setSignalYCRCB] = useState([[[100, 128, 128]]]);
    const [vidStdIdx, setVidStdIdx] = useState(1);

    return (
        <View style={{ flex: 1 }}>
            <WFMView
                signalYCRCB={signalYCRCB}
                encodedVideoStandard={vidStdIdx}
                withOverlays={true}
            />
            <SignalGenerator
                setSignal={setSignalYCRCB}
                setEncodingVideoStandard={setVidStdIdx}
            />
        </View>
    );
}
