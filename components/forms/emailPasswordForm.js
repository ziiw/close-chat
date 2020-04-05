import React from 'react'
import Link from 'next/link'
import { Field, reduxForm } from 'redux-form'

const displayError = error => {
  if (error === 'auth/wrong-password') {
    return <p>Invalid password or email.</p>
  } else if (error === 'auth/user-not-found') {
    return <p>Your email does not exists, try <Link href='/join'><a>join us</a></Link> instead.</p>
  }
  console.log(error)
}

const EmailPasswordForm = props => {
  const { handleSubmit, pristine, reset, submitting, error } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <div>
          <Field
            name="email"
            component="input"
            type="email"
            placeholder="Email"
          />
        </div>
      </div>
      <div>
        <label>Password</label>
        <div>
          <Field
            name="password"
            component="input"
            type="password"
            placeholder="Password"
          />
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
      </div>
      {error && displayError(error)}
    </form>
  )
}

export default reduxForm({
  form: 'emailPassword'
})(EmailPasswordForm)
