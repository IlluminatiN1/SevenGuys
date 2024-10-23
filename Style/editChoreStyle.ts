import { StyleSheet } from "react-native";


export const ChoreStyles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      padding: 20,
      backgroundColor: "white",
    },

    inputField: {
        width: "100%",
        marginBottom: 15,
        backgroundColor: "white",
        fontSize: 20,
      },
  
    choreDescriptionField: {
      width: "100%",
      height: 160,
      backgroundColor: "white",
      fontSize: 20,
    },
  
    selectedDayStyle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "white",
    },
  
    selectedDayButton: {
      paddingVertical: 3,
      paddingHorizontal: 11,
      borderWidth: 1,
      borderColor: "#A9A9A9",
      borderRadius: 50,
      backgroundColor: "red",
    },
  
    recurringContainer: {
      borderWidth: 1,
      width: "100%",
      borderColor: "#A9A9A9",
      borderRadius: 10,
      padding: 15,
      marginTop: 20,
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
  
    keepRowRight: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    keepRowLeft: {
      textAlign: "left",
      alignSelf: "flex-start",
    },
  
    recurringTitle: {
      fontSize: 20,
      fontWeight: "bold",
    },
  
    text: {
      marginHorizontal: 10,
      fontSize: 18,
      fontWeight: "bold",
    },
  
    dialogButton: {
      height: 40,
      width: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 0.5,
      borderColor: "#A9A9A9",
      marginHorizontal: 8,
      backgroundColor: "white",
    },
  
    dialogContent: {
      marginTop: 3,
    },
  
    selectedDayPressable: {
      backgroundColor: "red",
      borderColor: "#A9A9A9",
    },
  
    scrollViewStyle: {
      paddingVertical: 20,
      paddingHorizontal: 10,
    },
  });