import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { Button, Dialog, Portal, Text, TextInput } from "react-native-paper";
import { RootStackParamList } from "../Navigator/RootStackNavigator";
import { ChoreStyles } from "../Style/editChoreStyle";

type Props = NativeStackScreenProps<RootStackParamList, "EditChore">;

export default function EditChoreScreen(props: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [selectedDay, setDay] = useState("7"); // Change this so it uses already set days
  const [recurringDialogVisible, setRecurringDialogVisible] = useState(false);

  const [selectedEnergy, setEnergy] = useState("1");
  const [energyDialogVisible, setEnergyDialogVisible] = useState(false);

  const showRecurringDialog = () => setRecurringDialogVisible(true);
  const hideRecurringDialog = () => setRecurringDialogVisible(false);

  const showEnergyDialog = () => setEnergyDialogVisible(true);
  const hideEnergyDialog = () => setEnergyDialogVisible(false);

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
  const energyList = ["1", "2", "3", "4", "5"];

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

      <Pressable onPress={showRecurringDialog}>
        <View style={ChoreStyles.recurringContainer}>
          <Text style={ChoreStyles.recurringTitle}>Recurring:</Text>

          <View style={ChoreStyles.keepRowRight}>
            <Text style={ChoreStyles.text}>every</Text>

            <Pressable
              onPress={showRecurringDialog}
              style={ChoreStyles.selectedDayButton}
            >
              <Text style={ChoreStyles.selectedDayStyle}>{selectedDay}</Text>
            </Pressable>
            <Text style={ChoreStyles.text}>day</Text>
          </View>
        </View>
      </Pressable>
      <Portal>
        <Dialog
          visible={recurringDialogVisible}
          onDismiss={hideRecurringDialog}
          style={{ backgroundColor: "white" }}
        >
          <Dialog.Content style={ChoreStyles.dialogContent}>
            <ScrollView
              horizontal
              persistentScrollbar={true}
              contentContainerStyle={ChoreStyles.scrollViewStyle}
            >
              {daysList.map((day) => (
                <Pressable
                  key={day}
                  onPress={() => {
                    setDay(day);
                    hideRecurringDialog();
                  }}
                  style={[
                    ChoreStyles.dialogButton,
                    selectedDay === day && ChoreStyles.selectedDayPressable,
                  ]}
                >
                  <Text>{day}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </Dialog.Content>
        </Dialog>
      </Portal>
      <Pressable onPress={showEnergyDialog}>
        <View style={ChoreStyles.recurringContainer}>
          <View>
            <Text style={ChoreStyles.recurringTitle}>Energy:</Text>
            <Text style={ChoreStyles.keepRowLeft}>
              How much energy does this chore take?
            </Text>
          </View>

          <View style={ChoreStyles.keepRowRight}>
            <Text style={ChoreStyles.text}>{selectedEnergy}</Text>
          </View>
        </View>
      </Pressable>
      <Portal>
        <Dialog
          visible={energyDialogVisible}
          onDismiss={hideEnergyDialog}
          style={{ backgroundColor: "white" }}
        >
          <Dialog.Content style={ChoreStyles.dialogContent}>
            <ScrollView
              horizontal
              persistentScrollbar={true}
              contentContainerStyle={ChoreStyles.scrollViewStyle}
            >
              {energyList.map((energy) => (
                <Pressable
                  key={energy}
                  onPress={() => {
                    setEnergy(energy);
                    hideEnergyDialog();
                  }}
                  style={[ChoreStyles.dialogButton]}
                >
                  <Text>{energy}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </Dialog.Content>
        </Dialog>
      </Portal>
      <View>
        <Button
          mode="contained"
          labelStyle={{ color: "white" }}
          buttonColor="red"
        >
          Delete
        </Button>
        <Button
        mode="contained"
        labelStyle={{color: "white"}}
        buttonColor="#5856D6"
        >Archive</Button>
      </View>
      <View>
        <Button
        mode="contained"
        labelStyle={{color: "white"}}
        buttonColor="#5856D6"
        >
          Save</Button>
      </View>
    </View>
  );
}
