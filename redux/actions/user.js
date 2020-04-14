import firebase from './../../utils/auth/initFirebase'
import fetch from 'node-fetch'

export const ACTIONS = {
  SIGNIN: 'SIGNIN',
  CREATE_COMMUNITY: 'CREATE_COMMUNITY',
  GET_COMMUNITIES: 'GET_COMMUNITIES',
  GET_COMMUNITY: 'GET_COMMUNITY',
}

export const signin = (user) => {
  return {
    type: ACTIONS.SIGNIN,
    payload: user
  }
}

export const signout = async () => {
  
}

export const getCommunity = communityId => {
  return async dispatch => {
    const ref = firebase.firestore().collection('communities').doc(communityId)
    const snap = await ref.get()

    dispatch({
      type: ACTIONS.GET_COMMUNITY,
      payload: snap.data()
    })
  }
}

export const getCommunities = creatorId => {
  return async dispatch => {
    const ref = firebase.firestore().collection('communities').where('ownerId', '==', creatorId)
    const snap = await ref.get()
    let communities = []

    if (!snap.empty) {
      snap.forEach(doc => {
        communities = [...communities, {id: doc.id, ...doc.data()}]
      })
    } 

    dispatch({
      type: ACTIONS.GET_COMMUNITIES,
      payload: communities    
    })
  }
}

export const createCommunity = creatorId => {
  return async dispatch => {
    const community_default = {
      ownerId: creatorId,
      displayName: 'My new community',
      created: Date.now(),
      public: false,
      channels: {
        general: []
      }
    }

    const community = await firebase.firestore().collection('communities').add(community_default)
    
    console.log('Firebase cretion answer', community)

    return dispatch({
      type: ACTIONS.CREATE_COMMUNITY,
      payload: community_default
    })
  }
}