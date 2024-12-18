import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { RootStackParamList } from "../Navigator/RootStackNavigator";
import { useAppDispatch } from "../store/hooks";
import { signUpUser } from "../store/user/userActions";
import { registerUserStyle } from "../Style/registerUserStyle";
import { validateEmail } from "../utils/user/EmailValidator";
import { validatePassword } from "../utils/user/PasswordValidator";

type Props = NativeStackScreenProps<RootStackParamList, "RegisterUser">;

export default function SignUpScreen(props: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useAppDispatch();

  const handleRegisterUser = () => {
    const emailValidationMessage = validateEmail(email);
    if (emailValidationMessage !== "Email is valid") {
      Alert.alert("Validation Error", emailValidationMessage);
      return;
    }

    const validationMessage = validatePassword(password);
    if (validationMessage !== "Password is valid") {
      Alert.alert("Validation Error", validationMessage);
      return;
    }

    if (!username) {
      Alert.alert("Validation Error", "Username cannot be empty.");
      return;
    }
    
    dispatch(signUpUser({ email, password, username }));
  };

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
      />
      <TextInput
        mode="outlined"
        label="Ange e-post"
        placeholder="E-post"
        value={email}
        onChangeText={setEmail}
        style={registerUserStyle.inputField}
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
