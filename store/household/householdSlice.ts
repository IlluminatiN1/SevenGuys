import { createSlice } from "@reduxjs/toolkit";
import { mockedHouseholds } from "../../data/data";
const householdSlice = createSlice({
    name: "households",
    initialState: mockedHouseholds,
    //(1.) "Det som skrivs här" export const { "Skrivs också in här"} = todosSlice.actions;
    reducers: {},
});
export const householdsReducer = householdSlice.reducer; 
export const { } = householdSlice.actions;
