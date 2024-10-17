import { Text, View, StyleSheet, Pressable } from "react-native";
import { Button, TextInput } from "react-native-paper";
export default function LogInScreen() {
  return (

    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Användarnamn</Text>
        <TextInput style={styles.input}
        placeholder="Användarnamn"
        outlineColor="transparent"
        activeOutlineColor="transparent"
        mode="outlined"
        theme={{ roundness: 20 }}/>
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Lösenord</Text>
        <TextInput 
          placeholder="Lösenord"
          style={styles.input}
          secureTextEntry
          right={<TextInput.Icon icon="eye" />}
          outlineColor="transparent"
          activeOutlineColor="transparent"
          mode="outlined"
          theme={{ roundness: 20 }}
      />
        <View>
          <Button style={styles.button} mode="contained" onPress={() => console.log("User pressed 'Logga In' in LoginScreen.tsx")}>
            Logga in
          </Button>
        </View>
        

        <View style={styles.textContainer}>
          
          <Text style={{paddingLeft: 5, color: "gray"}}>Har du inget konto?</Text>
          <Pressable onPress={() => console.log("Navigating to sign up screen 'RegisterUserScreen.tsx'")}>
            <Text style={styles.linkText}>Registrera dig</Text>
          </Pressable>
        </View>
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
    padding: 16,
  },
  textContainer: {
    width: "100%",
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
    marginTop: 16,
    width: "100%",
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
    paddingLeft: 5,
    color: "#1E90FF",
    textDecorationLine: "underline",
  },
});