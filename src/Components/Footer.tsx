import React from 'react'
import styled from 'styled-components'

import Privacy from '../DocAssets/LinkAddressestoweb3nameWebsite_PrivacyPolicy_62022.docx.pdf'
import Terms from '../DocAssets/LinkAddressestoweb3nameWebsite_Terms_62022.docx.pdf'

import FooterBackground from '../ImageAssets/footer_bg.png'

import { colors } from '../Theme/colors'

const StyledFooter = styled.footer`
  background: url(${FooterBackground}) no-repeat center/cover;
  min-height: calc(410rem / 16);
  width: 100%;
  display: flex;
  place-content: center;
`
const Content = styled.div`
  max-width: 1250px;
  width: 82%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.75rem 0;
  font-size: 0.875rem;
`
const Anchor = styled.a`
  color: ${colors.textGreen};
  margin-bottom: 1rem;
`
const Imprint = styled.div`
  display: flex;
  flex-direction: column;
  color: ${colors.white};
`

const ImprintHeading = styled.h6`
  font-size: inherit;
  font-weight: normal;
  margin: 1rem 0;
`

const ImprintLine = styled.p`
  margin: 0;
`

const SpacedLine = styled(ImprintLine)`
  margin-top: 1rem;
`

export const Footer = () => {
  return (
    <StyledFooter>
      <Content>
        <Anchor href={Terms} target="_blank" rel="noreferrer">
          Terms & Conditions (PDF)
        </Anchor>
        <Anchor href={Privacy} target="_blank" rel="noreferrer">
          Privacy Policy (PDF)
        </Anchor>

        <Imprint>
          <ImprintHeading>Imprint</ImprintHeading>
          <ImprintLine>B.T.E. BOTLabs Trusted Entity GmbH</ImprintLine>
          <ImprintLine>Keithstraße 2-4</ImprintLine>
          <ImprintLine>10787 Berlin, Germany</ImprintLine>
          <ImprintLine>
            Germany Commercial Court: Amtsgericht Charlottenburg in Berlin
          </ImprintLine>
          <ImprintLine>Registration Number: HRB 231219B</ImprintLine>
          <ImprintLine>VAT No: DE 346528612</ImprintLine>
          <ImprintLine>Managing Director: Ingo Rübe</ImprintLine>
          <ImprintLine>
            Contact:{' '}
            <Anchor href="mailto:info@botlabs.org">info@botlabs.org</Anchor>
          </ImprintLine>
          <ImprintLine>
            Or go to{' '}
            <Anchor
              href="https://support.kilt.io/support/home"
              target="_blank"
              rel="noreferrer"
            >
              Tech Support
            </Anchor>{' '}
            and click on "Contact Us"
          </ImprintLine>

          <SpacedLine>Requirements according to § 5 TMG (Germany)</SpacedLine>

          <SpacedLine>
            &copy; 2022 B.T.E. BOTLabs Trusted Entity GmbH
          </SpacedLine>
        </Imprint>
      </Content>
    </StyledFooter>
  )
}
