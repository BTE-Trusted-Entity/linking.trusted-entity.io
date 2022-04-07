import React, { useState } from 'react'
import styled from 'styled-components'
import { CustomDropdown } from './CustomDropdown'
import { getFilteredAccounts } from './Utilts/linking-helpers'
import { ReactComponent as BTE1 } from './ImageAssets/bte_numbers_1.svg'
import { ReactComponent as BTE2 } from './ImageAssets/bte_numbers_2.svg'
import { ReactComponent as BTE3 } from './ImageAssets/bte_numbers_3.svg'
import { ReactComponent as Checkmark } from './ImageAssets/bte_check.svg'
import { ReactComponent as LoaderSVG } from './ImageAssets/oval.svg'

interface Button {
  disabled: boolean
}
const GuideContainer = styled.div`
  max-width: 1100px;
  width: 90%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 50px;
  margin-bottom: 80px;
  @media (max-width: 900px) {
    justify-content: center;
  }
`
export const Steps = styled.span`
  margin-top: 10px;
  font-size: 14px;
  line-height: 22px;
  font-size: 14px;
  margin-left: 10px;
`
const HeadTitle = styled.span`
  font-size: 24px;
  font-weight: 300;
  line-height: 37px;
`
const InputContainer = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  letter-spacing: 0;
  max-width: 550px;
  box-sizing: border-box;
  height: 60px;
  border: 1px solid rgba(151, 151, 151, 0.5);
  border-radius: 15px;
  background-color: rgba(0, 0, 0, 0.1);
  box-shadow: inset 2px 2px 6px 0 rgba(0, 0, 0, 0.3);
  align-items: center;
  justify-content: center;
`
const Input = styled.input`
  height: 58px;
  width: 90%;
  font-family: Overpass;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 28px;
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.primary};
  :focus {
    outline: none;
  }
`
const ConnectBtn = styled.button`
  display: flex;
  color: ${(props: Button) =>
    props.disabled ? 'rgba(255, 255, 255, 0.3)' : 'white'};
  margin-top: 10px;
  margin-bottom: 10px;
  letter-spacing: 0;
  height: 60px;
  border-radius: 15px;
  border: none;
  background: ${(props) =>
    `radial-gradient(circle at top right, ${props.theme.gradientpink} 0%, ${props.theme.gradientblack} 100%)`};
  box-shadow: -2px 8px 12px 0 rgba(0, 0, 0, 0.35);
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 28px;
  text-transform: uppercase;
  align-items: center;
  justify-content: center;
  cursor: ${(props: Button) => (props.disabled ? 'none' : 'pointer')};
  position: relative;
  opacity: ${(props: Button) => props.disabled && 0.6};
  @media (max-width: 400px) {
    font-size: 16px;
  }
`
const CheckIcon = styled(Checkmark)`
  position: absolute;
  top: 14px;
  right: 20px;
`
const Loader = styled(LoaderSVG)`
  position: absolute;
  top: 13px;
  right: 20px;
`
export const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  letter-spacing: 0;
  max-width: 550px;
  width: 90%;

  p {
    font-size: 14px;
    line-height: 22px;
  }
  a {
    color: ${(props) => props.theme.pinklinks};
  }
`
const SpacerElement = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${(props) => props.theme.primary};
  margin-top: 20px;
  margin-bottom: 20px;
  opacity: 0.4;
`
const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`
const ImageContainer = styled.div`
  display: flex;
  max-width: 500px;
  width: 50%;
  height: 100%;
  margin-top: 56px;
  align-items: flex-start;
  justify-content: center;
  margin-left: 20px;
  @media (max-width: 570px) {
    display: none;
  }
`

