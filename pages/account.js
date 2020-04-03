import React, { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import styled from 'styled-components'
import Title from './../components/elements/h1'
import firebase from './../lib/firebase'

const Account = props => {
  const [user, setUser] = useState(null)

  useEffect( () => {
    setUser(firebase.auth().currentUser)
  })

  const signout = () => firebase.auth().signOut()

  return (
    <Fragment>
      <Title>Account</Title><br></br>
      {user && <button onClick={signout}>Sign out</button>}
      {user && <p>{`Hello ${user.email}`}</p>}
      {user && user.emailVerified && <p>{`You email is valid`}</p>}
      {user && !user.emailVerified && <p>{`You email is not validated`}</p>}
    </Fragment>
  )
} 

// Prevent server side rendering
export default dynamic(() => Promise.resolve(Account), {
  ssr: false
})