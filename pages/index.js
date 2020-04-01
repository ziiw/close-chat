import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

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
        <Title>Boilerplate</Title>
      </Fragment>
    )
  }
}

export default connect()(Index)
