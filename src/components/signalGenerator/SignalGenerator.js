import React, { useState, useLayoutEffect, useMemo } from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Text } from 'react-native-elements';

import { styles } from './SignalGeneratorStyle';

import { TapButton, PageBar } from './subComponents/CustomButtons';
import { BarsGenerator} from './subComponents/BarsGenerator';
import { FullColorGenerator } from './subComponents/FullColorGenerator';
import { GradientGenerator } from './subComponents/GradientGenerator';

import { cvtSignalRGBtoYCRCB, upscaleSignalYCRCB, limiterComponentSignal, limiterRGBSignal} from '../../calculations/CalcComponentSignal';
import { offsetSignalContrast, offsetSignalBrightness, offsetSignalGamma } from '../../calculations/CalcSignalCorrector';



const Generator = ({ setSignalRGB, generatorIdx, setGeneratorIdx, fStopOffset, setFStopOffset }) => {
   // const [generatorIdx, setGeneratorIdx] = useState(0);

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



 export const SignalGenerator = ({setSignal, setEncodingVideoStandard, showHideButton = false}) => {

    // appearance
    const [hideSignalGenerator, setHideSignalGenerator] = useState(false);
    const [pageID, setPageID] = useState(0);
    const [generatorIdx, setGeneratorIdx] = useState(0);

    // video standard
    const videoStandards = ["601", "709", "2020"];
    const [vidStdIdx, setVidStdIdx] = useState(1);
    const switchVidStd = () => {vidStdIdx < 2 ? setVidStdIdx(vidStdIdx + 1) : setVidStdIdx(0)};

    const bitDepths = (vidStdIdx == 2 ? [10, 12] : [10, 8]);
    const [bitDepthIdx, setBitDepthIdx] = useState(0);
    const switchBitDepth = () => setBitDepthIdx(1 - bitDepthIdx);

    const [exceedVideoLevels, setExceedVideoLevels] = useState(false);

    // signal parameters
    const [signalRGB, setSignalRGB] = useState( [[[0, 0, 0]]] );

    const [fStopOffset, setFStopOffset] = useState(0); //[0...2]
    const [contrastOffset, setContrastOffset] = useState(1); //[0...2]
    const [brightnessOffset, setBrightnessOffset] = useState(0); //[-2...2]
    const [gammaOffset, setGammaOffset] = useState(1); //[-3...3]

    // color corrector
    const postCorrectorSignal = useMemo(() => {
        var signal = signalRGB;

        signal = (gammaOffset != 1 ? offsetSignalGamma(signal, gammaOffset) : signal);

        signal = (fStopOffset != 0 ? offsetSignalBrightness(signal, fStopOffset) : signal);
        signal = (brightnessOffset != 0 ? offsetSignalBrightness(signal, brightnessOffset) : signal);
        signal = (contrastOffset != 1 ? offsetSignalContrast(signal, contrastOffset) : signal);

        signal = (exceedVideoLevels ?  signal : limiterRGBSignal(signal));
        return signal;
    }, [fStopOffset, contrastOffset, gammaOffset, brightnessOffset, exceedVideoLevels, bitDepthIdx, vidStdIdx, signalRGB])

    // RGB -> YCrCb
    const signalSmallYCRCB = cvtSignalRGBtoYCRCB(postCorrectorSignal, videoStandards[vidStdIdx]);
    var signalYCRCB = upscaleSignalYCRCB(signalSmallYCRCB, bitDepths[bitDepthIdx]);
    signalYCRCB = limiterComponentSignal(signalYCRCB, bitDepths[bitDepthIdx], exceedVideoLevels);

    // signal refresh
    useLayoutEffect(() => {
        setSignal(signalYCRCB);
        setEncodingVideoStandard(vidStdIdx);
    },[signalRGB, fStopOffset, contrastOffset, gammaOffset, brightnessOffset, exceedVideoLevels, bitDepthIdx, vidStdIdx]);


    return (
      <View style={{ flex: (hideSignalGenerator ? 0 : 1), alignItems: "center"}}>

        <PageBar pageID={pageID}
                setPageID={setPageID}
                showHideButton={showHideButton}
                hideSignalGenerator={hideSignalGenerator}
                setHideSignalGenerator={setHideSignalGenerator} />


        {hideSignalGenerator == false ?
        <ScrollView width="100%"
                    contentContainerStyle={styles.scrollViewContainer}
                    style={styles.scrollView}>

            {pageID == 0 ?
            <Generator rgbSignal={signalRGB}
                        setSignalRGB={setSignalRGB}
                        generatorIdx={generatorIdx}
                        setGeneratorIdx={setGeneratorIdx}
                        fStopOffset={fStopOffset}
                        setFStopOffset={setFStopOffset} />
            :
            <Corrector contrastOffset={contrastOffset} setContrastOffset={setContrastOffset}
                        gammaOffset={gammaOffset} setGammaOffset={setGammaOffset}
                        brightnessOffset={brightnessOffset} setBrightnessOffset={setBrightnessOffset}
            />}

            <Text h3 style={{paddingTop: 20, paddingBottom: 10}}>Videostandard</Text>
            <Button title={"Rec." + videoStandards[vidStdIdx]} onPress={switchVidStd}/>
            <Button title={bitDepths[bitDepthIdx] + " bit"} onPress={switchBitDepth}/>
            <Button title={(exceedVideoLevels ? "mit Unter- & Überpegel" : "ohne Unter- & Überpegel")}
                    onPress={() => setExceedVideoLevels(!exceedVideoLevels)}
                />
        </ScrollView> : null }

      </View>
    );
  }

