import styled from 'styled-components'
import Link from 'next/link'

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 2em;
  box-sizing: border-box;
`

const Logo = styled.div`
  span {
    position: relative;
    top: 3px;
    height: 1em;
    width: 3px;
    display: inline-block;
    background-color: white;
    margin-right: 10px;
  }
  a {
    color: black;
    text-decoration: none;
    margin-right: 10px;
  }
`

const Menu = styled.div`
  width: 20px;
  height: 10px;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
`

export const Nav = () => {
  return (
    <Wrapper>
      <Logo>
        <Link href={'/'}><a>Close</a></Link><span />
        <Link href='/signin'><a>Signin</a></Link>
        <Link href='/join'><a>Join</a></Link>
      </Logo>
      <Menu />
    </Wrapper>
  )
}

export default Nav