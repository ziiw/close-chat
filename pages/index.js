import React, { Fragment } from 'react'
import styled from 'styled-components'
import Nav from '../components/landing/nav'
import Header from '../components/landing/header'

const Title = styled.h1`
  color: grey;
`

const Page = styled.div`

`

const Index = props => {
  return (
    <>
      <Nav />
      <Header />
    </>
  )
}

export default Index
