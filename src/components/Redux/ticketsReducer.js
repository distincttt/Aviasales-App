const initialState = { tickets: [] }

export const ticketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TICKETS_LOAD':
      return {
        // ...state,
        tickets: [...state.tickets, ...action.data],
      }
    case 'TICKETS_SORT':
      return {
        // ...state,
        tickets: [...action.data],
      }
    default:
      return state
  }
}
