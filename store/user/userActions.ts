import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";

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

export const updateUsername = createAsyncThunk<void, string>(
  "user/updateUsername",
  async (newUsername, thunkApi) => {
    const userId = auth.currentUser?.uid;
    if (!userId) return thunkApi.rejectWithValue("User is not logged in");

    try {
      const userDocRef = doc(db, "members", userId);
      await updateDoc(userDocRef, {
        username: newUsername,
      });
    } catch (error) {
      return thunkApi.rejectWithValue("Could not update username");
    }
  }
);

export const signOutUser = createAsyncThunk<void>(
  "user/sign-out",
  async (_, thunkApi) => {
    try {
      await signOut(auth);
    } catch (error) {
      return thunkApi.rejectWithValue("Could not sign out user");
    }
  }
);
