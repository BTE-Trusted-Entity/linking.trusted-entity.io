import { useCallback, useRef, useState } from 'react';

import * as styles from './GettingSporran.module.css';

import { useScrollIntoView } from '../../Hooks/useScrollIntoView';

export const GettingSporran = () => {
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
        1. Get your Sporran wallet
      </h1>

      {expanded && (
        <div className={styles.content}>
          <p className={styles.subHeading}>
            The Sporran wallet is a browser-based extension that interacts with
            the KILT blockchain, displaying KILT Coin balances and enabling
            signing and sending transactions. The wallet also stores
            credentials, allowing you to build a decentralized digital identity
            and control who sees your data. (Currently Sporran is available on
            desktop only.)
          </p>

          <div className={styles.indented}>
            <div className={styles.extensionWrapper}>
              <a
                className={styles.chromeExtension}
                href="https://chrome.google.com/webstore/detail/djdnajgjcbjhhbdblkegbcgodlkkfhcl"
                target="_blank"
                rel="noreferrer"
              >
                <span className={styles.hiddenLinkText}>Chrome Extension</span>
              </a>

              <a
                className={styles.firefoxExtension}
                href="https://addons.mozilla.org/firefox/addon/sporran/"
                target="_blank"
                rel="noreferrer"
              >
                <span className={styles.hiddenLinkText}>Firefox Extension</span>
              </a>
            </div>

            <p>
              <a
                className={styles.linkToGuide}
                href="https://kilt-protocol.org/files/How-to-Guide-Create-Sporran-Wallet.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Guide to downloading Sporran (PDF)
              </a>
            </p>

            <p>
              <a
                className={styles.linkToGuide}
                href="https://www.sporran.org"
                target="_blank"
                rel="noreferrer"
              >
                Read additional information on Sporran.org
              </a>
            </p>

            <p>
              <a
                className={styles.linkToGuide}
                href="https://www.sporran.org/terms.html"
                target="_blank"
                rel="noreferrer"
              >
                Sporran Terms & Conditions
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
