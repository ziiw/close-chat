// Group all reducers to this file
// Simplify the import in other files

import { combineReducers } from 'redux'

import general from './general'

export default (history) => combineReducers({
  general
})
