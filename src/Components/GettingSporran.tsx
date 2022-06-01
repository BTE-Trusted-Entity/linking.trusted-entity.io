import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
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

const ExtensionWrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  max-width: 550px;
  flex-wrap: wrap;
  flex-grow: 1;
`
const Extension = styled.div`
  height: 75.6px;
  width: 250px;
  box-shadow: 0 6px 8px 0 rgba(0, 0, 0, 0.25);
`
const ChromeExtension = styled(Extension)`
  background-image: url(${ChromeWebstore});
`
const FirefoxExtension = styled(Extension)`
  background-image: url(${FirefoxWebstore});
`
const LinkToGuide = styled.a`
  color: ${colors.white};
  font-family: Overpass;
  letter-spacing: 0.1px;
  line-height: 26px;
  word-break: normal;
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

  return (
    <Container aria-expanded={expanded}>
      <Heading onClick={handleExpand} expanded={expanded}>
        1. Get your Sporran wallet
      </Heading>

      {expanded && (
        <Content>
          The Sporran wallet is a browser extension that interacts with the KILT
          blockchain, displaying KILT Coin balances and enabling signing and
          sending transactions. The wallet also stores credentials, allowing you
          to build a decentralized digital identity and control who sees your
          data.
          <ExtensionWrapper>
            <ChromeExtension></ChromeExtension>
            <FirefoxExtension></FirefoxExtension>
          </ExtensionWrapper>
          <CollapseBtn
            onClick={() => setExpanded(false)}
            aria-label="Collapse content"
          />
        </Content>
      )}
    </Container>
  )
}
