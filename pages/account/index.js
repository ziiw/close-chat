import React, { Fragment, useState, useEffect } from 'react'
import Title from './../../components/elements/h1'
import firebase from './../../utils/auth/initFirebase'
import { get } from 'lodash/object'
import withAuthUser from './../../utils/pageWrappers/withAuthUser'
import withAuthUserInfo from './../../utils/pageWrappers/withAuthUserInfo'
import { useRouter } from 'next/router'

const Account = props => {
  const router = useRouter()
  const { AuthUserInfo } = props
  const AuthUser = get(AuthUserInfo, 'AuthUser', null)
  
  const [redirectURI, setRedirectURI] = useState()

  const signout = () => {
    firebase.auth().signOut()
    router.push('/')
  }

  useEffect(() => {
    if (!redirectURI) {
      const api_route = '/api/account/stripe'
      const host = window.location.host
      const protocol = host.indexOf('localhost') === -1 ? 'https://' : 'http://'
      setRedirectURI(`${protocol}${host}${api_route}/${AuthUser && AuthUser.email}`)
    }
  })

  return (
    <Fragment>
      <Title>Account</Title><br />
      {AuthUser && <button onClick={signout}>Sign out</button>}
      {AuthUser && <p>{`Hello ${AuthUser.email}`}</p>}
      {AuthUser && AuthUser.emailVerified && <p>{`You email is valid`}</p>}
      {AuthUser && !AuthUser.emailVerified && <p>{`You email is not validated`}</p>}
      {AuthUser && redirectURI && <a href={`https://connect.stripe.com/express/oauth/authorize?redirect_uri=${redirectURI}&client_id=ca_H1BEnLhjmtGa2SV3dQWV3KFz3kgg24zx&state=234jkbkbu234bkjui99eff4b&stripe_user[business_type]=individual&stripe_user[email]=${AuthUser.email}`}>Connect with Stripe</a>}
    </Fragment>
  )
} 

export default withAuthUser(withAuthUserInfo(Account))