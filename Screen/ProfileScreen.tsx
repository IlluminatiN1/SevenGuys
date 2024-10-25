import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IconButton, Surface } from "react-native-paper";
import EditHouseholdModal from "../components/EditHouseholdTitleComponent";
import {
  emojis,
  mockedHouseholds,
  mockedMembers,
  mockedUser,
} from "../data/data";

const activeHouseholds = mockedHouseholds.length > 0 ? mockedHouseholds : [];
const activeUser = mockedUser;
const activeMembers = mockedMembers.filter(
  (member) => member.userId === activeUser.id
);
const activeEmojis = emojis.length > 0 ? emojis : [];

const HouseholdButtons = ({
  title,
  emojiId,
  onTitlePress,
  onEditPress,
}: {
  title: string;
  emojiId: number;
  onTitlePress: () => void;
  onEditPress: () => void;
}) => {
  const emoji = activeEmojis.find((e) => e.id === emojiId) || activeEmojis[8];

  return (
    <View style={styles.householdButtonContainer}>
      <TouchableOpacity onPress={onTitlePress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
      <Surface style={styles.surface}>
        <TouchableOpacity onPress={onEditPress}>
          <View style={styles.iconContainer}>
            <IconButton
              icon="pencil"
              size={30}
              iconColor="black"
              style={styles.iconButton}
            />
            <IconButton
              key={emoji.id}
              icon={emoji.name}
              size={30}
              iconColor={emoji.color}
              style={styles.iconButton}
            />
          </View>
        </TouchableOpacity>
      </Surface>
    </View>
  );
};

const CreateHouseholdButton = () => {
  return (
    <View>
      <IconButton
        icon={"plus"}
        size={15}
        iconColor="white"
        onPress={() => console.log("Create household pressed")}
        mode="outlined"
        style={{ borderColor: "white", borderWidth: 2 }}
      />
    </View>
  );
};

const JoinHouseholdButton = () => {
  return (
    <View>
      <IconButton
        icon={"plus"}
        size={15}
        iconColor="white"
        onPress={() => console.log("Gå med i hushåll pressed")}
        mode="outlined"
        style={{ borderColor: "white", borderWidth: 2 }}
      />
    </View>
  );
};

export default function ProfileScreen() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedHouseholdTitle, setSelectedHouseholdTitle] = useState<any>("");
  const [activeHouseholds, setHouseholdList] = useState(mockedHouseholds);

  const handleEditPress = (householdTitle: any) => {
    setSelectedHouseholdTitle(householdTitle);
    setModalVisible(true);
  };

  const handleSaveTitle = (newTitleInput: string) => {
    if (selectedHouseholdTitle) {
      setHouseholdList((HouseholdTitle) =>
        HouseholdTitle.map((chosenHousehold) =>
          chosenHousehold.id === selectedHouseholdTitle.id
            ? { ...chosenHousehold, name: newTitleInput }
            : chosenHousehold
        )
      );
      console.log(`Ändrad till: ${newTitleInput}`);
      setSelectedHouseholdTitle((selectedTitle: any) => ({
        ...selectedTitle,
        name: newTitleInput,
      }));
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.userContainer}>
        <Text style={{ fontSize: 12 }}>Användarnamn</Text>
        <Text style={{ fontWeight: "bold", fontSize: 17 }}>SevenGuys</Text>
      </View>
      <View style={styles.buttonsContainer}>
        {activeHouseholds.map((household, index) => {
          const member = activeMembers.find(
            (member) => member.houseHoldId === household.id
          );
          return (
            <HouseholdButtons
              key={index}
              title={household.name}
              emojiId={member?.emojiId || 9}
              onTitlePress={() => console.log(`${household.name} pressed`)}
              onEditPress={() => handleEditPress(household)}
            />
          );
        })}
      </View>
      <EditHouseholdModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        title={selectedHouseholdTitle ? selectedHouseholdTitle.name : ""}
        onSave={handleSaveTitle}
      />
      <View style={styles.optionsContainer}>
        <View style={styles.joinOrCreateHouseholdButton}>
          <CreateHouseholdButton />
          <Text style={styles.createHouseholdText}>Skapa hushåll</Text>
        </View>
        <View style={styles.joinOrCreateHouseholdButton}>
          <JoinHouseholdButton />
          <Text style={styles.createHouseholdText}>Gå med i hushåll</Text>
        </View>
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
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
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
  createHouseholdText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  joinOrCreateHouseholdButton: {
    width: "43%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "black",
    backgroundColor: "#5856D6",
  },
  surface: {
    borderRadius: 20,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconButton: {
    marginHorizontal: -1,
  },
});
