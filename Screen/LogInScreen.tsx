import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { RootStackParamList } from "../Navigator/RootStackNavigator";
import { validatePassword } from "../utils/user/PasswordValidator";
import { validateEmail } from "../utils/user/EmailValidator";
import { useAppDispatch } from "../store/hooks";
import { signInUser } from "../store/user/userActions";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen(props: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    const emailValidationMessage = validateEmail(email);
    if (emailValidationMessage !== 'Email is valid') {
      Alert.alert("Validation Error", emailValidationMessage);
      return;
    }
    const validationMessage = validatePassword(password);
    if (validationMessage !== 'Password is valid') {
      Alert.alert("Validation Error", validationMessage);
      return;
    }

    dispatch(signInUser({ email, password }))

    props.navigation.navigate("Profile");

  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
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
          secureTextEntry={!isPasswordVisible}
          right={
            <TextInput.Icon
              icon={isPasswordVisible ? "eye-off" : "eye"}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            />
          }
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
          }}
        >
          Logga in
        </Button>
      </View>

      <View style={styles.textContainer}>
        <Text style={{ paddingLeft: 5, color: "gray" }}>Har du inget konto?</Text>
        <Pressable onPress={() => props.navigation.navigate("RegisterUser")}>
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