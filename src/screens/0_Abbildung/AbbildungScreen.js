import * as React from 'react';
import { StyleSheet, View, TextInput, ScrollView } from 'react-native';
import { Button, Header, Text } from 'react-native-elements';

const RaisedButton = (props) => <Button raised {...props} />;

const ParameterElemet = (props) => {
  return (
    <View style={styles.inputElement}>
      <Text style={styles.inputElementLabel}>{props.label}</Text>
      <Button style={styles.inputElementButtons} title='<'/>
      <TextInput style={styles.inputElementInput} defaultValue="20" />
      <Button style={styles.inputElementButtons} title='>'/>
    </View>
    );
  }

export default function AbbildungScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Header
          centerComponent={{ text: 'ABBILDUNG', style: { color: '#fff' } }}
          />
        <ScrollView style={{width: '100%'}}>
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>THREE.JS-View mit Simulation</Text>
          </View>
          <Text style={{flex: 1}}>Rechenergebnisse</Text>

          <ParameterElemet label='Brennweite'/>
          <ParameterElemet label='Brennweite'/>
          <ParameterElemet label='Brennweite'/>
          <ParameterElemet label='Brennweite'/>

        </ScrollView>
      </View>
    );
  }

  const styles = StyleSheet.create({
    placeholder: {
      backgroundColor: '#AAA',
      height: 200,
      justifyContent: 'center',
      alignItems: 'center'
    },
    placeholderText: {
      color: 'blue',
      fontSize: 20,
    },

    inputElement: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: 'center',
      paddingHorizontal: 20
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


    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 16,
    },
    title: {
      textAlign: 'center',
      marginVertical: 8,
    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
  });
