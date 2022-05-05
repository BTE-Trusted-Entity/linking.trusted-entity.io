import React, { useState } from 'react'
import { Steps } from './Guides'
import styled from 'styled-components'
import { isKiltDid, linkDidWithAccount } from '../Utilts/linking-helpers'
import { ReactComponent as Loader } from '../ImageAssets/oval.svg'
import { SubmittableExtrinsic } from '@kiltprotocol/types'
import { web3FromAddress } from '@polkadot/extension-dapp'

interface Wallet {
  linkingAccount: any
  did: string
  payerAccount: any
}
interface Button {
  disabled: boolean
}
const LinkingBtn = styled.button`
  display: flex;
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
  position: relative;
  cursor: pointer;
  color: ${(props: Button) =>
    props.disabled ? 'rgba(255, 255, 255, 0.3)' : 'white'};
  opacity: ${(props: Button) => props.disabled && 0.6};
  @media (max-width: 400px) {
    font-size: 16px;
  }
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.primary};
  letter-spacing: 0;
  width: 100%;

  p {
    font-size: 16px;
    line-height: 24px;
  }
  a {
    color: ${(props) => props.theme.pinklinks};
  }
  label {
    margin-left: 10px;
    margin-bottom: 10px;
    margin-top: 10px;
  }
`
const SuccessLabel = styled.label`
  color: green;
`
export const ErrorLabel = styled.label`
  color: red;
`
const LoaderSVG = styled(Loader)`
  position: absolute;
  top: 10px;
  right: 20px;
  opacity: 0.9;
`
export const AccountLinking = (props: Wallet) => {
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const [linking, setLinking] = useState<boolean>(false)

  const submitDidCall = async (
    payerAddress: string,
    extrinsic: SubmittableExtrinsic
  ) => {
    const injector = await web3FromAddress(payerAddress)
    return extrinsic.signAndSend(
      payerAddress,
      { signer: injector.signer },
      (result) => {
        if (result.status.isFinalized) {
          setLinking(false)
          setSuccessMessage('The Linking was successful')
        }
        if (result.status.isFinalityTimeout) {
          setLinking(false)
          setError('The Linking was unsuccessful')
        }
      }
    )
  }
  const handleLinking = async () => {
    if (linking) return
    setError(null)
    setSuccessMessage(null)
    if (!props.did || !props.linkingAccount || !props.payerAccount) {
      return
    }
    if (!isKiltDid(props.did)) {
      setError('Not a valid Kilt Did')
      return
    }
    setLinking(true)
    try {
      const result = await linkDidWithAccount(
        props.linkingAccount,
        props.payerAccount,
        props.did
      )
      await submitDidCall(result.payerAddress, result.submittableExtrinsic)
    } catch {
      setLinking(false)
      setError('Linking was unsuccessful')
    }
  }
  return (
    <Container>
      <Steps>
        9.&nbsp;&nbsp; Click “Link DID with Account” (By clicking this button,
        you accept the terms and conditions){' '}
      </Steps>
      <LinkingBtn
        disabled={!props.did || !props.linkingAccount || !props.payerAccount}
        onClick={() => handleLinking()}
      >
        Link Did with account
        {linking && <LoaderSVG />}
      </LinkingBtn>
      {error && <ErrorLabel>{error}</ErrorLabel>}
      {successMessage && <SuccessLabel>{successMessage}</SuccessLabel>}

      <p>
        This opens up Sporran which asks you to sign the linking. Enter your
        password there and click “Sign”
      </p>
      <p>
        Your Polkadot account extension will pop up. Enter your Polkadot account
        password and click “Sign”. (This involves a small transaction fee,
        currently around 0.0047 KILT)
        <br />
        <br />
        That's it.
      </p>
    </Container>
  )
}
