import { StyleSheet } from "react-native";

export const BasicStyles = StyleSheet.create ({
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
        backgroundColor: "#5856D6"
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

export const ChoreStyles = StyleSheet.create ({
    container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
},
choreDescriptionField: {
    width: "100%",
    height: 160,
},
chip: {
    borderColor: "#A9A9A9"
}
});