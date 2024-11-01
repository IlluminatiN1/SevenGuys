import { Dimensions } from "react-native";
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
                color: emoji?.color || "#000",
                emojiName: emoji?.name,
            };
        }).filter((member) => member.score > 0);

        return {
            taskName: task.title,
            energy: memberEnergy,
        };
    });
};
