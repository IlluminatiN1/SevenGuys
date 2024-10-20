import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "../../config/firebase";
import { setUser, setError } from "./userSlice";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const signUpUser = createAsyncThunk(
  "user/signUp",
  async ({ username, password }: { username: string; password: string }, thunkAPI) => {
    try {
      const email = `${username}@gmail.com`;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

    // Store the username in Firestore
    console.log("Storing user data in Firestore");
    await setDoc(doc(db, "users", user.uid), {
      username,
    });
    console.log("User data stored in Firestore");

    thunkAPI.dispatch(setUser({ username }));
    return user;
    } catch (error: any) {
    console.error("Error creating user:", error.message);
    thunkAPI.dispatch(setError(error.message));
    return thunkAPI.rejectWithValue(error.message);
    }
  }
);