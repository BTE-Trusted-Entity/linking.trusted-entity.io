import React from 'react'
import styled from 'styled-components'

import { Linking } from './Linking'
import { GettingSporran } from './GettingSporran'
import { CreateOnChainDID } from './CreateOnChainDID'
import { ClaimWeb3name } from './ClaimWeb3name'

import InfoIcon from '../ImageAssets/info.svg'

import { colors } from '../Theme/colors'

const Container = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  background: linear-gradient(
    180deg,
    ${colors.white} 0%,
    ${colors.lightBlue} 100%
  );
`

const Content = styled.div`
  max-width: 1250px;
  width: 82%;
  padding: 1.25rem 0;
`

const Text = styled.p`
  margin: 0 0 0.5rem;
  font-size: 1.125rem;
  line-height: 1.25rem;
  letter-spacing: 0.1px;
  color: ${colors.dark};
`

const Info = styled.p`
  padding: 0.875rem 1.5rem 0.75rem calc(41rem / 16);
  background: url(${InfoIcon}) no-repeat top 0.625rem left 0.625rem,
    ${colors.lightBlue};
  border-radius: 0.75rem;
  color: ${colors.dark};
  letter-spacing: 0.1px;

  a {
    color: ${colors.ming};
  }
`

const Instructions = styled.h2`
  font-size: 1.125rem;
  font-weight: normal;
  letter-spacing: 0.11px;
  margin: 2rem 0 1rem;
`

const Bold = styled.span`
  font-weight: 700;
`

export const Main = () => {
  return (
    <Container>
      <Content>
        <Text>
          Linking your account addresses to your web3name and on-chain DID –
          your unique decentralized identifier – makes it easier for others to
          reference you.
        </Text>
        <Text>
          Follow the steps below to link your web3name to your Polkadot
          addresses and (coming soon), your Ethereum addresses.
        </Text>

        <Info>
          Before linking you need a Sporran wallet, an on-chain DID and a
          web3name. If you don’t already have them, scroll{' '}
          <a href="#instructions">down</a> for instructions on setting them up.
        </Info>

        <Linking />

        <Instructions id="instructions">
          <Bold>Instructions</Bold> on how to get your Sporran, on-chain DID and
          your web3name:
        </Instructions>
        <GettingSporran />
        <CreateOnChainDID />
        <ClaimWeb3name />
      </Content>
    </Container>
  )
}
