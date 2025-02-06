import {
  web3Accounts,
  web3Enable,
  web3FromSource,
} from '@polkadot/extension-dapp';
import {
  Blockchain,
  ConfigService,
  connect,
  Did,
  DidUri,
  SubmittableExtrinsic,
  Utils,
} from '@kiltprotocol/sdk-js';

import { hexToU8a, u8aToString } from '@polkadot/util';

import { ETHEREUM_WALLET } from '../Components/Linking/Linking';

export type InjectedAccount = Awaited<
  ReturnType<typeof getWeb3Accounts>
>[number];

export async function getApi() {
  return await connect(process.env.REACT_APP_CHAIN_ENDPOINT as string);
}

async function getWeb3Accounts() {
  await web3Enable('Linking by KILT Foundation');
  return web3Accounts();
}

export async function getSubstrateAccounts() {
  const allAccounts = await getWeb3Accounts();
  const api = await getApi();
  const genesisHash = api.genesisHash.toHex();
  const kiltAccounts = allAccounts.filter(
    (account) =>
      !account.meta.genesisHash || account.meta.genesisHash === genesisHash,
  );
  api.disconnect();
  return { allAccounts, kiltAccounts };
}

async function getLinkingArguments(
  linkingAccount: InjectedAccount,
  did: DidUri,
) {
  if (linkingAccount.meta.source === ETHEREUM_WALLET) {
    const api = ConfigService.get('api');
    const blockNo = await api.query.system.number();

    const validTill = blockNo.addn(300);

    const challenge = u8aToString(
      await Did.getLinkingChallenge(did, validTill),
    );

    const signature = await window.ethereum.request({
      method: 'personal_sign',
      params: [challenge, linkingAccount.address],
    });

    return await Did.getLinkingArguments(
      linkingAccount.address,
      validTill,
      hexToU8a(signature),
      'ethereum',
    );
  }

  const address = Utils.Crypto.encodeAddress(
    linkingAccount.address,
    Utils.ss58Format,
  );
  const { signer } = await web3FromSource(linkingAccount.meta.source);

  return await Did.associateAccountToChainArgs(address, did, async (data) => {
    if (!signer.signRaw) {
      throw Error('Extension doesn’t support signRaw');
    }

    const type = 'bytes';
    const { signature } = await signer.signRaw({ data, address, type });

    return Utils.Crypto.coToUInt8(signature);
  });
}

export async function getAssociateTx(
  linkingAccount: InjectedAccount,
  did: DidUri,
) {
  const linkingArguments = await getLinkingArguments(linkingAccount, did);

  const api = ConfigService.get('api');
  return api.tx.didLookup.associateAccount(...linkingArguments);
}

export async function submitCall(
  payerAccount: InjectedAccount,
  tx: SubmittableExtrinsic,
) {
  const injected = await web3FromSource(payerAccount.meta.source);
  const signed = await tx.signAsync(payerAccount.address, injected);
  await Blockchain.submitSignedTx(signed);
}
