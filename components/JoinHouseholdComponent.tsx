import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Button, IconButton, Modal, TextInput } from "react-native-paper";
import { emojis, mockedMembers } from "../data/data";
import { useAppDispatch } from "../store/hooks";
import { updateMemberEmoji } from "../store/member/memberActions";

const activeEmojis = emojis.length > 0 ? emojis : [];

const JoinHouseholdPopup = ({
  visible,
  hideModal,
  selectedEmoji,
  setSelectedEmoji,
}: {
  visible: boolean;
  hideModal: () => void;
  selectedEmoji: number | null;
  setSelectedEmoji: (emojiId: number | null) => void;
}) => {
  const dispatch = useAppDispatch();
  //const members = useAppSelector((state: RootState) => state.members.members);
  const members = mockedMembers;
  
  const handleJoinHousehold = () => {
    const member = members.find((member) => member.userId === 1); // Mockad användar-ID som sträng
    console.log("Fetched member: ", member); // För att debugga ifall koden hämtar mockad member.
    if (!member) {
      Alert.alert("Error", "Member not found");
      return;
    }
    
    

    if (selectedEmoji === null) {
      Alert.alert("Validation Error", "Please select an emoji");
      return;
    }

    dispatch(updateMemberEmoji({ memberId: member.id, emojiId: selectedEmoji }))
      .unwrap()
      .then(() => {
        Alert.alert("Success", "Joined household and emoji updated successfully");
        console.log("Joined household and emoji updated successfully");
        console.log("Selected emoji: ", selectedEmoji + "for member: ", member.id);
        hideModal();
      })
      .catch((error) => {
        Alert.alert("Error", error.message || "An error occurred");
      });
  };

  const handleEmojiSelect = (emojiId: number) => {
    setSelectedEmoji(emojiId);
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
      <View style={s.contentContainer}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          Ange hushållets kod
        </Text>
        <TextInput
          label="Kod"
          mode="outlined"
          activeOutlineColor="black"
          style={s.inputField}
        />
      </View>
      <View style={s.contentContainer}>
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
              onPress={() => handleEmojiSelect(emoji.id)}
            />
          ))}
        </View>
      </View>
      <View>
        <Button
          mode="contained"
          onPress={handleJoinHousehold}>
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
