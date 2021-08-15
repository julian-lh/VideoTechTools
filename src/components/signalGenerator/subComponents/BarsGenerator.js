import React, { useState, useLayoutEffect } from 'react';
import { Button } from 'react-native-elements';

import { generateRGBSignalBars } from '../../../calculations/CalcSignalGenerator';

export const BarsGenerator = ({ setSignalRGB }) => {

    const [useBars100, setUseBars100] = useState(true);

    useLayoutEffect(() => {
        const signalSmallRGB = generateRGBSignalBars(8, 1, useBars100);
        setSignalRGB(signalSmallRGB);
     }, [useBars100])

    return(
        <Button title={(useBars100 ? "Typ 100/100" : "Typ 100/75")}
                onPress={() => setUseBars100(!useBars100)}
                style={{ padding: 10, width: 200 }}
                titleStyle={{ color: "black"}}
                type={"outline"} />
        )
}
