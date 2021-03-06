import React, { useState, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';

import { cvtRGBtoHSV, cvtHSVtoRGB } from '../../../calculations/CalcColorSpaceTransform';
import { generateRGBSignalFullColor } from '../../../calculations/CalcSignalGenerator';

import { clamp } from '../../../calculations/CalcHelpers';
import { TapButton } from './CustomButtons';


export const FullColorGenerator = ({ setSignalSmallRGB }) => {

    const [hue, setHueDirectly] = useState(0);
    const setHue = (value)  => setHueDirectly((value % 360 < 0) ? (360 - Math.abs(value) % 360) : value % 360);
    const [saturation, setSaturationDirectly] = useState(0);
    const setSaturation = (value)  => setSaturationDirectly( clamp(value) );
    const [value, setValueDirectly] = useState(0);
    const setValue = (value)  => setValueDirectly( clamp(value) );

    const [red, setRedDirectly] = useState(0.0);
    const setRed = (value)  => setRedDirectly( clamp(value) );
    const [green, setGreenDirectly] = useState(0.0);
    const setGreen = (value)  => setGreenDirectly( clamp(value) );
    const [blue, setBlueDirectly] = useState(0.0);
    const setBlue = (value)  => setBlueDirectly( clamp(value) );

    // prevents infinite conversion loops
    const [showingRgbControls, setShowingRgbControls] = useState(true);

    useLayoutEffect(() => {
        setSignalSmallRGB(generateRGBSignalFullColor([red, green, blue], 1, 1));

        if (showingRgbControls){
            const [h, s, v] = cvtRGBtoHSV([red, green, blue]);
            setHueDirectly(h);
            setSaturationDirectly(s);
            setValueDirectly(v);
        }
    }, [red, green, blue]);

    useLayoutEffect(() => {
        if (!showingRgbControls){
            const [r, g, b] = cvtHSVtoRGB([hue, saturation, value]);
            setRedDirectly(r);
            setGreenDirectly(g);
            setBlueDirectly(b);
        }
    }, [hue, saturation, value]);

    return(
        <View style={styles.outerContainer}>
            <Button title={(showingRgbControls ? "RGB" : "HSV")} onPress={() => setShowingRgbControls(!showingRgbControls)} style={{ paddingTop: 10  }} titleStyle={{ color: 'black'}}/>
            {showingRgbControls ?
                <View style={styles.buttonColumnContainer}>
                    <TapButton label={"Rot"} currentValue={red} setValue={setRed} stepSize={0.1} color={'#fdd'} />
                    <TapButton label={"Gr??n"} currentValue={green} setValue={setGreen} stepSize={0.1} color={'#dfd'}/>
                    <TapButton label={"Blau"} currentValue={blue} setValue={setBlue} stepSize={0.1} color={'#ddf'}/>
                </View> :
                <View style={styles.buttonColumnContainer}>
                    <TapButton label={"Hue"} currentValue={hue} setValue={setHue} stepSize={5} stepSize2={20}/>
                    <TapButton label={"Saturation"} currentValue={saturation} setValue={setSaturation} stepSize={0.1}/>
                    <TapButton label={"Value"} currentValue={value} setValue={setValue} stepSize={0.1}/>
                </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonColumnContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10
    }
});
