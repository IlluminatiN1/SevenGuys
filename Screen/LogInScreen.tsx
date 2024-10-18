import React, { useState } from "react";
import { Text, View, StyleSheet, Pressable, Alert } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { validatePassword } from "../utils/validations/PasswordValidator";
import { validateUsername } from "../utils/validations/UsernameValidator";

export default function LogInScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const usernameValidationMessage = validateUsername(username);
    if (usernameValidationMessage !== 'Username is valid') {
      Alert.alert("Validation Error", usernameValidationMessage);
      return;
    }
    const validationMessage = validatePassword(password);
    if (validationMessage !== 'Password is valid') {
      Alert.alert("Validation Error", validationMessage);
      return;
    }

    // TODO: Bör fungera med rätt action och reducer?
    /*    
    dispatch(loginUser({ username, password }))
      .unwrap()
      .then((result) => {
        Alert.alert("Success", `Welcome ${result.username}`);
      })
      .catch((error) => {
        Alert.alert("Error", error);
      });
    */
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Användarnamn</Text>
        <TextInput
          style={styles.input}
          placeholder="Användarnamn"
          value={username}
          onChangeText={setUsername}
          outlineColor="transparent"
          activeOutlineColor="transparent"
          mode="outlined"
          theme={{ roundness: 20 }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Lösenord</Text>
        <TextInput
          placeholder="Lösenord"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          right={<TextInput.Icon icon="eye" />}
          outlineColor="transparent"
          activeOutlineColor="transparent"
          mode="outlined"
          theme={{ roundness: 20 }}
        />
      </View>

      <View>
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => {
            handleLogin();
            console.log("Login button pressed");
            console.log("username: " + username);
          }}
        >
          Logga in
        </Button>
      </View>

      <View style={styles.textContainer}>
        <Text style={{ paddingLeft: 5, color: "gray" }}>Har du inget konto?</Text>
        <Pressable onPress={() => console.log("Navigating to sign up screen 'RegisterUserScreen.tsx'")}>
          <Text style={styles.linkText}>Registrera dig</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  inputContainer: {
    width: "90%",
    marginBottom: 16,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  input: {
    width: "100%",
    marginBottom: 16,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
  },
  button: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 20,
  },
  label: {
    paddingLeft: 8,
    marginBottom: 4,
    fontSize: 16,
    textAlign: "left",
  },
  linkText: {
    color: "#1E90FF", // DodgerBlue
    textDecorationLine: "underline",
  },
});