import React, {useRef, useState, useEffect } from 'react';
import {  View, TouchableOpacity } from 'react-native';

import { Button  } from 'react-native-elements';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import Icon from 'react-native-vector-icons/Ionicons';

import { styles } from './WFMViewStyle';

import { SettingsPopOver, VideoStandardSelectElement } from '../generalComponents/Settings';
import { SignalPreviewPlot } from '../signalPreview/subviews/SignalPreviewPlot';
import { VideoStandardAlertView } from '../generalComponents/VideoStandardAlertView';

import { WFMPlot } from './subviews/WFMPlot';
import { WFMGrid } from './subviews/WFMLabeling';

import { cvtSignalYCRCBtoRGB, downscaleSignalYCRCB } from '../../calculations/ComponentSignal';



const Camera = (props) => {
    const cam = useRef()
    const { setDefaultCamera } = useThree()

    // zoom to fit window
    const { size: { width, height } } = useThree();
    const initialZoom = Math.min(width/2.3, height/2.3);

    useEffect(() => void setDefaultCamera(cam.current), [])

    useFrame(() => {
      cam.current.updateMatrixWorld();
      cam.current.lookAt(0.9, 0.3, 0);
    })
    return <orthographicCamera ref={cam} zoom={initialZoom} near={0.0} {...props} />
  }


export const WFMView = ({ signalYCRCB, withOverlays = false,  encodedVideoStandard = 1 }) => {

    // WFM mode
    const wfmReps = ["RGB", "YCrCb", "Luma"];
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
    const [bitDepthIdx, setBitDepthIdx] = useState(0);

    // YCrCb -> RGB
    const signalSmallYCRCB = downscaleSignalYCRCB(signalYCRCB, bitDepths[bitDepthIdx]);
    const signalRGB = cvtSignalYCRCBtoRGB(signalSmallYCRCB, videoStandards[vidStdIdx]);


    return (
        <View style={{flex: 1}}>

          <Canvas style={styles.canvas}>
              <Camera position={[0.9, 0.3, 1]} />
              <WFMGrid />
              <WFMPlot signalYCRCB={signalSmallYCRCB} signalRGB={signalRGB} representationID={wfmRepIdx}/>
          </Canvas>



          <View style={styles.VideoStandardAlertContainer}>
            <VideoStandardAlertView signalStd={encodedVideoStandard} scopeStd={vidStdIdx} />
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
                <SignalPreviewPlot signalRGB={signalRGB}/>
              </TouchableOpacity>
          </View> : null }



          {(settingsVisible ?
            <SettingsPopOver setSettingsVisible={setSettingsVisible}>
                    <VideoStandardSelectElement
                        vidStdIdx={vidStdIdx}
                        setVidStdIdx={setVidStdIdx}
                        bitDepthIdx={bitDepthIdx}
                        setBitDepthIdx={setBitDepthIdx}
                    />
                </SettingsPopOver> : null)}

        </View>
      );
  }

