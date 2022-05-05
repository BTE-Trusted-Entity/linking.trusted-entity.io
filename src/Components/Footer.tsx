import React from 'react'
import styled from 'styled-components'
import FooterLogo from '../ImageAssets/bte_logo_light.svg'

const StyledFooter = styled.footer`
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
  background: url(${FooterLogo}) no-repeat top 30px right/auto;
  margin-bottom: 20px;
  width: 90%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    justify-content: center;
  }
  @media (max-width: 850px) {
    background: none;
  }
`
const Imprint = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  letter-spacing: 0;
  line-height: 24px;

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
          <span>
            Contact: <a href="mailto:info@botlabs.org">info@botlabs.org</a>
          </span>
          <span>
            Or go to{' '}
            <a
              href="https://support.kilt.io/support/home"
              target="_blank"
              rel="noreferrer"
            >
              Tech Support
            </a>{' '}
            and click on "Contact Us"
          </span>
          <MarginSpan>Requirements according to § 5 TMG (Germany)</MarginSpan>
        </Imprint>
      </Div>
    </StyledFooter>
  )
}
