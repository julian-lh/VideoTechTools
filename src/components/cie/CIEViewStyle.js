import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({

  canvas: {
    zIndex: 0,
    flex: 1,
    minWidth: 20,
    minHeight: 20
  },
  VideoStandardAlertContainer: {
    position: 'absolute',
    zIndex: 1,
    top: 5,
    left:0,
    right: 0,
    padding: 10
  },
  GamutLabelsContainer: {
    position: 'absolute',
    zIndex: 1,
    bottom: 30,
    padding: 10
  },
  SignalDescriptionContainer: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0
  }


});


export {styles};