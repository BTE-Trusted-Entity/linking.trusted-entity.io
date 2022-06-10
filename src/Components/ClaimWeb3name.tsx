import React, { useCallback, useRef, useState } from 'react'
import styled from 'styled-components'

import { useScrollIntoView } from '../Hooks/useScrollIntoView'

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
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 0.75rem;
  box-shadow: 0 0.375rem 0.5rem 0 ${colors.boxShadow};
  background-color: ${colors.turquoise};
  margin-bottom: 1.25rem;
  position: relative;

  &[aria-expanded='false'] {
    background: url(${ExpandIcon}) no-repeat right 0.5rem top 1.125rem,
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
  padding: 0.75rem 2.5rem 0.75rem 1.25rem;
  cursor: ${({ expanded }: Style) => (expanded ? 'default' : 'pointer')};
  border-radius: inherit;
`

const Content = styled.div`
  color: ${colors.white};
  letter-spacing: 0.1px;
  word-break: normal;
  padding: 0 1.25rem 2.25rem 1.25rem;

  @media (max-width: 500px) {
    padding-bottom: 3.25rem;
  }
`

const Subheading = styled.p`
  margin-top: 0;
  line-height: 1.5rem;
`

const Steps = styled.ol`
  display: flex;
  flex-direction: column;
  list-style-position: inside;
  padding-left: 1.75rem;
  margin-top: 0.75rem;

  @media (max-width: 700px) {
    padding: 0;
  }
`

const Step = styled.li`
  line-height: 24px;
  margin-bottom: 1.25rem;
`

const LinkParagraph = styled.p`
  margin: 0.5rem 0;
  padding-left: 1.75rem;

  @media (max-width: 700px) {
    padding: 0;
  }
`

const LinkToGuide = styled.a`
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

export const ClaimWeb3name = () => {
  const [expanded, setExpanded] = useState<boolean>(false)

  const handleExpand = useCallback(() => {
    if (expanded) {
      return
    }
    setExpanded(true)
  }, [expanded])

  const cardRef = useRef<HTMLDivElement>(null)
  useScrollIntoView(expanded, cardRef)

  return (
    <Container aria-expanded={expanded} ref={cardRef}>
      <Heading onClick={handleExpand} expanded={expanded}>
        3. Claim your web3name
      </Heading>

      {expanded && (
        <Content>
          <Subheading>
            Your web3name is a custom name you create to represent your on-chain
            decentralized identifier (DID), which personalizes your digital
            identity.
          </Subheading>
          <p>
            Upgrading to an on-chain DID requires a deposit of 2 KILT and a
            small transaction fee (around 0.0045 KILT).
          </p>
          <Steps>
            <Step>Open your Sporran extension</Step>
            <Step>Click “Create web3name”</Step>
          </Steps>
          <LinkParagraph>
            <LinkToGuide
              href="https://www.trusted-entity.io/assets/pdf/How_To_Guide_web3name_link_address_Full_May22.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Guide to claiming your web3name (PDF)
            </LinkToGuide>
          </LinkParagraph>
          <CollapseBtn
            onClick={() => setExpanded(false)}
            aria-label="Collapse content"
          />
        </Content>
      )}
    </Container>
  )
}
