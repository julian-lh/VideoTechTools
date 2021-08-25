import React, { useState } from 'react';
import {  View, TouchableOpacity } from 'react-native';

import { Button  } from 'react-native-elements';
import { Canvas } from 'react-three-fiber';
import Icon from 'react-native-vector-icons/Ionicons';

import { styles } from './WfmViewStyle';

import { SettingsPopOverContainer, VideoStandardSelectElement } from '../generalComponents/Settings';
import { SignalPreviewPlot } from '../signalPreview/subComponents/SignalPreviewPlot';
import { VideoStandardAlertView } from '../generalComponents/VideoStandardAlertView';

import { ScopesCamera } from '../generalComponents/ScopesCamera';

import { WfmPlot } from './subComponents/WfmPlot';
import { WfmGrid } from './subComponents/WfmLabeling';

import { cvtSignalYCBCRtoRGB, downscaleSignalYCBCR } from '../../calculations/CalcComponentSignal';



export const WfmView = ({ signalYCBCR, withOverlays = false,  encodedVidStdIdx = 1, encodedBitDepthIdx = 0  }) => {

    // WFM mode
    const wfmReps = ["RGB", "YCbCr", "Luma"];
    const [wfmRepIdx, setWfmRepIdx] = useState(0);
    const switchWfmRep = () => {wfmRepIdx < 2 ? setWfmRepIdx(wfmRepIdx + 1) : setWfmRepIdx(0)};

    // appearance
    const [largePreview, setLargePreview] = useState(false);
    const togglePreviewSize = () => setLargePreview(!largePreview);
    const [settingsVisible, setSettingsVisible] = useState(false);

    // video standard
    const videoStandards = ["601", "709", "2020"];
    const [vidStdIdx, setVidStdIdx] = useState(1);

    const bitDepths = (vidStdIdx == 2 ? [10, 12] : [10, 8]);
    const [bitDepthIdx, setBitDepthIdx] = useState(encodedBitDepthIdx);

    // Y'CbCr -> R'G'B'
    const signalSmallYCBCR = downscaleSignalYCBCR(signalYCBCR, bitDepths[bitDepthIdx]);
    const signalSmallRGB = cvtSignalYCBCRtoRGB(signalSmallYCBCR, videoStandards[vidStdIdx]);


    return (
        <View style={{flex: 1}}>

          <Canvas style={styles.canvas}>
              <ScopesCamera position={[0.9, 0.3, 1]} target={[0.9, 0.3, 0]} initialZoomScale={2.3}/>
              <WfmGrid />
              <WfmPlot signalYCBCR={signalSmallYCBCR} signalSmallRGB={signalSmallRGB} representationID={wfmRepIdx}/>
          </Canvas>



          <View style={styles.VideoStandardAlertContainer}>
            <VideoStandardAlertView
                    signalVidStdIdx={encodedVidStdIdx}
                    scopeVidStdIdx={vidStdIdx}
                    signalBitDepthIdx={encodedBitDepthIdx}
                    scopeBitDepthIdx={bitDepthIdx}
                    />
          </View>

          <View style={styles.overlaysContainer}>
              {withOverlays ?
              <Button icon={<Icon name="settings-sharp" size={25}/>} type="clear"
                    onPress={() => setSettingsVisible(!settingsVisible)}/> : null }
              <Button title={wfmReps[wfmRepIdx]} onPress={switchWfmRep}/>
          </View>



          {withOverlays ?
          <View style={{ position: 'absolute', zIndex: 1, bottom: 10, right:20, left: 20, minHeight: (largePreview ? 110 : 30), justifyContent: "flex-start", alignItems: 'center'}}>
              <TouchableOpacity style={{ height: '100%', aspectRatio: (largePreview ? 1.78 : undefined), width: (largePreview ? undefined : '100%')}}
                                onPress={togglePreviewSize}>
                  <SignalPreviewPlot signalSmallRGB={signalSmallRGB}/>
              </TouchableOpacity>
          </View> : null }



          {(settingsVisible ?
            <SettingsPopOverContainer setSettingsVisible={setSettingsVisible}>
                <VideoStandardSelectElement
                    vidStdIdx={vidStdIdx}
                    setVidStdIdx={setVidStdIdx}
                    bitDepthIdx={bitDepthIdx}
                    setBitDepthIdx={setBitDepthIdx}
                />
            </SettingsPopOverContainer> : null)}

        </View>
      );
  }

