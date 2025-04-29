import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  arrayUnion,
  collection,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Button, IconButton, Modal, TextInput } from "react-native-paper";
import { auth } from "../config/firebase";
import { emojis, mockedMembers } from "../data/data";
import { useAppDispatch } from "../store/hooks";
import { updateMemberEmoji } from "../store/member/memberActions";

const firestore = getFirestore();
const activeEmojis = emojis.length > 0 ? emojis : [];

const JoinHouseholdPopup = ({
  visible,
  hideModal,
}: {
  visible: boolean;
  hideModal: () => void;
}) => {
  const [selectedEmoji, setSelectedEmoji] = useState<string>();
  const [householdCode, setHouseholdCode] = useState<string>("");
  const [memberName, setMemberName] = useState<string>("");
  const dispatch = useAppDispatch();
  const members = mockedMembers;

  const handleGetHousehold = async () => {
    try {
      // Hämta hushållet från Firebase med hjälp av koden
      console.log("Household Code:", householdCode);
      const q = query(
        collection(firestore, "households"),
        where("code", "==", householdCode)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        Alert.alert("Error", "Household not found");
        return;
      }

      querySnapshot.forEach((doc) => {
        const householdData = doc.data();
        console.log("Fetched household data: ", householdData);
      });
    } catch (error) {
      console.error("Error fetching household:", error);
      Alert.alert("Error", "An error occurred while fetching the household");
    }
  };

  const handleJoinHousehold = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      Alert.alert("Error", "User not authenticated");
      return;
    }

    const q = query(
      collection(firestore, "households"),
      where("code", "==", householdCode)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      Alert.alert("Error", "Household not found");
      return;
    }

    let householdData;
    let householdDocRef;

    querySnapshot.forEach((doc) => {
      householdData = doc.data();
      householdDocRef = doc.ref;
    });

    if (!householdData || !householdDocRef) {
      Alert.alert("Error", "Household data is empty");
      return;
    }

    const isEmojiTaken = householdData.members.some(
      (member: any) => member.emojiId === selectedEmoji
    );

    if (isEmojiTaken) {
      Alert.alert("Error", "Emoji is already taken in this household");
      return;
    }

    const newMember = {
      id: userId,
      name: memberName,
      emojiId: selectedEmoji,
      householdId: householdDocRef.id,
      userId: userId,
      isOwner: false,
      isRequest: false,
    };

    try {
      await updateDoc(householdDocRef, {
        members: arrayUnion(newMember),
      });
      console.log("Successfully added member to household!");
    } catch (e) {
      console.error("Failed to update household:", e);
      Alert.alert("Error", "Failed to join household");
      return;
    }

    if (userId && selectedEmoji) {
      dispatch(updateMemberEmoji({ memberId: userId, emojiId: selectedEmoji }))
        .unwrap()
        .then(() => {
          Alert.alert(
            "Success",
            "Joined household and emoji updated successfully"
          );
          console.log("Joined household and emoji updated successfully");
          console.log(
            "Selected emoji: ",
            selectedEmoji + " for member: ",
            userId
          );
          hideModal();
        })
        .catch((error) => {
          Alert.alert("Error", error.message || "An error occurred");
        });
    } else {
      Alert.alert("Error", "User ID or Emoji is missing");
    }
  };

  return (
    <Modal
      visible={visible}
      contentContainerStyle={s.containerStyle}
      dismissable={false}
    >
      <IconButton
        icon={"close"}
        size={20}
        iconColor="black"
        onPress={hideModal}
        style={s.closeButton}
      />

      {/* Hushållet */}
      <View style={s.contentContainer}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          Ange hushållets kod
        </Text>
        <TextInput
          label="Kod"
          mode="outlined"
          activeOutlineColor="black"
          style={s.inputField}
          value={householdCode} // Bind state-variabeln till TextInput
          onChangeText={setHouseholdCode} // Uppdatera state-variabeln när användaren skriver in koden
        />
        <Button mode="contained" onPress={handleGetHousehold}>
          Hämta hushåll
        </Button>
      </View>

      {/* Medlem */}
      <View style={s.contentContainer}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>Ange ditt namn</Text>
        <TextInput
          label="Namn"
          mode="outlined"
          activeOutlineColor="black"
          style={s.inputField}
          value={memberName} // Bind state-variabeln till TextInput
          onChangeText={setMemberName} // Uppdatera state-variabeln när användaren skriver in namnet
        />
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>Välj avatar</Text>
        <View style={s.emojiContainer}>
          {activeEmojis.map((emoji, index) => (
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
      </View>
      <View>
        <Button mode="contained" onPress={handleJoinHousehold}>
          Gå med i hushåll
        </Button>
      </View>
    </Modal>
  );
};

const s = StyleSheet.create({
  containerStyle: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 20,
  },
  closeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 1,
  },
  contentContainer: {
    marginTop: 20,
  },
  inputField: {
    backgroundColor: "transparent",
    height: 40,
    color: "black",
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

export default JoinHouseholdPopup;
