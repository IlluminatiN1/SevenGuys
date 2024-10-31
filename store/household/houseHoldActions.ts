// store/household/householdActions.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../config/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { generateRandomCode } from "../../utils/household/HouseholdCodeGenerator";
import { Household, Member } from "../../data/data";

type HouseholdPayload = { name: string; userId: string };
type HouseholdResponse = {
  household: Household;
  member: Member;
};

export const createHousehold = createAsyncThunk<
  HouseholdResponse,
  HouseholdPayload
>("household/create", async ({ name, userId }, thunkAPI) => {
  try {
    console.log("Creating household");
    const code = generateRandomCode(4);
    // doc + setDoc = addDoc
    const householdRef = doc(collection(db, "households"));
    const household: Household = {
      id: householdRef.id,
      name,
      code,
    };
    await setDoc(householdRef, household);
    console.log("Household created with ID:", householdRef.id);

    const memberRef = doc(collection(db, "members"));
    const member: Member = {
      id: memberRef.id,
      name,
      householdId: householdRef.id,
      userId,
      isOwner: true,
      isRequest: false,
      emojiId: "1",
    };
    await setDoc(memberRef, member);

    return { household, member }; // payload i action
  } catch (error) {
    console.error("Error creating household:", error);
    return thunkAPI.rejectWithValue("Could not create household");
  }
});

// getHouseholdsByUserId
// getHouseholdByCode