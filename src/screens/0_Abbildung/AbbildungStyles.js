import { StyleSheet} from 'react-native';

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

  export {styles};