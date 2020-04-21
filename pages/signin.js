import React, { Fragment, useState } from 'react'
import { get } from 'lodash/object'
import withAuthUser from './../utils/pageWrappers/withAuthUser'
import withAuthUserInfo from './../utils/pageWrappers/withAuthUserInfo'
import Title from '../components/elements/h1'
import EmailPasswordForm from '../components/forms/emailPasswordForm'
import { SubmissionError } from 'redux-form'
import firebase from './../utils/auth/initFirebase'
import { useRouter } from 'next/router'

const Signin = props => {
  const router = useRouter()
  const { AuthUserInfo } = props
  const AuthUser = get(AuthUserInfo, 'AuthUser', null)

  const [showForm, setShowForm] = useState(false)

  const handleSignIn = async ({ email, password }) => {
    try {
      console.log('handleSignin')
      await firebase.auth().signInWithEmailAndPassword(email, password)
      router.push('/account')
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
      {AuthUser && !showForm && (
        <Fragment>
          <p>You are already connected, do you want to use this account?</p>
          <p>{AuthUser.email}</p>
          <button onClick={() => router.push('/account')}>Yes</button>
          <button onClick={handleShowForm}>Use an other one</button>
        </Fragment>
      )}
      {(!AuthUser || showForm) && <EmailPasswordForm onSubmit={handleSignIn} />}
    </Fragment>
  )
}


export default withAuthUser(withAuthUserInfo(Signin))
