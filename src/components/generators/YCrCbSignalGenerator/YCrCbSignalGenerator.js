import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Text, Slider } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { styles } from './YCrCbSignalGeneratorStyle';

import { cvtRGBtoHSV, cvtHSVtoRGB } from '../../../calculation/ColorSpaceTransform';
import { cvtSignalRGBtoYCRCB, upscaleSignalYCRCB, limiterComponentSignal, limiterRGBSignal} from '../../../calculation/ComponentSignal';
import { generateRGBSignalFullColor, generateRGBSignalGradient, generateRGBSignalBars, offsetSignalContrast, offsetSignalBrightness, offsetSignalGamma, generateRGB3dCoordinates } from '../../../calculation/SignalGenerator';
import { clamp } from '../../../calculation/Helpers';

const TapButton = (props) => {
    return(
        <View style={{flex: 1, minWidth: 50, maxWidth: 190, justifyContent: "space-evenly", alignItems: "center"}}>
            <Text>{props.label}</Text>
            <View style={{ backgroundColor: (props.color !== undefined ? props.color : "#ffffff"), flexDirection: "row", felx: 1, justifyContent: "space-evenly", alignItems: "center"}}>
                <Button title=" - " onPress={()=>props.setValue(Math.round((props.currentValue - props.stepSize)*100)/100)} color={"black"} style={{flex: 1}}></Button>
                <Text style={{flex: 1, textAlign: 'center', fontSize: 20}}>{props.currentValue.toFixed(2)}</Text>
                <Button title=" + " onPress={()=>props.setValue(Math.round((props.currentValue + props.stepSize)*100)/100)} color={"black"} style={{flex: 1}}></Button>
            </View>
        </View>
    );
}
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


const FullColor = ({red, setRed, green, setGreen, blue, setBlue, hue, setHue, sat, setSat, val, setVal, showRGB, toggleRgbHsv}) => {
    return(
        <View style={{ flex: 1, flexGrow: 1, justifyContent: 'center', alignItems: "center",}}>
            <Button title={(showRGB ? "HSV" : "RGB")} onPress={toggleRgbHsv} style={{ paddingTop: 10 }}/>
            {showRGB ?
                <View style={{ flex: 1,  flexDirection: "column", justifyContent: 'space-around', alignItems: "center", padding: 10 }}>
                    <TapButton label={"Rot"} currentValue={red} setValue={setRed} stepSize={0.1} color={"#fdd"}/>
                    <TapButton label={"Grün"} currentValue={green} setValue={setGreen} stepSize={0.1} color={"#dfd"}/>
                    <TapButton label={"Blau"} currentValue={blue} setValue={setBlue} stepSize={0.1} color={"#ddf"}/>
                </View> :
                <View style={{ flex: 1, flexDirection: "column", justifyContent: 'space-around', alignItems: "center", padding: 10}}>
                    <TapButton label={"Hue"} currentValue={hue} setValue={setHue} stepSize={15}/>
                    <TapButton label={"Saturation"} currentValue={sat} setValue={setSat} stepSize={0.1}/>
                    <TapButton label={"Value"} currentValue={val} setValue={setVal} stepSize={0.1}/>
                </View>}

        </View>
    )
}


const Gradient = ({rgb1, setRGB1, rgb2, setRGB2, directionHorizontal, toggleDirection}) => {
    return(
        <View>
            <Button title={directionHorizontal ? "horizontal" : "vertikal"} onPress={toggleDirection} style={{ padding: 10 }}/>
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
        <View style={{  flexDirection: "row", justifyContent: 'space-around', alignItems: "center", paddingHorizontal: 10 }}>
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


const Bars = ({ useBars100, toggleBarsType }) => {
    return(
        <Button title={(useBars100 ? "100/100" : "100/75")} onPress={toggleBarsType} style={{ padding: 10 }} />
        )
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

    const videoStandards = ["601", "709", "2020"];
    const [vidStdIdx, setVidStdIdx] = useState(1);
    const switchVidStd = () => {vidStdIdx < 2 ? setVidStdIdx(vidStdIdx + 1) : setVidStdIdx(0)};

    const bitDepths = (vidStdIdx == 2 ? [10, 12] : [10, 8]);
    const [bitDepthIdx, setBitDepthIdx] = useState(0);
    const switchBitDepth = () => setBitDepthIdx(1 - bitDepthIdx);

    const [pageID, setPageID] = useState(0);
    const [generatorIdx, setGeneratorIdx] = useState(0);

    // prevent infinite conversion loops
    const [showingRgbControls, setShowingRgbControls] = useState(true);

    // COLOR-PICKER Single Color
    const [hue, setHueDirectly] = useState(0);
    const setHue = (value)  => setHueDirectly((value % 360 < 0) ? (360 - Math.abs(value) % 360) : value % 360);
    const [saturation, setSaturationDirectly] = useState(0);
    const setSaturation = (value)  => setSaturationDirectly( clamp(value) );
    const [value, setValueDirectly] = useState(0);
    const setValue = (value)  => setValueDirectly( clamp(value) );

    const [red, setRedDirectly] = useState(0.1);
    const setRed = (value)  => setRedDirectly( clamp(value) );
    const [green, setGreenDirectly] = useState(0.1);
    const setGreen = (value)  => setGreenDirectly( clamp(value) );
    const [blue, setBlueDirectly] = useState(0.1);
    const setBlue = (value)  => setBlueDirectly( clamp(value) );


    useEffect(() => {
        if (!showingRgbControls){
            const [r, g, b] = cvtHSVtoRGB([hue, saturation, value]);
            setRedDirectly(r);
            setGreenDirectly(g);
            setBlueDirectly(b);
        }
    }, [hue, saturation, value]);

    useEffect(() => {
        if (showingRgbControls){
            const [h, s, v] = cvtRGBtoHSV([red, green, blue]);
            setHueDirectly(h);
            setSaturationDirectly(s);
            setValueDirectly(v);
        }
    }, [red, green, blue]);


    // Gradient Colors
    const [gradientColor1, setGradientColor1] = useState([1, 0, 1]);
    const [gradientColor2, setGradientColor2] = useState([0, 1, 0]);

    const [horizontalGradientDirection, setHorizontalGradientDirection] = useState(true);
    var amountGradientPixelH =  (horizontalGradientDirection ? 8 : 1);
    var amountGradientPixelV =  (horizontalGradientDirection ? 1 : 8);


    const [useBars100, setUseBars100] = useState(true);

    var signalRGB = [[[0, 0, 0]]];

    switch(generatorIdx) {
        //Due to performance limitations: Signalresolution only on necessary resolution
        case 0:
            signalRGB = generateRGBSignalFullColor([red, green, blue], 1, 1);
            break;
        case 1:
            signalRGB = generateRGBSignalGradient(gradientColor1, gradientColor2, amountGradientPixelH, amountGradientPixelV, horizontalGradientDirection);
            break;
        case 2:
            signalRGB = generateRGBSignalBars(8, 1, useBars100); //generateRGB3dCoordinates(); //
            break;
    }

    // Blendenschieber
    const [fStopOffset, setFStopOffset] = useState(1); //[0...2]

    const [contrastOffset, setContrastOffset] = useState(1); //[0...2]
    const [brightnessOffset, setBrightnessOffset] = useState(0); //[-2...2]
    const [gammaOffset, setGammaOffset] = useState(1); //[-3...3]



    // Überpegel erlauben
    const [exceedVideoLevels, setExceedVideoLevels] = useState(false);

    // Modifizieren (Operationen nur anwenden wenn nicht neutral)
    signalRGB = (contrastOffset != 1 ? offsetSignalContrast(signalRGB, contrastOffset) : signalRGB);
    signalRGB = (brightnessOffset != 0 ? offsetSignalBrightness(signalRGB, brightnessOffset) : signalRGB);
    signalRGB = (gammaOffset != 1 ? offsetSignalGamma(signalRGB, gammaOffset) : signalRGB);

    signalRGB = exceedVideoLevels ?  signalRGB : limiterRGBSignal(signalRGB);

    // RGB -> YCrCb
    const signalSmallYCRCB = cvtSignalRGBtoYCRCB(signalRGB, videoStandards[vidStdIdx]);
    var signalYCRCB = upscaleSignalYCRCB(signalSmallYCRCB, bitDepths[bitDepthIdx]);
    signalYCRCB = limiterComponentSignal(signalYCRCB, bitDepths[bitDepthIdx], exceedVideoLevels);

    useEffect(() => {
        props.setSignal(signalYCRCB);
   }, [red, green, blue, gradientColor1, gradientColor2, horizontalGradientDirection, useBars100, generatorIdx, bitDepthIdx, vidStdIdx, exceedVideoLevels]);

    useEffect(() => {
        props.setSignal(signalYCRCB);
    },[contrastOffset, gammaOffset, brightnessOffset, generatorIdx, exceedVideoLevels]);

    //            <Button title="Signal" onPress={()=>setPageID(0)} color={ (pageID == 0 ? "orange" : "gray")}></Button>
    //            <Button title="Modifikation" onPress={()=>setPageID(1)} color={(pageID == 1 ? "orange" : "gray")}></Button>

    return (
      <View style={{ flex: 1, alignItems: "center"}}>
         <View style={{ backgroundColor: "#dddddd", width: "100%", flexDirection: "row", justifyContent: 'space-around' }}>
        </View>

        <ScrollView width="100%" contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: "center" }}>
            <View style={{ backgroundColor: "#dedede", width: "90%", flexDirection: "row", justifyContent: 'space-around' }}>
                <Button title="Einfarbig" onPress={()=>setGeneratorIdx(0)} titleStyle={{ color: (generatorIdx == 0 ? "orange" : "gray")}} type="clear"/>
                <Button title="Verlauf" onPress={()=>setGeneratorIdx(1)} titleStyle={{ color: (generatorIdx == 1 ? "orange" : "gray")}} type="clear"/>
                <Button title="Bars" onPress={()=>setGeneratorIdx(2)} titleStyle={{ color: (generatorIdx == 2 ? "orange" : "gray")}} type="clear"/>
            </View>


            {generatorIdx === 0 ?
            <FullColor red={red} setRed={setRed}
                        green={green} setGreen={setGreen}
                        blue={blue} setBlue={setBlue}
                        hue={hue} setHue={setHue}
                        sat={saturation} setSat={setSaturation}
                        val={value} setVal={setValue}
                        showRGB={showingRgbControls} toggleRgbHsv={() => setShowingRgbControls(!showingRgbControls)}
            /> : null}

            {generatorIdx === 1 ?
                <Gradient rgb1={gradientColor1} setRGB1={setGradientColor1}  rgb2={gradientColor2} setRGB2={setGradientColor2} directionHorizontal={horizontalGradientDirection} toggleDirection={() => setHorizontalGradientDirection(!horizontalGradientDirection)} />
            : null}

            {generatorIdx === 2 ?
                <Bars useBars100={useBars100} toggleBarsType={() => setUseBars100(!useBars100)}/>
            : null}


            <Text h3 style={{paddingTop: 20, paddingBottom: 10}}>Modifikation</Text>
            <TapButton label={"Kontrast"} currentValue={contrastOffset} setValue={setContrastOffset} stepSize={0.05}/>
            <TapButton label={"Gamma"} currentValue={gammaOffset} setValue={setGammaOffset} stepSize={0.1}/>
            <TapButton label={"Helligkeit"} currentValue={brightnessOffset} setValue={setBrightnessOffset} stepSize={0.05}/>

            <Text h3 style={{paddingTop: 20, paddingBottom: 10}}>Videostandard</Text>
            <Button title={"Rec." + videoStandards[vidStdIdx]} onPress={switchVidStd}type="clear"/>
            <Button title={bitDepths[bitDepthIdx] + " bit"} onPress={switchBitDepth}type="clear"/>
            <Button title={(exceedVideoLevels ? "mit Überpegel" : "ohne Überpegel")} onPress={() => setExceedVideoLevels(!exceedVideoLevels)} type="clear"/>
        </ScrollView>

      </View>
    );
  }

  /*
  {generatorIdx > 0 ? <View style={{ width: "100%", flexDirection: "row", justifyContent: 'space-evenly', alignItems: "center"}}>
  <View style={{ flex: 1, flexDirection: "column", justifyContent: 'space-around', alignItems: "center", padding: 10}}>
      <TapButton label={"H"} currentValue={hue} setValue={setHue} stepSize={30}/>
      <TapButton label={"S"} currentValue={saturation} setValue={setSaturation} stepSize={0.1}/>
      <TapButton label={"V"} currentValue={value} setValue={setValue} stepSize={0.1}/>
  </View>
  <View style={{ flex: 1,  flexDirection: "column", justifyContent: 'space-around', alignItems: "center", padding: 10 }}>
      <TapButton label={"R"} currentValue={red} setValue={setRed} stepSize={0.1} color={"#fdd"}/>
      <TapButton label={"G"} currentValue={green} setValue={setGreen} stepSize={0.1} color={"#dfd"}/>
      <TapButton label={"B"} currentValue={blue} setValue={setBlue} stepSize={0.1} color={"#ddf"}/>
  </View>
</View> : <View/>}*/
  //  <SignalPicker signal={RGB} newSignal={(x) => setRGB(x)} style={{flex: 1}}/>


/*<View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#ccc', paddingVertical: 5}}>
<Button title='RGB/HSV'/>
<Button title='FARBRAUM'/>
</View>
*/

