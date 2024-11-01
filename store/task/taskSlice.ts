import { mockedTasks, Task } from "./../../data/data";
import { createSlice } from "@reduxjs/toolkit";
import { addTask } from "./taskActions";

type TasksState = {
  list: Task[];
};

const initialState: TasksState = {
  list: mockedTasks,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.list.push(action.payload);
    });
  },
});
export const taskReducer = taskSlice.reducer;
export const {} = taskSlice.actions;
