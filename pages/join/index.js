import React, { Fragment, useState } from 'react'
import Title from './../../components/elements/h3'
import Nav from './../../components/landing/nav'
import EmailPasswordForm from './../../components/forms/emailPasswordForm'
import { SubmissionError } from 'redux-form'
import firebase from './../../utils/auth/initFirebase'
import Link from 'next/link'
import styled from 'styled-components'

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
const Wrapper = styled.div`
  max-width: 670px;
  max-height: 556px;
  border: 1px solid ${props => props.theme.colors.lightBlue};
  border-radius: 21px;
  display: flex;
  flex-direction: column;
  padding: 70px 100px;
  align-items: center;
  h3 {
    margin-top: 0px;
    margin-bottom: 2.5em;
  }
  p {
    align-self: flex-start;
    font-family: 'Product Sans Medium';
    margin-top: 0px;
  }
  button {
    margin-top: 50px;
  }
`

const Input = styled.input`
  min-width: 430px;
  height: 41px;
  padding-left: 18px;
  font-size: 18px;
  font-family: 'Product Sans Medium';
  border: 1px solid ${props => props.theme.colors.lightBlue};
  box-shadow: 0px 3px 7px ${props => props.theme.colors.lightBlue};
`

const CTA = styled.button`
  background-color: ${props => props.theme.colors.darkBlue};
  border-radius: 9px;
  border: none;
  box-shadow: 0px 3px 7px ${props => props.theme.colors.lightBlue};
  width: 230px;
  height: 53px;
  color: white;
  font-family: 'Product Sans Medium';
  font-size: 20px;
  &:hover {
    cursor: pointer;
  }
`

const Join = props => {
  const [email, setEmail] = useState('')
  const [showLogin, setShowLogin] = useState(false)
  
  const handleJoin = async () => {
    const api_route = '/join/link'
    const host = window.location.host
    const protocol = host.indexOf('localhost') === -1 ? 'https://' : 'http://'

    const actionCodeSettings = {
      url: `${protocol}${host}${api_route}`,
      handleCodeInApp: true
    };

    try {
      await firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
      window.localStorage.setItem('emailForSignIn', email);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Page>
      <Nav light={true} />
      <Wrapper>
        <Title>Create your account</Title>
        <p>Your email address</p>
        <Input type='text' onChange={e => setEmail(e.target.value)} placeholder='email@example.com' />
        <CTA onClick={handleJoin}>Join</CTA>
        {/* <EmailPasswordForm onSubmit={handleJoin} /> */}
        {showLogin && <p>Try <Link href='/login'><a>login</a></Link> instead.</p>}
      </Wrapper>
    </Page>
  )
}


export default Join