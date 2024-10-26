import { StyleSheet } from "react-native";

export const registerUserStyle = StyleSheet.create({
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
    backgroundColor: "white",
    fontSize: 20,
  },

  button: {
    width: "100%",
    paddingVertical: 5,
    backgroundColor: "#5856D6",
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


