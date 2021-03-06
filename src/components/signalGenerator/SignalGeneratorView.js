import React, { useState, useLayoutEffect, useMemo } from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Text } from 'react-native-elements';

import { styles } from './SignalGeneratorViewStyle';

import { PageBar } from './subComponents/CustomButtons';
import { GeneratorContainer } from './subComponents/GeneratorContainer';
import { Corrector } from './subComponents/Corrector';
import { TapButton } from './subComponents/CustomButtons';


import { cvtSignalRGBtoYCBCR, upscaleSignalYCBCR, limiterSignalYCBCR, limiterSignalSmallRGB} from '../../calculations/CalcComponentSignal';
import { offsetSignalContrast, offsetSignalBrightness, offsetSignalGamma } from '../../calculations/CalcSignalCorrector';


 export const SignalGeneratorView = ({ setSignal, setEncodingVideoStandard, setEncodingBitDepthIdx, showHideButton=false, style=undefined}) => {

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

    // signal limiters
    const [exceedVideoLevels, setExceedVideoLevels] = useState(false);

    // signal parameters
    const [signalSmallRGB, setSignalSmallRGB] = useState( [[[0, 0, 0]]] );

    const [fStopOffset, setFStopOffset] = useState(0); //[0...2]
    const [contrastOffset, setContrastOffset] = useState(1); //[0...2]
    const [brightnessOffset, setBrightnessOffset] = useState(0); //[-2...2]
    const [gammaOffset, setGammaOffset] = useState(1); //[0,1...3]

    // color corrector
    const postCorrectorSignal = useMemo(() => {
        var signal = signalSmallRGB;

        signal = (gammaOffset != 1 ? offsetSignalGamma(signal, gammaOffset) : signal);

        signal = (contrastOffset != 1 ? offsetSignalContrast(signal, contrastOffset) : signal);

        signal = (fStopOffset != 0 ? offsetSignalBrightness(signal, fStopOffset) : signal);
        signal = (brightnessOffset != 0 ? offsetSignalBrightness(signal, brightnessOffset) : signal);

        signal = limiterSignalSmallRGB(signal, exceedVideoLevels);
        return signal;
    }, [fStopOffset, contrastOffset, gammaOffset, brightnessOffset, exceedVideoLevels, bitDepthIdx, vidStdIdx, signalSmallRGB])

    // R'G'B' -> Y'CbCr
    const signalSmallYCBCR = cvtSignalRGBtoYCBCR(postCorrectorSignal, videoStandards[vidStdIdx]);
    var signalYCBCR = upscaleSignalYCBCR(signalSmallYCBCR, bitDepths[bitDepthIdx]);
    signalYCBCR = limiterSignalYCBCR(signalYCBCR, bitDepths[bitDepthIdx], false);

    // signal refresh
    useLayoutEffect(() => {
        setSignal(signalYCBCR);
        setEncodingVideoStandard(vidStdIdx);
        setEncodingBitDepthIdx(bitDepthIdx);
    },[signalSmallRGB, fStopOffset, contrastOffset, gammaOffset, brightnessOffset, exceedVideoLevels, bitDepthIdx, vidStdIdx]);


    return (
      <View style={[{flex: (hideSignalGenerator ? 0 : 1), alignItems: "center"}, style]}>

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
            <>
                <GeneratorContainer
                            rgbSignal={signalSmallRGB}
                            setSignalSmallRGB={setSignalSmallRGB}
                            generatorIdx={generatorIdx}
                            setGeneratorIdx={setGeneratorIdx}
                />
                <TapButton label={"Blenden Offset"} currentValue={fStopOffset} setValue={setFStopOffset} stepSize={0.05}/>
            </>
            :
            <Corrector contrastOffset={contrastOffset} setContrastOffset={setContrastOffset}
                        gammaOffset={gammaOffset} setGammaOffset={setGammaOffset}
                        brightnessOffset={brightnessOffset} setBrightnessOffset={setBrightnessOffset}
            />}



            <Text h3 style={{paddingTop: 20, paddingBottom: 10}}>Videostandard</Text>
            <Button title={"Rec." + videoStandards[vidStdIdx]} onPress={switchVidStd}/>
            <Button title={bitDepths[bitDepthIdx] + " bit"} onPress={switchBitDepth}/>
            <Button title={(exceedVideoLevels ? "RGB full Video Data" : "legales RGB" )}
                    onPress={() => setExceedVideoLevels(!exceedVideoLevels)}
                />
        </ScrollView> : null }

      </View>
    );
  }

