// store/task/taskActions.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../config/firebase";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";

type TaskPayload = { householdId: string; title: string; description: string };

export const addTask = createAsyncThunk(
  "task/add",
  async ({ householdId, title, description }: TaskPayload, thunkAPI) => {
    try {
      const docRef = await addDoc(collection(db, `households/${householdId}/tasks`), {
        title,
        description,
        completed: false,
      });
      return { id: docRef.id, title, description, completed: false };
    } catch (error) {
      console.error("Error adding task:", error);
      return thunkAPI.rejectWithValue("Could not add task");
    }
  }
);