import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
// Importera vår valideringsfunktion här för hushållsnamn (kommer implementeras senare)
// import { validateHouseholdName } from "../utils/validations/household/HouseholdNameValidator";

interface Chore {
  name: string;
}

export default function CreateHouseholdScreen() {
  const [householdName, setHouseholdName] = useState<string>("");
  const [chores, setChores] = useState<Chore[]>([
    { name: "Laga mat 🍳" },
    { name: "Damma 🧹" },
    { name: "Diska 🍽️" },
    { name: "Ta hand om My 🐱" },
    { name: "Torka golvet 🧼" },
    { name: "Vattna blommor 🌸" },
  ]);

  return (
    <View style={s.container}>
      <Text>Ange Hushållsnamn:</Text>
      <TextInput
        label="Hushållsnamn"
        value={householdName}
        onChangeText={setHouseholdName}
      />

      <Text>Sysslor:</Text>
      {chores.map((chore, index) => (
        <TouchableOpacity key={index}>
          <Text>{chore.name}</Text>
        </TouchableOpacity>
      ))}

      <Button>Spara</Button>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
});
