import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { CompletedTask } from "../../data/data";
import { createAppAsyncThunk } from "../hooks";

type SerializableCompletedTask = Omit<CompletedTask, "date"> & { date: string };

export const addCompletedTask = createAppAsyncThunk<
  SerializableCompletedTask,
  Omit<CompletedTask, "id">
>("completedTask/add", async (completedTaskPayload, thunkAPI) => {
  try {
    const docRef = doc(collection(db, "completedtask"));

    const dateValue =
      completedTaskPayload.date instanceof Date
        ? completedTaskPayload.date
        : new Date(completedTaskPayload.date);

    const serializedCompletedTask: SerializableCompletedTask = {
      id: docRef.id,
      memberId: completedTaskPayload.memberId,
      taskId: completedTaskPayload.taskId,
      date: dateValue.toISOString(),
    };

    await setDoc(docRef, {
      id: serializedCompletedTask.id,
      memberId: serializedCompletedTask.memberId,
      taskId: serializedCompletedTask.taskId,
      date: serializedCompletedTask.date,
    });

    console.log("CompletedTask saved to Firestore:", serializedCompletedTask);
    return serializedCompletedTask;
  } catch (error) {
    return thunkAPI.rejectWithValue("Could not add completed task");
  }
});

export const fetchCompletedTasks = createAppAsyncThunk<
  SerializableCompletedTask[]
>("completedTask/fetchAll", async (_, thunkAPI) => {
  try {
    const snapshot = await getDocs(collection(db, "completedtask"));
    const completedTasks: SerializableCompletedTask[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      let dateString: string;

      
      if (data.date && typeof data.date.toDate === "function") {
        dateString = data.date.toDate().toISOString();
      } else if (typeof data.date === "string") {
        dateString = data.date;
      } else {
        dateString = new Date().toISOString();
      }

      return {
        id: doc.id,
        memberId: data.memberId,
        taskId: data.taskId,
        date: dateString,
      };
    });
    console.log("Fetched completedTasks from Firestore:", completedTasks);
    return completedTasks;
  } catch (error) {
    return thunkAPI.rejectWithValue("Could not fetch completed tasks");
  }
});

export const removeCompletedTasksByTaskId = createAppAsyncThunk<
  string, // Return taskId on success
  { taskId: string; memberId: string }
>("completedTask/removeByTaskId", async (payload, thunkAPI) => {
  try {
    const q = query(
      collection(db, "completedtask"),
      where("taskId", "==", payload.taskId),
      where("memberId", "==", payload.memberId)
    );

    const querySnapshot = await getDocs(q);

    const deletePromises = querySnapshot.docs.map((doc) => {
      return deleteDoc(doc.ref);
    });

    await Promise.all(deletePromises);

    return payload.taskId;
  } catch (error) {
    return thunkAPI.rejectWithValue("Could not remove completed tasks");
  }
});