import { configureStore } from "@reduxjs/toolkit";
import { householdsReducer } from "./household/householdSlice";
import { userReducer } from "./user/userSlice";
import { memberReducer } from "./member/memberSlice";
import { taskReducer } from "./task/taskSlice";

export const store = configureStore({
    reducer: {
        households: householdsReducer,
        users: userReducer,
        members: memberReducer,
        tasks: taskReducer
        // completedTask
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch