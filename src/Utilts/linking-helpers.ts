import type {
  BlockNumber,
  Extrinsic,
  MultiSignature,
  AccountId,
} from '@polkadot/types/interfaces';
import type { AnyNumber } from '@polkadot/types/types';

import type { HexString } from '@polkadot/util/types';

import { ApiPromise, WsProvider } from '@polkadot/api';
import { KeypairType } from '@polkadot/util-crypto/types';

import { hexToU8a, u8aToHex } from '@polkadot/util';
import { wrapBytes } from '@polkadot/extension-dapp/wrapBytes';
import { encodeAddress, signatureVerify } from '@polkadot/util-crypto';
import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
} from '@polkadot/extension-dapp';

type AccountAddress = string;
type SignatureType = MultiSignature['type'];
type LinkingSignerCallback = (
  payload: HexString,
  address: AccountAddress,
) => Promise<HexString>;

export type InjectedAccount = Awaited<
  ReturnType<typeof getWeb3Accounts>
>[number];

export const connect = async () => {
  const ENDPOINT_URL = process.env.REACT_APP_CHAIN_ENDPOINT;
  const provider = new WsProvider(ENDPOINT_URL);
  return await ApiPromise.create({
    provider,
  });
};

const getApi = async (): Promise<ApiPromise> => {
  return await connect();
};

async function getWeb3Accounts() {
  await web3Enable('web3name by BTE');
  return web3Accounts();
}

export const getAccounts = async () => {
  const allAccounts = await getWeb3Accounts();
  const api = await getApi();
  const genesisHash = api.genesisHash.toHex();
  const filteredAccounts = allAccounts.filter(
    (account) =>
      !account.meta.genesisHash || account.meta.genesisHash === genesisHash,
  );
  api.disconnect();
  return { filteredAccounts, allAccounts };
};

export const linkDidWithAccount = async (
  linkingAccount: InjectedAccount,
  payerAccount: InjectedAccount,
  did: string,
) => {
  const api = await getApi();
  const ss58Prefix = api.registry.chainSS58;
  const payerAddress = payerAccount.address;
  const encodedAccountAddresses = encodeAddress(
    linkingAccount.address,
    ss58Prefix,
  );
  const injector = await web3FromAddress(encodedAccountAddresses);
  const didID = did.split(':').pop();
  if (!didID) throw Error('DID Address Undefined');
  const extrinsic = await authorizeLinkWithAccount(
    api,
    encodedAccountAddresses,
    didID,
    async (payload, address) => {
      if (!injector.signer.signRaw)
        throw Error("Extension doesn't support signRaw");
      const result = await injector.signer.signRaw({
        data: payload,
        address,
        type: 'bytes',
      });
      return result.signature;
    },
  );
  const signedOutputFromSporran =
    await window.kilt.sporran.signExtrinsicWithDid(
      extrinsic.toHex(),
      payerAddress,
    );

  const genericExtrinsic = api.createType(
    'Extrinsic',
    signedOutputFromSporran.signed,
  );
  const submittableExtrinsic = api.tx.did.submitDidCall(
    genericExtrinsic.args[0],
    genericExtrinsic.args[1],
  );
  return { payerAddress, submittableExtrinsic };
};
function getMultiSignatureTypeFromKeypairType(
  keypairType: KeypairType,
): SignatureType {
  switch (keypairType) {
    case 'ed25519':
      return 'Ed25519';
    case 'sr25519':
      return 'Sr25519';
    case 'ecdsa':
      return 'Ecdsa';
    default:
      throw new Error(`Unsupported signature algorithm '${keypairType}'`);
  }
}
export async function getAccountSignedAssociationTx(
  api: ApiPromise,
  account: AccountAddress | AccountId,
  signatureValidUntilBlock: AnyNumber,
  signature: Uint8Array | HexString,
  sigType: SignatureType,
): Promise<Extrinsic> {
  return api.tx.didLookup.associateAccount(account, signatureValidUntilBlock, {
    [sigType]: signature,
  });
}

export async function authorizeLinkWithAccount(
  api: ApiPromise,
  accountAddress: AccountAddress,
  didIdentifier: string,
  signingCallback: LinkingSignerCallback,
  nBlocksValid = 20,
): Promise<Extrinsic> {
  const blockNo = await api.query.system.number<BlockNumber>();
  const validTill = blockNo.addn(nBlocksValid);
  const signMe = wrapBytes(
    api.createType('(AccountId32, u64)', [didIdentifier, validTill]).toU8a(),
  );

  const signature = hexToU8a(
    await signingCallback(u8aToHex(signMe), accountAddress),
  );
  let result = {
    crypto: 'none',
    isValid: false,
  };

  try {
    result = signatureVerify(signMe, signature, accountAddress);
  } catch {
    console.log('Can not verify signature');
  }

  if (!result.isValid) throw new Error('signature not valid');
  const sigType = getMultiSignatureTypeFromKeypairType(
    result.crypto as KeypairType,
  );

  return getAccountSignedAssociationTx(
    api,
    accountAddress,
    validTill,
    signature,
    sigType,
  );
}
export const isKiltDid = (searchedText: string): boolean => {
  const kiltKeyword = searchedText.split(':').slice(1, -1);
  return kiltKeyword.includes('kilt') && kiltKeyword.length === 1;
};
