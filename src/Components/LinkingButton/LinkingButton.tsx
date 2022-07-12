import { useState } from 'react';

import { web3FromAddress } from '@polkadot/extension-dapp';
import { SubmittableExtrinsic } from '@polkadot/api/types';

import styles from './LinkingButton.module.css';

import {
  InjectedAccount,
  isKiltDid,
  linkDidWithAccount,
} from '../../Utilts/linking-helpers';

interface Wallet {
  linkingAccount?: InjectedAccount;
  did: string;
  payerAccount?: InjectedAccount;
}

export const LinkingButton = (props: Wallet) => {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [linking, setLinking] = useState(false);

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
          setLinking(false);
          setSuccessMessage('The Linking was successful');
        }
        if (result.status.isFinalityTimeout) {
          setLinking(false);
          setError('The Linking was unsuccessful');
        }
      },
    );
  };
  const handleLinking = async () => {
    if (linking) return;
    setError(null);
    setSuccessMessage(null);
    if (!props.did || !props.linkingAccount || !props.payerAccount) {
      return;
    }
    if (!isKiltDid(props.did)) {
      setError('Not a valid Kilt Did');
      return;
    }
    setLinking(true);
    try {
      const result = await linkDidWithAccount(
        props.linkingAccount,
        props.payerAccount,
        props.did,
      );
      await submitDidCall(result.payerAddress, result.submittableExtrinsic);
    } catch {
      setLinking(false);
      setError('Linking was unsuccessful');
    }
  };
  return (
    <div className={styles.container}>
      <button
        className={linking ? styles.loader : styles.linkingBtn}
        disabled={!props.did || !props.linkingAccount || !props.payerAccount}
        onClick={() => handleLinking()}
      >
        Link Did with account address
      </button>
      {error && <label className={styles.errorLabel}>{error}</label>}
      {successMessage && (
        <label className={styles.successLabel}>{successMessage}</label>
      )}
    </div>
  );
};
