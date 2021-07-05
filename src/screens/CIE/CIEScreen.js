import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Header, Text, Slider } from 'react-native-elements';
import CIEView from '../../Components/Scopes/CIEView';

import { RGBtoXYZ } from '../../calculation/ColorSpaceTransform';
import { RGBtoYCRCB, upscaleYCRCB } from '../../calculation/componentSignal';

const ColorSelector = (props) => {
    return (
        <View style={styles.inputElement}>
            <Text style={styles.inputElementLabel}>{props.label}</Text>
            <Button style={styles.inputElementButtons} title='<' onPress={() => props.valueChange(props.value - 0.1)}/>
            <Slider style={styles.inputElementSlider}
            value={props.value}
            onValueChange={(x) => props.valueChange(x)}
            minimumTrackTintColor={props.trackColor}
            thumbTintColor={props.thumbTintColor}
            thumbStyle={styles.inputElementSliderThumb}
            />
            <Button style={styles.inputElementButtons} title='>' onPress={() => props.valueChange(props.value + 0.1)}/>
        </View>
    );
}

export default function CIEScreen() {
    const [red, setRed] = useState(0.5);
    const [green, setGreen] = useState(0.5);
    const [blue, setBlue] = useState(0.5);

    const [bitDepth, setBitDepth] = useState(8);
    const [videoStandard, setVideoStandard] = useState("709");

    const [colorSpaceIndex, setColorSpaceIndex] = useState(0);
    const colorSpaces = ['sRGB', 'Adobe RGB', 'rec709', 'rec2020'];

    const smallYCRCB = RGBtoYCRCB([red, green, blue], videoStandard);
    const largeYCRCB = upscaleYCRCB(smallYCRCB, bitDepth);
    const signalYCRCB = [largeYCRCB];

    const XYZ = RGBtoXYZ([red, green, blue]);

    return (
      <View style={{ flex: 1}}>
        <CIEView XYZ={XYZ} signalYCRCB={signalYCRCB}/>

        <View style={styles.colorPicker}>
            <ColorSelector label='R' thumbTintColor='red' value={red} valueChange={(x) => setRed(x)}/>
            <ColorSelector label='G' thumbTintColor='green'  value={green} valueChange={(x) => setGreen(x)}/>
            <ColorSelector label='B' thumbTintColor='blue' value={blue} valueChange={(x) => setBlue(x)}/>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#ccc', paddingVertical: 5}}>
            <Button title='RGB/HSV'/>
            <Button title='FARBRAUM'/>
        </View>

      </View>
    );
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    colorPicker: {
        flex: 1,
        backgroundColor: '#ddd',
        maxHeight: 150
    },


    inputElement: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: 'center',
        paddingHorizontal: 20
      },
      inputElementLabel: {
        fontSize: 20,
      },
      inputElementButtons: {
        padding: 5,
        width: 40
      },
      inputElementSlider:{
        flex: 1,
      },
      inputElementSliderThumb:{
        width: 20,
        height: 20
      },
  });
