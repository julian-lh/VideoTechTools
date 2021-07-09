import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, ScrollView, TouchableOpacity} from 'react-native';
import { Text, Slider } from 'react-native-elements';

import { cvtSignalRGBtoYCRCB, upscaleSignalYCRCB, limiterComponentSignal, limiterRGBSignal} from '../../calculation/componentSignal';
import { generateRGBSignalFullColor,  generateRGBSignalGradient, generateRGBSignalBars, offsetSignalContrast, offsetSignalBrightness, offsetSignalGamma } from '../../calculation/signalGenerator';
import { clamp } from '../../calculation/helpers';

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

const TapButton = (props) => {
    return(
        <View style={{flex: 1, minWidth: 100, width: 180, justifyContent: "space-evenly", alignItems: "center"}}>
            <Text>{props.label}</Text>
            <View style={{ backgroundColor: "#ffffff", flexDirection: "row", felx: 1, justifyContent: "space-evenly", alignItems: "center"}}>
                <Button title="    -    " onPress={()=>props.setValue(Math.round((props.currentValue - props.stepSize)*100)/100)} color={"black"} style={{flex: 1}}></Button>
                <Text style={{flex: 1, textAlign: 'center', fontSize: 20}}>{props.currentValue.toFixed(2)}</Text>

                <Button title="    +    " onPress={()=>props.setValue(Math.round((props.currentValue + props.stepSize)*100)/100)} color={"black"} style={{flex: 1}}></Button>
            </View>
        </View>
);
}



 export const YCrCbGenerator = (props) => {

    const videoStandards = ["601", "709", "2020"];
    const [vidStdIdx, setVidStdIdx] = useState(1);
    const switchVidStd = () => {vidStdIdx < 2 ? setVidStdIdx(vidStdIdx + 1) : setVidStdIdx(0)};

    const bitDepths = (vidStdIdx == 2 ? [10, 12] : [10, 8]);
    const [bitDepthIdx, setBitDepthIdx] = useState(0);
    const switchBitDepth = () => setBitDepthIdx(1 - bitDepthIdx);

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

    const [red, setRedDirectly] = useState(0.5);
    const setRed = (value)  => setRedDirectly( clamp(value) );
    const [green, setGreenDirectly] = useState(0.5);
    const setGreen = (value)  => setGreenDirectly( clamp(value) );
    const [blue, setBlueDirectly] = useState(0.5);
    const setBlue = (value)  => setBlueDirectly( clamp(value) );

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
    signalRGB = (gammaOffset != 1 ? offsetSignalGamma(signalRGB, gammaOffset) : signalRGB);

    signalRGB = limiterRGBSignal(signalRGB);

    // RGB -> YCrCb
    const signalSmallYCRCB = cvtSignalRGBtoYCRCB(signalRGB, videoStandards[vidStdIdx]);
    var signalYCRCB = upscaleSignalYCRCB(signalSmallYCRCB, bitDepths[bitDepthIdx]);
    signalYCRCB = limiterComponentSignal(signalYCRCB, bitDepths[bitDepthIdx]);

    useEffect(() => {
        props.setSignal(signalYCRCB);
   }, [red, green, blue, generatorIdx, bitDepthIdx, vidStdIdx]);

    useEffect(() => {
        props.setSignal(signalYCRCB);
    },[contrastOffset, gammaOffset, brightnessOffset, generatorIdx]);

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

        <ScrollView width="100%" contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: "center" }}>
            <TapButton label={"R"} currentValue={red} setValue={setRed} stepSize={0.1}/>
            <TapButton label={"G"} currentValue={green} setValue={setGreen} stepSize={0.1}/>
            <TapButton label={"B"} currentValue={blue} setValue={setBlue} stepSize={0.1}/>

            <Text h3 style={{paddingTop: 20, paddingBottom: 10}}>Modifikation</Text>
            <TapButton label={"Kontrast"} currentValue={contrastOffset} setValue={setContrastOffset} stepSize={0.05}/>
            <TapButton label={"Gamma"} currentValue={gammaOffset} setValue={setGammaOffset} stepSize={0.1}/>
            <TapButton label={"Helligkeit"} currentValue={brightnessOffset} setValue={setBrightnessOffset} stepSize={0.05}/>

            <Text h3 style={{paddingTop: 20, paddingBottom: 10}}>Videostandard</Text>
            <Button title={"Rec." + videoStandards[vidStdIdx]} onPress={switchVidStd}></Button>
            <Button title={bitDepths[bitDepthIdx] + " bit"} onPress={switchBitDepth}></Button>
        </ScrollView>

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
