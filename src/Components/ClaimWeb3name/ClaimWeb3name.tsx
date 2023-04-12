import { useCallback, useRef, useState } from 'react';

import * as styles from './ClaimWeb3name.module.css';

import { useScrollIntoView } from '../../Hooks/useScrollIntoView';

export const ClaimWeb3name = () => {
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
        3. Claim your web3name
      </h1>

      {expanded && (
        <div className={styles.content}>
          <p className={styles.subHeading}>
            Your web3name is a custom name you create to represent your
            decentralized identifier (DID), which personalizes your digital
            identity.
          </p>
          <div className={styles.indented}>
            <p>
              You can pay for your web3name with KILT Coins (a deposit of 0.1181
              KILT and a transaction fee of around 0.0047 KILT) or using the
              Checkout Service and paying via Paypal (a nonrefundable service
              fee of EUR 1.20 including VAT).
            </p>
            <p>To claim your web3name:</p>
            <ol className={styles.stepsList}>
              <li className={styles.stepItem}>Open your Sporran extension</li>
              <li className={styles.stepItem}>Click “Create web3name”</li>
            </ol>
            <p>
              <a
                className={styles.linkToGuide}
                href="https://kilt-protocol.org/files/How-to-Guide-Get-Your-web3name.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Guide to claiming your web3name (PDF)
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
