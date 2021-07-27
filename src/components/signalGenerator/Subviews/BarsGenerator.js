import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import { generateRGBSignalBars } from '../../../calculations/SignalGenerator';


export const BarsGenerator = ({ setRgbSignal }) => {
    const [useBars100, setUseBars100] = useState(true);

    useEffect(() => {
        setRgbSignal(() => generateRGBSignalBars(8, 1, useBars100))
     }, [useBars100])

    return(
        <Button title={(useBars100 ? "Typ 100/100" : "Typ 100/75")}
                onPress={() => setUseBars100(!useBars100)}
                style={{ padding: 10, width: 200 }}
                titleStyle={{ color: "black"}}
                type={"outline"} />
        )
}
