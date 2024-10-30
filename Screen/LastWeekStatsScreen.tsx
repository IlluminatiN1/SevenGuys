import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import {
  emojis,
  mockedCompletedTasks,
  mockedMembers,
  mockedTasks
} from "../data/data";

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

export default function LastWeekStatsScreen() {
  const memberScores = calculateMemberScore();

  const chartData = memberScores.map((member) => ({
    name: member.name,
    population: member.score,
    color: member.color,
    legendFontColor: "#7F7F7F",
    legendFontSize: 12,
  }));
  return (
    <View>
      <PieChart
      data={chartData}
      width={screenWidth}
      height={180}
      chartConfig={{color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    }}
    accessor={"population"}
    backgroundColor={"transparent"}
    paddingLeft={"15"}
    hasLegend={false}
    center={[95, 15]}
    />
    <View style={s.totalTitleContainer}>
      <Text style={s.totalTitle}>Totalt</Text>
    </View>
    <View style={s.emojiContainer}>
      {memberScores.map((member, index) => (
        <MaterialCommunityIcons
        key={index}
        name={member.emojiName as keyof typeof MaterialCommunityIcons.glyphMap}
        size={30}
        color={member.color}
        />
      ))}
    </View>
    </View>
  );
}

const s = StyleSheet.create({
  totalTitleContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  totalTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 13,
    top: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 16,
    color: "#7F7F7F",
    marginVertical: 10,
  },
  emojiContainer: {
    position: "absolute",
    top: 100,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
  },
});
