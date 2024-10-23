import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../config/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { Task, TaskCreate } from "../../data/data";
import { createAppAsyncThunk } from "../hooks";

// Används för att skapa en asynkron funktion som kan användas i Redux
export const addTask = createAppAsyncThunk<Task, TaskCreate>(
  "task/add",
  async (taskPayload, thunkAPI) => {
    try {
      const state = thunkAPI.getState();

      const docRef = doc(collection(db, "Tasks"));
      const task: Task = {
        id: docRef.id,
        houseHoldId: state.households.current!.id,
        ...taskPayload,
      };

      await setDoc(docRef, task);
      return task;
    } catch (error) {
      console.error("Error adding task:", error);
      return thunkAPI.rejectWithValue("Could not add task");
    }
  }
);
