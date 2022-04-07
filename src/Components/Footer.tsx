import React from 'react'
import styled from 'styled-components'
import { ReactComponent as FooterLogo } from '../ImageAssets/bte_logo_light.svg'

const StyledFooter = styled.div`
  background: radial-gradient(
    circle at top right,
    ${(props) => props.theme.headerpink} 0%,
    black 100%
  );
  min-height: fit-content;
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  margin-top: auto;
  justify-content: center;
  align-items: center;
  gap: 100px;
`
const Div = styled.div`
  max-width: 1100px;
  margin-bottom: 20px;
  width: 90%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    justify-content: center;
  }
`
const Imprint = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  letter-spacing: 0;
  line-height: 22px;

  span {
    color: ${(props) => props.theme.imprinttext};
  }
  a {
    color: ${(props) => props.theme.headerheading};
  }
  label {
    color: ${(props) => props.theme.headerheading};
    margin-bottom: 10px;
    margin-top: 40px;
  }
`
const MarginSpan = styled.span`
  margin-top: 10px;
`
const Logo = styled(FooterLogo)`
  fill: white;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  @media (max-width: 500px) {
    width: 100%;
    margin-top: 30px;
  }
`

export const Footer = () => {
  return (
    <StyledFooter>
      <Div>
        <Imprint>
          <label>Imprint</label>
          <span>B.T.E. BOTLabs Trusted Entity GmbH</span>
          <span>Keithstraße 2-4</span>
          <span>10787 Berlin, Germany</span>
          <span>
            Germany Commercial Court: Amtsgericht Charlottenburg in Berlin
          </span>
          <span>Registration Number: HRB 231219B</span>
          <span>VAT No: DE 346528612</span>
          <span>Managing Director: Ingo Rübe</span>
          <span>Contact: info@botlabs.org</span>
          <span>
            Or go to <a href=" ">Tech Support</a>and click on "Contact Us"
          </span>
          <MarginSpan>Requirements according to § 5 TMG (Germany)</MarginSpan>
        </Imprint>
        <Logo />
      </Div>
    </StyledFooter>
  )
}
