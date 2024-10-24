import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IconButton } from "react-native-paper";
import {
  emojis,
  mockedCompletedTasks,
  mockedMembers,
  mockedTasks,
  mockedUser,
} from "../data/data";
import { CreateChorePopUpScreen } from "../components/CreateChoreComponent";

const activeHousehold = 1;
const activeTasks = mockedTasks.length > 0 ? mockedTasks : [];
const activeUser = mockedUser;
const activeMembers = mockedMembers.filter(
  (member) => member.userId === activeUser.id
);
const householdMembers = activeMembers.filter(
  (member) => member.houseHoldId === activeHousehold
);
const activeEmojis = emojis.length > 0 ? emojis : [];

const TaskRow = ({
  title,
  taskId,
  onTitlePress,
}: {
  title: string;
  taskId: number;
  onTitlePress: () => void;
}) => {
  const completedMembers = mockedCompletedTasks
    .filter((task) => task.taskId === taskId)
    .map((task) => task.memberId);
  const task = activeTasks.find((t) => t.id === taskId);

  return (
    <View style={s.taskContainer}>
      <TouchableOpacity onPress={onTitlePress}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>{title}</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row" }}>
        {completedMembers.length > 0 ? (
          completedMembers.map((memberId, index) => {
            const member = activeMembers.find((m) => m.id === memberId);
            const emoji =
              activeEmojis.find((e) => e.id === member?.emojiId) ||
              activeEmojis[8];
            return (
              <MaterialCommunityIcons
                key={index}
                name={
                  emoji.name as keyof typeof MaterialCommunityIcons.glyphMap
                }
                size={25}
                color={emoji.color}
              />
            );
          })
        ) : (
          <Text style={{ fontSize: 18, color: "red" }}>
            {task?.reoccurence}
          </Text>
        )}
      </View>
    </View>
  );
};

const AddTaskButton = ({ onPress: handlePress }: { onPress: () => void }) => {
  return (
    <View>
      <IconButton
        icon={"plus"}
        size={15}
        iconColor="white"
        onPress={handlePress}
        mode="outlined"
        style={{ borderColor: "white", borderWidth: 2 }}
      />
    </View>
  );
};

const HouseholdScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  return (
    <View style={s.screenContainer}>
      <View style={s.headerContainer}>
        <IconButton
          icon={"chevron-left"}
          size={30}
          iconColor="black"
          onPress={() => console.log("left arrow pressed")}
          mode="outlined"
          style={{ borderColor: "transparent", borderWidth: 2 }}
        />
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>Idag</Text>
        <IconButton
          icon={"chevron-right"}
          size={30}
          iconColor="black"
          onPress={() => console.log("right arrow pressed")}
          mode="outlined"
          style={{ borderColor: "transparent", borderWidth: 2 }}
        />
      </View>
      <View>
        {activeTasks
          .filter((task) => task.houseHoldId === activeHousehold)
          .map((task, index) => {
            return (
              <TaskRow
                key={index}
                title={task.title}
                taskId={task.id}
                onTitlePress={() => console.log(`${task.title} pressed`)}
              />
            );
          })}
      </View>
      <View style={s.addTaskButtonContainer}>
        <View style={s.addTaskButtonStyle}>
          <AddTaskButton onPress={showModal} />
          <Text style={s.createHouseholdText}>Lägg till syssla</Text>
        </View>
      </View>
      {isModalVisible && <CreateChorePopUpScreen onClose={hideModal} />}
    </View>
  );
};

const s = StyleSheet.create({
  screenContainer: {
    padding: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  memberContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  memberName: {
    fontSize: 16,
    marginRight: 10,
  },
  taskContainer: {
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
  addTaskButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  addTaskButtonStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderColor: "black",
    backgroundColor: "#5856D6",
    padding: 10,
  },
  createHouseholdText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default HouseholdScreen;