const MainText = () => {
  return (
    <StepsContainer>
      <HeadTitle>web3name</HeadTitle>
      <p>
        Your web3name (w3n) represents your unique on-chain decentralized
        identifier (DID), a string of letters and numbers that form the core of
        your KILT digital identity.
      </p>
      <p>
        web3name provides a unique personal and recognizable way to represent
        yourself across the Polkadot ecosystem. Validators and collators can
        customize a name that makes them easy to identify, and may link this
        name to all their different addresses in the Polkadot ecosystem. This
        name can also be used with <a href=" ">DIDsign</a>, adding an extra
        layer of verification when you share digital files you have signed.
      </p>
      <p>
        Normally, creating an on-chain DID and a web3name requires a deposit of
        around 2 KILT Coins and a small transaction fee. Now, for a limited
        time, you can create both your web3name and your on-chain DID for free.
      </p>
    </StepsContainer>
  )
}
const StepOne = () => {
  return (
    <Container>
      <StepsContainer>
        <HeadTitle>Getting started</HeadTitle>
        <p>
          In order to claim your name, you need a Sporran wallet and a KILT
          on-chain DID. Here’s how to <a href=" ">set up your Sporran</a>. Then
          you can create your free on-chain DID
        </p>
        <p>
          Once you have these, you’re ready to go. Just follow the steps below.
        </p>
      </StepsContainer>
      <ImageContainer>
        <BTE1 />
      </ImageContainer>
    </Container>
  )
}
const StepTwo = () => {
  return (
    <Container>
      <StepsContainer>
        <HeadTitle>Claim your name </HeadTitle>
        <Steps>1.&nbsp;&nbsp; Open your Sporran extension</Steps>
        <Steps> 2.&nbsp;&nbsp; Click “Create web3name”</Steps>
        <Steps>
          {' '}
          3.&nbsp;&nbsp; Click and read the Terms. If you agree, check the box
          “Use web3name Promo and accept Terms”. This will create a signed
          package that is sent to the web3name promo server for payment and
          submission to the blockchain.
        </Steps>
        <Steps>4.&nbsp;&nbsp; Click “Next Step”</Steps>
        <Steps>5.&nbsp;&nbsp; Enter the name you wish to claim.</Steps>
        <Steps>
          6.&nbsp;&nbsp; When you have chosen an available name, click “Next”
        </Steps>
        <Steps>
          7.&nbsp;&nbsp; Enter your Sporran password and click “Sign{' '}
        </Steps>
        <p>Congratulations, you now have your unique web3name!</p>
      </StepsContainer>
      <ImageContainer>
        <BTE2 />
      </ImageContainer>
    </Container>
  )
}
const StepThree = () => {
  const [accounts, setAccounts] = useState<any[]>([])
  const [did, setDid] = useState<string>('')
  const [loadingWallets, setLoadingWallets] = useState<boolean>(false)
  const loadWalletAccounts = async () => {
    setLoadingWallets(true)
    if (accounts.length) return
    const filteredAccounts = await getFilteredAccounts()
    setAccounts(filteredAccounts)
    setLoadingWallets(false)
  }
  return (
    <Container>
      <StepsContainer>
        <HeadTitle>Link your web3name to your account address</HeadTitle>
        <p>
          You may link your on-chain DID, with your new web3name, to any
          accounts you have in the Polkadot ecosystem.{' '}
        </p>
        <p>
          In this way, people with your Polkadot ecosystem account address will
          be able to see your DID and your web3 name and, vice versa, those with
          your web3name can see your public address. This is especially useful
          for validators and collators, who can provide a personalized name that
          makes them easily identifiable.
        </p>
        <p>To link your web3name to your ecosystem account address:</p>
        <Steps>1.&nbsp;&nbsp; Open your Sporran extension</Steps>
        <Steps> 2.&nbsp;&nbsp; Click “Manage on-chain DID” </Steps>
        <Steps>
          {' '}
          3.&nbsp;&nbsp; Click the icon to the right of your DID to copy it
        </Steps>
        <Steps>4.&nbsp;&nbsp; Paste your DID into the field below:</Steps>
        <InputContainer>
          <Input
            placeholder="Enter DID"
            onInput={(e) => setDid((e.target as HTMLInputElement).value)}
          />
        </InputContainer>
        <Steps>5.&nbsp;&nbsp; Click “Connect to wallet” </Steps>
        <ConnectBtn
          disabled={accounts.length > 0}
          onClick={() => loadWalletAccounts()}
        >
          {accounts.length > 0 ? 'Wallets Loaded' : 'Connect To Wallet'}
          {accounts.length > 0 && <CheckIcon />}
          {loadingWallets && <Loader />}
        </ConnectBtn>
        <p>
          This opens up pop-ups to request access to all your Polkadot-enabled
          extensions, including Sporran)
        </p>
        <Steps>6.&nbsp;&nbsp; Click “Allow access” on each wallet </Steps>
        <Steps>
          7.&nbsp;&nbsp; Click next to “Choose Account Name” in the dropdown
          list and choose the account you wish to link to your web3name{' '}
        </Steps>
        <CustomDropdown accounts={accounts} did={did} />
      </StepsContainer>
      <ImageContainer>
        <BTE3 />
      </ImageContainer>
    </Container>
  )
}
const TermsOfUse = () => {
  return (
    <StepsContainer>
      <HeadTitle>Terms & Conditions</HeadTitle>
      <p>
        <a href=" ">Terms PDF</a>.
        <br />
        <a href=" ">Privacy Policy PDF</a>
      </p>
    </StepsContainer>
  )
}
export const Guides = () => {
  return (
    <GuideContainer>
      <MainText />
      <SpacerElement />
      <StepOne />
      <SpacerElement />
      <StepTwo />
      <SpacerElement />
      <StepThree />
      <SpacerElement />
      <TermsOfUse />
    </GuideContainer>
  )
}
