// store/member/memberSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Member } from "../../data/data";
import { createMember, updateMemberEmoji } from "./memberActions";

interface MemberState {
  members: Member[];
  error: string | null;
}

const initialState: MemberState = {
  members: [],
  error: null,
};

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    setMembers(state, action: PayloadAction<Member[]>) {
      state.members = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createMember.fulfilled, (state, action) => {
      state.members.push(action.payload);
    });
    builder.addCase(createMember.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(updateMemberEmoji.fulfilled, (state, action) => {
      const { memberId, emojiId } = action.payload;
      const member = state.members.find((member) => member.id === memberId);
      if (member) {
        member.emojiId = emojiId;
      }
    });
    builder.addCase(updateMemberEmoji.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const { setMembers } = memberSlice.actions;
export default memberSlice.reducer;