import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Provider as PaperProvider, Portal } from "react-native-paper";
import JoinHouseholdPopup from "../components/JoinHouseholdComponent";
import { useAppSelector } from "../store/hooks";
import CreateHouseholdScreen from "./CreateHouseholdScreen";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../Navigator/RootStackNavigator";

export default function NoHouseholdScreen() {
  // Detta kommer användas för att uppdatera statet om man lägger till hushåll
  const households = useAppSelector((state) => state.households); // EJ KLAR

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // State för att hantera modalens synlighet
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<number | null>(null);

  const showModal = () => {
    setSelectedEmoji(null); // Nollställ vald ikon
    setModalVisible(true);
  };

  const hideModal = () => setModalVisible(false);

  return (
    <PaperProvider>
      <View style={s.container}>
        <Text style={s.noActiveHouseholdsTextTitle}>
          Du har inget hushåll att visa
        </Text>
        <Text style={s.householdScreenText}>
          Tryck på "Lägg till" för att skapa ett nytt hushåll, eller välj "Gå
          med i hushåll" för att ansluta dig till ett befintligt hushåll.
        </Text>
        <View style={s.buttons}>
          <Button
            icon="plus-circle-outline"
            mode="contained"
            onPress={() => {
              navigation.navigate("CreateHousehold");
            }}
          >
            Lägg till
          </Button>
          <Button icon="home-plus" mode="contained" onPress={showModal}>
            Gå med i hushåll
          </Button>
        </View>
        <Portal>
          <JoinHouseholdPopup
            visible={isModalVisible}
            hideModal={hideModal}
            selectedEmoji={selectedEmoji}
            setSelectedEmoji={setSelectedEmoji}
          />
        </Portal>
      </View>
    </PaperProvider>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 20,
    borderRadius: 20,
  },
  noActiveHouseholdsTextTitle: {
    paddingTop: 250,
    fontSize: 23,
    color: "#888",
    textAlign: "center",
  },
  householdScreenText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
