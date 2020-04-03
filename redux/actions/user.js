import fetch from 'node-fetch'
import firebase from './../../lib/firebase'

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