import * as React from "react";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { registerUserStyles } from "../styles";
import { validatePassword } from "../utils/validations/PasswordValidator";
import { validateUsername } from "../utils/validations/UsernameValidator";

export default function SignUpScreen() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisterUser = () => {
    const usernameValidationMessage = validateUsername(username);
    if (usernameValidationMessage !== "Username is valid") {
      Alert.alert("Validation Error", usernameValidationMessage);
      return;
    }
    const validationMessage = validatePassword(password);
    if (validationMessage !== "Password is valid") {
      Alert.alert("Validation Error", validationMessage);
      return;
    }
  }
  //const dispatch = useAppDispatch(); // ska jag använda appdispatch eller ha en useRegisterDispatch?

  //const handleSignUp = async () => {
  //dispatch(signUpUser({username, password}));
  //};
  return (
    <View style={registerUserStyles.container}>
      <Text style={registerUserStyles.title}>Registrera Användare</Text>

      <TextInput
        mode="outlined"
        label="Ange användarnamn"
        placeholder="Användarnamn"
        value={username}
        onChangeText={setUsername}
        style={registerUserStyles.inputField}
      />

      <TextInput
        mode="outlined"
        label="Ange lösenord"
        placeholder="Lösenord"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!isPasswordVisible}
        right={
          <TextInput.Icon
            icon={isPasswordVisible ? "eye-off" : "eye"}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          />
        }
        style={registerUserStyles.inputField}
      />
      <Button
        mode="contained"
        icon="arrow-right"
        style={registerUserStyles.button}
        onPress={handleRegisterUser} //Todo lägg till onPress navigation
      >
        Registrera konto
      </Button>

      <View style={registerUserStyles.footer}>
        <Text>Har du redan ett konto?</Text>
        <TouchableOpacity>
          <Text style={registerUserStyles.link}>Logga in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
