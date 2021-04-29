import * as React from 'react';
import { useState } from "react";
import { Text, View, Button } from 'react-native';
import WaveformMonitor from '../../Scopes/WaveformMonitor';

export default function MessungScreen() {
    const [test, setTest] = useState([22, 32]);
    const addVal = () => setTest([40, 30, 40]);
    const [text, setText] = useState("Test");
    const newText = () => setText(text+"neu");
    const newOne = () => {
      const dataArray = new Array(800);
      for(var i = 0; i < dataArray.length; i++){
        dataArray[i] = 20 * Math.sin(i/20);
        if(i > 400){
        dataArray[i] += 300;
        }
      setTest(dataArray);
      }
    };
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>MessungScreen</Text>
        <WaveformMonitor style={{ flex: 1 }} text={text} data={test}></WaveformMonitor>
        <Button title="AddElement" onPress={addVal}></Button>
        <Button title="SineWave" onPress={newOne}></Button>
        <Button title="EmptyButton" onPress={newText}></Button>
      </View>
    );
  }
