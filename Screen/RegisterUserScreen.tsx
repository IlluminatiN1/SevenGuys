import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { RootStackParamList } from "../Navigator/RootStackNavigator";
import { registerUserStyle } from "../Style/registerUserStyle";
import { validatePassword } from "../utils/validations/PasswordValidator";
import { validateUsername } from "../utils/validations/UsernameValidator";

type Props = NativeStackScreenProps<RootStackParamList, "RegisterUser">;

export default function SignUpScreen(props: Props) {
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

    props.navigation.navigate("Profile");
  };
  //const dispatch = useAppDispatch(); // ska jag använda appdispatch eller ha en useRegisterDispatch?

  //const handleSignUp = async () => {
  //dispatch(signUpUser({username, password}));
  //};
  return (
    <View style={registerUserStyle.container}>
      <Text style={registerUserStyle.title}>Registrera Användare</Text>

      <TextInput
        mode="outlined"
        label="Ange användarnamn"
        placeholder="Användarnamn"
        value={username}
        onChangeText={setUsername}
        style={registerUserStyle.inputField}
        outlineColor="#A9A9A9"
        activeOutlineColor="#5856D6"
      />

      <TextInput
        mode="outlined"
        label="Ange lösenord"
        placeholder="Lösenord"
        outlineColor="#A9A9A9"
        activeOutlineColor="#5856D6"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!isPasswordVisible}
        right={
          <TextInput.Icon
            icon={isPasswordVisible ? "eye-off" : "eye"}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            
          />
        }
        style={registerUserStyle.inputField}
      />
      <Button
        mode="contained"
        icon="arrow-right"
        style={registerUserStyle.button}
        onPress={handleRegisterUser} 
      >
        Registrera konto
      </Button>

      <View style={registerUserStyle.footer}>
        <Text>Har du redan ett konto?</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
          <Text style={registerUserStyle.link}>Logga in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
