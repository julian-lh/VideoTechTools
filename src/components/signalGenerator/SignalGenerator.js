import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Text, Slider, ButtonGroup } from 'react-native-elements';

import { styles } from './SignalGeneratorStyle';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { TapButton } from './Subviews/TapButton';
import { BarsGenerator} from './Subviews/BarsGenerator';
import { FullColorGenerator } from './Subviews/FullColorGenerator';
import { GradientGenerator } from './Subviews/GradientGenerator';

import { cvtSignalRGBtoYCRCB, upscaleSignalYCRCB, limiterComponentSignal, limiterRGBSignal} from '../../calculations/ComponentSignal';
import { offsetSignalContrast, offsetSignalBrightness, offsetSignalGamma } from '../../calculations/SignalGenerator';



const Generator = ({ setRgbSignal, fStopOffset, setFStopOffset }) => {

    const [generatorIdx, setGeneratorIdx] = useState(0);

    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
            <View style={{ backgroundColor: "#dedede", width: "90%", flexDirection: "row", justifyContent: 'space-around', padding: 10 }}>
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

            {generatorIdx === 0 ? <FullColorGenerator setRgbSignal={setRgbSignal} /> : null}
            {generatorIdx === 1 ? <GradientGenerator setRgbSignal={setRgbSignal} /> : null}
            {generatorIdx === 2 ? <BarsGenerator setRgbSignal={setRgbSignal} /> : null}

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

    const [hideGeneratorView, setHideGeneratorView] = useState(false);
    const [pageID, setPageID] = useState(0);

    const videoStandards = ["601", "709", "2020"];
    const [vidStdIdx, setVidStdIdx] = useState(1);
    const switchVidStd = () => {vidStdIdx < 2 ? setVidStdIdx(vidStdIdx + 1) : setVidStdIdx(0)};

    const bitDepths = (vidStdIdx == 2 ? [10, 12] : [10, 8]);
    const [bitDepthIdx, setBitDepthIdx] = useState(0);
    const switchBitDepth = () => setBitDepthIdx(1 - bitDepthIdx);

    const [exceedVideoLevels, setExceedVideoLevels] = useState(false);

    const [signalRGB, setSignalRGB] = useState( [[[0, 0, 0]]] );

    const [fStopOffset, setFStopOffset] = useState(0); //[0...2]
    const [contrastOffset, setContrastOffset] = useState(1); //[0...2]
    const [brightnessOffset, setBrightnessOffset] = useState(0); //[-2...2]
    const [gammaOffset, setGammaOffset] = useState(1); //[-3...3]


    // Modifizieren (Operationen nur anwenden wenn nicht neutral)
    const postCorrectorSignal = useMemo(() => {
        var signal = signalRGB;
        signal = (fStopOffset != 0 ? offsetSignalBrightness(signal, fStopOffset) : signal);
        signal = (contrastOffset != 1 ? offsetSignalContrast(signal, contrastOffset) : signal);
        signal = (brightnessOffset != 0 ? offsetSignalBrightness(signal, brightnessOffset) : signal);
        signal = (gammaOffset != 1 ? offsetSignalGamma(signal, gammaOffset) : signal);
        signal = (exceedVideoLevels ?  signal : limiterRGBSignal(signal));
        return signal;
    }, [fStopOffset, contrastOffset, gammaOffset, brightnessOffset, exceedVideoLevels, bitDepthIdx, vidStdIdx, signalRGB])


    // RGB -> YCrCb
    const signalSmallYCRCB = cvtSignalRGBtoYCRCB(postCorrectorSignal, videoStandards[vidStdIdx]);
    var signalYCRCB = upscaleSignalYCRCB(signalSmallYCRCB, bitDepths[bitDepthIdx]);
    signalYCRCB = limiterComponentSignal(signalYCRCB, bitDepths[bitDepthIdx], exceedVideoLevels);


    // Trigger recalculation of signal when values change
    useEffect(() => {
        setSignal(signalYCRCB);
        setEncodingVideoStandard(vidStdIdx);
   }, [signalRGB]);

    useEffect(() => {
        setSignal(signalYCRCB);
        setEncodingVideoStandard(vidStdIdx);
    },[fStopOffset, contrastOffset, gammaOffset, brightnessOffset, exceedVideoLevels, bitDepthIdx, vidStdIdx]);


    return (
      <View style={{ flex: (hideGeneratorView ? 0 : 1), alignItems: "center"}}>
        <View style={{ backgroundColor: "#dedede",  width: '100%', flexDirection: "row",  alignItems: "center", paddingTop: 0, marginTop: 0 }}>
            {showHideButton ? <Button title=""  icon={<Ionicons name={hideGeneratorView? "arrow-up": "arrow-down"} size={15} color="gray" />} onPress={()=>setHideGeneratorView(!hideGeneratorView)} titleStyle={{ color: '#fff'}} type="clear"/> : null}
            <ButtonGroup onPress={setPageID} selectedIndex={pageID} buttons={["GENERATOR", "CORRECTOR"]} containerStyle={{ marginVertical: 0, marginHorizontal: 0, flex: 1 }} disabled={hideGeneratorView} selectedButtonStyle={{ backgroundColor: "#dedede" }} selectedTextStyle={{ color: "black" }} innerBorderStyle={{ width: 0 }}  buttonContainerStyle={{ backgroundColor: "white"}} textStyle={{ fontSize: 15 }}/>
        </View>
        {hideGeneratorView == false ?
        <ScrollView width="100%" contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: "center"}} style={{ backgroundColor: "#dedede" }}>

            {pageID == 0 ?
            <Generator rgbSignal={signalRGB} setRgbSignal={setSignalRGB} fStopOffset={fStopOffset} setFStopOffset={setFStopOffset} />
            :
            <Corrector contrastOffset={contrastOffset} setContrastOffset={setContrastOffset}
                        gammaOffset={gammaOffset} setGammaOffset={setGammaOffset}
                        brightnessOffset={brightnessOffset} setBrightnessOffset={setBrightnessOffset}
            />}

            <Text h3 style={{paddingTop: 20, paddingBottom: 10}}>Videostandard</Text>
            <Button title={"Rec." + videoStandards[vidStdIdx]} onPress={switchVidStd} type="clear"/>
            <Button title={bitDepths[bitDepthIdx] + " bit"} onPress={switchBitDepth} type="clear"/>
            <Button title={(exceedVideoLevels ? "mit Unter- & Überpegel" : "ohne Unter- & Überpegel")} onPress={() => setExceedVideoLevels(!exceedVideoLevels)} type="clear"/>
        </ScrollView>
                : null }
      </View>
    );
  }

