import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import { RootStackParamList } from "../Navigator/RootStackNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "EditChore">;

export default function EditChoreScreen(props: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <View>
      <TextInput
        mode="outlined"
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        mode="outlined"
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
    </View>
  );
}
