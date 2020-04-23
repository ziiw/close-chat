import {Fragment, useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import firebase from './../../utils/auth/initFirebase'

export const Link = props => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [showInputEmail, setShowInputEmail] = useState(false)
  const [validLink, setValidLink] = useState(false)
  
  useEffect( () => {
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      // setValidLink(true)
  
      const e = window.localStorage.getItem('emailForSignIn');
      if (!e) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        setShowInputEmail(true)
      } else {
        handleLogin(e)
      }
    }
  }, [])

  const handleLogin = (email) => {
    // The client SDK will parse the code from the link for you.
    firebase.auth().signInWithEmailLink(email, window.location.href)
    .then(function(result) {
      // Clear email from storage.
      window.localStorage.removeItem('emailForSignIn');
      // You can access the new user via result.user
      // Additional user info profile not available via:
      // result.additionalUserInfo.profile == null
      // You can check if the user is new or existing:
      // result.additionalUserInfo.isNewUser
      console.log(`Welcome ${result.user.email} !`)
      
      router.push('/account')
    })
    .catch(function(error) {
      // Some error occurred, you can inspect the code: error.code
      // Common errors could be invalid email and invalid or expired OTPs.
    });

  }

  return (
    <Fragment>
      {showInputEmail && (
        <Fragment>
          <p>Verify your email:</p>
          <input type='text' onChange={e => setEmail(e.target.value)} placeholder='email@example.com' />
          <button onClick={() => handleLogin(email)}>Login</button>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Link
