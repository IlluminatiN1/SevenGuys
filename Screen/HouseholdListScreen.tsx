import { StyleSheet, Text, View } from "react-native";
import { mockedHouseholds } from "../data/data";
import { useAppSelector } from "../store/hooks";

export default function HouseholdListScreen() {
  //Detta kommer användas för att uppdatera statet om man lägger till househould
  const households = useAppSelector((state) => state.households); //EJ KLAR
  return (
    <View style={s.root}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {mockedHouseholds.map((household) => (
          <View key={household.id} style={s.item}>
            <Text style={{ flex: 1 }}>{household.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
  },
});
