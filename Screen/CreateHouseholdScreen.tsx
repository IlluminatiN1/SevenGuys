import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Checkbox, Text, TextInput } from "react-native-paper";
// Importera vår valideringsfunktion här för hushållsnamn (kommer implementeras senare)
// import { validateHouseholdName } from "../utils/validations/household/HouseholdNameValidator";

interface Chore {
  name: string;
  checked: boolean;
}

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

  const toggleChore = (index: number) => {
    setChores(
      chores.map((chore, i) =>
        i === index ? { ...chore, checked: !chore.checked } : chore
      )
    );
  };

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
        <TouchableOpacity key={index} onPress={() => toggleChore(index)}>
          <Text>{chore.name}</Text>
          <View>
            <Checkbox
              status={chore.checked ? "checked" : "unchecked"}
              onPress={() => toggleChore(index)}
            />
          </View>
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