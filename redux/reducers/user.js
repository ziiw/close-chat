import { ACTIONS } from './../actions/user'

export default (state = {}, action) => {
  switch (action.type) {
    case ACTIONS.SIGNIN:
      return action.payload
      break
    default:
      return state
  }
}