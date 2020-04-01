import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import baseReducers from './reducers/'

const state = { 
  
}

export function initializeStore(initialState = state) {
  return createStore(
    baseReducers(),
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}