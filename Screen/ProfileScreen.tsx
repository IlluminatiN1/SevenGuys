import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IconButton } from "react-native-paper";

const HouseholdButton = ({
  title,
  icon,
  onTitlePress,
}: {
  title: string;
  icon: string;
  onTitlePress: () => void;
}) => (
  <View style={styles.householdButtonContainer}>
    <TouchableOpacity onPress={onTitlePress} style={styles.pointer}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
    <IconButton
      icon={icon}
      size={20}
      onPress={() => console.log("Avatar button pressed")}
      style={styles.pointer}
      mode="contained-tonal"
    />
  </View>
);

const CreateHousehold = () => {
  return (
    <View>
      <IconButton
        icon={"plus"}
        size={15}
        iconColor="black"
        onPress={() => console.log("Create household pressed")}
        mode="outlined"
        style={{ borderColor: "black", borderWidth: 2 }}
      />
    </View>
  );
};

const JoinHousehold = () => {
  console.log("Join household pressed");
};

export default function ProfileScreen() {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.userContainer}>
        <Text style={{ fontSize: 12 }}>Användarnamn</Text>
        <Text style={{ fontWeight: "bold", fontSize: 17 }}>SevenGuys</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <HouseholdButton
          title="Hushåll 1"
          icon="cat"
          onTitlePress={() => console.log("Hushåll 1 pressed")}
        />
        <HouseholdButton
          title="Hushåll 2"
          icon="unicorn"
          onTitlePress={() => console.log("Hushåll 2 pressed")}
        />
        <HouseholdButton
          title="Hushåll 3"
          icon="cow"
          onTitlePress={() => console.log("Hushåll 3 pressed")}
        />
      </View>
      <View style={styles.optionsContainer}>
        <CreateHousehold />
        <Text style={styles.buttonText}>Skapa hushåll</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    padding: 10,
  },
  userContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
    width: "30%",
    backgroundColor: "white",
  },
  buttonsContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "stretch",
  },
  optionsContainer: {
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "yellow",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 30,
  },
  householdButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    borderColor: "grey",
    borderWidth: 1,
    backgroundColor: "white",
    height: 50,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  pointer: {
    cursor: "pointer",
  },
});
