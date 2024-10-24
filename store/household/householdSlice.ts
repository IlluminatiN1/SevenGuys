import { createSlice } from "@reduxjs/toolkit";
import { Household, mockedHouseholds } from "../../data/data";

type HouseHoldsState = {
    list: Household[];
    current?: Household;
}

const initialState: HouseHoldsState = {
    list: mockedHouseholds,
    current: mockedHouseholds[0],
};

const householdSlice = createSlice({
    name: "households",
    initialState,
    //(1.) "Det som skrivs här" export const { "Skrivs också in här"} = todosSlice.actions;
    reducers: {},
});
export const householdsReducer = householdSlice.reducer;
export const { } = householdSlice.actions;
