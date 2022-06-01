import React from 'react'
import styled from 'styled-components'

import HeaderBackground from '../ImageAssets/header_bg.png'
import BTE from '../ImageAssets/bte_logo.png'
import Kilt from '../ImageAssets/kilt_logo_header.svg'

const StyledHeader = styled.header`
  width: 100%;
  min-height: calc(410rem / 16);
  background: linear-gradient(
      4.28deg,
      rgba(0, 0, 0, 0.72) 0%,
      rgba(83, 142, 174, 0.03) 100%
    ),
    linear-gradient(
      343.63deg,
      rgba(0, 0, 0, 0.72) 0%,
      rgba(83, 142, 174, 0.03) 100%
    ),
    url(${HeaderBackground}) no-repeat center/cover;
  display: flex;
  place-content: center;
`

const Content = styled.div`
  max-width: 1250px;
  width: 85%;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
    padding-top: 3rem;
  }
`

const BTELogo = styled.img`
  height: 22rem;

  @media (max-width: 700px) {
    height: 15rem;
  }
`
const KiltLogo = styled.img`
  position: absolute;
  top: 2rem;
  right: 0;
  height: 1.75rem;
`

const Heading = styled.h1`
  width: 57%;
  min-width: 520px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  color: #ffffff;
  font-size: 2rem;
  font-weight: 300;
  line-height: 2rem;
  align-self: flex-end;
  margin-bottom: 3.5rem;

  @media (max-width: 1000px) {
    align-self: center;
    align-items: center;
  }
  @media (max-width: 700px) {
    font-size: 1.5rem;
  }
  @media (max-width: 400px) {
    font-size: 1.2rem;
  }
  @media (max-width: 300px) {
    font-size: 1rem;
  }
`

const HeadingTop = styled.span``

const TextLarge = styled.span`
  font-size: 2.25em;
  font-weight: 200;
  color: #c8ce94;
`

const HeadingBottom = styled.span`
  align-self: flex-end;

  @media (max-width: 1000px) {
    align-self: center;
  }
`

export const Header = () => {
  return (
    <StyledHeader>
      <Content>
        <BTELogo src={BTE} alt="Botlabs Trusted Entity logo" />
        <KiltLogo src={Kilt} alt="Built on KILT" />
        <Heading>
          <HeadingTop>
            <TextLarge>link</TextLarge> <span>your account addresses</span>
          </HeadingTop>
          <HeadingBottom>
            <span>with your unique web3name</span>
          </HeadingBottom>
        </Heading>
      </Content>
    </StyledHeader>
  )
}
