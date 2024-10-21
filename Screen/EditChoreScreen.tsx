import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Button, Chip, Dialog, Portal, Text, TextInput } from "react-native-paper";
import { RootStackParamList } from "../Navigator/RootStackNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "EditChore">;

export default function EditChoreScreen(props: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDay, setDay] = useState("7"); // Change this so it uses already set days
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const daysList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13" ];

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

      <Pressable onPress={showDialog}>
        
          <View>
          <Text>Recurring:</Text>
            <Text>every</Text>
            <Chip mode="outlined">{selectedDay}</Chip>
            <Text>day</Text>
          </View>
        
      </Pressable>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <ScrollView horizontal>
              {daysList.map((day) => (
                <Chip
                key={day}
                style={[styles.dayChip,
                  selectedDay === day && styles.selectedDayChip, 
                ]}
                onPress={() => setDay(day)}
                >
                  {day}
                </Chip>
              ))}

            </ScrollView>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
            mode="contained"
            onPress={hideDialog}
            >
              Done
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
const styles = StyleSheet.create({
  dayChip: {
    marginHorizontal: 5,
    borderRadius: 50,
  },
  selectedDayChip: {
    backgroundColor: "red", 
  },
});