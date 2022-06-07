import React, { useState } from 'react'
import styled from 'styled-components'
import { SubmittableExtrinsic } from '@kiltprotocol/types'
import { web3FromAddress } from '@polkadot/extension-dapp'

import { isKiltDid, linkDidWithAccount } from '../Utilts/linking-helpers'

import { ReactComponent as Loader } from '../ImageAssets/oval.svg'

import { colors } from '../Theme/colors'

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
  height: 60px;
  border-radius: 15px;
  border: ${(props: Button) =>
    props.disabled
      ? `1px solid ${colors.borderDisabled}`
      : `1px solid ${colors.white}`};
  box-shadow: 0 6px 8px 0 ${colors.boxShadow};
  background: ${colors.oliveGreen};
  box-shadow: -2px 8px 12px 0 ${colors.optionShadow};
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
  text-transform: uppercase;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  color: ${(props: Button) =>
    props.disabled ? colors.buttonDisabled : 'white'};
  opacity: ${(props: Button) => props.disabled && 0.6};
  max-width: calc(535rem / 16);
  @media (max-width: 400px) {
    font-size: 16px;
  }
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const SuccessLabel = styled.label`
  margin-top: 1rem;
  color: green;
`
export const ErrorLabel = styled(SuccessLabel)`
  color: ${colors.errorRed};
`
const LoaderSVG = styled(Loader)`
  position: absolute;
  top: 10px;
  right: 20px;
  opacity: 0.9;
`
export const LinkingButton = (props: Wallet) => {
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
      <LinkingBtn
        disabled={!props.did || !props.linkingAccount || !props.payerAccount}
        onClick={() => handleLinking()}
      >
        Link Did with account address
        {linking && <LoaderSVG />}
      </LinkingBtn>
      {error && <ErrorLabel>{error}</ErrorLabel>}
      {successMessage && <SuccessLabel>{successMessage}</SuccessLabel>}
    </Container>
  )
}
