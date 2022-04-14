import ky from 'ky'
import { KyInstance } from 'ky/distribution/types/ky'
import type { HexString } from '@polkadot/util/types'

export type Promo = {
  remaining_dids: number
  is_active: boolean
}
const getApiEndpoint = (): KyInstance => {
  switch (process.env.REACT_APP_CHAIN_ENDPOINT) {
    case 'wss://spiritnet.api.onfinality.io/public-ws':
    case 'wss://kilt-rpc.dwellir.com/':
    case 'wss://spiritnet.kilt.io': {
      return ky.create({ prefixUrl: 'https://did-promo.sporran.org/' })
    }
    case 'wss://peregrine.kilt.io/parachain-public-ws': {
      return ky.create({
        prefixUrl: 'https://peregrine-did-promo.sporran.org/',
      })
    }
    default:
      return ky.create({
        prefixUrl: 'https://peregrine-did-promo.sporran.org/',
      })
  }
}
export const getPayerAccount = async (): Promise<string> => {
  const status = (await getApiEndpoint().get('promo_status').json()) as any
  const accountAddress = status.account
  return accountAddress
}
export const getPromoStatus = async (): Promise<Promo> => {
  const response = (await getApiEndpoint().get('promo_status').json()) as any
  const promoStatus: Promo = {
    remaining_dids: response.remaining_dids,
    is_active: response.is_active,
  }
  return promoStatus
}
export const submitDidRequest = async (
  call: HexString,
  signature: HexString
): Promise<any> => {
  const jsonResponse = (await getApiEndpoint()
    .post('submit_did_call', {
      json: {
        call: call,
        signature: signature,
      },
    })
    .json()) as any
  return jsonResponse.tx_hash
}
export const checkFinalTrans = async (tx_hash: HexString): Promise<boolean> => {
  return await getApiEndpoint()
    .get('wait_finalized', { searchParams: { tx_hash }, timeout: false })
    .json()
}
