import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { RootStackParamList } from "../Navigator/RootStackNavigator";
import { registerUserStyles } from "../styles";
import { validatePassword } from "../utils/validations/PasswordValidator";
import { validateUsername } from "../utils/validations/UsernameValidator";
import { AppDispatch } from "../store/store";
import { signUpUser } from "../store/user/userActions";
import { useAppDispatch } from "../store/hooks";

type Props = NativeStackScreenProps<RootStackParamList, "RegisterUser">;

export default function SignUpScreen(props: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  //För att slippa fylla i användaruppgifterna hela tiden':
  //dispatch(signUpUser({ username: "Admin3", password: "Admin12!" }))

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
    console.log("Registering user with username:", username);
    dispatch(signUpUser({ username, password }))
    
      .unwrap()
      .then((user) => {
        Alert.alert("Success", `User ${username} registered successfully`);
        props.navigation.navigate("Profile");
      })
      .catch((error) => {
        Alert.alert("Error", error);
      });
  };

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
        onPress={handleRegisterUser}
      >
        Registrera konto
      </Button>

      <View style={registerUserStyles.footer}>
        <Text>Har du redan ett konto?</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
          <Text style={registerUserStyles.link}>Logga in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}