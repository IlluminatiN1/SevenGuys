import { Dimensions } from "react-native";
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
