import React, { useCallback, useRef, useState } from 'react'
import styled from 'styled-components'

import { useScrollIntoView } from '../Hooks/useScrollIntoView'

import ExpandIcon from '../ImageAssets/Open.svg'
import CollapseIcon from '../ImageAssets/Close.svg'
import ChromeWebstore from '../ImageAssets/chrome_webstore.svg'
import FirefoxWebstore from '../ImageAssets/firefox_webstore.svg'

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
  padding: 0 1.25rem 2.5rem 1.25rem;

  @media (max-width: 500px) {
    padding-bottom: 3.25rem;
  }
`

const Subheading = styled.p`
  margin-top: 0;
  line-height: 1.5rem;
`

const ExtensionWrapper = styled.div`
  display: flex;
  gap: 10px;
  padding-left: 1.75rem;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
  justify-content: space-between;
  max-width: 550px;
  flex-wrap: wrap;
  flex-grow: 1;

  @media (max-width: 700px) {
    justify-content: center;
    padding: 0;
  }
`

const Extension = styled.div`
  height: calc(75.6rem / 16);
  width: calc(250rem / 16);
  box-shadow: 0 6px 8px 0 ${colors.boxShadow};
`

const ChromeExtension = styled(Extension)`
  background: url(${ChromeWebstore}) no-repeat;
`

const FirefoxExtension = styled(Extension)`
  background: url(${FirefoxWebstore}) no-repeat;
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

export const GettingSporran = () => {
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
        1. Get your Sporran wallet
      </Heading>

      {expanded && (
        <Content>
          <Subheading>
            The Sporran wallet is a browser extension that interacts with the
            KILT blockchain, displaying KILT Coin balances and enabling signing
            and sending transactions. The wallet also stores credentials,
            allowing you to build a decentralized digital identity and control
            who sees your data.
          </Subheading>
          <ExtensionWrapper>
            <a
              href="https://chrome.google.com/webstore/detail/djdnajgjcbjhhbdblkegbcgodlkkfhcl"
              target="_blank"
              rel="noreferrer"
            >
              <ChromeExtension />
            </a>
            <a
              href="https://addons.mozilla.org/firefox/addon/sporran/"
              target="_blank"
              rel="noreferrer"
            >
              <FirefoxExtension />
            </a>
          </ExtensionWrapper>
          <LinkParagraph>
            <LinkToGuide
              href="https://www.trusted-entity.io/assets/pdf/Create-KILT-Sporran-Identity.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Guide to downloading Sporran (PDF)
            </LinkToGuide>
          </LinkParagraph>
          <LinkParagraph>
            <LinkToGuide
              href="https://www.sporran.org"
              target="_blank"
              rel="noreferrer"
            >
              Read additional information on Sporran.org
            </LinkToGuide>
          </LinkParagraph>
          <LinkParagraph>
            <LinkToGuide
              href="https://www.sporran.org/terms.html"
              target="_blank"
              rel="noreferrer"
            >
              Terms and Conditions of the Sporran wallet
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
