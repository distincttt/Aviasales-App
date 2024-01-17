import { createSlice } from '@reduxjs/toolkit'

const checkboxSlice = createSlice({
  name: 'app',
  initialState: {
    Все: true,
    'Без пересадок': true,
    '1 пересадка': true,
    '2 пересадки': true,
    '3 пересадки': true,
  },
  reducers: (create) => ({
    checkedUpdate: create.reducer((state, action) => {
      switch (action.payload.type) {
        case 'CHECK':
          console.log(action.payload)
          if (!state['Все']) {
            return { ...state, [action.payload.key]: !state[action.payload.key] }
          } else return { ...state, [action.payload.key]: !state[action.payload.key], Все: false }
        case 'CHECK_ALL':
          if (!state['Все']) {
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
        case 'CHECK_FOUR':
          return {
            Все: true,
            'Без пересадок': true,
            '1 пересадка': true,
            '2 пересадки': true,
            '3 пересадки': true,
          }
      }
    }),
  }),
})

export const { checkedUpdate } = checkboxSlice.actions

export default checkboxSlice.reducer
