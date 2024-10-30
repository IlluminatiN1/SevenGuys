import { createReducer } from "@reduxjs/toolkit";
import { setTabTitle } from "./tabTitleActions";
import { initialTabTitleState } from "./tabTitleState";


const tabTitleReducer = createReducer(initialTabTitleState, (builder) => {
    builder.addCase(setTabTitle, (state, action) => {
        state.tabTitle = action.payload;
    });
});
export default tabTitleReducer;