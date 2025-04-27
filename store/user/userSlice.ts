import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import { signUpUser, signOutUser } from "./userActions";

interface UserState {
  user?: User;
  error?: string;
}

const initialState: UserState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload || undefined;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.rejected, (state, action) => {
        state.error = action.payload as any;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.user = undefined;
      });
  },
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
