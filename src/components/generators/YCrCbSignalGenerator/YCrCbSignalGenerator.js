import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Text, Slider, ButtonGroup } from 'react-native-elements';

import { styles } from './YCrCbSignalGeneratorStyle';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { TapButton, BtnGroup } from './Subviews/TapButton';
import { FullColorSelector, GradientSelector, BarsSelector } from './Subviews/SelectorViews'

import { cvtRGBtoHSV, cvtHSVtoRGB } from '../../../calculations/ColorSpaceTransform';
import { cvtSignalRGBtoYCRCB, upscaleSignalYCRCB, limiterComponentSignal, limiterRGBSignal} from '../../../calculations/ComponentSignal';
import { generateRGBSignalFullColor, generateRGBSignalGradient, generateRGBSignalBars, offsetSignalContrast, offsetSignalBrightness, offsetSignalGamma, generateRGB3dCoordinates } from '../../../calculations/SignalGenerator';

import { clamp } from '../../../calculations/Helpers';


const Generator = ({generatorIdx, setGeneratorIdx,
                    red, setRed, green, setGreen, blue, setBlue,
                    hue, setHue, sat, setSat, val, setVal,
                    fStopOffset, setFStopOffset,
                    showRGB, toggleRgbHsv,
                    gradientColor1, setGradientColor1,
                    gradientColor2, setGradientColor2,
                    directionHorizontal, toggleDirection,
                    useBars100, setUseBars100}) => {


    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
            <View style={{ backgroundColor: "#dedede", width: "90%", flexDirection: "row", justifyContent: 'space-around', padding: 10 }}>
                <Button title="Einfarbig" onPress={()=>setGeneratorIdx(0)} titleStyle={{ color: (generatorIdx == 0 ? "black" : "gray")}} type="clear"/>
                <Button title="Verlauf" onPress={()=>setGeneratorIdx(1)} titleStyle={{ color: (generatorIdx == 1 ? "black" : "gray")}} type="clear"/>
                <Button title="Bars" onPress={()=>setGeneratorIdx(2)} titleStyle={{ color: (generatorIdx == 2 ? "black" : "gray")}} type="clear"/>
            </View>


            {generatorIdx === 0 ?
            <FullColorSelector red={red} setRed={setRed}
                        green={green} setGreen={setGreen}
                        blue={blue} setBlue={setBlue}
                        hue={hue} setHue={setHue}
                        sat={sat} setSat={setSat}
                        val={val} setVal={setVal}
                        showRGB={showRGB} toggleRgbHsv={toggleRgbHsv}
            /> : null}

            {generatorIdx === 1 ?
                <GradientSelector rgb1={gradientColor1} setRGB1={setGradientColor1}  rgb2={gradientColor2} setRGB2={setGradientColor2} directionHorizontal={directionHorizontal} toggleDirection={toggleDirection} />
            : null}

            {generatorIdx === 2 ?
                <BarsSelector useBars100={useBars100} toggleBarsType={() => setUseBars100(!useBars100)}/>
            : null}

            <TapButton label={"Blenden Offset"} currentValue={fStopOffset} setValue={setFStopOffset} stepSize={0.05}/>

        </View>
    )
}


