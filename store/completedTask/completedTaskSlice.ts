import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./completedTaskState";
import {
  addCompletedTask,
  removeCompletedTasksByTaskId,
  fetchCompletedTasks
} from "./completedTaskActions";
import { CompletedTask } from "../../data/data";

type SerializedCompletedTask = Omit<CompletedTask, "date"> & { date: string };

interface CompletedTasksState {
  list: SerializedCompletedTask[];
}

const serializedInitialState = initialState.map((task) => ({
  ...task,
  date: task.date instanceof Date ? task.date.toISOString() : task.date,
}));

const initialCompletedTasksState: CompletedTasksState = {
  list: serializedInitialState,
};

const completedTaskSlice = createSlice({
  name: "completedTasks",
  initialState: initialCompletedTasksState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addCompletedTask.fulfilled, (state, action) => {
      state.list.push(action.payload);
    });

    builder.addCase(fetchCompletedTasks.fulfilled, (state, action) => {
      state.list = action.payload;
    });

    builder.addCase(removeCompletedTasksByTaskId.fulfilled, (state, action) => {
      const taskId = action.payload;
      state.list = state.list.filter((task) => task.taskId !== taskId);
    });
  },
});

export const completedTaskReducer = completedTaskSlice.reducer;