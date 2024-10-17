import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

const HouseholdButton = ({ title }: { title: string }) => (
  <Button
    style={{
      width: "100%",
      marginBottom: 10,
      borderRadius: 20,
      borderColor: "grey",
      borderWidth: 1,
      backgroundColor: "white",
    }}
    icon="home"
    mode="text"
    textColor="black"
    onPress={() => console.log({ title })}
  >
    {title}
  </Button>
);

export default function ProfileScreen() {
  return (
    <View>
      <View style={styles.userContainer}>
        <Text style={{ fontSize: 12 }}>Användarnamn</Text>
        <Text style={{ fontWeight: "bold", fontSize: 17 }}>SevenGuys</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <HouseholdButton title="Hushåll 1" />
        <HouseholdButton title="Hushåll 2" />
        <HouseholdButton title="Hushåll 3" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screencontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "grey",
  },
  userContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginLeft: 10,
    padding: 10,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
    width: "30%",
    backgroundColor: "white",
  },
  buttonsContainer: {
    marginTop: 20,
    width: "80%",
  },
});
