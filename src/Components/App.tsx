import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Header } from './Header'
import { Guides } from './Guides'
import { Footer } from './Footer'
import { ThemeProvider } from 'styled-components'
import { LightTheme } from '../Theme/light'
import { GettingSporran } from './GettingSporran'

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
  font-family: 'Overpass';
  color: ${(props) => props.theme.primary};
`

export const App = () => {
  return (
    <ThemeProvider theme={LightTheme}>
      <StyledBody>
        <Header />
        <Guides />
        <GettingSporran />
        <GettingSporran />
        <GettingSporran />

        <Footer />
      </StyledBody>
    </ThemeProvider>
  )
}
