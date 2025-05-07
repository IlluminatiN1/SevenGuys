import { configureStore } from "@reduxjs/toolkit";
import { householdsReducer } from "./household/householdSlice";
import { memberReducer } from "./member/memberSlice";
import { taskReducer } from "./task/taskSlice";
import { userReducer } from "./user/userSlice";
import { completedTaskReducer } from "./completedTask/completedTaskSlice";

export const store = configureStore({
  reducer: {
    households: householdsReducer,
    users: userReducer,
    members: memberReducer,
    tasks: taskReducer,
    completedTasks: completedTaskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;