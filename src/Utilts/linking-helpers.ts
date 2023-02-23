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

export type InjectedAccount = Awaited<
  ReturnType<typeof getWeb3Accounts>
>[number];

export async function getApi() {
  return await connect(process.env.REACT_APP_CHAIN_ENDPOINT as string);
}

async function getWeb3Accounts() {
  await web3Enable('Linking by BOTLabs');
  return web3Accounts();
}

export async function getAccounts() {
  const allAccounts = await getWeb3Accounts();
  const api = await getApi();
  const genesisHash = api.genesisHash.toHex();
  const filteredAccounts = allAccounts.filter(
    (account) =>
      !account.meta.genesisHash || account.meta.genesisHash === genesisHash,
  );
  api.disconnect();
  return { filteredAccounts, allAccounts };
}

export async function getAssociateTx(
  linkingAccount: InjectedAccount,
  payerAccount: InjectedAccount,
  did: DidUri,
) {
  const encodedAccountAddresses = Utils.Crypto.encodeAddress(
    linkingAccount.address,
    Utils.ss58Format,
  );
  const { signer } = await web3FromSource(linkingAccount.meta.source);

  const args = await Did.associateAccountToChainArgs(
    encodedAccountAddresses,
    did,
    async (data) => {
      if (!signer.signRaw) {
        throw Error('Extension doesn’t support signRaw');
      }

      const { address } = payerAccount;
      const type = 'bytes';
      const { signature } = await signer.signRaw({ data, address, type });

      return Utils.Crypto.coToUInt8(signature);
    },
  );

  const api = ConfigService.get('api');
  return api.tx.didLookup.associateAccount(...args);
}

export async function submitCall(
  payerAccount: InjectedAccount,
  tx: SubmittableExtrinsic,
) {
  const injected = await web3FromSource(payerAccount.meta.source);
  const signed = await tx.signAsync(payerAccount.address, injected);
  await Blockchain.submitSignedTx(signed);
}
