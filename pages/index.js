import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Link from 'next/link'

const Title = styled.h1`
  color: grey;
`
class Index extends React.Component {

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <Fragment>
        <Title>Close</Title>
        <Link href='/signin'><a>Signin</a></Link><br></br>
        <Link href='/Join'><a>Join</a></Link>
      </Fragment>
    )
  }
}

export default connect()(Index)
