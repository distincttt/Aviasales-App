import {
   buildCreateSlice,
   asyncThunkCreator,
   PayloadAction,
} from "@reduxjs/toolkit";

import ticketsJSON from "../data/tickets.json";
import { ITicket } from "../types/types";

interface InitialState {
   tickets: ITicket[];
   loading: boolean;
   error: boolean;
   stop: boolean;
}

const createAppSlice = buildCreateSlice({
   creators: { asyncThunk: asyncThunkCreator },
});

const initialState: InitialState = {
   tickets: ticketsJSON.tickets,
   loading: false,
   error: false,
   stop: false,
};

const ticketsSlice = createAppSlice({
   name: "tickets",
   initialState,
   reducers: (create) => ({
      errorOff: create.reducer((state) => {
         state.error = false;
      }),
      ticketsSave: create.reducer(
         (state, action: PayloadAction<{ ticketsSortArr: ITicket[] }>) => {
            state.tickets = [...action.payload.ticketsSortArr];
         }
      ),
   }),
});

export const { ticketsSave, errorOff } = ticketsSlice.actions;

export default ticketsSlice.reducer;
