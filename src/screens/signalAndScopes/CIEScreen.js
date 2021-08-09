import React, { useState } from "react";
import { View } from "react-native";

import { CieView } from "../../components/cie/CieView";
import { SignalGenerator } from "../../components/signalGenerator/SignalGenerator";

export default function CieScreen() {
    const [signalYCRCB, setSignalYCRCB] = useState([[[100, 128, 128]]]);
    const [vidStdIdx, setVidStdIdx] = useState(1);

    return (
        <View style={{ flex: 1 }}>
            <CieView
                signalYCRCB={signalYCRCB}
                encodedVideoStandard={vidStdIdx}
                withOverlays={true}
            />
            <SignalGenerator
                setSignal={setSignalYCRCB}
                setEncodingVideoStandard={setVidStdIdx}
                showHideButton={true}
            />
        </View>
    );
}
