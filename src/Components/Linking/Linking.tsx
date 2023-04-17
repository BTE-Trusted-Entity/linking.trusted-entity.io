import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DidUri } from '@kiltprotocol/sdk-js';

import * as styles from './Linking.module.css';

import { SelectAccount } from '../SelectAccount/SelectAccount';
import { SelectPayer } from '../SelectPayer/SelectPayer';
import { LinkingButton } from '../LinkingButton/LinkingButton';

import { useScrollIntoView } from '../../Hooks/useScrollIntoView';

import {
  getSubstrateAccounts,
  InjectedAccount,
} from '../../Utilts/linking-helpers';

export const ETHEREUM_WALLET = 'MetaMask';

export const Linking = () => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleExpand = useCallback(() => {
    if (expanded) {
      return;
    }
    setExpanded(true);
  }, [expanded]);

  const [error, setError] = useState<string | null>(null);

  const [did, setDid] = useState<DidUri>();

  const [ethereumAccounts, setEthereumAccounts] = useState<InjectedAccount[]>(
    [],
  );
  const [substrateAccounts, setSubstrateAccounts] = useState<InjectedAccount[]>(
    [],
  );
  const [kiltAccounts, setKiltAccounts] = useState<InjectedAccount[]>([]);

  const linkableAccounts = useMemo(
    () => [...ethereumAccounts, ...substrateAccounts],
    [ethereumAccounts, substrateAccounts],
  );

  const [loadingWallets, setLoadingWallets] = useState<boolean>(false);

  const [linkingAccount, setLinkingAccount] = useState<InjectedAccount>();
  const [payerAccount, setPayerAccount] = useState<InjectedAccount>();

  const handleEthereumAccountChanged = useCallback((accounts: string[]) => {
    // MetaMask currently only injects an array of one account
    setEthereumAccounts([
      { address: accounts[0], meta: { source: ETHEREUM_WALLET } },
    ]);
    setLinkingAccount(undefined);
  }, []);

  useEffect(() => {
    window.ethereum?.on('accountsChanged', handleEthereumAccountChanged);

    return () =>
      window.ethereum?.removeListener(
        'accountsChanged',
        handleEthereumAccountChanged,
      );
  }, [handleEthereumAccountChanged]);

  const handleConnect = useCallback(async () => {
    if (loadingWallets) return;
    setError(null);
    setLoadingWallets(true);

    const { allAccounts, kiltAccounts } = await getSubstrateAccounts();

    setSubstrateAccounts(allAccounts);
    setKiltAccounts(kiltAccounts);

    try {
      const ethereumAccounts = await window.ethereum?.request({
        method: 'eth_requestAccounts',
      });
      handleEthereumAccountChanged(ethereumAccounts);
    } catch {
      if (!allAccounts.length) {
        setError('No wallets found');
      }
    }

    setLoadingWallets(false);
  }, [loadingWallets, handleEthereumAccountChanged]);

  const cardRef = useRef<HTMLDivElement>(null);
  useScrollIntoView(expanded, cardRef);

  return (
    <section
      className={expanded ? styles.containerExpanded : styles.container}
      ref={cardRef}
    >
      <h1
        className={expanded ? styles.headingExpanded : styles.heading}
        onClick={handleExpand}
      >
        Link your web3name and your account
      </h1>

      {expanded && (
        <div className={styles.content}>
          <p className={styles.subHeading}>
            To link your web3name and DID to your account:
          </p>
          <ol className={styles.stepsList}>
            <li className={styles.stepItem}>Open your Sporran extension</li>

            <li className={styles.stepItem}>Click “Manage DID”</li>

            <li className={styles.stepItem}>
              Click the clipboard icon to the right of your DID to copy it
            </li>

            <li className={styles.stepItem}>
              Paste your DID into the field below:
              <div className={styles.inputContainer}>
                <input
                  className={styles.input}
                  placeholder="Enter DID"
                  onInput={(event) => {
                    setDid(event.currentTarget.value as DidUri);
                  }}
                />
              </div>
            </li>

            <li className={styles.stepItem}>
              Click “Connect to wallet”
              <button
                className={
                  loadingWallets ? styles.connectBtnLoader : styles.connectBtn
                }
                disabled={!loadingWallets && linkableAccounts.length > 0}
                onClick={handleConnect}
              >
                {!loadingWallets && linkableAccounts.length > 0
                  ? 'Wallets Loaded'
                  : 'Connect To Wallet'}
              </button>
              {error && <p className={styles.error}>{error}</p>}
              <p className={styles.stepInfo}>
                This triggers pop-ups to request access to your Polkadot-enabled
                extensions, including Sporran, and to your MetaMask.
              </p>
            </li>

            <li className={styles.stepItem}>
              Click “Allow access” on each wallet
            </li>

            <li className={styles.stepItem}>
              Click the arrow next to “Choose Account Name” to open the dropdown
              list. Choose the account you wish to link to your web3name
              <SelectAccount
                accounts={linkableAccounts}
                selected={linkingAccount}
                onSelect={setLinkingAccount}
              />
            </li>

            <li className={styles.stepItem}>
              Choose the KILT account you wish to pay the transaction fees from
              (This may be a different account. Please ensure you choose a
              wallet containing enough KILT to cover the transaction fee –
              currently around 0.0045 KILT.)
              <SelectPayer
                accounts={kiltAccounts}
                selected={payerAccount}
                onSelect={setPayerAccount}
              />
            </li>

            <li className={styles.stepItem}>
              Click “Link DID With Account” (By clicking this button, you accept
              the Terms and Conditions.)
              <p className={styles.stepInfoImportant}>
                Note, linking a DID/web3name with an account is done on the
                blockchain and therefore public and a permanent record. If you
                want to keep the account address and funds private, don’t link
                the account to your DID.
              </p>
              <LinkingButton
                linkingAccount={linkingAccount}
                did={did}
                payerAccount={payerAccount}
              />
              <p className={styles.stepInfo}>
                The extension of the account you are linking will pop up. Enter
                your password as requested and click “Sign”.
              </p>
              <p className={styles.stepInfo}>
                Sporran will then open and ask you to sign the linking. Enter
                your password and click “Sign”. Note, if you have more than one
                Sporran account, make sure you are signing from the account with
                the DID you entered previously.
              </p>
              <p className={styles.stepInfo}>
                Sign the transaction from the payer account.
              </p>
            </li>
          </ol>

          <p className={styles.stepInfo}>That&apos;s it.</p>
          <button
            className={styles.collapseBtn}
            onClick={() => setExpanded(false)}
            aria-label="Collapse content"
          />
        </div>
      )}
    </section>
  );
};
