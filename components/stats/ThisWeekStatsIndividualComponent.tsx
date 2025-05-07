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
import { useAppSelector } from "../../store/hooks";

const screenWidth = Dimensions.get("window").width;
const firestore = getFirestore();

export default function ThisWeekIndividualTaskStatComponent() {
  const [taskData, setTaskData] = useState<
    { taskName: string; energy: any[] }[]
  >([]);
  const [emojis, setEmojis] = useState<Emoji[]>([]);

  const completedTasksFromStore = useAppSelector(
    (state) => state.completedTasks.list
  );

  useEffect(() => {
    const loadEmojis = async () => {
      const emoji = await fetchEmoji();
      setEmojis(emoji);
    };
    loadEmojis();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (emojis.length === 0) {
          return;
        }

        const userId = auth.currentUser?.uid;
        if (!userId) {
          return;
        }

        const memberQuery = query(
          collection(firestore, "members"),
          where("userId", "==", userId)
        );
        const memberSnapshot = await getDocs(memberQuery);
        if (memberSnapshot.empty) {
          return;
        }

        const memberDoc = memberSnapshot.docs[0];
        const memberData = memberDoc.data() as Member;
        const householdId = memberData.householdId;
        if (!memberData?.householdId) {
          return;
        }

        const membersQuery = query(
          collection(firestore, "members"),
          where("householdId", "==", householdId)
        );
        const membersSnapshot = await getDocs(membersQuery);

        const members: Member[] = membersSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            emojiId: data.emojiId,
            isOwner: data.isOwner,
            householdId: data.householdId,
            userId: data.userId,
            isRequest: data.isRequest,
          } as Member;
        });

        const memberReverseMap = new Map<string, string[]>();
        members.forEach((member) => {
          const identifiers = [member.id, member.userId];
          identifiers.forEach((id) => {
            if (id) memberReverseMap.set(id, identifiers);
          });
        });

        const memberIds = members.map((member) => member.id);

        const tasksQuery = query(
          collection(firestore, "task"),
          where("householdId", "==", householdId)
        );
        const tasksSnapshot = await getDocs(tasksQuery);

        let completedTasksQuery;
        if (memberIds.length <= 10) {
          completedTasksQuery = query(
            collection(firestore, "completedtask"),
            where("memberId", "in", memberIds)
          );
        } else {
          completedTasksQuery = collection(firestore, "completedtask");
        }

        const completedTasksSnapshot = await getDocs(completedTasksQuery);
        const tasks: Task[] = tasksSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Task[];

        let completedTasks: CompletedTask[] = completedTasksSnapshot.docs.map(
          (doc) => {
            const data = doc.data();
            return { id: doc.id, ...data };
          }
        ) as CompletedTask[];

        let filteredTasks: CompletedTask[] = completedTasks;
        if (memberIds.length > 10) {
          filteredTasks = completedTasks.filter((task) => {
            const possibleIds = memberReverseMap.get(task.memberId);
            return (
              possibleIds && memberIds.some((id) => possibleIds.includes(id))
            );
          });
        }

        const calculatedTasks = tasks
          .map((task) => {
            const memberEnergy = members
              .map((member) => {
                const memberCompletedTasks = filteredTasks.filter(
                  (completedTask) => {
                    const possibleIds = memberReverseMap.get(member.id) || [
                      member.id,
                      member.userId,
                    ];
                    return (
                      completedTask.taskId === task.id &&
                      possibleIds.some((id) => id === completedTask.memberId)
                    );
                  }
                );

                if (memberCompletedTasks.length === 0) {
                  return null;
                }

                const totalScore =
                  memberCompletedTasks.length * (task.score || 0);
                const emoji = emojis.find((e) => e.id === member.emojiId);

                return {
                  name: member.name,
                  score: totalScore,
                  color: emoji?.color,
                  emojiName: emoji?.icon,
                };
              })
              .filter(Boolean);

            return memberEnergy.length > 0
              ? { taskName: task.title, energy: memberEnergy }
              : null;
          })
          .filter((task) => task !== null) as {
          taskName: string;
          energy: any[];
        }[];

        setTaskData(calculatedTasks);
      } catch (error) {}
    };

    fetchData();
  }, [emojis, completedTasksFromStore]);

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
