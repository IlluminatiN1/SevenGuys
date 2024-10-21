// store/household/householdActions.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../config/firebase";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";

type HouseholdPayload = { name: string; owner: string; members: string[] };

export const createHousehold = createAsyncThunk(
  "household/create",
  async ({ name, owner, members }: HouseholdPayload, thunkAPI) => {
    try {
        console.log("Creating household");
      const docRef = await addDoc(collection(db, "households"), {
        name,
        owner,
        members,
      });
      console.log("Household created");
      return { id: docRef.id, name, owner, members };
    } catch (error) {
      console.error("Error creating household:", error);
      return thunkAPI.rejectWithValue("Could not create household");
    }
  }
);