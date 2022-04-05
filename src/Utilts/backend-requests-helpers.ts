import ky from 'ky'
import { KyInstance } from 'ky/distribution/types/ky'
import type { HexString } from '@polkadot/util/types'

const getApiEndpoint = (): KyInstance => {
  switch (process.env.REACT_APP_CHAIN_ENDPOINT) {
    case 'wss://spiritnet.api.onfinality.io/public-ws' ||
      'wss://spiritnet.kilt.io': {
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
  const status: any = await getApiEndpoint().get('promo_status').json()
  const accountAddress = status.account
  return accountAddress
}
export const submitDidRequest = async (
  call: HexString,
  signature: HexString
): Promise<unknown> => {
  const jsonResponse = await getApiEndpoint()
    .post('submit_did_call', {
      json: {
        call: call,
        signature: signature,
      },
    })
    .json()
  return jsonResponse
}
export const checkFinalTrans = async (tx_hash: HexString): Promise<boolean> => {
  return await getApiEndpoint()
    .get('wait_finalized', { searchParams: { tx_hash }, timeout: false })
    .json()
}
