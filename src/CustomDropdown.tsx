import React, { useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as ArrowDown } from './ImageAssets/bte_Triangle.svg'
import { getPayerAccount } from './Utilts/backend-requests-helpers'

interface Style {
  borderRadius?: boolean
  options?: boolean
}
const SelectContainer = styled.div`
  display: flex;
  color: #43142b;
  margin-top: 10px;
  margin-bottom: 10px;
  letter-spacing: 0;
  max-width: 550px;
  box-sizing: border-box;
  height: 60px;
  border: 1px solid rgba(151, 151, 151, 0.5);
  border-radius: ${(props: Style) =>
    props.options ? '15px 15px 0 0' : '15px'};
  background-color: rgba(0, 0, 0, 0.1);
  box-shadow: inset 2px 2px 6px 0 rgba(0, 0, 0, 0.3);
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
const Selection = styled.div`
  height: 58px;
  width: 90%;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 28px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`
const Arrow = styled(ArrowDown)`
  margin-left: auto;
  transform: rotate(${(props: Style) => props.options && '180deg'});
`
const OptionBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  max-width: 555px;
  background-color: white;
  margin-top: -10px;
  border-radius: 0 0 15px 15px;
  box-shadow: -2px 8px 12px 0 rgba(0, 0, 0, 0.35);
`
const OptionsWrapper = styled.div`
  height: 60px;
  width: 100%;
  margin-top: 2px;
  background-color: #e4e4e4;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: ${(props: Style) => props.borderRadius && '0 0 15px 15px'};

  :hover {
    background-color: rgba(65, 19, 41, 0.5);
  }
`
const Options = styled.div`
  height: 58px;
  width: 90%;
  display: flex;
  align-items: center;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`

export const CustomDropdown = () => {
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const handleOptions = async () => {
    console.log(await getPayerAccount())
    if (showOptions) setShowOptions(false)
    else setShowOptions(true)
  }
  return (
    <Container>
      <SelectContainer options={showOptions} onClick={() => handleOptions()}>
        <Selection>
          KILT Identity 1 (Sporran)
          <Arrow options={showOptions} />
        </Selection>
      </SelectContainer>
      {showOptions && <OptionsComponent />}
    </Container>
  )
}
const OptionsComponent = () => {
  return (
    <OptionBoxContainer>
      <OptionsWrapper borderRadius>
        <Options>Polkadot Extension</Options>
      </OptionsWrapper>
    </OptionBoxContainer>
  )
}
