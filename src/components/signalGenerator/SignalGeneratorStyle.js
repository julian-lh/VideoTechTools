import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorPicker: {
      flex: 1,
      backgroundColor: '#ddd',
      maxHeight: 150
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
    },
    inputElementButtons: {
      padding: 5,
      width: 40
    },
    inputElementSlider:{
      flex: 1,
      width: 200
    },
    inputElementSliderThumb:{
      width: 20,
      height: 20
    },
});



export {styles};