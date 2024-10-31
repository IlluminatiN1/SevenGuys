import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../config/firebase";
import { collection, setDoc, doc, updateDoc } from "firebase/firestore";
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

