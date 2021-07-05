//import * as React from 'react';
import React, { useState, PureComponent} from "react";
import { StyleSheet, View, TextInput, ScrollView } from 'react-native';
import { Image, Button, ButtonGroup, Header, Text } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';


export class BtnGroup extends PureComponent {
  // Quelle https://www.sitepoint.com/community/t/react-native-elements-button-group/366392
  constructor() {
    super()
    this.state = {
      selectedIndex: 0
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex })
  }

  render() {
    const buttons = ['Y', 'Pr/Pb']
    const { selectedIndex } = this.state

    return (
      <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        //containerStyle={{ height: 45, width: 200 }}
      />
    )
  }
}

const SamplingRateElement = (props) => {
  return(
    <View style={styles.inputElement}>
      <Button style={styles.inputElementButtons} title='<'/>
      <TextInput style={styles.inputElementInput} defaultValue="4" />
      <Text>:</Text>
      <TextInput style={styles.inputElementInput} defaultValue="2" />
      <Text>:</Text>
      <TextInput style={styles.inputElementInput} defaultValue="2" />
      <Button style={styles.inputElementButtons} title='>'/>
    </View>
  );
}

export default function AbtastungScreen() {
  const [selectedChannel, setSelectedChannel] = useState(0);
//      <Header centerComponent={{ text: 'UNTERABTASTUNG', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }} />

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ScrollView  contentContainerStyle={{flex: 1}} style={{width: "100%"}}>

        <Image
          source={{ uri: './assets/icon.png'}}
          style={styles.image}
          PlaceholderContent={<ActivityIndicator />}
        />
        <BtnGroup style={{flex: 1}}/>
        <SamplingRateElement />

      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  image: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },

  inputElement: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'center',
    flexWrap: "wrap",
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  inputElementLabel: {
    fontSize: 20,
    flex: 1,
  },
  inputElementButtons: {
    padding: 5,
    width: 40
  },
  inputElementInput: {
    height: 35,
    minWidth: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    //borderColor: 'gray',
    //borderWidth: 1,
    padding: 5
  },
});