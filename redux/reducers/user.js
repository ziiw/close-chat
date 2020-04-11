import { ACTIONS } from './../actions/user'

export default (state = {communities: []}, action) => {
  switch (action.type) {
    case ACTIONS.SIGNIN:
      return {
        ...state,
        auth: action.payload
      }
    case ACTIONS.CREATE_COMMUNITY:
      return {
        ...state,
        communities: [...state.communities, action.payload]
      }
    case ACTIONS.GET_COMMUNITIES:
      return {
        ...state,
        communities: action.payload
      }
    case ACTIONS.GET_COMMUNITY:
      return {
        ...state,
        communities: [...state.communities, action.payload]
      }
    default:
      return state
  }
}