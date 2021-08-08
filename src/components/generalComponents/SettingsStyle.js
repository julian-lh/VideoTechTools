import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    elementContainer: {
        flex: 1,
        backgroundColor: "#ddd",
        padding: 5,
        margin: 2.5
    },
    elementButtonContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: "center"
    },


    shadow: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: "#3338",
        position: "absolute",
        zIndex: 2,
        alignItems: "center"
    },
    settingsView: {
        width: "80%",
        //height: "95%",
        backgroundColor: "#ccc",
        padding: 5,
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    title: {
        flex: 1,
        fontSize: 20,
        color: "#333",
        padding: 10
    },
    scrollView: {
        width: "100%",
        marginBottom: 5
    }
});

export {styles};