import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, Text, View } from "react-native";
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
      <Text>Hushållet</Text>
      <Text>förra veckan</Text>

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
    center={[10, 10]}
    />
    <View>
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


