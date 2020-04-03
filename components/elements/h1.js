import styled from 'styled-components'

export default styled.h1`
  background: linear-gradient(90deg, rgba(9,9,121,1) 0%, rgba(0,133,145,1) 100%);
  background-clip: text;
  color: transparent;
  display: inline-block;
  font-family: ${props => props.theme.fonts.headings}
`