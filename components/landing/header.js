import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  background-color: ${props => props.theme.colors.background};
  padding-top: 10em;
  padding-bottom: 8em;
  padding-left: 2em;
  h1 {
    margin: 0;
  }
`

export const Header = () => {
  return (
    <Wrapper>
      <h1>Conversations<br />off the radar</h1>
    </Wrapper>
  )
}

export default Header