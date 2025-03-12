import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { auth } from "../../config/firebase";
import { CompletedTask, emojis, Member, Task } from "../../data/data";

const screenWidth = Dimensions.get("window").width;
const firestore = getFirestore();

export default function LastWeekTotalStatsComponent() {
  const [memberScores, setMemberScores] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const userId = auth.currentUser?.uid;
      if (!userId) return;

      const memberDocRef = doc(firestore, "members", userId);
      const memberDoc = await getDoc(memberDocRef);
      const memberData = memberDoc.data() as Member;

      const householdId = memberData?.householdId;

      const householdMembers = query(
        collection(firestore, "members"),
        where("householdId", "==", householdId)
      );

      const householdMembersSnapshot = await getDocs(householdMembers);
      const members: Member[] = householdMembersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Member[];

      const taskCollectionRef = collection(firestore, "Tasks");
      const taskQuery = query(
        taskCollectionRef,
        where("householdId", "==", householdId)
      );

      const taskSnapshot = await getDocs(taskQuery);
      const tasks: Task[] = taskSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];

      const completedTaskCollectionRef = collection(firestore, "CompletedTask");
      const completedTaskQuery = query(
        completedTaskCollectionRef,
        where(
          "memberId",
          "in",
          members.map((m) => m.id)
        )
      );
      const completedTaskSnapshot = await getDocs(completedTaskQuery);
      const completedTasks: CompletedTask[] = completedTaskSnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() })
      ) as CompletedTask[];

      const scoreMap = new Map<
        string,
        { name: string; score: number; color?: string; emojiName?: string }
      >();

      completedTasks.forEach((completedTask) => {
        const task = tasks.find((t) => t.id === completedTask.taskId);
        if (task) {
          const memberId = completedTask.memberId;
          const prevScore = scoreMap.get(memberId)?.score || 0;
          const memberData = members.find((m) => m.id === memberId);
          const emoji = memberData
            ? emojis.find((e) => e.id === memberData.emojiId)
            : undefined;

          scoreMap.set(memberId, {
            name: memberData?.name || "Unknown Member",
            score: prevScore + (task.score || 0),
            color: emoji?.color,
            emojiName: emoji?.name,
          });
        }
      });

      const updatedScores = members.map((member) => {
        const emoji = emojis.find((e) => e.id === member.emojiId);

        const memberScore = scoreMap.get(member.id) || {
          name: member.name,
          score: 0,
          color: emoji?.color,
          emojiName: emoji?.name,
        };
        return {
          ...memberScore,
          name: member.name,
          score: memberScore.score,
          color: memberScore.color,
          emojiName: memberScore.emojiName,
        };
      });

      setMemberScores(updatedScores);
    };

    fetchData();
  }, []);

  const totalScore = memberScores.reduce(
    (sum, member) => sum + member.score,
    0
  );

  const chartData = memberScores.map((member) => ({
    name: member.name,
    population: member.score,
    color: member.color,
  }));

  return (
    <View style={s.container}>
      <View style={s.emojiContainer}>
        {memberScores.map((member, index) => (
          <View key={index} style={s.membersRow}>
            <View style={[s.iconCircle, { borderColor: member.color }]}>
              <MaterialCommunityIcons
                name={
                  member.emojiName as keyof typeof MaterialCommunityIcons.glyphMap
                }
                size={25}
                color={member.color}
                style={s.emojiIcon}
              />
            </View>
            <Text style={s.memberName}>
              {member.name ? member.name.slice(0, 3) : "NoName"}: {member.score}
            </Text>
          </View>
        ))}
      </View>

      <View style={s.container}>
        <PieChart
          data={chartData}
          width={screenWidth}
          height={280}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          hasLegend={false}
          center={[95, 15]}
        />
      </View>

      <Text style={s.totalTitle}>Totalt poäng: {totalScore}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    justifyContent: "center",
  },

  emojiContainer: {
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  totalTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
    marginTop: 10,
    textAlign: "center",
  },

  emojiIcon: {
    marginRight: 5,
  },

  membersRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },

  memberName: {
    fontSize: 13,
    fontWeight: "bold",
  },
  iconCircle: {
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    paddingLeft: 4,
    marginRight: 5,
  },
});
