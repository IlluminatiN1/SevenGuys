import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
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
        householdId: state.households.current!.id,
        ...taskPayload,
      };

      await setDoc(docRef, task); // till firebase
      return task; // till redux (reducer)
    } catch (error) {
      console.error("Error adding task:", error);
      return thunkAPI.rejectWithValue("Could not add task");
    }
  }
);
