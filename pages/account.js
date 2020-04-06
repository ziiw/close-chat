import React, { Fragment, useEffect, useState } from 'react'
import Router from 'next/router'
import dynamic from 'next/dynamic'
import Title from './../components/elements/h1'
import firebase from './../lib/firebase'

const Account = props => {
  const [user, setUser] = useState()

  useEffect( () => {
    setUser(firebase.auth().currentUser)
  })

  const signout = () => firebase.auth().signOut()

  const api_route = '/api/account/stripe'
  const host = window.location.host
  const protocol = host.indexOf('localhost') === -1 ? 'https://' : 'http://'
  const redirect_uri = `${protocol}${host}${api_route}/${user && user.email}`

  return (
    <Fragment>
      <Title>Account</Title><br />
      {user && <button onClick={signout}>Sign out</button>}
      {user && <p>{`Hello ${user.email}`}</p>}
      {user && user.emailVerified && <p>{`You email is valid`}</p>}
      {user && !user.emailVerified && <p>{`You email is not validated`}</p>}
      {user && <a href={`https://connect.stripe.com/express/oauth/authorize?redirect_uri=${redirect_uri}&client_id=ca_H1BEnLhjmtGa2SV3dQWV3KFz3kgg24zx&state=234jkbkbu234bkjui99eff4b&stripe_user[business_type]=individual&stripe_user[email]=${user.email}`}>Connect with Stripe</a>}
    </Fragment>
  )
} 

// Prevent server side rendering
export default dynamic(() => Promise.resolve(Account), {
  ssr: false
})