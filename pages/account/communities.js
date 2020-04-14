import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { get } from 'lodash/object'
import Title from './../../components/elements/h1'
import Nav from './../../components/nav/accountNav'
import { createCommunity, getCommunities } from './../../redux/actions/user'
import withAuthUser from './../../utils/pageWrappers/withAuthUser'
import withAuthUserInfo from './../../utils/pageWrappers/withAuthUserInfo'

const Communities = props => {
  const dispatch = useDispatch()
  const communities = useSelector(state => state.user.communities)
  const { AuthUserInfo } = props
  const AuthUser = get(AuthUserInfo, 'AuthUser', null)

  useEffect( () => {
    dispatch(getCommunities(AuthUser.id))
  }, []) 

  const handleCreate = () => {
    dispatch(createCommunity(AuthUser.id))
  }

  return (
    <Fragment>
      <Title>Communities</Title><br />
      <Nav />
      <button onClick={handleCreate}>Create a community</button>
      <h3>Your communities</h3>
      {communities.map(community => {
        return (
          <div key={community.created}>
            <p>{community.displayName}</p>
            <Link href='/community/[id]' as={`/community/${community.id}`}>
              <a target='_blank'>open subscribe page</a>
            </Link>
          </div>
        )
      })}
    </Fragment>
  )
} 

export default withAuthUser(withAuthUserInfo(Communities))