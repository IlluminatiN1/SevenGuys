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

    return serializedCompletedTask;
  } catch (error) {
    return thunkAPI.rejectWithValue("Could not add completed task");
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