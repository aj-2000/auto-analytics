import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
    displayCharts: "",
    displayRecords: "none"
}

export const tabsSlice = createSlice({
    name: 'tabs',
    initialState:initialStateValue,
    reducers: {
        viewCharts: (state) => {
            state['displayRecords'] = "none";
            state['displayCharts'] = "";
        },
        viewRecords: (state) => {
            state['displayRecords'] = "";
            state['displayCharts'] = "none";
        }
    }
})

export const  {viewCharts, viewRecords} = tabsSlice.actions;
export default tabsSlice.reducer;