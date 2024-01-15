const initialState = { loading: false, error: false }

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADER_ON':
      return {
        ...state,
        loading: true,
      }
    case 'LOADER_OFF':
      return {
        ...state,
        loading: false,
      }
    case 'ERROR_ON':
      return {
        ...state,
        error: action.text,
      }
    case 'ERROR_OFF':
      return {
        ...state,
        error: false,
      }
    default:
      return state
  }
}
