import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    canvas: {
        zIndex: 0,
        flex: 1,
        minWidth: 20,
        minHeight: 20,
        backgroundColor: '#eee'
    },
    VideoStandardAlertContainer: {
        position: 'absolute',
        zIndex: 1,
        top: 5,
        left:0,
        right: 0,
        padding: 10
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
    

});

export {styles};