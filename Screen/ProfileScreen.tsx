import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, IconButton, Portal, Surface } from "react-native-paper";
import { RootStackParamList } from "../Navigator/RootStackNavigator";
import EditHouseholdModal from "../components/EditHouseholdTitleComponent";
import JoinHouseholdPopup from "../components/JoinHouseholdComponent";
import { auth } from "../config/firebase";
import { emojis } from "../data/data";
import { useAppDispatch } from "../store/hooks";
import { getHouseholdsByUserId } from "../store/household/houseHoldActions";
import { setCurrentHousehold } from "../store/household/householdSlice";
import { signOutUser, updateUsername } from "../store/user/userActions";

const firestore = getFirestore();

const HouseholdButtons = ({
  title,
  emojiId,
  onTitlePress,
  onEditPress,
  householdId,
}: {
  title: string;
  emojiId: string;
  onTitlePress: () => void;
  onEditPress: () => void;
  householdId: string;
}) => {
  const emoji = emojis.find((e) => e.id === emojiId);
  if (!emoji) return null;

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
  const [isModalVisible, setModalVisible] = useState(false);
  const hideModal = () => setModalVisible(false);

  const showModal = () => {
    setModalVisible(true);
  };
  return (
    <View>
      <Button icon="home-plus" mode="contained" onPress={showModal}>
        Gå med i hushåll
      </Button>
      <Portal>
        <JoinHouseholdPopup visible={isModalVisible} hideModal={hideModal} />
      </Portal>
    </View>
  );
};

export default function ProfileScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedHouseholdTitle, setSelectedHouseholdTitle] = useState<any>("");
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [newUsername, setNewUsername] = useState<string>("");
  const [householdMembers, setHouseholdMembers] = useState<any[]>([]);
  const isFocused = useIsFocused();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUsername = async () => {
      const userId = auth.currentUser?.uid;
      if (userId) {
        const userDocRef = doc(collection(firestore, "user"), userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUsername(userDoc.data()?.username || "Unknown User");
        }
      }
      setLoading(false);
    };
    fetchUsername();
  }, []);

  useEffect(() => {
    const fetchUserHouseholds = async () => {
      const userId = auth.currentUser?.uid;
      if (userId) {
        try {
          const result = await dispatch(
            getHouseholdsByUserId({ userId })
          ).unwrap();
          if (result.households) {
            setHouseholdMembers(result.households);
          }
        } catch (error) {
          console.error("Error fetching households:", error);
        }
      }
    };
    if (isFocused) {
      fetchUserHouseholds();
    }
  }, [dispatch, isFocused]);

  const handleUsernameChange = () => {
    if (newUsername.trim()) {
      dispatch(updateUsername(newUsername))
        .unwrap()
        .then(() => {
          setUsername(newUsername);
          setNewUsername("");
        })
        .catch((error) => console.error("Error updating username:", error));
    }
  };

  const handleEditPress = (householdTitle: any) => {
    setSelectedHouseholdTitle(householdTitle);
    setModalVisible(true);
  };

  const handleSaveTitle = (householdId: string, newHouseholdTitle: string) => {
    setHouseholdMembers((prev) =>
      prev.map((household) =>
        household.id === householdId
          ? { ...household, name: newHouseholdTitle }
          : household
      )
    );
    setModalVisible(false);
  };

  const signingOut = async () => {
    await dispatch(signOutUser()).unwrap();
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.userContainer}>
        <Text style={{ fontSize: 12, alignSelf: "flex-start" }}>
          Användarnamn
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 17 }}>
          {username || "Guest"}
        </Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Skriv in nytt användarnamn"
        value={newUsername}
        onChangeText={setNewUsername}
      />
      <Button mode="contained" onPress={handleUsernameChange}>
        Ändra användarnamn
      </Button>

      <View style={styles.buttonsContainer}>
        {householdMembers.map((household, index) => (
          <HouseholdButtons
            key={household.id || index}
            title={household.name}
            emojiId={household.emojiId || "1"}
            householdId={household.id}
            onTitlePress={() => {
              dispatch(setCurrentHousehold(household));
              navigation.navigate("Household" as never);
            }}
            onEditPress={() => handleEditPress(household)}
          />
        ))}
      </View>
      <EditHouseholdModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        household={selectedHouseholdTitle}
        editHouseholdName={handleSaveTitle}
      />
      <View style={styles.optionsContainer}>
        <View style={styles.buttons}>
          <CreateHouseholdButton />
        </View>
        <View style={styles.buttons}>
          <JoinHouseholdButton />
        </View>
      </View>
      <View style={styles.signOutContainer}>
        <Button
          mode="outlined"
          onPress={signingOut}
          style={styles.signOutButton}
        >
          Logga ut
        </Button>
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
  input: {
    width: "100%",
    padding: 8,
    marginVertical: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
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
  signOutContainer: {
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 16,
  },
  signOutButton: {
    borderColor: "purple",
  },
});
