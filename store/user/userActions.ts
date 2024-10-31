import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "../../config/firebase";

export const signUpUser = createAsyncThunk<User, CredentialsPayload>(
  "user/sign-up",
  async ({ email, password }, thunkApi) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return result.user.toJSON() as User;
    } catch (error) {
      console.error(error);
      // Todo: reject with better error texts
      return thunkApi.rejectWithValue("Could not register user");
    }
  }
);

type CredentialsPayload = { email: string; password: string };

export const signInUser = createAsyncThunk<User, CredentialsPayload>(
  "user/sign-in",
  async ({ email, password }, thunkApi) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user.toJSON() as User;
    } catch (error) {
      console.error(error);
      // Todo: reject with better error texts
      return thunkApi.rejectWithValue("Could not login user");
    }
  }
);