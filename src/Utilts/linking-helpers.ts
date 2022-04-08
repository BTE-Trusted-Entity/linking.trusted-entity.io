import type { BlockNumber, Extrinsic } from '@polkadot/types/interfaces'
import { ApiPromise, WsProvider } from '@polkadot/api'
import type { MultiSignature, AccountId } from '@polkadot/types/interfaces'
import { KeypairType } from '@polkadot/util-crypto/types'
import type { AnyNumber } from '@polkadot/types/types'
import type { HexString } from '@polkadot/util/types'
import { encodeAddress, signatureVerify } from '@polkadot/util-crypto'
import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
} from '@polkadot/extension-dapp'
import { getPayerAccount, submitDidRequest } from './backend-requests-helpers'

type AccountAddress = string
type SignatureType = MultiSignature['type']

type LinkingSignerCallback = (
  payload: HexString,
  address: AccountAddress
) => Promise<HexString>

export const connect = async () => {
  const ENDPOINT_URL = process.env.REACT_APP_CHAIN_ENDPOINT
  const provider = new WsProvider(ENDPOINT_URL)
  return await ApiPromise.create({
    provider,
  })
}

const getApi = async (): Promise<ApiPromise> => {
  return await connect()
}
export const getFilteredAccounts = async () => {
  await web3Enable('web3name-promo by BTE')
  const allAccounts = await web3Accounts()
  const api = await getApi()
  const genesisHash = api.genesisHash.toHex()
  const filteredAccounts = allAccounts.filter(
    (account) =>
      !account.meta.genesisHash || account.meta.genesisHash === genesisHash
  )
  api.disconnect()
  return filteredAccounts
}
export const linkDidWithAccount = async (
  account: any,
  did: string
): Promise<HexString> => {
  const api = await getApi()
  const ss58Prefix = api.registry.chainSS58
  const encodedAccountAddresses = encodeAddress(account.address, ss58Prefix)
  const injector = await web3FromAddress(encodedAccountAddresses)
  const didID = did.split(':').pop()
  if (!didID) throw Error('DID Address Undefined')
  const extrinsic = await authorizeLinkWithAccount(
    api,
    encodedAccountAddresses,
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
  const payerAccountAddress = await getPayerAccount()
  const signedOutputFromSporran =
    await window.kilt.sporran.signExtrinsicWithDid(
      extrinsic.toHex(),
      payerAccountAddress
    )

  const submittableExtrinsic = api.createType(
    'Extrinsic',
    signedOutputFromSporran.signed
  )

  const tx_hash = await submitDidRequest(
    submittableExtrinsic.args[0].toHex(),
    submittableExtrinsic.args[1].toHex()
  )
  return tx_hash
}
function getMultiSignatureTypeFromKeypairType(
  keypairType: KeypairType
): SignatureType {
  switch (keypairType) {
    case 'ed25519':
      return 'Ed25519'
    case 'sr25519':
      return 'Sr25519'
    case 'ecdsa':
      return 'Ecdsa'
    default:
      throw new Error(`Unsupported signature algorithm '${keypairType}'`)
  }
}
export async function getAccountSignedAssociationTx(
  api: ApiPromise,
  account: AccountAddress | AccountId,
  signatureValidUntilBlock: AnyNumber,
  signature: Uint8Array | HexString,
  sigType: SignatureType
): Promise<Extrinsic> {
  return api.tx.didLookup.associateAccount(account, signatureValidUntilBlock, {
    [sigType]: signature,
  })
}

export async function authorizeLinkWithAccount(
  api: ApiPromise,
  accountAddress: AccountAddress,
  didIdentifier: string,
  signingCallback: LinkingSignerCallback,
  nBlocksValid = 20
): Promise<Extrinsic> {
  const blockNo = await api.query.system.number<BlockNumber>()
  const validTill = blockNo.addn(nBlocksValid)
  const signMe = api
    .createType('(AccountId32, u64)', [didIdentifier, validTill])
    .toHex()
  const signature = await signingCallback(signMe, accountAddress)
  const { crypto, isValid } = signatureVerify(signMe, signature, accountAddress)
  if (!isValid && crypto !== 'none') throw new Error('signature not valid')
  const sigType = getMultiSignatureTypeFromKeypairType(crypto as KeypairType)
  return getAccountSignedAssociationTx(
    api,
    accountAddress,
    validTill,
    signature,
    sigType
  )
}
export const isKiltDid = (searchedText: string): boolean => {
  const kiltKeyword = searchedText.split(':').slice(1, -1)
  return kiltKeyword.includes('kilt') && kiltKeyword.length === 1
}
