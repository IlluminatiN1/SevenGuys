import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../config/firebase";
import { collection, setDoc, doc, updateDoc, query, where, getDocs } from "firebase/firestore";
import { Member, MemberCreate, mockedMembers } from "../../data/data";

export const createMember = createAsyncThunk(
  "member/createMember",
  async (memberData: MemberCreate, thunkAPI) => {
    try {
      const memberDocRef =  doc(collection(db, "members"));
      const member: Member = {
        id: memberDocRef.id,
        ...memberData,
      }
      await setDoc(memberDocRef, member);
      return member;
    } catch (error) {
      console.error("Error creating member:", error);
      return thunkAPI.rejectWithValue("Could not create member");
    }
  }
);

export const updateMemberEmoji = createAsyncThunk(
  "member/updateMemberEmoji",
  async ({ memberId, emojiId }: { memberId: string; emojiId: string, }, thunkAPI) => {
    try {
      const member = mockedMembers.find((m) => m.id === memberId);
      if (member) {
        member.emojiId = emojiId;
      }
      return { memberId, emojiId };
    } catch (error) {
      console.error("Error updating member emoji:", error);
      return thunkAPI.rejectWithValue("Could not update member emoji");
    }
  }
);

export const fetchMembersByUserId = createAsyncThunk<Member[], string>(
  "member/fetchMembersByUserId",
  async (userId, thunkAPI) => {
    try {
      // Kontrollera att userId är definierat
      if (!userId) {
        throw new Error("userId is undefined");
      }

      // Skapa en query för att hämta alla medlemmar där userId är lika med det specifika användar-ID:t
      const q = query(collection(db, "members"), where("userId", "==", userId));

      // Exekvera queryn och hämta resultaten
      const querySnapshot = await getDocs(q);

      // Mappa resultaten till en lista med medlemmar
      const members: Member[] = querySnapshot.docs
        .map((doc) => {
          const data = doc.data();
          if (!data.userId) {
            console.warn(`Document ${doc.id} is missing userId`);
            return null; // Eller hantera detta fall på ett annat sätt
          }
          return {
            id: doc.id,
            ...data,
          } as Member;
        })
        .filter((member) => member !== null); // Filtrera bort null-värden

      console.log("Members fetched:", members);
      // Returnera listan med medlemmar
      return members;
    } catch (error) {
      // Logga eventuella fel och returnera ett avvisat värde
      console.error("Error fetching members:", error);
      return thunkAPI.rejectWithValue("Could not fetch members");
    }
  }
);
