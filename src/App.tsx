import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
} from '@polkadot/extension-dapp'
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'
import { encodeAddress } from '@polkadot/util-crypto'
import { ApiPromise } from '@polkadot/api'
import type { Extrinsic } from '@polkadot/types/interfaces'
import { authorizeLinkWithAccount, connect } from './Utilts/linking-helpers'
import ky from 'ky'
import { SubmittableExtrinsic } from '@polkadot/api-base/types'

const Button = styled.button`
  height: 30px;
  width: 120px;
`
export const App = () => {
  const [enabled, setEnabled] = useState(false)
  const [api, setApi] = useState<ApiPromise | null>(null)
  const [accounts, setAccounts] = useState<string[]>([])
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null)

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

    console.log(selectedAccount)

    const didIdentifier = '4sSroywtBCByPzA1fsAH6d9wuVuCpQxgYrLaSbHu6KUNBSUU'

    const injector = await web3FromAddress(selectedAccount)

    const extrinsic = await authorizeLinkWithAccount(
      api,
      selectedAccount,
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
    api.disconnect()
    //TODO: Did Sign with Sporran
    // Result is "SubmittableExtrinsic" as hex
    const extrinsicHex = extrinsic.toHex()
    const outputFromSporran = await window.kilt.sporran.signExtrinsicWithDid(
      extrinsicHex,
      selectedAccount
    )

    const submittableExtrinsic = api.createType<
      SubmittableExtrinsic<'promise'>
    >('SubmittableExtrinsic', outputFromSporran)
    console.log(submittableExtrinsic.args)
  }

  return (
    <div>
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
      <Button onClick={() => handleClick()}>Click Here</Button>
      <div></div>
    </div>
  )
}
