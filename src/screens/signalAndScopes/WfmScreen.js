import React, { useState } from "react";
import { View } from "react-native";

import { WfmView } from "../../components/wfm/WfmView";
import { SignalGeneratorView } from "../../components/signalGenerator/SignalGeneratorView";

export default function WfmScreen() {
    const [signalYCBCR, setSignalYCBCR] = useState([[[100, 128, 128]]]);
    const [vidStdIdx, setVidStdIdx] = useState(1);
    const [bitDepthIdx, setBitDepthIdx] = useState(0);

    return (
        <View style={{ flex: 1 }}>
            <WfmView
                signalYCBCR={signalYCBCR}
                encodedVidStdIdx={vidStdIdx}
                encodedBitDepthIdx={bitDepthIdx}
                withOverlays={true}
            />
            <SignalGeneratorView
                setSignal={setSignalYCBCR}
                setEncodingVideoStandard={setVidStdIdx}
                setEncodingBitDepthIdx={setBitDepthIdx}

            />
        </View>
    );
}
