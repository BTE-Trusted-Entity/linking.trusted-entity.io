import { useCallback, useState } from 'react';
import { Did, DidUri } from '@kiltprotocol/sdk-js';

import * as styles from './LinkingButton.module.css';

import {
  getApi,
  getAssociateTx,
  InjectedAccount,
  submitCall,
} from '../../Utilts/linking-helpers';
import { LinkingModal } from '../Popup/Popup';

export type LinkingSteps = 1 | 2 | 3 | 4;

interface Props {
  linkingAccount?: InjectedAccount;
  did?: DidUri;
  payerAccount?: InjectedAccount;
}

export function LinkingButton({ did, linkingAccount, payerAccount }: Props) {
  const [linkingStatus, setLinkingStatus] = useState<
    'linking' | 'success' | 'error' | undefined
  >();

  const [linkingStep, setLinkingStep] = useState<LinkingSteps>(1);

  const handleLinking = useCallback(async () => {
    try {
      if (!did || !linkingAccount || !payerAccount) {
        return;
      }
      Did.validateUri(did, 'Did');

      setLinkingStatus('linking');
      setLinkingStep(1);

      const api = await getApi();
      api.once('disconnected', () =>
        setLinkingStatus((current) =>
          current === 'linking' ? 'error' : current,
        ),
      );

      const associateTx = await getAssociateTx(
        linkingAccount,
        payerAccount,
        did,
      );
      setLinkingStep(2);

      const { signed } = await window.kilt.sporran.signExtrinsicWithDid(
        associateTx.toHex(),
        payerAccount.address,
      );
      setLinkingStep(3);

      await submitCall(payerAccount, api.tx(signed));

      setLinkingStatus('success');
      setLinkingStep(4);
    } catch (error) {
      console.error(error);
      setLinkingStatus('error');
    }
  }, [did, linkingAccount, payerAccount]);

  const handleSuccess = useCallback(() => {
    if (!linkingAccount) throw new Error('No linking account');

    window.open(
      `${process.env.REACT_APP_W3NID_ENDPOINT}/${linkingAccount.address}`,
    );
    setLinkingStatus(undefined);
    setLinkingStep(1);
  }, [linkingAccount]);

  return (
    <div className={styles.container}>
      <button
        className={styles.linkingBtn}
        disabled={!did || !linkingAccount || !payerAccount}
        onClick={handleLinking}
      >
        Link DID with account
      </button>

      <LinkingModal
        linkingStatus={linkingStatus}
        onClose={() => setLinkingStatus(undefined)}
        onSuccess={handleSuccess}
        linkingStep={linkingStep}
      />
    </div>
  );
}
