import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
} from '@polkadot/extension-dapp'
import { encodeAddress } from '@polkadot/util-crypto'
import { ApiPromise } from '@polkadot/api'
import { authorizeLinkWithAccount, connect } from './Utilts/linking-helpers'
import ky from 'ky'
import { Header } from './Header'
import { Guides } from './Guides'

const Button = styled.button`
  height: 30px;
  width: 120px;
  margin-bottom: 20px;
`
const StyledBody = styled.div`
  min-height: 100vh;
  max-width: 100vw;
  background: linear-gradient(180deg, #fefefe 0%, rgba(52, 14, 32, 0.3) 100%),
    linear-gradient(180deg, #ffffff 0%, #ffffff 100%);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  align-items: center;
  justify-content: flex-start;
  font-family: 'Overpass';
`
const StyledInput = styled.input`
  width: 260px;
  margin-bottom: 20px;
  margin-top: 20px;
`
export const App = () => {
  const [enabled, setEnabled] = useState(false)
  const [api, setApi] = useState<ApiPromise | null>(null)
  const [accounts, setAccounts] = useState<string[]>([])
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null)
  const [didIdentifier, setDidIdentifier] = useState<string>('')

  const enable = async () => {
    await web3Enable('web3name-promo by BTE')
    setApi(await connect())
    setEnabled(true)
  }

  useEffect(() => {
    if (!api || !enabled) return
    ;(async () => {
      // @ts-ignore
      window.api = api
      const genesisHash = api.genesisHash.toHex()
      const allAccounts = await web3Accounts()
      const filteredAccounts = allAccounts.filter(
        (account) =>
          !account.meta.genesisHash || account.meta.genesisHash === genesisHash
      )
      const ss58Prefix = api.registry.chainSS58
      const encodedAccountAddresses = filteredAccounts.map((account) =>
        encodeAddress(account.address, ss58Prefix)
      )
      setAccounts(encodedAccountAddresses)
      setSelectedAccount(encodedAccountAddresses[0])
    })()
  }, [api, enabled])

  const handleClick = async () => {
    if (!api || !selectedAccount) return
    const injector = await web3FromAddress(selectedAccount)
    const didID = didIdentifier.split(':').pop()
    if (!didID) throw 'DID Address Undefined'
    const extrinsic = await authorizeLinkWithAccount(
      api,
      selectedAccount,
      didID,
      async (payload, address) => {
        if (!injector.signer.signRaw)
          throw Error("Extension doesn't support signRaw")
        const result = await injector.signer.signRaw({
          data: payload,
          address,
          type: 'bytes',
        })
        return result.signature
      }
    )
    api.disconnect()
    //TODO: Did Sign with Sporran
    // Result is "SubmittableExtrinsic" as hex
    const extrinsicHex = extrinsic.toHex()
    const outputFromSporran = await window.kilt.sporran.signExtrinsicWithDid(
      extrinsicHex,
      // TODO: get selectedAccount from backend, has to be submitter (https://peregrine-did-promo.sporran.org/promo_status)
      '4rzEE3upVsb75J2GXsQiRAKZJWe27r1m4PBbQGbx5KzcxMhK'
    )
    const submittableExtrinsic = api.createType(
      'Extrinsic',
      outputFromSporran.signed
    )
    const input = {
      call: submittableExtrinsic.args[0].toHex(),
      signature: submittableExtrinsic.args[1].toHex(),
    }
    const backendApi = ky.create({
      prefixUrl: 'https://peregrine-did-promo.sporran.org/',
    })

    const json = await backendApi
      .post('submit_did_call', { json: input })
      .json()

    let paramsObj: any = json
    let searchParams = new URLSearchParams(paramsObj)
    let response = await fetch(
      `https://peregrine-did-promo.sporran.org/wait_finalized?${searchParams.toString()}`
    )
    let body = await response.text()
    console.log(body)
  }
  return (
    <StyledBody>
      <Header />
      {/*<Guides />*/}

      <Button onClick={enable}>Enable Wallets</Button>

      <select
        onChange={(e) => {
          setSelectedAccount(e.target.value)
        }}
      >
        {accounts.map((account) => {
          return <option key={account}>{account}</option>
        })}
      </select>
      <StyledInput
        type="text"
        value={didIdentifier}
        onInput={(e) => setDidIdentifier((e.target as HTMLInputElement).value)}
        placeholder="Enter DID"
      ></StyledInput>
      <Button onClick={() => handleClick()}>Click Here</Button>
    </StyledBody>
  )
}
