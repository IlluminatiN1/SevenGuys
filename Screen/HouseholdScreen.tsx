import { MaterialCommunityIcons } from "@expo/vector-icons";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IconButton } from "react-native-paper";
import { CreateTaskPopUpScreen } from "../components/CreateChoreComponent";
import EditTaskModal from "../components/stats/EditTaskModal";
import { emojis, mockedMembers, mockedTasks, mockedUser } from "../data/data";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchTasks } from "../store/task/taskActions";

const activeHousehold = "1";
const activeTasks = mockedTasks.length > 0 ? mockedTasks : [];
const activeUser = mockedUser;
const activeMembers = mockedMembers.filter(
  (member) => member.userId === activeUser.id
);

const householdMembers = activeMembers.filter(
  (member) => member.householdId === activeHousehold
);

const activeEmojis = emojis.length > 0 ? emojis : [];

export default function HouseholdScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const tasks = useAppSelector((state) => state.tasks.list);
  const dispatch = useAppDispatch();
  const [taskList, setTaskList] = useState(tasks);

  const selectedHousehold = useAppSelector((state) => state.households.current);

  useEffect(() => {
    if (selectedHousehold) {
      dispatch(fetchTasks(selectedHousehold.id));
    }
  }, [dispatch, selectedHousehold]);

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  const handleSave = async (
    id: string,
    newTitle: string,
    newDescription: string,
    newReoccurence: number,
    newScore: number
  ) => {
    try {
      const db = getFirestore();
      const taskDocRef = doc(db, "Tasks", id);
      await updateDoc(taskDocRef, {
        title: newTitle,
        description: newDescription,
        reoccurence: newReoccurence,
        score: newScore,
      });
      setTaskList((prevList) =>
        prevList.map((task) =>
          task.id === id
            ? {
                ...task,
                title: newTitle,
                description: newDescription,
                reoccurence: newReoccurence,
                score: newScore,
              }
            : task
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={s.screenContainer}>
      <View>
        {taskList.length === 0 ? (
          <Text></Text>
        ) : (
          taskList
            .filter((task) => task.householdId === selectedHousehold?.id)
            .map((task, index) => (
              <TaskRow
                key={index}
                title={task.title}
                description={task.description}
                reoccurence={task.reoccurence}
                score={task.score}
                taskId={task.id}
                onTitlePress={() => console.log(`${task.title} pressed`)}
                onSave={handleSave}
              />
            ))
        )}
      </View>
      <View style={s.addTaskButtonContainer}>
        <View>
          <AddTaskButton onPress={showModal} />
        </View>
      </View>
      {isModalVisible && <CreateTaskPopUpScreen onClose={hideModal} />}
    </View>
  );
}

const TaskRow = ({
  title,
  description,
  reoccurence,
  score,
  taskId,
  onTitlePress,
  onSave,
}: {
  title: string;
  description: string;
  reoccurence: number;
  score: number;
  taskId: string;
  onTitlePress: () => void;
  onSave: (
    id: string,
    newTitle: string,
    newDescription: string,
    newReoccurence: number,
    newScore: number
  ) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <View style={s.taskContainer}>
      <TouchableOpacity onPress={onTitlePress}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>{title}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsEditing(true)}>
        <MaterialCommunityIcons
          name="pencil"
          size={20}
          color="#5856D6"
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity>
      <EditTaskModal
        isVisible={isEditing}
        onClose={() => setIsEditing(false)}
        task={{ id: taskId, title, description, reoccurence, score }}
        onSave={onSave}
      />
    </View>
  );
};

const AddTaskButton = ({ onPress: handlePress }: { onPress: () => void }) => {
  const isAdmin = activeMembers.some(
    (member) =>
      member.householdId === activeHousehold &&
      member.isOwner &&
      member.id === activeUser.id
  );

  if (isAdmin) {
    return (
      <View style={s.addTaskButtonStyle}>
        <IconButton
          icon={"plus"}
          size={15}
          iconColor="white"
          onPress={handlePress}
          mode="outlined"
          style={{ borderColor: "white", borderWidth: 2 }}
        />

        <Text style={s.createHouseholdText}>Lägg till syssla</Text>
      </View>
    );
  }
  return null;
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
