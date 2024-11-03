import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import {
  emojis,
  mockedCompletedTasks,
  mockedMembers,
  mockedTasks,
} from "../../data/data";

const screenWidth = Dimensions.get("window").width;

const calculateMemberScore = () => {
  return mockedMembers.map((member) => {
    const memberCompletedTasks = mockedCompletedTasks.filter(
      (completedTask) => completedTask.memberId === member.id
    );
    const totalScore = memberCompletedTasks.reduce((acc, completedTask) => {
      const task = mockedTasks.find((t) => t.id === completedTask.taskId);
      return acc + (task ? task.score : 0);
    }, 0);

    const emoji = emojis.find((e) => e.id === member.emojiId);
    return {
      name: member.name,
      score: totalScore,
      color: emoji?.color,
      emojiName: emoji?.name,
    };
  });
};

export default function LastWeekTotalStatsComponent() {
  const memberScores = calculateMemberScore();

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
            <View style={[s.iconCircle, { borderColor: member.color}]}>
            <MaterialCommunityIcons
              name={member.emojiName as keyof typeof MaterialCommunityIcons.glyphMap}
              size={25}
              color={member.color}
              style={s.emojiIcon}
            />
            </View>
            <Text style={s.memberName}>{member.name.slice(0, 3)}</Text>
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

      <Text style={s.totalTitle}>Totalt</Text>
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
    fontWeight: "bold"
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

