import { useCallback, useRef, useState } from 'react';

import styles from './ClaimWeb3name.module.css';

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
            Your web3name is a custom name you create to represent your on-chain
            decentralized identifier (DID), which personalizes your digital
            identity.
          </p>
          <p>
            Upgrading to an on-chain DID requires a deposit of 2 KILT and a
            small transaction fee (around 0.0045 KILT).
          </p>
          <ol className={styles.stepsList}>
            <li className={styles.stepItem}>Open your Sporran extension</li>
            <li className={styles.stepItem}>Click “Create web3name”</li>
          </ol>
          <p className={styles.linkParagraph}>
            <a
              className={styles.linkToGuide}
              href="https://www.trusted-entity.io/assets/pdf/How_To_Guide_web3name_link_address_Full_May22.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Guide to claiming your web3name (PDF)
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
