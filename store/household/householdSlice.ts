import { createSlice } from "@reduxjs/toolkit";
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
  //(1.) "Det som skrivs här" export const { "Skrivs också in här"} = todosSlice.actions;
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createHousehold.fulfilled, (state, action) => {
        state.list.push(action.payload.household);
        state.current = action.payload.household;
    });
  },
});
export const householdsReducer = householdSlice.reducer;
export const {} = householdSlice.actions;
