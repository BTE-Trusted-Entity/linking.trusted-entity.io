import React from 'react'
import styled from 'styled-components'
import { Header } from './Header'
import { Guides } from './Guides'
import { Footer } from './Footer'
import { ThemeProvider } from 'styled-components'
import { LightTheme } from './Theme/light'

const StyledBody = styled.div`
  min-height: 100vh;
  max-width: 100vw;
  background: linear-gradient(
      180deg,
      ${(props) => props.theme.bodygradient} 0%,
      ${(props) => props.theme.bodygradient2} 100%
    ),
    linear-gradient(180deg, white 0%, white 100%);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  align-items: center;
  justify-content: flex-start;
  font-family: 'Overpass';
  color: ${(props) => props.theme.primary};
`

export const App = () => {
  return (
    <ThemeProvider theme={LightTheme}>
      <StyledBody>
        <Header />
        <Guides />
        <Footer />
      </StyledBody>
    </ThemeProvider>
  )
}
