// store/household/householdActions.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { Household, Member } from "../../data/data";
import { generateRandomCode } from "../../utils/household/HouseholdCodeGenerator";
import { fetchMembersByUserId } from "../member/memberActions";

type HouseholdPayload = { name: string; userId: string; emojiId: string };
type GetHouseholdsPayload = { userId: string };
type HouseholdResponse = { household: Household; member: Member };
type HouseholdListReponse = { households: Household[] };

export const createHousehold = createAsyncThunk<
  HouseholdResponse,
  HouseholdPayload
>("household/create", async ({ name, userId, emojiId }, thunkAPI) => {
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
      emojiId,
    };
    await setDoc(memberRef, member);

    return { household, member }; // payload i action
  } catch (error) {
    console.error("Error creating household:", error);
    return thunkAPI.rejectWithValue("Could not create household");
  }
});

// getHouseholdsByUserId
export const getHouseholdsByUserId = createAsyncThunk<
  HouseholdListReponse,
  GetHouseholdsPayload
>("household/getHouseholdsbyId", async ({ userId }, thunkAPI) => {
  try {
    // Hämta medlemmar med hjälp av fetchMembersByUserId
    const membersResult = await thunkAPI.dispatch(fetchMembersByUserId(userId));

    // Kontrollera om anropet lyckades
    if (fetchMembersByUserId.fulfilled.match(membersResult)) {
      const members = membersResult.payload as Member[];

      // Om inga medlemmar hittades, returnera en tom lista med hushåll
      if (members.length === 0) {
        return { households: [] };
      }

      // Hämta householdId från varje medlem och filtrera bort undefined och null värden
      const householdIds = members
        .map((member) => member.householdId)
        .filter((id) => id !== undefined && id !== null); // Filtrera bort undefined och null värden

      // Om inga giltiga householdId hittades, returnera en tom lista med hushåll
      if (householdIds.length === 0) {
        return { households: [] };
      }

      // Skapa en query för att hämta hushåll baserat på householdId
      const qHouseholds = query(
        collection(db, "households"),
        where("id", "in", householdIds)
      );

      // Exekvera queryn och hämta resultaten
      const querySnapshot = await getDocs(qHouseholds);

      // Mappa resultaten till en lista med hushåll
      const households: Household[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Household[];

      console.log("Households:", households);

      return { households };
    } else {
      throw new Error("Failed to fetch members");
    }
  } catch (error) {
    // Logga eventuella fel och returnera ett avvisat värde
    console.error("Error getting households:", error);
    return thunkAPI.rejectWithValue("Could not get households");
  }
});
// getHouseholdByCode
