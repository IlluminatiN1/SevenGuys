import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import {
  Dialog,
  Portal,
  Text,
  TextInput
} from "react-native-paper";
import { RootStackParamList } from "../Navigator/RootStackNavigator";
import { ChoreStyles } from "../Style/editChoreStyle";


type Props = NativeStackScreenProps<RootStackParamList, "EditChore">;

export default function EditChoreScreen(props: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDay, setDay] = useState("7"); // Change this so it uses already set days
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const daysList = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
  ];

  return (
    <View style={ChoreStyles.container}>
      <TextInput
        mode="outlined"
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={ChoreStyles.inputField}
        outlineColor="#A9A9A9"
        activeOutlineColor="#5856D6"
        theme={{ roundness: 10 }}
      />

      <TextInput
        mode="outlined"
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={ChoreStyles.choreDescriptionField}
        multiline={true}
        outlineColor="#A9A9A9"
        activeOutlineColor="#5856D6"
        theme={{ roundness: 10 }}
      />

      <Pressable onPress={showDialog}>
        <View style={ChoreStyles.recurringContainer}>
          <Text style={ChoreStyles.recurringTitle}>Recurring:</Text>

          <View style={ChoreStyles.recurringKeepRowRight}>
            <Text style={ChoreStyles.text}>every</Text>

            <Pressable 
            onPress={showDialog} 
            style={ChoreStyles.selectedDayButton}
            >
              <Text style={ChoreStyles.selectedDayStyle}>
                {selectedDay}
              </Text>
            </Pressable>
            <Text style={ChoreStyles.text}>
              day
            </Text>
          </View>
        </View>
      </Pressable>
      <Portal>
        <Dialog 
        visible={visible} 
        onDismiss={hideDialog}
        style={{backgroundColor: "white"}}
        >
          <Dialog.Content style={ChoreStyles.dialogContent}>
            <ScrollView 
            horizontal
            persistentScrollbar={true} 
            contentContainerStyle={ChoreStyles.scrollViewStyle}
            >
              {daysList.map((day) => (
                <Pressable key={day}
                  onPress={() => {
                    setDay(day);
                    hideDialog();}}
                  style={[
                    ChoreStyles.dialogButton,
                    selectedDay === day && ChoreStyles.selectedDayPressable
                    ]}
                  >
                <Text> 
                  {day} 
                </Text>
              </Pressable>
              ))}
            </ScrollView>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
}
