import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Checkbox, Text, TextInput } from "react-native-paper";
// Importera vår valideringsfunktion här för hushållsnamn (kommer implementeras senare)
// import { validateHouseholdName } from "../utils/validations/household/HouseholdNameValidator";

interface Chore {
  name: string;
  checked: boolean;
}

// Håprdkodad lista av sysslor som användaren kan välja mellan
// Vi kan ändra det sen när vi har en backend(?)
export default function CreateHouseholdScreen() {
  
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
