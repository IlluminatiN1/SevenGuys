import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { auth } from "../../config/firebase";
import { CompletedTask, Emoji, Member, Task } from "../../data/data";
import { fetchEmoji } from "../../utils/emoji";
import { useAppSelector } from "../../store/hooks";

const screenWidth = Dimensions.get("window").width;
const firestore = getFirestore();

export default function ThisWeekTotalStatsComponent() {
  const [memberScores, setMemberScores] = useState<any[]>([]);
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
      if (emojis.length === 0) return;

      const userId = auth.currentUser?.uid;
      if (!userId) return;

      const memberQuery = query(
        collection(firestore, "members"),
        where("userId", "==", userId)
      );

      const memberSnapshot = await getDocs(memberQuery);
      if (memberSnapshot.empty) return;

      const memberDoc = memberSnapshot.docs[0];
      const memberData = memberDoc.data() as Member;
      const householdId = memberData?.householdId;

      const householdMembers = query(
        collection(firestore, "members"),
        where("householdId", "==", householdId)
      );

      const householdMembersSnapshot = await getDocs(householdMembers);

      const members: Member[] = householdMembersSnapshot.docs.map((doc) => {
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

      const taskCollectionRef = collection(firestore, "task");
      const taskQuery = query(
        taskCollectionRef,
        where("householdId", "==", householdId)
      );

      const taskSnapshot = await getDocs(taskQuery);
      const tasks: Task[] = taskSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];

      const allPossibleMemberIds = [] as string[];
      for (const member of members) {
        if (member.id) allPossibleMemberIds.push(member.id);
      }

      for (const member of members) {
        if (member.userId) {
          const extraMembersQuery = await getDocs(
            query(
              collection(firestore, "members"),
              where("userId", "==", member.userId)
            )
          );

          extraMembersQuery.forEach((doc) => {
            const docId = doc.id;
            if (docId !== member.id && !allPossibleMemberIds.includes(docId)) {
              allPossibleMemberIds.push(docId);
            }
          });
        }
      }

      const completedTaskQuery = collection(firestore, "completedtask");
      const completedTaskSnapshot = await getDocs(completedTaskQuery);
      let allCompletedTasks: CompletedTask[] = completedTaskSnapshot.docs.map(
        (doc) => {
          const data = doc.data();
          return { id: doc.id, ...data } as CompletedTask;
        }
      );

      const memberIdSet = new Set(allPossibleMemberIds);
      const completedTasks = allCompletedTasks.filter((task) =>
        memberIdSet.has(task.memberId)
      );

      const memberLookup = new Map();
      members.forEach((member) => {
        memberLookup.set(member.id, member);
      });

      const scoreMap = new Map<
        string,
        { name: string; score: number; color?: string; emojiName?: string }
      >();

      completedTasks.forEach((completedTask) => {
        const task = tasks.find((t) => t.id === completedTask.taskId);
        if (task) {
          const memberId = completedTask.memberId;
          const memberData = memberLookup.get(memberId);

          if (memberData) {
            const prevScore = scoreMap.get(memberId)?.score || 0;
            const emoji = emojis.find((e) => e.id === memberData.emojiId);

            scoreMap.set(memberId, {
              name: memberData.name,
              score: prevScore + (task.score || 0),
              color: emoji?.color,
              emojiName: emoji?.icon,
            });
          }
        }
      });

      const updatedScores = members.map((member) => {
        const emoji = emojis.find((e) => e.id === member.emojiId);

        const memberScore = scoreMap.get(member.id) || {
          name: member.name,
          score: 0,
          color: emoji?.color,
          emojiName: emoji?.icon,
        };

        return {
          ...memberScore,
          color: memberScore.color,
        };
      });

      setMemberScores(updatedScores);
    };

    fetchData();
  }, [emojis, completedTasksFromStore]);

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
      {emojis.length > 0 ? (
        <>
          <View style={s.emojiContainer}>
            {memberScores.map((member, index) => (
              <View key={index} style={s.membersRow}>
                <View
                  style={[
                    s.iconCircle,
                    { borderColor: member.color },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={
                      (member.emojiName as keyof typeof MaterialCommunityIcons.glyphMap)
                    }
                    size={25}
                    color={member.color}
                    style={s.emojiIcon}
                  />
                </View>
                <Text style={s.memberName}>
                  {member.name ? member.name.slice(0, 3) : "NoName"}
                  : {member.score}
                </Text>
              </View>
            ))}
          </View>

          <View style={s.container}>
            <PieChart
              data={chartData.map((item) => ({
                ...item,
                color: item.color,
              }))}
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
        </>
      ) : (
        <Text>Laddar statistik...</Text>
      )}
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
