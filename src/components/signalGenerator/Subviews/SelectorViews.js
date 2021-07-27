import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { cvtRGBtoHSV, cvtHSVtoRGB } from '../../../calculations/ColorSpaceTransform';
import { generateRGBSignalFullColor, generateRGBSignalGradient, generateRGBSignalBars } from '../../../calculations/SignalGenerator';

import { clamp } from '../../../calculations/Helpers';

import { TapButton } from './TapButton';



export const FullColorGenerator = ({ setRgbSignal }) => {

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

     // prevent infinite conversion loops
    const [showingRgbControls, setShowingRgbControls] = useState(true);

    useEffect(() => {
        if (!showingRgbControls){
            const [r, g, b] = cvtHSVtoRGB([hue, saturation, value]);
            setRedDirectly(r);
            setGreenDirectly(g);
            setBlueDirectly(b);
        }
    }, [hue, saturation, value]);

    useEffect(() => {
        if (showingRgbControls){
            const [h, s, v] = cvtRGBtoHSV([red, green, blue]);
            setHueDirectly(h);
            setSaturationDirectly(s);
            setValueDirectly(v);
        }
    }, [red, green, blue]);

    useEffect(() => {
    setRgbSignal(generateRGBSignalFullColor([red, green, blue], 1, 1));
    }, [red, green, blue])

    return(
        <View style={{ flex: 1, flexGrow: 1, justifyContent: 'center', alignItems: "center",}}>
            <Button title={(showingRgbControls ? "RGB" : "HSV")} onPress={() => setShowingRgbControls(!showingRgbControls)} style={{ paddingTop: 10  }} titleStyle={{ color: "black"}} type={"outline"}/>
            {showingRgbControls ?
                <View style={{ flex: 1,  flexDirection: "column", justifyContent: 'space-around', alignItems: "center", padding: 10 }}>
                    <TapButton label={"Rot"} currentValue={red} setValue={setRed} stepSize={0.1} color={"#fdd"} />
                    <TapButton label={"Grün"} currentValue={green} setValue={setGreen} stepSize={0.1} color={"#dfd"}/>
                    <TapButton label={"Blau"} currentValue={blue} setValue={setBlue} stepSize={0.1} color={"#ddf"}/>
                </View> :
                <View style={{ flex: 1, flexDirection: "column", justifyContent: 'space-around', alignItems: "center", padding: 10}}>
                    <TapButton label={"Hue"} currentValue={hue} setValue={setHue} stepSize={5} stepSize2={20}/>
                    <TapButton label={"Saturation"} currentValue={saturation} setValue={setSaturation} stepSize={0.1}/>
                    <TapButton label={"Value"} currentValue={value} setValue={setValue} stepSize={0.1}/>
                </View>}

        </View>
    )
}


export const GradientGenerator = ({ setRgbSignal }) => {
    const [gradientColor1, setGradientColor1] = useState([1, 0, 1]);
    const [gradientColor2, setGradientColor2] = useState([0, 1, 0]);
    const [directionHorizontal, setDirectionHorizontal] = useState(true);
    var amountGradientPixelH =  (directionHorizontal ? 8 : 1);
    var amountGradientPixelV =  (directionHorizontal ? 1 : 8);

    useEffect(() => {
        setRgbSignal(() => generateRGBSignalGradient(gradientColor1, gradientColor2, amountGradientPixelH, amountGradientPixelV, directionHorizontal))
     }, [gradientColor1, gradientColor2, directionHorizontal])

    return(
        <View>
            <Button title={(directionHorizontal ? "horizontal" : "vertikal")} onPress={ () => setDirectionHorizontal(!directionHorizontal)}  titleStyle={{ color: "black"}} containerStyle={{ padding: 5 }} type={"outline"}/>
            <View style={{  flexDirection: "row", justifyContent: 'space-around', alignItems: "center" }}>
            <ColorPad setColor={setGradientColor1}/>
            <Ionicons name={"arrow-forward"} size={30} color={"gray"} />
            <ColorPad setColor={setGradientColor2}/>
            </View>
        </View>
    )
}

const ColorPad = ({ setColor }) => {
    //const gradientColors = [[1, 0, 0 ], [1, 1, 0], [0, 1, 0], [0, 1, 1], [0, 0, 1], [1, 0, 1], [0, 0, 0], [1, 1, 1]];
    const buttonSize = 40;
    return(
        <View style={{  flexDirection: "row", justifyContent: 'space-around', alignItems: "center", paddingHorizontal: 10, paddingBottom: 10 }}>
            <View>
                <Button title={""} onPress={() => setColor([1, 0, 0])} buttonStyle={{ backgroundColor: "#f00", height: buttonSize, width: buttonSize }} />
                <Button title={""} onPress={() => setColor([1, 1, 0])} buttonStyle={{ backgroundColor: "#ff0", height: buttonSize, width: buttonSize }} />
                <Button title={""} onPress={() => setColor([0, 1, 0])} buttonStyle={{ backgroundColor: "#0f0", height: buttonSize, width: buttonSize }} />
                <Button title={""} onPress={() => setColor([0, 0, 0])} buttonStyle={{ backgroundColor: "#000", height: buttonSize, width: buttonSize }} />
            </View>
            <View>
                <Button title={""} onPress={() => setColor([1, 0, 1])} buttonStyle={{ backgroundColor: "#f0f", height: buttonSize, width: buttonSize }} />
                <Button title={""} onPress={() => setColor([0, 0, 1])} buttonStyle={{ backgroundColor: "#00f", height: buttonSize, width: buttonSize }} />
                <Button title={""} onPress={() => setColor([0, 1, 1])} buttonStyle={{ backgroundColor: "#0ff", height: buttonSize, width: buttonSize }} />
                <Button title={""} onPress={() => setColor([1, 1, 1])} buttonStyle={{ backgroundColor: "#fff", height: buttonSize, width: buttonSize }} />
            </View>

        </View>
    )
}



export const BarsGenerator = ({ setRgbSignal }) => {
    const [useBars100, setUseBars100] = useState(true);

    useEffect(() => {
        setRgbSignal(() => generateRGBSignalBars(8, 1, useBars100))
     }, [useBars100])

    return(
        <Button title={(useBars100 ? "Typ 100/100" : "Typ 100/75")} onPress={() => setUseBars100(!useBars100)} style={{ padding: 10, width: 200 }} titleStyle={{ color: "black"}} type={"outline"} />
        )
}
