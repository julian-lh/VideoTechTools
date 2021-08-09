import React, { useState, useLayoutEffect, useMemo } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

import { TapButton } from './CustomButtons';


export const Corrector = ({contrastOffset, setContrastOffset, gammaOffset, setGammaOffset, brightnessOffset, setBrightnessOffset}) => {
    const reset = () => {
        setContrastOffset(1);
        setGammaOffset(1);
        setBrightnessOffset(0);
    }

    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", padding: 10 }}>
            <TapButton label={"Kontrast"} currentValue={contrastOffset} setValue={setContrastOffset} stepSize={0.05}/>
            <TapButton label={"Gamma"} currentValue={gammaOffset} setValue={setGammaOffset} stepSize={0.1}/>
            <TapButton label={"Helligkeit"} currentValue={brightnessOffset} setValue={setBrightnessOffset} stepSize={0.05}/>
            <Button title={"Zurücksetzen"} onPress={reset} type="clear"/>

        </View>
    )
}
