import React, { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import Icon from 'react-native-vector-icons/Ionicons';

import { styles } from './VectorscopeViewStyle';

import { SettingsPopOver, VideoStandardSelectElement, ToggleElement } from '../generalComponents/Settings';
import { SignalPreviewPlot } from '../signalPreview/subviews/SignalPreviewPlot';
import { VideoStandardAlertView } from '../generalComponents/VideoStandardAlertView';

import { ScopesCamera } from '../generalComponents/ScopesCamera';

import { VectorscopePlot } from './subviews/VectorscopePlot';
import { VectorscopeBounds, PeakSignalHexagon} from './subviews/VectorscopeLabeling';

import { cvtSignalYCRCBtoRGB, downscaleSignalYCRCB } from '../../calculations/CalcComponentSignal';



export const VectorscopeView = ({ signalYCRCB, withOverlays = false, encodedVideoStandard = 1  }) => {

  // appearance
  const [largePreview, setLargePreview] = useState(false);
  const togglePreviewSize = () => setLargePreview(!largePreview);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [discreteSignalRepresentation, setDiscreteSignalRepresentation] = useState(true);

  // video standard
  const videoStandards = ["601", "709", "2020"];
  const [vidStdIdx, setVidStdIdx] = useState(1);

  const bitDepths = (vidStdIdx == 2 ? [10, 12] : [10, 8]);
  const [bitDepthIdx, setBitDepthIdx] = useState(0);

  // YCrCb -> RGB
  const signalSmallYCRCB = downscaleSignalYCRCB(signalYCRCB, bitDepths[bitDepthIdx]);
  const signalRGB = cvtSignalYCRCBtoRGB(signalSmallYCRCB, videoStandards[vidStdIdx]);


    return (
      <View style={{flex: 1}}>

          <Canvas style={styles.canvas}>
              <ScopesCamera position={[0, 0, 1]} initialZoomScale={2.4} />
              <VectorscopeBounds />
              <PeakSignalHexagon videoStandard={videoStandards[vidStdIdx]}/>
              <VectorscopePlot signalSmallYCRCB={signalSmallYCRCB} signalRGB={signalRGB} discreteSignalRepresentation={discreteSignalRepresentation}/>
          </Canvas>


          <View style={styles.VideoStandardAlertContainer}>
            <VideoStandardAlertView signalStd={encodedVideoStandard} scopeStd={vidStdIdx} />
          </View>


          {withOverlays ?
            <View style={styles.overlaysContainer}>
              <TouchableOpacity style={{ minWidth: 20, minHeight:(largePreview ? 110 : 45), width: (largePreview ? "60%" : "20%"), aspectRatio: 1.78}}
                                onPress={togglePreviewSize}>
                <SignalPreviewPlot signalRGB={signalRGB}/>
              </TouchableOpacity>
              <Button icon={<Icon name="settings-sharp" size={25}/>} title="" type="clear" onPress={() => setSettingsVisible(!settingsVisible)}/>
            </View> : null }


          {settingsVisible ?
            <SettingsPopOver setSettingsVisible={setSettingsVisible}>
              <VideoStandardSelectElement
                  vidStdIdx={vidStdIdx}
                  setVidStdIdx={setVidStdIdx}
                  bitDepthIdx={bitDepthIdx}
                  setBitDepthIdx={setBitDepthIdx}
              />
              <ToggleElement
                  elementTitle={"Signalplot"}
                  title={(discreteSignalRepresentation ? "diskrete Punkte" : "Linienzug")}
                  onPress={() => setDiscreteSignalRepresentation(!discreteSignalRepresentation)}
              />
            </SettingsPopOver> : null}

        </View>
    );
}
