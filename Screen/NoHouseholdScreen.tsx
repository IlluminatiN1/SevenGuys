// components/NoHouseholdScreen.tsx
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createMember, updateMemberEmoji } from "../store/member/memberActions";
import { Member, MemberCreate, mockedMembers } from "../data/data";
import { RootState } from "../store/store";
import JoinHouseholdPopup from "../components/JoinHouseholdComponent";
import { setMembers } from "../store/member/memberReducer";

const NoHouseholdScreen = () => {
  const [name, setName] = useState<string>("");
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useAppDispatch();
  const members = useAppSelector((state: RootState) => state.members.members);

  useEffect(() => {
    dispatch(setMembers(mockedMembers));
  }, [dispatch]);

  const handleCreateMember = () => {
    if (!name.trim()) {
      Alert.alert("Validation Error", "Name cannot be empty");
      return;
    }

    const newMember: MemberCreate = {
      name,
      emojiId: selectedEmoji || "0",
      isOwner: false,
      householdId: 1,
      userId: 1,
      isRequest: false,
    };

    dispatch(createMember(newMember))
      .unwrap()
      .then(() => {
        Alert.alert("Success", "Member created successfully");
      })
      .catch((error) => {
        Alert.alert("Error", error.message || "An error occurred");
      });
  };

  const handleSelectEmoji = (emoji: number) => {
    const member = members.find((member) => member.userId === 1); // Mockad användar-ID som sträng
    if (!member) {
      Alert.alert("Error", "Member not found");
      return;
    }

    setSelectedEmoji(emoji);
    dispatch(updateMemberEmoji({ memberId: member.id, emojiId: emoji }))
      .unwrap()
      .then(() => {
        Alert.alert("Success", "Emoji updated successfully");
      })
      .catch((error) => {
        Alert.alert("Error", error.message || "An error occurred");
      });
  };

  const showModal = () => {
    setSelectedEmoji(null); // Nollställ vald ikon
    setModalVisible(true);
  };

  const hideModal = () => setModalVisible(false);

  return (
    <View>
      <Text>Create Member:</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 20,
          paddingHorizontal: 10,
        }}
      />
      <Button title="Create Member" onPress={handleCreateMember} />
      <Button title="Select Emoji" onPress={showModal} />
      <Text>Selected Emoji: {selectedEmoji}</Text>
      <Text>Household Members:</Text>
      {members.map((member) => (
        <View
          key={member.id}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Text>{member.name}</Text>
          <Text>{member.emojiId}</Text>
        </View>
      ))}
      <JoinHouseholdPopup
        visible={isModalVisible}
        hideModal={hideModal}
        selectedEmoji={selectedEmoji}
        setSelectedEmoji={setSelectedEmoji}
      />
    </View>
  );
};

export default NoHouseholdScreen;
