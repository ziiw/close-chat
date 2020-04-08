import { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Title from './../../components/elements/h1'
import Nav from './../../components/nav/accountNav'
// import { getCommunities } from './../../redux/actions/user'

const Communities = props => {
  const dispatch = useDispatch()

  useEffect( () => {
    // Hydrate communities in state
    // getCommunities()
  })

  const handleCreate = () => {

  }

  return (
    <Fragment>
      <Title>Communities</Title><br />
      <Nav />
      <button onClick={handleCreate}>Create a community</button>
    </Fragment>
  )
} 

// Prevent server side rendering
export default Communities