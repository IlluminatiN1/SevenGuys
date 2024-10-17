import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { registerUserStyles } from "../styles";

export default function SignUpScreen() {
  //const [username, setUsername] = useState("");
  //const [password, setPassword] = useState("");
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
        style={registerUserStyles.inputField}
      />

      <TextInput
        mode="outlined"
        label="Ange lösenord"
        placeholder="Lösenord"
        secureTextEntry
        style={registerUserStyles.inputField}
      />

      <Button
        mode="contained"
        icon="arrow-right"
        style={registerUserStyles.button} //Todo lägg till onPress navigation
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
