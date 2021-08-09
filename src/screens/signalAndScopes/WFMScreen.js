import React, { useState } from "react";
import { View } from "react-native";

import { WfmView } from "../../components/wfm/WfmView";
import { SignalGenerator } from "../../components/signalGenerator/SignalGenerator";

export default function WfmScreen() {
    const [signalYCRCB, setSignalYCRCB] = useState([[[100, 128, 128]]]);
    const [vidStdIdx, setVidStdIdx] = useState(1);

    return (
        <View style={{ flex: 1 }}>
            <WfmView
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
