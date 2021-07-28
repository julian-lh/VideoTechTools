import React, { useState } from "react";
import { View } from "react-native";

import { CIEView } from "../../components/cie/CIEView";
import { SignalGenerator } from "../../components/signalGenerator/SignalGenerator";

export default function CIEScreen() {
    const [signalYCRCB, setSignalYCRCB] = useState([[[100, 128, 128]]]);
    const [vidStdIdx, setVidStdIdx] = useState(1);

    return (
        <View style={{ flex: 1 }}>
            <CIEView
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
