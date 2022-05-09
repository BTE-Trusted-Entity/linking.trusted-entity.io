import React from 'react'
import styled from 'styled-components'
import { ReactComponent as HeaderBigLogo } from '../ImageAssets/header_bte_logo_left.svg'
import HeaderRight from '../ImageAssets/BG-Header-right.svg'
import Logo from '../ImageAssets/kilt_logo_header.svg'

const StyledHeader = styled.header`
  width: 100vw;
  background: url(${HeaderRight}) no-repeat top right/auto,
    url(${Logo}) no-repeat top 40px right 20px / auto 40px,
    radial-gradient(
      circle at top right,
      ${(props) => props.theme.headerpink} 0%,
      black 100%
    );
  display: flex;
  align-content: center;
  justify-content: center;
  margin-bottom: 20px;
  position: relative;
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
  color: ${(props) => props.theme.headerheading};
  font-size: 48px;
  font-weight: 200;
  letter-spacing: 0;
  line-height: 52px;

  @media (max-width: 500px) {
    font-size: 28px;
  }
`
export const Header = () => {
  return (
    <StyledHeader>
      <HeaderContainer>
        <LogoContainer>
          <HeaderBigLogo />
        </LogoContainer>
        <HeaderTextContainer>
          <HeaderHeading>Get Your Unique web3name</HeaderHeading>
        </HeaderTextContainer>
      </HeaderContainer>
    </StyledHeader>
  )
}
