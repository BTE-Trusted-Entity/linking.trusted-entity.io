import React, { useState } from 'react'
import styled from 'styled-components'
import ExpandIcon from '../ImageAssets/Open.svg'
import CollapseIcon from '../ImageAssets/Close.svg'
import ChromeWebstore from '../ImageAssets/chrome_webstore.svg'
import FirefoxWebstore from '../ImageAssets/firefox_webstore.svg'

import { colors } from '../Theme/colors'

interface Style {
  expand: boolean
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 1182px;
  width: 90%;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 12px;
  box-shadow: 0 6px 8px 0 rgba(0, 0, 0, 0.25);
  background-color: ${colors.turquoise};
  padding: 12px 20px 12px 20px;
  height: ${(props: Style) => (props.expand ? '344px' : '40px')};
  margin-bottom: 20px;
  transition: height 0.5s ease-in-out;
  position: relative;
  pointer-events: ${(props: Style) => props.expand && 'auto'};
`
const Heading = styled.h1`
  color: ${colors.white};
  font-family: Overpass;
  font-size: 1.7rem;
  font-weight: 300;
  letter-spacing: 0;
  margin-top: 5px;
  margin-bottom: 10px;
`
const Contents = styled.div`
  visibility: ${(props: Style) => (props.expand ? 'visible' : 'hidden')};
  opacity: ${(props: Style) => (props.expand ? '1' : '0')};
  transition: visibility 0.5s, opacity 0.5s linear;
  margin-right: 35px;
`
const SporranGuide = styled.p`
  color: ${colors.white};
  font-family: Overpass;
  letter-spacing: 0.1px;
  line-height: 26px;
  word-break: normal;
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
const ExpandBtn = styled.button`
  background: url(${ExpandIcon});
  height: 30px;
  width: 30px;
  position: absolute;
  right: 12px;
  bottom: 12px;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
`
const CollapseBtn = styled(ExpandBtn)`
  background: url(${CollapseIcon});
  background-repeat: no-repeat;
  cursor: pointer;
`

export const GettingSporran = () => {
  const [expand, setExpand] = useState<boolean>(false)
  return (
    <Container expand={expand}>
      <Heading>1. Get your Sporran wallet</Heading>
      <Contents expand={expand}>
        <SporranGuide>
          The Sporran wallet is a browser extension that interacts with the KILT
          blockchain, displaying KILT Coin balances and enabling signing and
          sending transactions. The wallet also stores credentials, allowing you
          to build a decentralized digital identity and control who sees your
          data.
        </SporranGuide>
        <ExtensionWrapper>
          <ChromeExtension></ChromeExtension>
          <FirefoxExtension></FirefoxExtension>
        </ExtensionWrapper>
      </Contents>
      {expand ? (
        <CollapseBtn onClick={() => setExpand(false)} />
      ) : (
        <ExpandBtn onClick={() => setExpand(true)} />
      )}
    </Container>
  )
}
