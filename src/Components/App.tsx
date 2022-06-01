import React from 'react'
import styled from 'styled-components'
import { Header } from './Header'
import { Footer } from './Footer'
import { GettingSporran } from './GettingSporran'
import { CreateOnChainDID } from './CreateOnChainDID'
import { ClaimWeb3name } from './ClaimWeb3name'

const StyledBody = styled.div`
  min-height: 100vh;
  max-width: 100vw;
  overflow-y: auto;
  overflow-x: hidden;
`

export const App = () => {
  return (
    <StyledBody>
      <Header />
      <main>
        <GettingSporran />
        <CreateOnChainDID />
        <ClaimWeb3name />
      </main>
      <Footer />
    </StyledBody>
  )
}
