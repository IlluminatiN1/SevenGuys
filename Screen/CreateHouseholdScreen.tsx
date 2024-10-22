import { useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Checkbox, Text, TextInput } from "react-native-paper";
import { useAppDispatch } from "../store/hooks";
import { getAuth } from "firebase/auth";
import { createHousehold } from "../store/household/houseHoldActions";
// Importera vår valideringsfunktion här för hushållsnamn (kommer implementeras senare)
// import { validateHouseholdName } from "../utils/validations/household/HouseholdNameValidator";

interface Chore {
  name: string;
  checked: boolean;
}

// Håprdkodad lista av sysslor som användaren kan välja mellan
// Vi kan ändra det sen när vi har en backend(?)
export default function CreateHouseholdScreen() {
  const CreateHousehold = () => {
    const [name, setName] = useState("");
    const dispatch = useAppDispatch();
    const auth = getAuth();
  
    const handleCreateHousehold = () => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        Alert.alert("Error", "User not authenticated");
        return;
      }
  
      if (!name.trim()) {
        Alert.alert("Validation Error", "Household name cannot be empty");
        return;
      }
  
      dispatch(createHousehold({ name }))
        .unwrap()
        .then(() => {
          Alert.alert("Success", "Household created successfully");
        })
      };
  };


  // Använd validateHouseholdName("name"); för att kontrollera att namnet på household är längre än 3 tecken.
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Create Household screen</Text>
    </View>
  );
}


  


const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  input: {
    marginBottom: 16,
  },
  choreItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    padding: 8,
    borderWidth: 0.5,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  // Glöm inte ändra stylingen på checkboxen senare 😡
  checkboxContainer: {
    borderWidth: 0.5,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 0.5,
  },
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  saveButton: {
    marginTop: 14,
  },
});
