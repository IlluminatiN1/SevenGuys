import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { auth } from "../../config/firebase";
import { CompletedTask, Emoji, Member, Task } from "../../data/data";
import { fetchEmoji } from "../../utils/emoji";

const screenWidth = Dimensions.get("window").width;
const firestore = getFirestore();

export default function ThisWeekIndividualTaskStatComponent() {
  const [taskData, setTaskData] = useState<
    { taskName: string; energy: any[] }[]
  >([]);
  const [emojis, setEmojis] = useState<Emoji[]>([]);

  useEffect(() => {
    const loadEmojis = async () => {
      const emoji = await fetchEmoji();
      setEmojis(emoji);
    };
    loadEmojis();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const userId = auth.currentUser?.uid;
      if (!userId) return;

      const memberSnapshot = await getDocs(
        query(collection(firestore, "members"), where("id", "==", userId))
      );
      const memberData = memberSnapshot.docs[0]?.data() as Member;
      if (!memberData?.householdId) return;

      const householdId = memberData.householdId;

      const [membersSnapshot, tasksSnapshot, completedTasksSnapshot] =
        await Promise.all([
          getDocs(
            query(
              collection(firestore, "members"),
              where("householdId", "==", householdId)
            )
          ),
          getDocs(
            query(
              collection(firestore, "Tasks"),
              where("householdId", "==", householdId)
            )
          ),
          getDocs(collection(firestore, "CompletedTask")),
        ]);

      const members: Member[] = membersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Member[];

      const tasks: Task[] = tasksSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];

      const completedTasks: CompletedTask[] = completedTasksSnapshot.docs.map(
        (doc) => ({
          id: doc.id,
          ...doc.data(),
        })
      ) as CompletedTask[];

      const calculatedTasks = tasks
        .map((task) => {
          const memberEnergy = members
            .map((member) => {
              const memberCompletedTasks = completedTasks.filter(
                (completedTask) =>
                  completedTask.taskId === task.id &&
                  completedTask.memberId === member.id
              );

              const totalScore =
                memberCompletedTasks.length * (task.score || 0);
              const emoji = emojis.find((e) => e.id === member.emojiId);

              return {
                name: member.name,
                score: totalScore,
                color: emoji?.color,
                emojiName: emoji?.name,
              };
            })
            .filter((member) => member.score > 0);

          return memberEnergy.length > 0
            ? { taskName: task.title, energy: memberEnergy }
            : null;
        })
        .filter((task) => task !== null) as {
        taskName: string;
        energy: any[];
      }[];

      setTaskData(calculatedTasks);
    };

    fetchData();
  }, [emojis]);

  return (
    <FlatList
      data={taskData}
      keyExtractor={(item) => item.taskName}
      numColumns={3}
      contentContainerStyle={s.flatContent}
      renderItem={({ item: task }) => (
        <View style={s.chartContainer}>
          <PieChart
            data={task.energy.map((member) => ({
              name: member.name,
              population: member.score,
              color: member.color,
            }))}
            width={150}
            height={150}
            paddingLeft={"10"}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            hasLegend={false}
            center={[25, 10]}
          />
          <Text style={s.taskTitle}>{task.taskName}</Text>
        </View>
      )}
    />
  );
}
const s = StyleSheet.create({
  flatContent: {
    justifyContent: "center",
  },
  chartContainer: {
    width: screenWidth / 3 - 15,
    margin: 5,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  taskTitle: {
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
});
