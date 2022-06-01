import React from 'react'
import styled from 'styled-components'
import { Header } from './Header'
import { Guides } from './Guides'
import { Footer } from './Footer'
import { ThemeProvider } from 'styled-components'
import { LightTheme } from '../Theme/light'
import { GettingSporran } from './GettingSporran'
import { CreateOnChainDID } from './CreateOnChainDID'
import { ClaimWeb3name } from './ClaimWeb3name'

const StyledBody = styled.div`
  min-height: 100vh;
  max-width: 100vw;
  background: linear-gradient(180deg, #ffffff 0%, #3c8690 100%);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  align-items: center;
  justify-content: flex-start;
  color: ${(props) => props.theme.primary};
`

export const App = () => {
  return (
    <ThemeProvider theme={LightTheme}>
      <StyledBody>
        <Header />
        <Guides />
        <GettingSporran />
        <CreateOnChainDID />
        <ClaimWeb3name />

        <Footer />
      </StyledBody>
    </ThemeProvider>
  )
}
