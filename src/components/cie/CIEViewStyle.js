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
  },

  settingsElementContainer: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center"
  },

  overlaysContainer: {
    position: 'absolute',
    zIndex: 1,
    top: 10,
    right:10,
    minWidth: 70,
    minHeight: 80,
    justifyContent: "flex-start",
    alignItems: "flex-end"
  },


  perspectiveButtonsContainer: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: 'space-around'
  }

});


export {styles};