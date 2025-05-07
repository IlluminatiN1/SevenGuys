import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchMembersByUserId } from "./memberActions";
import { Member } from "../../data/data";

type MembersState = {
  members: Member[];
  currentMember: Member | null;
  loading: boolean;
  error: string | null;
};

const initialState: MembersState = {
  members: [],
  currentMember: null,
  loading: false,
  error: null,
};

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    clearCurrentMember(state) {
      state.currentMember = null; // Reset currentMember vid behov
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembersByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMembersByUserId.fulfilled, (state, action: PayloadAction<Member[]>) => {
        state.loading = false;
        state.members = action.payload;
      })
      .addCase(fetchMembersByUserId.rejected, (state, action: PayloadAction<string | null | undefined>) => {
        state.loading = false;
        state.error = action.payload ?? null; // Ensure error is null if undefined
      });
  },
});

export const { clearCurrentMember } = membersSlice.actions;
export const memberReducer = membersSlice.reducer;