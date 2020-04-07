import React, { Fragment, useState } from 'react'
import Title from '../components/elements/h1'
import EmailPasswordForm from '../components/forms/emailPasswordForm'
import { SubmissionError } from 'redux-form'
import firebase from './../utils/auth/initFirebase'
import Link from 'next/link'

const Join = props => {
  const [showLogin, setShowLogin] = useState(false)
  
  const handleJoin = async ({ email, password }) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
    } catch ({code, message}) {
      setShowLogin(true)
      throw new SubmissionError({_error: message})
    }
  }

  return (
    <Fragment>
      <Title>Join</Title>
      <EmailPasswordForm onSubmit={handleJoin} />
      {showLogin && <p>Try <Link href='/login'><a>login</a></Link> instead.</p>}
    </Fragment>
  )
}


export default Join