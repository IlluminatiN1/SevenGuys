import { NavigationProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, IconButton, Portal, Surface } from "react-native-paper";
import { RootStackParamList } from "../Navigator/RootStackNavigator";
import EditHouseholdModal from "../components/EditHouseholdTitleComponent";
import JoinHouseholdPopup from "../components/JoinHouseholdComponent";
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
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View>
      <Button
        icon="plus-circle-outline"
        mode="contained"
        onPress={() => {
          navigation.navigate("CreateHousehold");
        }}
      >
        Skapa Hushåll
      </Button>
    </View>
  );
};

const JoinHouseholdButton = () => {
  // State för att hantera modalens synlighet
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<number | null>(null);
  const hideModal = () => setModalVisible(false);

  const showModal = () => {
    setSelectedEmoji(null); // Nollställ vald ikon
    setModalVisible(true);
  };
  return (
    <View>
      <Button icon="home-plus" mode="contained" onPress={showModal}>
        Gå med i hushåll
      </Button>
      <Portal>
        <JoinHouseholdPopup
          visible={isModalVisible}
          hideModal={hideModal}
          selectedEmoji={selectedEmoji}
          setSelectedEmoji={setSelectedEmoji}
        />
      </Portal>
    </View>
  );
};

export default function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
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
        <Text style={{ fontSize: 12, alignSelf: "flex-start" }}>
          Användarnamn
        </Text>
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
              onTitlePress={()=> {
                navigation.navigate("Household");
              }}
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
        <View style={styles.buttons}>
          <CreateHouseholdButton />
        </View>
        <View style={styles.buttons}>
          <JoinHouseholdButton />
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
    backgroundColor: "white",
    alignSelf: "flex-start",
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
  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 20,
    borderRadius: 20,
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
