import React from 'react'
import styled from 'styled-components'
import { ReactComponent as HeaderBigLogo } from './ImageAssets/header_bte_logo_left.svg'

const StyledHeader = styled.div`
  width: 100vw;
  background: radial-gradient(circle, #370f22 0%, #000000 100%);
  display: flex;
  align-content: center;
  justify-content: center;
  margin-bottom: 20px;
`
const HeaderContainer = styled.div`
  max-width: 1100px;
  width: 90%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  @media (max-width: 900px) {
    justify-content: center;
  }
`
const LogoContainer = styled.div`
  display: flex;
  max-width: 433px;
  width: 70%;
  @media (max-width: 500px) {
    svg {
      height: 95%;
    }
  }
`
const HeaderTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 50px;
  gap: 20px;
  width: 50%;
  @media (max-width: 900px) {
    width: 90%;
  }
`
const HeaderHeading = styled.span`
  color: #89c35b;
  font-size: 48px;
  font-weight: 200;
  letter-spacing: 0;
  line-height: 52px;

  @media (max-width: 500px) {
    font-size: 28px;
  }
`
const HeaderText = styled.span`
  color: #ffffff;
  font-size: 16px;
  letter-spacing: 0;
  line-height: 23px;
  text-align: justify;
  word-break: break-all;
`
export const Header = () => {
  return (
    <StyledHeader>
      <HeaderContainer>
        <LogoContainer>
          <HeaderBigLogo />
        </LogoContainer>
        <HeaderTextContainer>
          <HeaderHeading>Guide to your DID</HeaderHeading>
          <HeaderText>
            For a limited time, you can create your web3name and your on-chain
            DID for free.
          </HeaderText>
        </HeaderTextContainer>
      </HeaderContainer>
    </StyledHeader>
  )
}
