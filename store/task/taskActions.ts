import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";

type TaskPayload = { householdId: string; title: string; description: string; isArchived: boolean; reoccurence: number; score: number };

export const addTask = createAsyncThunk(
  "task/add",
  async ({ householdId, title, description, isArchived, reoccurence, score }: TaskPayload, thunkAPI) => {
    try {
      const docRef = await addDoc(collection(db, "Tasks"), {
        householdId,
        title,
        description,
        completed: false,
        isArchived,
        reoccurence,
        score,
      });
      return { id: docRef.id, householdId, title, description, completed: false };
    } catch (error) {
      console.error("Error adding task:", error);
      return thunkAPI.rejectWithValue("Could not add task");
    }
  }
);