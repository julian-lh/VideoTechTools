import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-elements';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { TapButton } from './TapButton';



export const FullColorSelector = ({red, setRed, green, setGreen, blue, setBlue, hue, setHue, sat, setSat, val, setVal, showRGB, toggleRgbHsv}) => {
    return(
        <View style={{ flex: 1, flexGrow: 1, justifyContent: 'center', alignItems: "center",}}>
            <Button title={(showRGB ? "RGB" : "HSV")} onPress={toggleRgbHsv} style={{ paddingTop: 10  }} titleStyle={{ color: "black"}} type={"outline"}/>
            {showRGB ?
                <View style={{ flex: 1,  flexDirection: "column", justifyContent: 'space-around', alignItems: "center", padding: 10 }}>
                    <TapButton label={"Rot"} currentValue={red} setValue={setRed} stepSize={0.1} color={"#fdd"} />
                    <TapButton label={"Grün"} currentValue={green} setValue={setGreen} stepSize={0.1} color={"#dfd"}/>
                    <TapButton label={"Blau"} currentValue={blue} setValue={setBlue} stepSize={0.1} color={"#ddf"}/>
                </View> :
                <View style={{ flex: 1, flexDirection: "column", justifyContent: 'space-around', alignItems: "center", padding: 10}}>
                    <TapButton label={"Hue"} currentValue={hue} setValue={setHue} stepSize={5} stepSize2={20}/>
                    <TapButton label={"Saturation"} currentValue={sat} setValue={setSat} stepSize={0.1}/>
                    <TapButton label={"Value"} currentValue={val} setValue={setVal} stepSize={0.1}/>
                </View>}

        </View>
    )
}


export const GradientSelector = ({rgb1, setRGB1, rgb2, setRGB2, directionHorizontal, toggleDirection}) => {
    return(
        <View>
            <Button title={(directionHorizontal ? "horizontal" : "vertikal")} onPress={toggleDirection}  titleStyle={{ color: "black"}} containerStyle={{ padding: 5 }} type={"outline"}/>
            <View style={{  flexDirection: "row", justifyContent: 'space-around', alignItems: "center" }}>
            <ColorPad setColor={setRGB1}/>
            <Ionicons name={"arrow-forward"} size={30} color={"gray"} />
            <ColorPad setColor={setRGB2}/>
            </View>
        </View>
    )
}

const ColorPad = ({setColor}) => {
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



export const BarsSelector = ({ useBars100, toggleBarsType }) => {
    return(
        <Button title={(useBars100 ? "Typ 100/100" : "Typ 100/75")} onPress={toggleBarsType} style={{ padding: 10, width: 200 }} titleStyle={{ color: "black"}} type={"outline"} />
        )
}
