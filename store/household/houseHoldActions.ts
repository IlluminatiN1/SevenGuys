// store/household/householdActions.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { generateRandomCode } from "../../utils/household/HouseholdCodeGenerator";

type HouseholdPayload = { name: string };

export const createHousehold = createAsyncThunk(
  "household/create",
  async ({ name }: HouseholdPayload, thunkAPI) => {
    try {
      console.log("Creating household");
      const code = generateRandomCode(8);
      const docRef = await addDoc(collection(db, "households"), {
        name,
        code,
      });
      console.log("Household created with ID:", docRef.id);
      return { id: docRef.id, name, code };
    } catch (error) {
      console.error("Error creating household:", error);
      return thunkAPI.rejectWithValue("Could not create household");
    }
  }
);
