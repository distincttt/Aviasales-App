import { combineReducers } from "@reduxjs/toolkit";

import checkboxSlice from "./checkboxSlice";
import ticketsSlice from "./ticketsSlice";

export const rootReducer = combineReducers({ checkboxSlice, ticketsSlice });
