import React from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
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
    }).filter((task) => task.energy.length > 0);
};

export default function LastWeekIndividualTaskStatComponent() {
    const taskData = calculateIndividualTask();

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
                    <Text style={s.taskTitle}>
                        {task.taskName}
                    </Text>
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
