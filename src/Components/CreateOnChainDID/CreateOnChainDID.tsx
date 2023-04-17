import { useCallback, useRef, useState } from 'react';

import * as styles from './CreateOnChainDID.module.css';

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
      className={expanded ? styles.containerExpanded : styles.container}
      ref={cardRef}
    >
      <h1
        className={expanded ? styles.headingExpanded : styles.heading}
        onClick={handleExpand}
      >
        2. Create your DID
      </h1>
      {expanded && (
        <div className={styles.content}>
          <p className={styles.subHeading}>
            Your decentralized Identifier (DID) is a unique set of numbers and
            letters that represents your identity, like a digital fingerprint.
            You can link multiple things to your DID including:
          </p>
          <div className={styles.indented}>
            <ul className={styles.bulletList}>
              <li>Your unique web3name </li>
              <li>
                As many of your Polkadot ecosystem and Ethereum addresses that
                you wish
              </li>
              <li>
                Any credentials you want to make public, such as social media
                handles, GitHub and email addresses
              </li>
              <li>Service endpoints, e.g., your website</li>
            </ul>
            <p>
              You can pay for your DID with KILT Coins (a deposit of around 2
              KILT and a transaction fee of around 0.0047 KILT) or using the
              Checkout Service and paying via Paypal (a nonrefundable service
              fee of EUR 4.00 including VAT).
            </p>
            <p>To create a DID:</p>
            <ol className={styles.stepsList}>
              <li className={styles.stepItem}>Open your Sporran extension</li>
              <li className={styles.stepItem}>Click “Get your DID”</li>
            </ol>
            <p>
              <a
                className={styles.linkToGuide}
                href="https://kilt-protocol.org/files/How-to-Guide-Get-Your-DID.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Guide to getting your DID (PDF)
              </a>
            </p>
          </div>
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
