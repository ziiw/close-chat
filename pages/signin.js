import React, { Fragment, useState } from 'react'
import Title from '../components/elements/h1'
import EmailPasswordForm from '../components/forms/emailPasswordForm'
import { SubmissionError } from 'redux-form'
import firebase from './../lib/firebase'
import Link from 'next/link'

const Signin = props => {
  const [showJoin, setShowJoin] = useState(false)
  
  const handleSignIn = async ({ email, password }) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch ({code, message}) {
      setShowJoin(true)
      throw new SubmissionError({_error: message})
    }
  }

  return (
    <Fragment>
      <Title>Sign In</Title>
      <EmailPasswordForm onSubmit={handleSignIn} />
      {showJoin && <p>Try <Link href='/join'><a>join us</a></Link> instead.</p>}
    </Fragment>
  )
}


export default Signin