const Corrector = ({contrastOffset, setContrastOffset, gammaOffset, setGammaOffset, brightnessOffset, setBrightnessOffset}) => {
    const reset = () => {
        setContrastOffset(1);
        setGammaOffset(1);
        setBrightnessOffset(0);
    }

    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", padding: 10 }}>
            <TapButton label={"Kontrast"} currentValue={contrastOffset} setValue={setContrastOffset} stepSize={0.05}/>
            <TapButton label={"Gamma"} currentValue={gammaOffset} setValue={setGammaOffset} stepSize={0.1}/>
            <TapButton label={"Helligkeit"} currentValue={brightnessOffset} setValue={setBrightnessOffset} stepSize={0.05}/>
            <Button title={"Zurücksetzen"} onPress={reset} type="clear"/>

        </View>
    )
}


 export const YCrCbGenerator = ({setSignal, setEncodingVideoStandard, showHideButton = false}) => {

    const videoStandards = ["601", "709", "2020"];
    const [vidStdIdx, setVidStdIdx] = useState(1);
    const switchVidStd = () => {vidStdIdx < 2 ? setVidStdIdx(vidStdIdx + 1) : setVidStdIdx(0)};

    const bitDepths = (vidStdIdx == 2 ? [10, 12] : [10, 8]);
    const [bitDepthIdx, setBitDepthIdx] = useState(0);
    const switchBitDepth = () => setBitDepthIdx(1 - bitDepthIdx);

    // Überpegel erlauben
    const [exceedVideoLevels, setExceedVideoLevels] = useState(false);

    const [hideGeneratorView, setHideGeneratorView] = useState(false);
    const [pageID, setPageID] = useState(0);
    const [generatorIdx, setGeneratorIdx] = useState(0);


    // COLOR-PICKER SINGLE COLOR
    const [hue, setHueDirectly] = useState(0);
    const setHue = (value)  => setHueDirectly((value % 360 < 0) ? (360 - Math.abs(value) % 360) : value % 360);
    const [saturation, setSaturationDirectly] = useState(0);
    const setSaturation = (value)  => setSaturationDirectly( clamp(value) );
    const [value, setValueDirectly] = useState(0);
    const setValue = (value)  => setValueDirectly( clamp(value) );

    const [red, setRedDirectly] = useState(0.0);
    const setRed = (value)  => setRedDirectly( clamp(value) );
    const [green, setGreenDirectly] = useState(0.0);
    const setGreen = (value)  => setGreenDirectly( clamp(value) );
    const [blue, setBlueDirectly] = useState(0.0);
    const setBlue = (value)  => setBlueDirectly( clamp(value) );

    // prevent infinite conversion loops
    const [showingRgbControls, setShowingRgbControls] = useState(true);

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


    // GRADIENT COLORS
    const [gradientColor1, setGradientColor1] = useState([1, 0, 1]);
    const [gradientColor2, setGradientColor2] = useState([0, 1, 0]);
    const [horizontalGradientDirection, setHorizontalGradientDirection] = useState(true);
    var amountGradientPixelH =  (horizontalGradientDirection ? 8 : 1);
    var amountGradientPixelV =  (horizontalGradientDirection ? 1 : 8);

    const [useBars100, setUseBars100] = useState(true);

    var signalRGB = [[[0, 0, 0]]];

    switch(generatorIdx) {
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

    const [fStopOffset, setFStopOffset] = useState(0); //[0...2]

    const [contrastOffset, setContrastOffset] = useState(1); //[0...2]
    const [brightnessOffset, setBrightnessOffset] = useState(0); //[-2...2]
    const [gammaOffset, setGammaOffset] = useState(1); //[-3...3]


    // Modifizieren (Operationen nur anwenden wenn nicht neutral)
    signalRGB = (fStopOffset != 0 ? offsetSignalBrightness(signalRGB, fStopOffset) : signalRGB);

    signalRGB = (contrastOffset != 1 ? offsetSignalContrast(signalRGB, contrastOffset) : signalRGB);
    signalRGB = (brightnessOffset != 0 ? offsetSignalBrightness(signalRGB, brightnessOffset) : signalRGB);
    signalRGB = (gammaOffset != 1 ? offsetSignalGamma(signalRGB, gammaOffset) : signalRGB);

    signalRGB = (exceedVideoLevels ?  signalRGB : limiterRGBSignal(signalRGB));

    // RGB -> YCrCb
    const signalSmallYCRCB = cvtSignalRGBtoYCRCB(signalRGB, videoStandards[vidStdIdx]);
    var signalYCRCB = upscaleSignalYCRCB(signalSmallYCRCB, bitDepths[bitDepthIdx]);
    signalYCRCB = limiterComponentSignal(signalYCRCB, bitDepths[bitDepthIdx], exceedVideoLevels);


    // Trigger recalculation of signal when values change
    useEffect(() => {
        setSignal(signalYCRCB);
   }, [fStopOffset, red, green, blue, gradientColor1, gradientColor2, horizontalGradientDirection, useBars100, generatorIdx]);

    useEffect(() => {
        setSignal(signalYCRCB);
        setEncodingVideoStandard(vidStdIdx);
    },[contrastOffset, gammaOffset, brightnessOffset, generatorIdx, exceedVideoLevels, bitDepthIdx, vidStdIdx]);


    return (
      <View style={{ flex: (hideGeneratorView ? 0 : 1), alignItems: "center"}}>
        <View style={{ backgroundColor: "#dedede",  width: '100%', flexDirection: "row",  alignItems: "center", paddingTop: 0, marginTop: 0 }}>
            {showHideButton ? <Button title=""  icon={<Ionicons name={hideGeneratorView? "arrow-up": "arrow-down"} size={15} color="gray" />} onPress={()=>setHideGeneratorView(!hideGeneratorView)} titleStyle={{ color: '#fff'}} type="clear"/> : null}
            <ButtonGroup onPress={setPageID} selectedIndex={pageID} buttons={["GENERATOR", "CORRECTOR"]} containerStyle={{ marginVertical: 0, marginHorizontal: 0, flex: 1 }} disabled={hideGeneratorView} selectedButtonStyle={{ backgroundColor: "#dedede" }} selectedTextStyle={{ color: "black" }} innerBorderStyle={{ width: 0 }}  buttonContainerStyle={{ backgroundColor: "white"}} textStyle={{ fontSize: 15 }}/>
        </View>
        {hideGeneratorView == false ?
        <ScrollView width="100%" contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: "center"}} style={{ backgroundColor: "#dedede" }}>

            {pageID == 0 ?
            <Generator generatorIdx={generatorIdx} setGeneratorIdx={setGeneratorIdx}
                        red={red} setRed={setRed}
                        green={green} setGreen={setGreen}
                        blue={blue} setBlue={setBlue}
                        hue={hue} setHue={setHue}
                        sat={saturation} setSat={setSaturation}
                        val={value} setVal={setValue}
                        fStopOffset={fStopOffset} setFStopOffset={setFStopOffset}
                        showRGB={showingRgbControls} toggleRgbHsv={() => setShowingRgbControls(!showingRgbControls)}
                        gradientColor1={gradientColor1} setGradientColor1={setGradientColor1}
                        gradientColor2={gradientColor2} setGradientColor2={setGradientColor2}
                        directionHorizontal={horizontalGradientDirection} toggleDirection={() => setHorizontalGradientDirection(!horizontalGradientDirection)}
                        useBars100={useBars100} setUseBars100={setUseBars100}
            />
            :
            <Corrector contrastOffset={contrastOffset} setContrastOffset={setContrastOffset}
                        gammaOffset={gammaOffset} setGammaOffset={setGammaOffset}
                        brightnessOffset={brightnessOffset} setBrightnessOffset={setBrightnessOffset}
            />}

            <Text h3 style={{paddingTop: 20, paddingBottom: 10}}>Videostandard</Text>
            <Button title={"Rec." + videoStandards[vidStdIdx]} onPress={switchVidStd} type="clear"/>
            <Button title={bitDepths[bitDepthIdx] + " bit"} onPress={switchBitDepth} type="clear"/>
            <Button title={(exceedVideoLevels ? "mit Überpegel" : "ohne Überpegel")} onPress={() => setExceedVideoLevels(!exceedVideoLevels)} type="clear"/>
        </ScrollView>
                : null }
      </View>
    );
  }

