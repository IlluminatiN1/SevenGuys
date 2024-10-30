import { configureStore } from "@reduxjs/toolkit";
import { householdsReducer } from "./household/householdSlice";
import { memberReducer } from "./member/memberSlice";
import tabTitleReducer from "./tabTitle/tabTitleReducer";
import { userReducer } from "./user/userSlice";

export const store = configureStore({
    reducer: {
        households: householdsReducer,
        users: userReducer,
        members: memberReducer,
        tabTitle: tabTitleReducer,
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch