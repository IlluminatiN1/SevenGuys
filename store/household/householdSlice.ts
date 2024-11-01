import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Household, mockedHouseholds } from "../../data/data";
import { createHousehold } from "./houseHoldActions";

type HouseHoldsState = {
  list: Household[];
  current?: Household;
};

const initialState: HouseHoldsState = {
  list: mockedHouseholds,
  current: mockedHouseholds[0],
};

const householdSlice = createSlice({
  name: "households",
  initialState,
  reducers: {
     setCurrentHousehold(state, action: PayloadAction<Household>) {
      state.current = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createHousehold.fulfilled, (state, action) => {
        state.list.push(action.payload.household);
        state.current = action.payload.household;
    });
  },
});

export const { setCurrentHousehold } = householdSlice.actions;
export const householdsReducer = householdSlice.reducer;
