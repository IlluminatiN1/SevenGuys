import { StyleSheet } from "react-native";

export const registerUserStyles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "white",
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 30,
    },

    inputField: {
        width: "100%",
        marginBottom: 15,
    },

    button: {
        width: "100%",
        paddingVertical: 5,
    },

    footer: {
        flexDirection: "row",
        marginTop: 20,
    },

    link: {
        color: "blue",
        marginLeft: 5,
    },

});