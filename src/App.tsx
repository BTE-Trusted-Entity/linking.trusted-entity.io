import React from 'react'
import styled from 'styled-components'
import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
} from '@polkadot/extension-dapp'
import { encodeAddress } from '@polkadot/util-crypto'
import { authorizeLinkWithAccount, connect } from './Utilts/linking-helpers'

const Button = styled.button`
  height: 30px;
  width: 120px;
`
export const App = () => {
  const handleClick = async () => {
    const allInjected = await web3Enable('web3name-promo by BTE')
    const allAccounts = await web3Accounts()
    const didIdentifier = '4sSroywtBCByPzA1fsAH6d9wuVuCpQxgYrLaSbHu6KUNBSUU'
    const SENDER = allAccounts[0].address
    const injector = await web3FromAddress(SENDER)
    const api = await connect()
    const ss58Prefix = api.registry.chainSS58
    const addressForChain = encodeAddress(SENDER, ss58Prefix)
    const extrinsic = await authorizeLinkWithAccount(
      api,
      addressForChain,
      didIdentifier,
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
  }

  return (
    <div>
      <Button onClick={() => handleClick()}>Click Here</Button>
      <div></div>
    </div>
  )
}
