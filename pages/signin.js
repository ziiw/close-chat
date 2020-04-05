import React, { Fragment, useEffect, useState } from 'react'
import Title from '../components/elements/h1'
import EmailPasswordForm from '../components/forms/emailPasswordForm'
import { SubmissionError } from 'redux-form'
import firebase from './../lib/firebase'
import Router from 'next/router'

const Signin = () => {
  const [user, setUser] = useState()
  const [showForm, setShowForm] = useState(false)

  useEffect( () => {
    setUser(firebase.auth().currentUser)
  })

  const handleSignIn = async ({ email, password }) => {
    try {
      const resp = await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch ({code, message}) {
      throw new SubmissionError({_error: code})
    }
  }

  const handleShowForm = () => {
    setShowForm(true)
    firebase.auth().signOut()
  }

  return (
    <Fragment>
      <Title>Sign In</Title>
      {user && !showForm && (
        <Fragment>
          <p>You are already connected, do you want to use this account?</p>
          <p>{user.email}</p>
          <button onClick={() => Router.push('/account')}>Yes</button>
          <button onClick={handleShowForm}>Use an other one</button>
        </Fragment>
      )}
      {(!user || showForm) && <EmailPasswordForm onSubmit={handleSignIn} />}
    </Fragment>
  )
}


export default Signin