import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./filtersSlice";
import tabsReducer from "./tabsSlice";
//redux toolkit store configurations
const store = configureStore({
  reducer: {
    filters: filtersReducer,
    tabs: tabsReducer,
  },
});

export default store;
