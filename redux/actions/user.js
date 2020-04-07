import fetch from 'node-fetch'

export const ACTIONS = {
  SIGNIN: 'SIGNIN'
}

export const signin = (user) => {
  return {
    type: ACTIONS.SIGNIN,
    payload: user
  }
}

export const signout = async () => {
  
}