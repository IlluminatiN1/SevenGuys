import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function SignUpScreen() {
  //const [username, setUsername] = useState("");
  //const [password, setPassword] = useState("");
  //const dispatch = useAppDispatch(); // ska jag använda appdispatch eller ha en useRegisterDispatch?

  //const handleSignUp = async () => {
  //dispatch(signUpUser({username, password}));
  //};
  return (
    <View>
      <Text>Registrera Användare</Text>

      <TextInput
        mode="outlined"
        label="Ange användarnamn"
        placeholder="Användarnamn"
      />

      <TextInput
        mode="outlined"
        label="Ange lösenord"
        placeholder="Lösenord"
        secureTextEntry
      />

      <Button mode="contained" icon="arrow-right">
        Registrera konto
      </Button>

      <View>
        <Text>Har du redan ett konto?</Text>
        <TouchableOpacity>
          <Text>Logga in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
