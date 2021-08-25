import React, { useState, useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { Canvas } from 'react-three-fiber';
import Icon from 'react-native-vector-icons/Ionicons';

import { styles } from './VectorscopeViewStyle';

import { SettingsPopOverContainer, VideoStandardSelectElement, ToggleElement } from '../generalComponents/Settings';
import { SignalPreviewPlot } from '../signalPreview/subComponents/SignalPreviewPlot';
import { VideoStandardAlertView } from '../generalComponents/VideoStandardAlertView';

import { ScopesCamera } from '../generalComponents/ScopesCamera';

import { VectorscopePlot } from './subComponents/VectorscopePlot';
import { VectorscopeBounds, PeakSignalHexagon} from './subComponents/VectorscopeLabeling';

import { cvtSignalYCBCRtoRGB, downscaleSignalYCBCR } from '../../calculations/CalcComponentSignal';
import { offsetSignalGamma } from '../../calculations/CalcSignalCorrector';

import { limiterSignalSmallRGB } from '../../calculations/CalcComponentSignal';


export const VectorscopeView = ({ signalYCBCR, withOverlays = false, encodedVidStdIdx = 1, encodedBitDepthIdx = 0   }) => {

  // appearance
  const [largePreview, setLargePreview] = useState(false);
  const togglePreviewSize = () => setLargePreview(!largePreview);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [useDiscreteSignalRepresentation, setUseDiscreteSignalRepresentation] = useState(true);

  // video standard
  const videoStandards = ["601", "709", "2020"];
  const [vidStdIdx, setVidStdIdx] = useState(1);

  const bitDepths = (vidStdIdx == 2 ? [10, 12] : [10, 8]);
  const [bitDepthIdx, setBitDepthIdx] = useState(encodedBitDepthIdx);

  // Y'CbCr -> R'G'B'
  const signalSmallYCBCR = downscaleSignalYCBCR(signalYCBCR, bitDepths[bitDepthIdx]);
  const signalSmallRGB = cvtSignalYCBCRtoRGB(signalSmallYCBCR, videoStandards[vidStdIdx]);

  const signalSmallRGBLtd = limiterSignalSmallRGB(signalSmallRGB)

  // R'G'B' -> RGB
  const signalSmallRGBlinear = useMemo(() =>  offsetSignalGamma(signalSmallRGBLtd, 2.22), [signalSmallRGBLtd, vidStdIdx]);


    return (
      <View style={{flex: 1}}>

          <Canvas style={styles.canvas}>
              <ScopesCamera position={[0, 0, 1]} initialZoomScale={2.4} />
              <VectorscopeBounds />
              <PeakSignalHexagon videoStandard={videoStandards[vidStdIdx]}/>
              <VectorscopePlot signalSmallYCBCR={signalSmallYCBCR} signalSmallRGBlinear={signalSmallRGBlinear} useDiscreteSignalRepresentation={useDiscreteSignalRepresentation}/>
          </Canvas>


          <View style={styles.VideoStandardAlertContainer}>
              <VideoStandardAlertView
                        signalVidStdIdx={encodedVidStdIdx}
                        scopeVidStdIdx={vidStdIdx}
                        signalBitDepthIdx={encodedBitDepthIdx}
                        scopeBitDepthIdx={bitDepthIdx}
                        />
          </View>


          {withOverlays ?
            <View style={styles.overlaysContainer}>
              <TouchableOpacity style={{ minWidth: 20, minHeight:(largePreview ? 110 : 45), width: (largePreview ? "60%" : "20%"), aspectRatio: 1.78}}
                                onPress={togglePreviewSize}>
                <SignalPreviewPlot signalSmallRGB={signalSmallRGB}/>
              </TouchableOpacity>
              <Button icon={<Icon name="settings-sharp" size={25}/>} title="" type="clear" onPress={() => setSettingsVisible(!settingsVisible)}/>
            </View> : null }


          {settingsVisible ?
            <SettingsPopOverContainer setSettingsVisible={setSettingsVisible}>
              <VideoStandardSelectElement
                  vidStdIdx={vidStdIdx}
                  setVidStdIdx={setVidStdIdx}
                  bitDepthIdx={bitDepthIdx}
                  setBitDepthIdx={setBitDepthIdx}
              />
              <ToggleElement
                  elementTitle={"Signalplot"}
                  buttonTitle={(useDiscreteSignalRepresentation ? "diskrete Punkte" : "Linienzug")}
                  onPress={() => setUseDiscreteSignalRepresentation(!useDiscreteSignalRepresentation)}
              />
            </SettingsPopOverContainer> : null}

        </View>
    );
}
