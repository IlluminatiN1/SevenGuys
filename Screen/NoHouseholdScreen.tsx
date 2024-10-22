import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useAppSelector } from "../store/hooks";

export default function NoHouseholdScreen() {
  // Detta kommer användas för att uppdatera statet om man lägger till hushåll
  const households = useAppSelector((state) => state.households); // EJ KLAR

  return (
    <View>
      <Text style={s.noActiveHouseholdsTextTitle}>
        Du har inget hushåll att visa
      </Text>
      <Text style={s.householdScreenText}>
        Tryck på "Lägg till" för att skapa ett nytt hushåll, eller välj "Gå med
        i hushåll" för att ansluta dig till ett befintligt hushåll.
      </Text>
      <View style={s.buttons}>
        <Button
          icon="plus-circle-outline"
          mode="contained"
          onPress={() => {
            console.log("Lägg till");
          }}
        >
          Lägg till
        </Button>
        <Button
          icon="home-plus"
          mode="contained"
          onPress={() => {
            console.log("Gå med i hushåll");
          }}
        >
          Gå med i hushåll
        </Button>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
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
    fontSize: 18,
    lineHeight: 30,
    color: "#888",
    textAlign: "center",
    marginTop: 10,
  },
});
