import React from 'react'
import styled from 'styled-components'

const GuideContainer = styled.div`
  max-width: 1100px;
  width: 90%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 100px;
  @media (max-width: 900px) {
    justify-content: center;
  }
`
const LinksContainer = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
`
const HeadingSpan = styled.span`
  color: #43142b;
  font-size: 24px;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 26px;
  height: 31px;
  margin-bottom: 10px;
`
const LinksSpan = styled.span`
  display: flex;
  flex-direction: column;
  font-family: 'Overpass';

  gap: 10px;
  a {
    color: #871e50;
    font-family: 'Overpass';
    font-size: 16px;
    letter-spacing: 0;
    line-height: 17px;
  }
`
export const Guides = () => {
  return (
    <GuideContainer>
      <LinksContainer>
        <HeadingSpan>Index</HeadingSpan>
        <LinksSpan>
          <a href=" ">01. Download Sporran</a>
          <a href=" ">02. Download Sporran</a>
          <a href=" ">03. Download Sporran</a>
          <a href=" ">04. Download Sporran</a>
          <a href=" ">05. Download Sporran</a>
        </LinksSpan>
      </LinksContainer>
    </GuideContainer>
  )
}
