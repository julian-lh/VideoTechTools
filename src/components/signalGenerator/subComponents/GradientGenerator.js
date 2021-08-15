import React, { useState, useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { generateRGBSignalGradient } from '../../../calculations/CalcSignalGenerator';


export const GradientGenerator = ({ setSignalRGB }) => {

    const [gradientColor1, setGradientColor1] = useState([1, 0, 1]);
    const [gradientColor2, setGradientColor2] = useState([0, 1, 0]);

    const [directionHorizontal, setDirectionHorizontal] = useState(true);
    const toggleDirection = () => setDirectionHorizontal(!directionHorizontal);

    var amountGradientPixelH =  (directionHorizontal ? 16 : 1);
    var amountGradientPixelV =  (directionHorizontal ? 1 : 16);

    useLayoutEffect(() => {
        const gradientSignal = generateRGBSignalGradient(   gradientColor1,
                                                            gradientColor2,
                                                            amountGradientPixelH,
                                                            amountGradientPixelV,
                                                            directionHorizontal);
        setSignalRGB(gradientSignal)
     }, [gradientColor1, gradientColor2, directionHorizontal])

    return(
        <View>

            <Button title={(directionHorizontal ? "horizontal" : "vertikal")}
                    onPress={toggleDirection}
                    titleStyle={{ color: "black"}}
                    containerStyle={{ padding: 5 }}
                    type={"outline"}/>

            <View style={{flexDirection: "row", justifyContent: 'space-around', alignItems: "center"}}>
                <ColorPad setColor={setGradientColor1}/>
                <Ionicons name={"arrow-forward"} size={30} color={"gray"} />
                <ColorPad setColor={setGradientColor2}/>
            </View>

        </View>
    )
}

const ColorPad = ({ setColor }) => {
    const buttonSize = 40;
    return(
        <View style={styles.colorButtonsContainer}>
            <View>
                <Button title={""} onPress={() => setColor([1, 0, 0])} buttonStyle={{ backgroundColor: "#f00", height: buttonSize, width: buttonSize }} />
                <Button title={""} onPress={() => setColor([0, 1, 0])} buttonStyle={{ backgroundColor: "#0f0", height: buttonSize, width: buttonSize }} />
                <Button title={""} onPress={() => setColor([0, 0, 1])} buttonStyle={{ backgroundColor: "#00f", height: buttonSize, width: buttonSize }} />

            </View>
            <View>
                <Button title={""} onPress={() => setColor([0, 1, 1])} buttonStyle={{ backgroundColor: "#0ff", height: buttonSize, width: buttonSize }} />
                <Button title={""} onPress={() => setColor([1, 0, 1])} buttonStyle={{ backgroundColor: "#f0f", height: buttonSize, width: buttonSize }} />
                <Button title={""} onPress={() => setColor([1, 1, 0])} buttonStyle={{ backgroundColor: "#ff0", height: buttonSize, width: buttonSize }} />
            </View>
            <View>
                <Button title={""} onPress={() => setColor([1, 1, 1])} buttonStyle={{ backgroundColor: "#fff", height: buttonSize, width: buttonSize }} />
                <Button title={""} onPress={() => setColor([0.5, 0.5, 0.5])} buttonStyle={{ backgroundColor: "#888", height: buttonSize, width: buttonSize }} />
                <Button title={""} onPress={() => setColor([0, 0, 0])} buttonStyle={{ backgroundColor: "#000", height: buttonSize, width: buttonSize }} />
            </View>

        </View>
    )
}


const styles = StyleSheet.create({

    colorButtonsContainer: {
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: "center",
        paddingHorizontal: 10,
        paddingBottom: 10
    }

  });