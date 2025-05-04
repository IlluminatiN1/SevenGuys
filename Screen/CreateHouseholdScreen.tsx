import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { getAuth } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { RootStackParamList } from "../Navigator/RootStackNavigator";
import { Emoji } from "../data/data";
import { fetchEmoji } from "../utils/emoji";
import { useAppDispatch } from "../store/hooks";
import { createHousehold } from "../store/household/houseHoldActions";
// Importera vår valideringsfunktion här för hushållsnamn (kommer implementeras senare)
// import { validateHouseholdName } from "../utils/validations/household/HouseholdNameValidator";
type Props = NativeStackScreenProps<RootStackParamList, "CreateHousehold">;

interface Task {
  name: string;
  checked: boolean;
}

export default function CreateHouseholdScreen(props: Props) {
  const [householdName, setHouseholdName] = useState<string>("");
  const [selectedEmoji, setSelectedEmoji] = useState<string>();
  const [emojis, setEmojis] = useState<Emoji[]>([]);

  const dispatch = useAppDispatch();
  const auth = getAuth();

  useEffect(() => {
    const loadEmojis = async () => {
      const emoji = await fetchEmoji();
      setEmojis(emoji);
    };
    loadEmojis();
  }, []);

  // Toggle-funktion för att ändra checked-statusen på en syssla

  // const toggleChore = (index: number) => {
  //   setChores(
  //     chores.map((chore, i) =>
  //       i === index ? { ...chore, checked: !chore.checked } : chore
  //     )
  //   );
  // };

  // Dispatch-funktion för att skapa hushållet
  const handleCreateHousehold = () => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      Alert.alert("Error", "User not authenticated");
      return;
    }

    if (!householdName.trim()) {
      Alert.alert("Validation Error", "Household name cannot be empty");
      return;
    }

    const newHouseholdPayload = {
      name: householdName,
      userId: currentUser.uid,
      emojiId: selectedEmoji!,
    };

    if (!selectedEmoji) {
      Alert.alert("Validation Error", "You must select an avatar emoji");
      return;
    }

    dispatch(createHousehold(newHouseholdPayload))
      .unwrap()
      .then(() => {
        Alert.alert(
          "Success",
          "Household created and linked to user successfully 🎉"
        );
        props.navigation.navigate("Profile");
      })

      .catch((error) => {
        Alert.alert("Error", error.message || "An error occurred");
      });
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
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>Välj avatar</Text>
      <View style={s.emojiContainer}>
        {emojis.map((emoji, index) => (
          <MaterialCommunityIcons
            key={index}
            name={emoji.name as keyof typeof MaterialCommunityIcons.glyphMap}
            size={30}
            color={emoji.color}
            style={[
              s.emojiIcon,
              selectedEmoji === emoji.id && s.selectedEmojiIcon,
            ]}
            onPress={() => setSelectedEmoji(emoji.id)}
          />
        ))}
      </View>

      {/* <Text variant="titleMedium">Sysslor:</Text>
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
      ))} */}

      {/* Icke-funktionell Spara-knapp (coming soon [fixa i nästa issue?]) */}
      {/* Glöm också inte lägga till validering här för hushållsnamn */}
      <Button
        mode="contained"
        onPress={handleCreateHousehold}
        style={s.saveButton}
      >
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
  emojiContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
  },
  emojiIcon: {
    margin: 5,
  },
  selectedEmojiIcon: {
    borderWidth: 2,
    borderColor: "blue",
    paddingLeft: 5,
    paddingTop: 5,
    borderRadius: 15,
  },
});
