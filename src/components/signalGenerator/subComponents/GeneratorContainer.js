import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import { TapButton } from './CustomButtons';
import { BarsGenerator} from './BarsGenerator';
import { FullColorGenerator } from './FullColorGenerator';
import { GradientGenerator } from './GradientGenerator';

export const GeneratorContainer = ({ setSignalRGB, generatorIdx, setGeneratorIdx, fStopOffset, setFStopOffset }) => {

    return(
        <View style={styles.generatorContainer}>
            <View style={styles.generatorSignalsContainer}>
                <Button title="Einfarbig"
                        onPress={()=>setGeneratorIdx(0)}
                        titleStyle={{ color: (generatorIdx == 0 ? "black" : "gray")}}
                        type="clear"/>
                <Button title="Verlauf"
                        onPress={()=>setGeneratorIdx(1)}
                        titleStyle={{ color: (generatorIdx == 1 ? "black" : "gray")}}
                        type="clear"/>
                <Button title="Bars"
                        onPress={()=>setGeneratorIdx(2)}
                        titleStyle={{ color: (generatorIdx == 2 ? "black" : "gray")}}
                        type="clear"/>
            </View>

            {generatorIdx === 0 ? <FullColorGenerator setSignalRGB={setSignalRGB} /> : null}
            {generatorIdx === 1 ? <GradientGenerator setSignalRGB={setSignalRGB} /> : null}
            {generatorIdx === 2 ? <BarsGenerator setSignalRGB={setSignalRGB} /> : null}

            <TapButton label={"Blenden Offset"} currentValue={fStopOffset} setValue={setFStopOffset} stepSize={0.05}/>
        </View>
    )
}


const styles = StyleSheet.create({

    generatorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
      },
      generatorSignalsContainer: {
        backgroundColor: "#dedede",
        width: "90%",
        flexDirection: "row",
        justifyContent: 'space-around',
        padding: 10 },

});