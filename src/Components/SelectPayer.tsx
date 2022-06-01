import React, { useState } from 'react'
import styled from 'styled-components'

import { ReactComponent as ArrowDown } from '../ImageAssets/bte_Triangle.svg'

import { colors } from '../Theme/colors'

interface Style {
  borderRadius?: boolean
  open?: boolean
}
interface Wallet {
  accounts: any[]
  selected: any
  onSelect: React.Dispatch<any>
}

const SelectContainer = styled.div`
  display: flex;
  color: ${(props) => props.theme.primary};
  margin-top: 10px;
  box-sizing: border-box;
  height: 60px;
  border-radius: ${(props: Style) => (props.open ? '15px 15px 0 0' : '15px')};
  background-color: ${colors.selectBackground};
  box-shadow: inset 2px 2px 6px 0 ${colors.selectShadow};
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
const Selection = styled.div`
  height: 58px;
  width: 90%;
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`
const Arrow = styled(ArrowDown)`
  margin-left: auto;
  transform: rotate(${(props: Style) => props.open && '180deg'});
`
const OptionBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  background-color: ${colors.white};
  margin-top: -10px;
  border-radius: 0 0 15px 15px;
  box-shadow: inset 2px 2px 6px 0 ${colors.selectShadow};
`
const OptionsWrapper = styled.div`
  height: 60px;
  width: 100%;
  margin-top: 2px;
  background-color: ${colors.optionBackground};
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: ${(props: Style) => props.borderRadius && '0 0 15px 15px'};

  :hover {
    background-color: ${colors.optionHover};
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
  max-width: calc(535rem / 16);
`

export const SelectPayer = (props: Wallet) => {
  const [showOptions, setShowOptions] = useState<boolean>(false)

  const openOptionsMenu = async () => {
    if (!props.accounts.length) return
    if (showOptions) setShowOptions(false)
    else setShowOptions(true)
  }
  const selectOptions = (account: any) => {
    props.onSelect(account)
    setShowOptions(false)
  }
  return (
    <Container>
      <SelectContainer open={showOptions} onClick={() => openOptionsMenu()}>
        <Selection>
          {props.selected
            ? `${props.selected.meta.name} (${props.selected.meta.source})`
            : 'Choose Payer Account'}
          <Arrow open={showOptions} />
        </Selection>
      </SelectContainer>
      {showOptions && (
        <OptionBoxContainer>
          {props.accounts.map((account, index) => (
            <OptionsWrapper
              key={account.address}
              borderRadius={index === props.accounts.length - 1}
              onClick={() => selectOptions(account)}
            >
              <Options>
                {account.meta.name} ({account.meta.source})
              </Options>
            </OptionsWrapper>
          ))}
        </OptionBoxContainer>
      )}
    </Container>
  )
}
