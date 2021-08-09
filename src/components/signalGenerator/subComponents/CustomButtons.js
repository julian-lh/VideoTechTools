import React from 'react';
import { View } from 'react-native';
import { Button, Text, ButtonGroup } from 'react-native-elements';
import { StyleSheet } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';


export const TapButton = ({label, currentValue, setValue, stepSize, color=undefined, stepSize2=undefined, direction="row"}) => {
    return(
        <View style={{flex: 1, minWidth: 50, maxWidth: (stepSize2 !== undefined ? 240 : 180), justifyContent: "space-evenly", alignItems: "center", paddingTop: 5}}>
            <Text style={{paddingBottom: 5}}>{label}</Text>
            <View style={{ backgroundColor: (color !== undefined ? color : "#ffffff"), flexDirection: direction, felx: 1, justifyContent: "space-evenly", alignItems: "center"}}>

                {stepSize2 !== undefined ?
                    <Button title=" -- "  onPress={() => setValue(Math.round((currentValue - stepSize2)*100)/100)} titleStyle={{ color: "black"}} type={"clear"}></Button>
                : null}

                <Button title=" - " onPress={() => setValue(Math.round((currentValue - stepSize)*100)/100)} titleStyle={{ color: "black"}} type={"clear"}></Button>
                <Text style={{flex: 1, textAlign: 'center', fontSize: 20}}>{currentValue.toFixed(2)}</Text>
                <Button title=" + " onPress={() => setValue(Math.round((currentValue + stepSize)*100)/100)} titleStyle={{ color: "black"}} type={"clear"}></Button>

                {stepSize2 !== undefined ?
                    <Button title=" ++ " onPress={() => setValue(Math.round((currentValue + stepSize2)*100)/100)} titleStyle={{ color: "black"}} type={"clear"}></Button>
                : null}

            </View>
        </View>
    );
}

export const PageBar = ({ pageID, setPageID, showHideButton, hideSignalGenerator, setHideSignalGenerator}) => {
    return(
        <View style={styles.pageBarContainer}>
            {showHideButton ?
            <Button title=""
                    icon={<Ionicons name={hideSignalGenerator? "arrow-up": "arrow-down"} size={15} color="gray" />}
                    onPress={()=>setHideSignalGenerator(!hideSignalGenerator)}
                    titleStyle={{ color: '#fff'}}
                    type="clear"/> : null}

            <ButtonGroup onPress={setPageID}
                        selectedIndex={pageID}
                        buttons={["GENERATOR", "CORRECTOR"]}
                        containerStyle={{ marginVertical: 0, marginHorizontal: 0, flex: 1 }}
                        disabled={hideSignalGenerator}
                        selectedButtonStyle={{ backgroundColor: "#dedede" }}
                        selectedTextStyle={{ color: "black" }}
                        innerBorderStyle={{ width: 0 }}
                        buttonContainerStyle={{ backgroundColor: "white"}}
                        textStyle={{ fontSize: 15 }}/>
        </View>
    )
}


const styles = StyleSheet.create({

    pageBarContainer:{
      backgroundColor: "#dedede",
      width: '100%',
      flexDirection: "row",
      alignItems: "center",
      paddingTop: 0,
      marginTop: 0
    }

  });
