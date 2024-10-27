import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../config/firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { Member, mockedMembers } from "../../data/data";

export const createMember = createAsyncThunk(
  "member/createMember",
  async (Member: Member, thunkAPI) => {
    try {
      const memberDocRef = await addDoc(collection(db, "members"), Member);
      return { Member, id: memberDocRef.id };
    } catch (error) {
      console.error("Error creating member:", error);
      return thunkAPI.rejectWithValue("Could not create member");
    }
  }
);

export const updateMemberEmoji = createAsyncThunk(
  "member/updateMemberEmoji",
  async ({ memberId, emojiId }: { memberId: number; emojiId: number, }, thunkAPI) => {
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

