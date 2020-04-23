import styled from 'styled-components'
import Link from 'next/link'
import { useEffect } from 'react'

const Wrapper = styled.div`
  position: fixed;
  top: 0px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 2em;
`

const Logo = styled.div`
  span {
    position: relative;
    top: 4px;
    height: 1.1em;
    width: 3px;
    display: inline-block;
    background-color: ${props => props.light ? props.theme.colors.darkBlue : 'white'};
    margin-right: 10px;
  }
  a {
    color: ${props => props.theme.colors.darkBlue};
    text-decoration: none;
    margin-right: 10px;
    font-family: 'Product Sans Medium', Arial, sans-serif;
  }
`

const Menu = styled.div`
  width: 20px;
  height: 10px;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
`

export const Nav = props => {
  let isMobile = false

  useEffect(() => {
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }, [])
  
  return (
    <Wrapper>
      <Logo light={props.light}>
        <Link href={'/'}><a>close</a></Link><span />
        {!isMobile && !props.light && (
          <>
            <Link href='/signin'><a>signin</a></Link>
            <Link href='/join'><a>join</a></Link>
          </>
        )}
      </Logo>
      {isMobile && <Menu />}
    </Wrapper>
  )
}

export default Nav