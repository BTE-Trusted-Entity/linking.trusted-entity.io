import React from 'react'
import styled from 'styled-components'

import { Header } from './Header'
import { Footer } from './Footer'
import { Main } from './Main'

const StyledBody = styled.div`
  min-height: 100vh;
  max-width: 100vw;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`

export const App = () => {
  return (
    <StyledBody>
      <Header />
      <Main />
      <Footer />
    </StyledBody>
  )
}
