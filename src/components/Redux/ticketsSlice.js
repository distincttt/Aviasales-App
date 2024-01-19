import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit'

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

const ticketsSlice = createAppSlice({
  name: 'tickets',
  initialState: { tickets: [], loading: false, error: false, stop: false },
  reducers: (create) => ({
    errorOff: create.reducer((state) => {
      state.error = false
    }),
    ticketsSave: create.reducer((state, action) => {
      state.tickets = [...action.payload.ticketsSortArr]
    }),
    ticketsLoad: create.asyncThunk(
      async (_, { dispatch, rejectWithValue }) => {
        try {
          const searchId = await fetch('https://aviasales-test-api.kata.academy/search')
          const jsonSearchId = await searchId.json()
          const response = await fetch(
            `https://aviasales-test-api.kata.academy/tickets?searchId=${jsonSearchId.searchId}`
          )
          const jsonResponse = await response.json()
          if (!jsonResponse.stop) dispatch(ticketsLoad())
          return jsonResponse
        } catch (error) {
          setTimeout(() => {
            dispatch(errorOff())
          }, 3000)
          return rejectWithValue(error.message)
        }
      },
      {
        pending: (state) => {
          state.loading = true
        },
        fulfilled: (state, action) => {
          state.stop = action.payload.stop
          state.tickets.push(...action.payload.tickets)
        },
        rejected: (state, action) => {
          state.loading = false
          state.error = `${action.payload}, please wait...`
        },
      }
    ),
  }),
})

export const { ticketsLoad, ticketsSave, errorOff } = ticketsSlice.actions

export default ticketsSlice.reducer
