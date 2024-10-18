import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import { mockedHouseholds } from "../data/data";
import { useAppSelector } from "../store/hooks";

export default function HouseholdListScreen() {
  // Detta kommer användas för att uppdatera statet om man lägger till hushåll
  const households = useAppSelector((state) => state.households); // EJ KLAR

  const activeHouseholds = mockedHouseholds.length > 0 ? mockedHouseholds : [];

  return (
    <ScrollView>
      <View style={s.container}>
        <View style={s.list}>
          {activeHouseholds.length > 0 ? (
            <>
              {activeHouseholds.map((household) => (
                <TouchableOpacity
                  style={s.item}
                  key={household.id}
                  onPress={() => {
                    console.log(household.name);
                  }}
                >
                  <Text>{household.name}</Text>
                </TouchableOpacity>
              ))}
              <Text style={s.householdScreenText}>
                Du kan alltid trycka på "Lägg till" för att skapa ett nytt
                hushåll, eller "Gå med i hushåll" för att ansluta dig till ett
                befintligt hushåll.
              </Text>
            </>
          ) : (
            <View style={s.noActiveHouseholdsContainer}>
              <Text style={s.noActiveHouseholdsTextTitle}>
                Du har inget hushåll att visa
              </Text>
              <Text style={s.householdScreenText}>
                Tryck på "Lägg till" för att skapa ett nytt hushåll, eller välj
                "Gå med i hushåll" för att ansluta dig till ett befintligt
                hushåll.
              </Text>
            </View>
          )}
        </View>
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
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },

  list: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },

  item: {
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#aaa",
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 20,
    borderRadius: 20,
  },

  noActiveHouseholdsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
