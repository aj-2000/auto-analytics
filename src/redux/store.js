import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./filtersSlice"
import { applyMiddleware } from 'redux';
import {  getDefaultMiddleware } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import tabsReducer from "./tabsSlice"
const store = configureStore({
    reducer:{
        filters: filtersReducer,
        middleware: [applyMiddleware(thunk), getDefaultMiddleware()],
        tabs: tabsReducer
    }
});

export default store