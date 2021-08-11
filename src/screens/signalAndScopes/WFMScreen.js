import React, { useState } from "react";
import { View } from "react-native";

import { WfmView } from "../../components/wfm/WfmView";
import { SignalGeneratorView } from "../../components/signalGenerator/SignalGeneratorView";

export default function WfmScreen() {
    const [signalYCRCB, setSignalYCRCB] = useState([[[100, 128, 128]]]);
    const [vidStdIdx, setVidStdIdx] = useState(1);

    return (
        <View style={{ flex: 1 }}>
            <WfmView
                signalYCRCB={signalYCRCB}
                encodedVidStdIdx={vidStdIdx}
                withOverlays={true}
            />
            <SignalGeneratorView
                setSignal={setSignalYCRCB}
                setEncodingVideoStandard={setVidStdIdx}
            />
        </View>
    );
}
