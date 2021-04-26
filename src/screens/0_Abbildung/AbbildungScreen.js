import * as React from 'react';
import { styles } from './AbbildungStyles';
import { StyleSheet, View, TextInput, ScrollView } from 'react-native';
import { Button, Header, Text } from 'react-native-elements';
import { Camera } from '../../calculation/cameraDistance';
//import { data } from './cameraData.json';
import {useState} from 'react';

//const RaisedButton = (props) => <Button raised {...props} />;

const ParameterElement = (props) => {
  return (
    <View style={styles.inputElement}>
      <Text style={styles.inputElementLabel}>{props.label}</Text>
      <Button style={styles.inputElementButtons} title='<' onPress={props.btnLeft}/>
      <Text style={styles.inputElementInput}>{props.value}</Text>
      <Button style={styles.inputElementButtons} title='>' onPress={props.btnRight}/>
    </View>
    );
  }


  // erstmal quick und dirty weg gehen mit langen Ausdruecken!!

export default function AbbildungScreen() {

    //const [camera, setCamera] = useState(new Camera());
    //setCamera(new Camera());

    const cameraData = require('../../calculation/cameraData.json');

    const [stop, setStop] = React.useState(4,0);
    const stopUp = () => setStop(stop * (Math.sqrt(Math.sqrt(2))));
    const stopDown = () => setStop(stop / (Math.sqrt(Math.sqrt(2))));

    const [focal, setFocal] = React.useState(0.055);
    const focalUp = () => setFocal(focal + 0.005);
    const focalDown = () => setFocal(focal - 0.005);

    const [sensorID, setSensorID] = useState(0);
    const sensorUp = () => setSensorID(Math.min(sensorID + 1, cameraData.sensors.length-1));
    const sensorDown = () => setSensorID(Math.max(sensorID - 1, 0));

    const [booster, setBooster] = React.useState(1.0);
    const boosterUp = () => setBooster(booster + 0.1);
    const boosterDown = () => setBooster(booster - 0.1);

    const cam = new Camera(stop, focal, sensorID, booster);

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Header
          centerComponent={{ text: 'ABBILDUNG', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
          />
        <ScrollView style={{width: '100%'}}>
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>THREE.JS-View mit Simulation</Text>
          </View>
          <Text style={{flex: 1}}>Horizontale Öffnung: {cam.horizontalAngleOfView().toFixed(2)}°</Text>
          <Text style={{flex: 1}}>vertikale Öffnung: {cam.verticalAngleOfView().toFixed(2)}°</Text>
          <Text style={{flex: 1}}>Sensor: {cameraData.sensors[sensorID].name}</Text>

          <ParameterElement label='Blende' value={stop.toFixed(1)} btnLeft={stopDown} btnRight={stopUp}/>
          <ParameterElement label='Brennweite' value={(focal * 1000).toFixed(0)+" mm"} btnLeft={focalDown} btnRight={focalUp}/>
          <ParameterElement label='Speedbooster Faktor' value={booster.toFixed(1)+" x"} btnLeft={boosterDown} btnRight={boosterUp}/>
          <ParameterElement label='Sensorgröße' value={cam.sensor.name} btnLeft={sensorDown} btnRight={sensorUp}/>
          <Text style={{paddingHorizontal: 30, paddingVertical: 0}}>{(cam.sensor.height * 1000)} x {(cam.sensor.width * 1000)} mm </Text>
          <ParameterElement label='Seitenverhältnis'/>
        </ScrollView>
      </View>
    );
  }

