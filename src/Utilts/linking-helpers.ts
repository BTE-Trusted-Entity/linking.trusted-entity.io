import type { BlockNumber, Extrinsic } from '@polkadot/types/interfaces'
import { ApiPromise, WsProvider } from '@polkadot/api'
import type { MultiSignature, AccountId } from '@polkadot/types/interfaces'
import { KeypairType } from '@polkadot/util-crypto/types'
import type { AnyNumber } from '@polkadot/types/types'
import type { HexString } from '@polkadot/util/types'
import { signatureVerify } from '@polkadot/util-crypto'

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
  nBlocksValid = 10
): Promise<Extrinsic> {
  const blockNo = await api.query.system.number<BlockNumber>()
  const validTill = blockNo.addn(nBlocksValid)
  const signMe = api
    .createType('(AccountId, u64)', [didIdentifier, validTill])
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
