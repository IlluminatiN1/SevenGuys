import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, FlatList, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import {
    emojis,
    mockedCompletedTasks,
    mockedMembers,
    mockedTasks
} from "../../data/data";

const screenWidth = Dimensions.get("window").width;

const calculateIndividualTask = () => {
    return mockedTasks.map((task) => {
        const memberEnergy = mockedMembers.map((member) => {
            const memberCompletedTasks = mockedCompletedTasks.filter(
                (completedTask) => completedTask.taskId === task.id && completedTask.memberId === member.id
            );
            const totalScore = memberCompletedTasks.length * task.score;

            const emoji = emojis.find((e) => e.id === member.emojiId);
            return {
                name: member.name,
                score: totalScore,
                color: emoji?.color,
                emojiName: emoji?.name,
            };
        }).filter((member) => member.score > 0);

        return {
            taskName: task.title,
            energy: memberEnergy,
        };
    });
};

export default function LastWeekIndividualTaskStatComponent() {
    const taskData = calculateIndividualTask();

    return (
        <FlatList
            data={taskData}
            keyExtractor={(item) => item.taskName}
            renderItem={({ item: task }) => (
                <View>
                    <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                        {task.taskName}
                    </Text>
                    <PieChart
                        data={task.energy.map((member) => ({
                            name: member.name,
                            population: member.score,
                            color: member.color,
                            legendFontColor: "#7F7F7F",
                            legendFontSize: 12,
                        }))}
                        width={screenWidth}
                        height={220}
                        chartConfig={{
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        }}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="15"
                        hasLegend={false}
                    />
                    <View>
                        {task.energy.map((member) => (
                            <View key={member.name}>
                                <View>
                                    <MaterialCommunityIcons
                                        name={member.emojiName as keyof typeof MaterialCommunityIcons.glyphMap}
                                        size={25}
                                        color={member.color}
                                    />
                                    <Text>
                                        {member.name.slice(0, 3)}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            )}
        />
    );
}
