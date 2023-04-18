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
import { SignExtrinsicWithDid } from '../../Utilts/types';

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

  const handleLinking = useCallback(
    async (signExtrinsicWithDid: SignExtrinsicWithDid) => {
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

        const associateTx = await getAssociateTx(linkingAccount, did);
        setLinkingStep(2);

        const { signed } = await signExtrinsicWithDid(
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
    },
    [did, linkingAccount, payerAccount],
  );

  const handleNoWallet = useCallback(() => {
    setLinkingStatus('error');
  }, []);
  const fakeWallet = { key: 'fake', name: 'Fake', handleClick: handleNoWallet };

  const handleSuccess = useCallback(() => {
    if (!linkingAccount) throw new Error('No linking account');

    window.open(
      `${process.env.REACT_APP_W3NID_ENDPOINT}/${linkingAccount.address}`,
    );
    setLinkingStatus(undefined);
    setLinkingStep(1);
  }, [linkingAccount]);

  const capableWallets = [...Object.entries(window.kilt)]
    .filter(([key]) => window.kilt[key].signExtrinsicWithDid)
    .map(([key, { name = key, signExtrinsicWithDid }]) => ({
      key,
      name,
      handleClick: () => handleLinking(signExtrinsicWithDid),
    }));
  const buttons = capableWallets.length > 0 ? capableWallets : [fakeWallet];

  return (
    <div className={styles.container}>
      {buttons.map(({ key, name, handleClick }) => (
        <button
          key={key}
          className={styles.linkingBtn}
          disabled={!did || !linkingAccount || !payerAccount}
          onClick={handleClick}
        >
          {capableWallets.length === 1
            ? 'Link DID with account'
            : `Link ${name} DID with account`}
        </button>
      ))}

      <LinkingModal
        linkingStatus={linkingStatus}
        onClose={() => setLinkingStatus(undefined)}
        onSuccess={handleSuccess}
        linkingStep={linkingStep}
      />
    </div>
  );
}
