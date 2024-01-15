const initialState = {
  Все: true,
  'Без пересадок': true,
  '1 пересадка': true,
  '2 пересадки': true,
  '3 пересадки': true,
}

export const checkboxReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHECK':
      return (() => {
        if (
          (action.key === '1 пересадка' ||
            action.key === '2 пересадки' ||
            action.key === '3 пересадки' ||
            action.key === 'Без пересадок') &&
          !state['Все']
        ) {
          return { ...state, [action.key]: !state[action.key] }
        } else return { ...state, [action.key]: !state[action.key], Все: false }
      })()

    case 'CHECK_ALL':
      return (() => {
        if (!state[action.key]) {
          return {
            Все: true,
            'Без пересадок': true,
            '1 пересадка': true,
            '2 пересадки': true,
            '3 пересадки': true,
          }
        } else
          return {
            Все: false,
            'Без пересадок': false,
            '1 пересадка': false,
            '2 пересадки': false,
            '3 пересадки': false,
          }
      })()
    case 'CHECK_FOUR':
      return (() => {
        return {
          Все: true,
          'Без пересадок': true,
          '1 пересадка': true,
          '2 пересадки': true,
          '3 пересадки': true,
        }
      })()
    default:
      return state
  }
}
