import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import { BarsGenerator} from './BarsGenerator';
import { FullColorGenerator } from './FullColorGenerator';
import { GradientGenerator } from './GradientGenerator';

export const GeneratorContainer = ({ setSignalSmallRGB, generatorIdx, setGeneratorIdx }) => {

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

            {generatorIdx === 0 ? <FullColorGenerator setSignalSmallRGB={setSignalSmallRGB} /> : null}
            {generatorIdx === 1 ? <GradientGenerator setSignalSmallRGB={setSignalSmallRGB} /> : null}
            {generatorIdx === 2 ? <BarsGenerator setSignalSmallRGB={setSignalSmallRGB} /> : null}
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