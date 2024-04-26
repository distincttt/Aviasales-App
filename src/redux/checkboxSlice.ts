/* eslint-disable no-fallthrough */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type PayloadType = "CHECK" | "CHECK_ALL" | "CHECK_FOUR";
export type PayloadKey =
   | "Все"
   | "Без пересадок"
   | "1 пересадка"
   | "2 пересадки"
   | "3 пересадки";

type InitialState = {
   Все: boolean;
   "Без пересадок": boolean;
   "1 пересадка": boolean;
   "2 пересадки": boolean;
   "3 пересадки": boolean;
};

const initialState: InitialState = {
   Все: true,
   "Без пересадок": true,
   "1 пересадка": true,
   "2 пересадки": true,
   "3 пересадки": true,
};

const checkboxSlice = createSlice({
   name: "app",
   initialState,
   reducers: (create) => ({
      checkedUpdate: create.reducer(
         (
            state,
            action: PayloadAction<{ type: PayloadType; key?: PayloadKey }>
         ) => {
            switch (action.payload.type) {
               case "CHECK":
                  if (!state["Все"] && action.payload.key) {
                     return {
                        ...state,
                        [action.payload.key]: !state[action.payload.key],
                     };
                  } else if (action.payload.key)
                     return {
                        ...state,
                        [action.payload.key]: !state[action.payload.key],
                        Все: false,
                     };
                  return state;
               case "CHECK_ALL":
                  if (!state["Все"]) {
                     return {
                        Все: true,
                        "Без пересадок": true,
                        "1 пересадка": true,
                        "2 пересадки": true,
                        "3 пересадки": true,
                     };
                  } else
                     return {
                        Все: false,
                        "Без пересадок": false,
                        "1 пересадка": false,
                        "2 пересадки": false,
                        "3 пересадки": false,
                     };
               case "CHECK_FOUR":
                  return {
                     Все: true,
                     "Без пересадок": true,
                     "1 пересадка": true,
                     "2 пересадки": true,
                     "3 пересадки": true,
                  };
            }
         }
      ),
   }),
});

export const { checkedUpdate } = checkboxSlice.actions;

export default checkboxSlice.reducer;
