import { createSlice } from "@reduxjs/toolkit";
import { Task } from "./../../data/data";
import { addTask, fetchTasks } from "./taskActions";

type TasksState = {
  list: Task[];
};

const initialState: TasksState = {
  list: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.list.push(action.payload);
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});
export const taskReducer = taskSlice.reducer;
export const {} = taskSlice.actions;
