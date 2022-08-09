import { useCallback, useState } from 'react';

import { web3FromAddress } from '@polkadot/extension-dapp';
import { SubmittableExtrinsic } from '@polkadot/api/types';

import { encodeAddress } from '@polkadot/util-crypto';

import styles from './LinkingButton.module.css';

import {
  authorizeLinkWithAccount,
  getApi,
  InjectedAccount,
  isKiltDid,
} from '../../Utilts/linking-helpers';
import { LinkingModal } from '../Popup/Popup';

interface Wallet {
  linkingAccount?: InjectedAccount;
  did: string;
  payerAccount?: InjectedAccount;
}

export type LinkingSteps = 1 | 2 | 3 | 4;

export const LinkingButton = (props: Wallet) => {
  const [linkingStatus, setLinkingStatus] = useState<
    'linking' | 'success' | 'error' | undefined
  >();

  const [linkingStep, setLinkingStep] = useState<LinkingSteps>(1);

  const linkDidWithAccount = async (
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
    setLinkingStep(2);
    const signedOutputFromExtension =
      await window.kilt.sporran.signExtrinsicWithDid(
        extrinsic.toHex(),
        payerAddress,
      );

    const genericExtrinsic = api.createType(
      'Extrinsic',
      signedOutputFromExtension.signed,
    );
    setLinkingStep(3);
    const submittableExtrinsic = api.tx.did.submitDidCall(
      genericExtrinsic.args[0],
      genericExtrinsic.args[1],
    );

    return { payerAddress, submittableExtrinsic };
  };

  const submitDidCall = async (
    payerAddress: string,
    extrinsic: SubmittableExtrinsic<'promise'>,
  ) => {
    const injector = await web3FromAddress(payerAddress);
    return extrinsic.signAndSend(
      payerAddress,
      { signer: injector.signer },
      (result) => {
        if (result.status.isFinalized) {
          setLinkingStatus('success');
        }
        if (result.status.isFinalityTimeout) {
          setLinkingStatus('error');
        }
      },
    );
  };
  const handleLinking = async () => {
    setLinkingStep(1);

    if (!props.did || !props.linkingAccount || !props.payerAccount) {
      return;
    }
    setLinkingStatus('linking');

    if (!isKiltDid(props.did)) {
      setLinkingStatus('error');
      return;
    }

    try {
      const result = await linkDidWithAccount(
        props.linkingAccount,
        props.payerAccount,
        props.did,
      );
      await submitDidCall(result.payerAddress, result.submittableExtrinsic);
      setLinkingStep(4);
    } catch {
      setLinkingStatus('error');
    }
  };

  const handleSuccess = useCallback(() => {
    if (!props.linkingAccount) throw new Error('No linking account');

    const { address: linkedAccountAddress } = props.linkingAccount;

    window.open(
      `${process.env.REACT_APP_W3NID_ENDPOINT}/${linkedAccountAddress}`,
    );
    setLinkingStatus(undefined);
    setLinkingStep(1);
  }, [props.linkingAccount]);

  return (
    <div className={styles.container}>
      <button
        className={styles.linkingBtn}
        disabled={!props.did || !props.linkingAccount || !props.payerAccount}
        onClick={() => handleLinking()}
      >
        Link Did with account address
      </button>
      {
        <LinkingModal
          linkingStatus={linkingStatus}
          onClose={() => setLinkingStatus(undefined)}
          onSuccess={handleSuccess}
          linkingStep={linkingStep}
        />
      }
    </div>
  );
};
