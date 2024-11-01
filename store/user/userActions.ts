import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";

type AuthData = {
  email: string;
  password: string;
  username?: string;
};

export const signUpUser = createAsyncThunk<User, AuthData>(
  "user/sign-up",
  async ({ email, password, username }, thunkApi) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = result.user.uid;

      if (userId && username) {
        await setDoc(doc(db, "members", userId), {
          email,
          username,
          createdAt: new Date(),
        });
      }

      return result.user.toJSON() as User;
    } catch (error) {
      return thunkApi.rejectWithValue("Could not register user");
    }
  }
);

export const signInUser = createAsyncThunk<User, AuthData>(
  "user/sign-in",
  async ({ email, password }, thunkApi) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user.toJSON() as User;
    } catch (error) {
      return thunkApi.rejectWithValue("Could not login user");
    }
  }
);