// Group all reducers to this file
// Simplify the import in other files

import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form'

import general from './general'
import user from './user'

export default (history) => combineReducers({
  general,
  user,
  form: formReducer
})
