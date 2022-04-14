import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Header } from './Header'
import { Guides } from './Guides'
import { Footer } from './Footer'
import { ThemeProvider } from 'styled-components'
import { LightTheme } from '../Theme/light'
import { getPromoStatus } from '../Utilts/backend-requests-helpers'
import { PromoStatus } from './PromoStatus'

const StyledBody = styled.div`
  min-height: 100vh;
  max-width: 100vw;
  background: linear-gradient(
      180deg,
      ${(props) => props.theme.bodygradient} 0%,
      ${(props) => props.theme.bodygradient2} 100%
    ),
    linear-gradient(180deg, white 0%, white 100%);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  align-items: center;
  justify-content: flex-start;
  font-family: 'Overpass';
  color: ${(props) => props.theme.primary};
`

export const App = () => {
  const [promoStatus, setPromoStatus] = useState<string>('true')
  const [remainingPromos, setRemainingPromos] = useState<number>()

  useEffect(() => {
    const fetch = async () => {
      const promoResponse = await getPromoStatus()
      setPromoStatus(promoResponse.is_active.toString())
      setRemainingPromos(promoResponse.remaining_dids)
    }
    const interval = setInterval(() => {
      fetch()
    }, 5000)
    return () => clearInterval(interval)
  }, [])
  return (
    <ThemeProvider theme={LightTheme}>
      <StyledBody>
        <Header />
        <PromoStatus status={promoStatus} promos={remainingPromos} />
        <Guides />
        <Footer />
      </StyledBody>
    </ThemeProvider>
  )
}
