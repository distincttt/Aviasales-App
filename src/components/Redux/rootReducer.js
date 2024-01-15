import { combineReducers } from 'redux'

import { checkboxReducer } from './checkboxReducer'
import { ticketsReducer } from './ticketsReducer'
import { appReducer } from './appReducer'

export const rootReducer = combineReducers({ checkboxReducer, ticketsReducer, appReducer })
