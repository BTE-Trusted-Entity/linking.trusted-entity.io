import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import ExpandIcon from '../ImageAssets/Open.svg'
import CollapseIcon from '../ImageAssets/Close.svg'

import { colors } from '../Theme/colors'

interface Style {
  expanded: boolean
}

const Container = styled.section`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-width: 1182px;
  width: 82%;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 0.75rem;
  box-shadow: 0 0.375rem 0.5rem 0 rgba(0, 0, 0, 0.25);
  background-color: ${colors.turquoise};
  margin-bottom: 1.25rem;
  position: relative;

  &[aria-expanded='false'] {
    background: url(${ExpandIcon}) no-repeat right 0.5rem center,
      ${colors.turquoise};
  }
`

const Heading = styled.h1`
  box-sizing: border-box;
  color: ${colors.white};
  width: 100%;
  margin: 0;
  font-size: 1.7rem;
  font-weight: 300;
  padding: 0.75rem 1.25rem;
  cursor: ${({ expanded }: Style) => (expanded ? 'default' : 'pointer')};
  border-radius: inherit;
`

const Content = styled.div`
  color: ${colors.white};
  letter-spacing: 0.1px;
  word-break: normal;
  padding: 0 1.25rem 2.25rem 1.25rem;
`

const MainText = styled.p`
  margin-top: 0;
  line-height: 150%;
`

const LinkToGuide = styled.a`
  display: block;
  margin: 0.5rem 0.5rem;
  color: ${colors.white};
  text-decoration: underline;
`

const CollapseBtn = styled.button`
  background: url(${CollapseIcon}) no-repeat center/auto;
  position: absolute;
  height: 1.5rem;
  width: 1.5rem;
  right: 0.5rem;
  bottom: 1.25rem;
  border: none;
  cursor: pointer;
`

export const CreateOnChainDID = () => {
  const [expanded, setExpanded] = useState<boolean>(false)

  const handleExpand = useCallback(() => {
    if (expanded) {
      return
    }
    setExpanded(true)
  }, [expanded])

  return (
    <Container aria-expanded={expanded}>
      <Heading onClick={handleExpand} expanded={expanded}>
        2. Create your on-chain DID
      </Heading>

      {expanded && (
        <Content>
          <MainText>
            Your decentralized Identifier (DID) is a unique set of numbers and
            letters that represents your identity, like a digital fingerprint.
            When you upgrade to an on-chain DID, you can link multiple things to
            your DID including:
          </MainText>
          <ul>
            <li>Your unique web3name </li>
            <li>
              As many of your Polkadot ecosystem (and soon, Ethereum) addresses
              that you wish
            </li>
            <li>
              Any credentials you want to make public, such as social media
              handles, GitHub and email addresses
            </li>
            <li>Communication endpoints, e.g., your website</li>
          </ul>
          <p>
            Upgrading to an on-chain DID requires a deposit of 2 KILT and a
            small transaction fee (around 0.0045 KILT).
          </p>
          <ol>
            <li>Open your Sporran extension</li>
            <li>Click “Upgrade to on-chain DID”</li>
          </ol>
          <LinkToGuide
            href="https://www.trusted-entity.io/assets/pdf/Upgrading-to-on-chain-DID.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Guide to upgrading your DID (PDF)
          </LinkToGuide>
          <CollapseBtn
            onClick={() => setExpanded(false)}
            aria-label="Collapse content"
          />
        </Content>
      )}
    </Container>
  )
}
