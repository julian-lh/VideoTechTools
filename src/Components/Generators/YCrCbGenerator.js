import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Header, Text, Slider } from 'react-native-elements';
import VectorscopeView from './VectorscopeView';

import { rgbToXYZ } from '../../calculation/ColorSpaceTransform';

const ColorSelector = (props) => {
    return (
        <View style={styles.inputElement}>
            <Text style={styles.inputElementLabel}>{props.label}</Text>
            <Text style={styles.inputElementLabel}> {props.value} </Text>
            <Slider style={styles.inputElementSlider}
            value={props.value}
            onValueChange={(x) => props.valueChange(x)}
            minimumTrackTintColor={props.trackColor}
            thumbTintColor={props.thumbTintColor}
            thumbStyle={styles.inputElementSliderThumb}
            />
        </View>
    );
}
const ColorSelector2 = (props) => {
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


const RGBPicker = (props) => {
    return(
        <View style={styles.colorPicker}>
            <ColorSelector label={"R"} thumbTintColor={"red"} value={props.RGB[0]} valueChange={(x) => props.newValue([x, props.RGB[1], props.RGB[2]])}/>
            <ColorSelector label={"G"} thumbTintColor={"green"}  value={props.RGB[1]} valueChange={(x) => props.newValue([props.RGB[0], x, props.RGB[2]])}/>
            <ColorSelector label={"B"} thumbTintColor={"blue"} value={props.RGB[2]} valueChange={(x) => props.newValue([props.RGB[0], props.RGB[1], x])}/>
        </View>
    );
}
const HSVPicker = (props) => {
    return(
        <View style={styles.colorPicker}>
            <ColorSelector label={"H"} thumbTintColor={"gray"} value={props.RGB[0]} valueChange={(x) => props.newValue([x, props.RGB[1], props.RGB[2]])}/>
            <ColorSelector label={"S"} thumbTintColor={"gray"}  value={props.RGB[1]} valueChange={(x) => props.newValue([props.RGB[0], x, props.RGB[2]])}/>
            <ColorSelector label={"V"} thumbTintColor={"gray"} value={props.RGB[2]} valueChange={(x) => props.newValue([props.RGB[0], props.RGB[1], x])}/>
        </View>
    );
}

const SignalPreview = (props) => {
    const red = (props.RGB[0] * 255).toFixed(0);
    const color = "backgroundColor: rgb("+red+",0,0), flex: 1";
    return (
        <View style={color}>
        </View>
      );
}
/*
const signalPreview = (props) => {
    const mesh = useRef();
    const shape = useMemo(() => {
        const s = new THREE.Shape();
        s.moveTo(props.YUV[0][1], props.YUV[0][2]);
        for(let v of props.YUV) {
          s.lineTo(v[1], v[2]);
        }
        //s.lineTo(CIEBoundsValues[0][1], CIEBoundsValues[0][2], CIEBoundsValues[0][3]);
        return s;
      }, [props.YUV])

    //const geometry = new THREE.ShapeGeometry( shape );
    //shape.autoClose = true;
      const points = shape.getPoints();
      //const spacedPoints = shape.getSpacedPoints( 0.1 );
      const geometryPoints = new THREE.BufferGeometry().setFromPoints( points );
      //const geometrySpacedPoints = new THREE.BufferGeometry().setFromPoints( spacedPoints );

    return (
      <line ref={mesh} position={[0, 0, 0]} geometry={geometryPoints}>
        <lineBasicMaterial color="#0c0" />
      </line>
    );
  }
*/
function videoBarsSignal(width = 8, height = 1){
    // zum Daten-Sparen nur 192 anstatt 1920
    const signalWidth = width;
    const signalHeight = height;
    var signal = new Array(signalWidth * signalHeight);
    // ITU 100/100 Bars
    for (var i = 0; i < signalHeight; i++) { //alle Zeilen
        for (var j = 0; j < signalWidth; j++){  //alle Spalten

            const barWidth = signalWidth/8;
            var color = [1.0, 0.0, 0.0];
            if (j < barWidth){
                color = [1.0, 1.0, 1.0];
            }else if (j < barWidth * 2){
                color = [1.0, 1.0, 0.0];
            }else if (j < barWidth * 3){
                color = [0.0, 1.0, 1.0];
            }else if (j < barWidth * 4){
                color = [0.0, 1.0, 0.0];
            }else if (j < barWidth * 5){
                color = [1.0, 0.0, 1.0];
            }else if (j < barWidth * 6){
                color = [1.0, 0.0, 0.0];
            }else if (j < barWidth * 7){
                color = [0.0, 0.0, 1.0];
            }else {
                color = [0.0, 0.0, 0.0];
            }
            var pixelIdx = (i * signalWidth + j);
            signal[pixelIdx] = color;
        }
    }
    return signal;
}



const SignalPicker = (props) => {

    const [red, setRed] = useState(0.5);
    const [green, setGreen] = useState(0.5);
    const [blue, setBlue] = useState(0.5);

    const [RGB, setRGB] = useState([0.5, 0.5, 0.5]);

    const [sourceID, setSourceID] = useState(2);

    var signal = videoBarsSignal(8, 1);
    var signal2 = [[0.0, 0.0, 0.0], [0.0, 1.0, 1.0], [0.0, 1.0, 0.0], [1.0, 1.0, 1.0]];

    var Picker = RGBPicker;
    /*switch(sourceID){
        case 0:
            Picker = RGBPicker;
            break;
        case 1:
            Picker = HSVPicker;
            break;
        case 2:
            Picker = SignalPicker;
            break;
    }*/
    //props.newSignal(signal);

    return(
        <View style={styles.colorPicker}>
            <View style={{flexDirection: "row", horizontalFlex: 1, height: 60}}>
                <Button style={{flex: 1, padding: 6}} title='RGB Color' onPress={() => props.newSignal(signal)}/>
                <Button style={{flex: 1, padding: 6}} title='Bars' onPress={() => props.newSignal(signal)}/>
                <Button style={{flex: 1, padding: 6}} title='Test' onPress={() => props.newSignal(signal2)}/>
            </View>
            <SignalPreview RGB={RGB}/>
            <Picker RGB={RGB} newValue={(x) => props.newSignal([x])}/>
            <Text></Text>
        </View>
    );
}
//            <Picker RGB={RGB} newValue={(x) => setRGB(x)}/>



export default function YCrCbGenerator() {
    const [red, setRed] = useState(0.5);
    const [green, setGreen] = useState(0.5);
    const [blue, setBlue] = useState(0.5);

    const [RGB, setRGB] = useState([[0.0, 0.0, 0.0], [0.0, 1.0, 1.0], [0.0, 1.0, 0.0], [0.5, 1.0, 1.0]]);

    //const [colorSpaceIndex, setColorSpaceIndex] = useState(0);
    //const colorSpaces = ['sRGB', 'Adobe RGB', 'rec709', 'rec2020'];

    return (
      <View style={{ flex: 1}}>
        <VectorscopeView RGB={RGB} style={{flex: 1}}/>
        <SignalPicker signal={RGB} newSignal={(x) => setRGB(x)} style={{flex: 1}}/>
      </View>
    );
  }
        //<SignalGenerator RGB={RGB} valueChange={(x) => setRGB(x)}/>

/*<View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#ccc', paddingVertical: 5}}>
<Button title='RGB/HSV'/>
<Button title='FARBRAUM'/>
</View>
*/

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
