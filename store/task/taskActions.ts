import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
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

export const fetchTasks = createAppAsyncThunk<Task[], string>(
  "tasks/fetch",
  async (householdId, thunkAPI) => {
    try {
      const tasksQuery = query(
        collection(db, "Tasks"),
        where("householdId", "==", householdId)
      );
      const querySnapshot = await getDocs(tasksQuery);

      const tasks: Task[] = [];
      querySnapshot.forEach((doc) => {
        tasks.push({ id: doc.id, ...doc.data() } as Task);
      });

      return tasks;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return thunkAPI.rejectWithValue("Could not fetch tasks");
    }
  }
);
