import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    outerContainer: {
      flex: 1,
      zIndex: 0
    },
    rowContainer: {
      flex: 1,
      flexDirection: "row",
      zIndex: 0
    },
    columnElement: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 0
    },
    label: {
      fontSize: 10,
    }

});

export {styles};