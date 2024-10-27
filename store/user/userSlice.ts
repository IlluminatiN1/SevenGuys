import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  username: string | null;
  error: string | null;
}

const initialState: UserState = {
  username: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ username: string }>) {
      state.username = action.payload.username;
      state.error = null;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const { setUser, setError } = userSlice.actions;
export const userReducer =  userSlice.reducer;
