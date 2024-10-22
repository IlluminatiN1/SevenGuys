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
  const [householdName, setHouseholdName] = useState<string>("");
  const [chores, setChores] = useState<Chore[]>([
    { name: "Laga mat 🍳", checked: false },
    { name: "Damma 🧹", checked: false },
    { name: "Diska 🍽️", checked: false },
    { name: "Ta hand om My 🐱", checked: false },
    { name: "Torka golvet 🧼", checked: false },
    { name: "Vattna blommor 🌸", checked: false },
  ]);

  // Toggle-funktion för att ändra checked-statusen på en syssla
  const toggleChore = (index: number) => {
    setChores(
      chores.map((chore, i) =>
        i === index ? { ...chore, checked: !chore.checked } : chore
      )
    );
  };

  // Funktion för att spara hushållet i databasen(?) (kommer implementeras senare)
  return (
    <View style={s.container}>
      <Text variant="titleMedium">Ange Hushållsnamn:</Text>
      <TextInput
        label="Namn"
        value={householdName}
        onChangeText={setHouseholdName}
        style={s.input}
      />
      <Text variant="titleMedium">Sysslor:</Text>
      {chores.map((chore, index) => (
        <TouchableOpacity
          key={index}
          style={s.choreItem}
          onPress={() => toggleChore(index)}
        >
          <Text>{chore.name}</Text>
          <View style={s.checkboxContainer}>
            <Checkbox
              status={chore.checked ? "checked" : "unchecked"}
              onPress={() => toggleChore(index)}
            />
          </View>
        </TouchableOpacity>
      ))}

      {/* Icke-funktionell Spara-knapp (coming soon [fixa i nästa issue?]) */}
      {/* Glöm också inte lägga till validering här för hushållsnamn */}
      <Button mode="contained" style={s.saveButton}>
        Spara
      </Button>
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
