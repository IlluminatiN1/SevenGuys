import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import { signUpUser } from "./userActions";

interface UserState {
  user?: User;
  error?: string;
}

const initialState: UserState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.error = action.payload as any;
    })
  }
});

export const { setUser } = userSlice.actions;
export const userReducer =  userSlice.reducer;
