import React from 'react'
import styled from 'styled-components'

interface Promo {
  status: string
  promos: number | undefined
}
interface Style {
  promo_end: boolean
}
const PromoContainer = styled.div`
  max-width: 1100px;
  width: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 40px;
  margin-bottom: 10px;
  gap: 20px;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
`
const HeadingSpan = styled.span`
  font-size: 20px;
  line-height: 30px;
  display: flex;
  text-transform: uppercase;
  font-weight: 400;
`
const RemainingSpan = styled.span`
  font-size: 18px;
  line-height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  color: ${(props: Style) => (props.promo_end ? 'red' : 'green')};
  text-transform: uppercase;
`
const SpacerElement = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${(props) => props.theme.primary};
  margin-top: 10px;
  opacity: 0.4;
`
export const PromoStatus = (props: Promo) => {
  return (
    <PromoContainer>
      <Wrapper>
        <HeadingSpan>Remaining Promos</HeadingSpan>
        <RemainingSpan promo_end={props.status === 'false'}>
          {props.promos}
        </RemainingSpan>
      </Wrapper>
      <Wrapper>
        <HeadingSpan>Promo Status</HeadingSpan>
        <RemainingSpan promo_end={props.status === 'false'}>
          {props.status === 'true' && 'Active'}
          {props.status === 'false' && 'Ended'}
          {props.status === 'Loading' && 'Loading...'}
        </RemainingSpan>
      </Wrapper>
      <SpacerElement />
    </PromoContainer>
  )
}
