import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button} from 'react-native';
import { Text, Slider } from 'react-native-elements';

import { cvtSignalRGBtoYCRCB, upscaleSignalYCRCB } from '../../calculation/componentSignal';
import { generateRGBSignalFullColor,  generateRGBSignalGradient, generateRGBSignalBars, offsetSignalContrast, offsetSignalBrightness, offsetSignalGamma } from '../../calculation/signalGenerator';

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
export class BtnGroup extends PureComponent {
    // Quelle https://www.sitepoint.com/community/t/react-native-elements-button-group/366392
    constructor() {
      super()
      this.state = {
        selectedIndex: 0
      }
      this.updateIndex = this.updateIndex.bind(this)
    }

    updateIndex(selectedIndex) {
      this.setState({ selectedIndex })
    }

    render() {
      const buttons = ['Y', 'Pr/Pb']
      const { selectedIndex } = this.state

      return (
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          //containerStyle={{ height: 45, width: 200 }}
        />
      )
    }
  }*/


const SignalPicker = (props) => {

    const [red, setRed] = useState(0.5);
    const [green, setGreen] = useState(0.5);
    const [blue, setBlue] = useState(0.5);

    const [RGB, setRGB] = useState([0.5, 0.5, 0.5]);

    const [sourceID, setSourceID] = useState(2);

    var signal = generateBarsRGBSignal(8, 1);
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



 export const YCrCbGenerator = (props) => {

    const [bitDepth, setBitDepth] = useState(10);
    const [videoStandard, setVideoStandard] = useState("709");
    //const [width, setWidth] = useState(8);
    //const [height, setHeight] = useState(1);

    const [pageID, setPageID] = useState(0);
    const [generatorIdx, setGeneratorIdx] = useState(0);

    // COLOR-PICKER
    const [hue, setHue] = useState(0.5);
    const [saturation, setSaturation] = useState(0.5);
    const [value, setValue] = useState(0.5);

    //bei Veränderung direkt in rgb umrechnen
    useEffect(() => {
        // setRed();
        // setBlue();
        // setGreen();
    }, [hue, saturation, value]);

    const [red, setRed] = useState(0.5);
    const [green, setGreen] = useState(0.5);
    const [blue, setBlue] = useState(0.5);

    var signalRGB = [[[0, 0, 0]]];

    switch(generatorIdx) {
        //Due to performance limitations: Signalresolution only on necessary resolution
        case 0:
            signalRGB = generateRGBSignalBars(8, 1);
            break;
        case 1:
            signalRGB = generateRGBSignalFullColor([red, green, blue], 1, 1);
            break;
        case 2:
            signalRGB = generateRGBSignalGradient([red, green, blue],[1, 1, 1], 8, 8, "horizontal");
            break;
    }

    const [fStopOffset, setFStopOffset] = useState(1); //[0...2]

    const [contrastOffset, setContrastOffset] = useState(1); //[0...2]
    const [brightnessOffset, setBrightnessOffset] = useState(0); //[-2...2]
    const [gammaOffset, setGammaOffset] = useState(1); //[-3...3]

    // Blendenschieber


    // Modifizieren

    // Operationen nur anwenden wenn verwendet
    signalRGB = (contrastOffset != 1 ? offsetSignalContrast(signalRGB, contrastOffset) : signalRGB);
    signalRGB = (brightnessOffset != 0 ? offsetSignalBrightness(signalRGB, brightnessOffset) : signalRGB);
    signalRGB = offsetSignalGamma(signalRGB, gammaOffset);


    // gesamt-Offset berechnen

    const signalSmallYCRCB = cvtSignalRGBtoYCRCB(signalRGB, videoStandard);
    const signalYCRCB = upscaleSignalYCRCB(signalSmallYCRCB, bitDepth);

    /*
    useEffect(() => {
        props.setSignal(signalYCRCB);
   }, [red, green, blue, generatorIdx]);
*/
    useEffect(() => {
        props.setSignal(signalYCRCB);
    },[brightnessOffset, generatorIdx]);

    return (
      <View style={{ flex: 1, alignItems: "center"}}>
         <View style={{ backgroundColor: "#dddddd", width: "100%", flexDirection: "row", justifyContent: 'space-around' }}>
            <Button title="Signal" onPress={()=>setPageID(0)} color={ (pageID == 0 ? "orange" : "gray")}></Button>
            <Button title="Modifikation" onPress={()=>setPageID(1)} color={(pageID == 1 ? "orange" : "gray")}></Button>
        </View>
        <View style={{ backgroundColor: "#dedede", width: "90%", flexDirection: "row", justifyContent: 'space-around' }}>
            <Button title="Bars" onPress={()=>setGeneratorIdx(0)} color={ (generatorIdx == 0 ? "orange" : "gray")}></Button>
            <Button title="Einfarbig" onPress={()=>setGeneratorIdx(1)} color={(generatorIdx == 1 ? "orange" : "gray")}></Button>
            <Button title="Verlauf" onPress={()=>setGeneratorIdx(2)} color={(generatorIdx == 2 ? "orange" : "gray")}></Button>
        </View>

        <View style={{ backgroundColor: "#ffffff", width: "50%", flexDirection: "row", justifyContent: 'space-around', alignItems: "center"}}>
            <Button title="-" onPress={()=>setBrightnessOffset(Math.round((brightnessOffset - 0.05)*100)/100)} color={"black"}></Button>
            <Text>{brightnessOffset.toFixed(2)}</Text>
            <Button title="+" onPress={()=>setBrightnessOffset(Math.round((brightnessOffset + 0.05)*100)/100)} color={"black"}></Button>
        </View>


        <Text>{signalYCRCB[0]}</Text>
        <Text>{"-----"}</Text>
        <Text>{signalYCRCB[1]}</Text>

      </View>
    );
  }
  //  <SignalPicker signal={RGB} newSignal={(x) => setRGB(x)} style={{flex: 1}}/>


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
        width: 200
      },
      inputElementSliderThumb:{
        width: 20,
        height: 20
      },
  });
