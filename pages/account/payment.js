import { Fragment, useEffect, useState } from 'react'
import Title from './../../components/elements/h1'
// import firebase from './../../lib/firebase'
import Nav from './../../components/nav/accountNav'

const Payment = props => {

  return (
    <Fragment>
      <Title>Payment</Title><br />
      <Nav />
    </Fragment>
  )
} 

// Prevent server side rendering
export default Payment