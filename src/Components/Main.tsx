import React from 'react'
import styled from 'styled-components'

import { colors } from '../Theme/colors'

import { ClaimWeb3name } from './ClaimWeb3name'
import { CreateOnChainDID } from './CreateOnChainDID'
import { GettingSporran } from './GettingSporran'

const Container = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(180deg, ${colors.white} 0%, #3c8690 100%);
`

export const Main = () => {
  return (
    <Container>
      <GettingSporran />
      <CreateOnChainDID />
      <ClaimWeb3name />
    </Container>
  )
}
