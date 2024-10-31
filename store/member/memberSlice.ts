import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateMemberEmoji } from "./memberActions";
import { Member } from "../../data/data";
import { createHousehold } from "../household/houseHoldActions";

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
    builder.addCase(createHousehold.fulfilled, (state, action) => {
      state.members.push(action.payload.member);
    })
  },
});


export const { setMembers } = memberSlice.actions;
export const memberReducer = memberSlice.reducer;


// UR EN KOMPONENTS PERSPEKTIV (VIEW)
// LÄSA
// const { members } = useContext(MemberContext);
// const members = useAppSelector(state => state.members.list)

// SKRIVA
// const { addMember } = useContext(MemberContext);
// addMember(....);

// const dispatch = useAppDispatch();
// dispatch(addMembers(...))