import { combineReducers } from 'redux'

import checkboxSlice from './checkboxSlice'
import ticketsSlice from './ticketsSlice'

export const rootReducer = combineReducers({ checkboxSlice, ticketsSlice })
