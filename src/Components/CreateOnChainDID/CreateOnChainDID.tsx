import { useCallback, useRef, useState } from 'react';

import classnames from 'classnames';

import styles from './CreateOnChainDID.module.css';

import { useScrollIntoView } from '../../Hooks/useScrollIntoView';

export const CreateOnChainDID = () => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleExpand = useCallback(() => {
    if (expanded) {
      return;
    }
    setExpanded(true);
  }, [expanded]);

  const cardRef = useRef<HTMLDivElement>(null);
  useScrollIntoView(expanded, cardRef);

  return (
    <section
      className={classnames(
        expanded ? styles.containerExpanded : styles.container,
      )}
      ref={cardRef}
    >
      <h1
        className={classnames(
          expanded ? styles.headingExpanded : styles.heading,
        )}
        onClick={handleExpand}
      >
        2. Create your on-chain DID
      </h1>
      {expanded && (
        <div className={styles.content}>
          <p className={styles.subHeading}>
            Your decentralized Identifier (DID) is a unique set of numbers and
            letters that represents your identity, like a digital fingerprint.
            When you upgrade to an on-chain DID, you can link multiple things to
            your DID including:
          </p>
          <ul className={styles.bulletList}>
            <li>Your unique web3name </li>
            <li>
              As many of your Polkadot ecosystem (and soon, Ethereum) addresses
              that you wish
            </li>
            <li>
              Any credentials you want to make public, such as social media
              handles, GitHub and email addresses
            </li>
            <li>Communication endpoints, e.g., your website</li>
          </ul>
          <p>
            Upgrading to an on-chain DID requires a deposit of 2 KILT and a
            small transaction fee (around 0.0045 KILT).
          </p>
          <ol className={styles.stepsList}>
            <li className={styles.stepItem}>Open your Sporran extension</li>
            <li className={styles.stepItem}>Click “Upgrade to on-chain DID”</li>
          </ol>
          <p className={styles.linkParagraph}>
            <a
              className={styles.linkToGuide}
              href="https://www.trusted-entity.io/assets/pdf/Upgrading-to-on-chain-DID.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Guide to upgrading your DID (PDF)
            </a>
          </p>
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
