import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Nav from '../components/landing/nav'
import Header from '../components/landing/header'
import Link from 'next/link'

const Title = styled.h1`
  color: grey;
`

const Page = styled.div`

`

class Index extends React.Component {

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <Fragment>
        <Nav />
        <Header />
      </Fragment>
    )
  }
}

export default connect()(Index)
