import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';



export const TapButton = ({label, currentValue, setValue, stepSize, color=undefined, stepSize2=undefined }) => {
    return(
        <View style={{flex: 1, minWidth: 50, maxWidth: (stepSize2 !== undefined ? 240 : 180), justifyContent: "space-evenly", alignItems: "center"}}>
            <Text>{label}</Text>
            <View style={{ backgroundColor: (color !== undefined ? color : "#ffffff"), flexDirection: "row", felx: 1, justifyContent: "space-evenly", alignItems: "center"}}>

                {stepSize2 !== undefined ?
                    <Button title=" -- "  onPress={() => setValue(Math.round((currentValue - stepSize2)*100)/100)} ></Button>
                : null}

                <Button title=" - " onPress={() => setValue(Math.round((currentValue - stepSize)*100)/100)} color={"black"} ></Button>
                <Text style={{flex: 1, textAlign: 'center', fontSize: 20}}>{currentValue.toFixed(2)}</Text>
                <Button title=" + " onPress={() => setValue(Math.round((currentValue + stepSize)*100)/100)} color={"black"} ></Button>

                {stepSize2 !== undefined ?
                    <Button title=" ++ " onPress={() => setValue(Math.round((currentValue + stepSize2)*100)/100)} color={"black"} ></Button>
                : null}

            </View>
        </View>
    );
}

const BtnIcn = ({ typeIdx = 1 }) => {
    const icons = ["play-back-circle-outline", "caret-back-circle-outline", "caret-forward-circle-outline", "play-forward-circle-outline"];
    return(
        <Ionicons name={icons[3]} size={30} color={"gray"} />
    )
}