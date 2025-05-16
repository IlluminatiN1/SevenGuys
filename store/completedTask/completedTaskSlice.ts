import { createSlice } from "@reduxjs/toolkit";
import { CompletedTask } from "../../data/data";
import {
  addCompletedTask,
  removeCompletedTasksByTaskId,
} from "./completedTaskActions";
import { initialState } from "./completedTaskState";

type SerializedCompletedTask = Omit<CompletedTask, "date"> & { date: string };

interface CompletedTasksState {
  list: SerializedCompletedTask[];
  refreshFlag: number;
}

const serializedInitialState = initialState.map((task) => ({
  ...task,
  date: task.date instanceof Date ? task.date.toISOString() : task.date,
}));

const initialCompletedTasksState: CompletedTasksState = {
  list: serializedInitialState,
  refreshFlag: 0,
};

const completedTaskSlice = createSlice({
  name: "completedTasks",
  initialState: initialCompletedTasksState,
  reducers: {
    triggerStatsRefresh(state) {
      state.refreshFlag++;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCompletedTask.fulfilled, (state, action) => {
      state.list.push(action.payload);
      state.refreshFlag++;
    });

    builder.addCase(removeCompletedTasksByTaskId.fulfilled, (state, action) => {
      const taskId = action.payload;
      state.list = state.list.filter((task) => task.taskId !== taskId);
      state.refreshFlag++;
    });
  },
});
export const { triggerStatsRefresh } = completedTaskSlice.actions;
export const completedTaskReducer = completedTaskSlice.reducer;