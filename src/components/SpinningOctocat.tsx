import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Logo = styled.div`
  margin: 10rem;
  width: 10rem;
  height: 10rem;
  pointer-events: none;
  background-size: cover;
  background-image: url(https://github.githubassets.com/images/modules/logos_page/Octocat.png);
  @media (prefers-reduced-motion: no-preference) {
    animation: ${rotate} infinite 3s linear;
  }
`

export default Logo
