import styles from './Footer.module.css';

import Privacy from '../../DocAssets/LinkAddressestoweb3nameWebsite_PrivacyPolicy_62022.docx.pdf';
import Terms from '../../DocAssets/LinkAddressestoweb3nameWebsite_Terms_62022.pdf';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <a
          className={styles.anchor}
          href={Terms}
          target="_blank"
          rel="noreferrer"
        >
          Terms & Conditions for the Website to Link Addresses (PDF)
        </a>
        <a
          className={styles.anchor}
          href={Privacy}
          target="_blank"
          rel="noreferrer"
        >
          Privacy Policy for the Website to Link Addresses (PDF)
        </a>

        <div className={styles.imprint}>
          <h6 className={styles.imprintHeading}>Imprint</h6>
          <p className={styles.imprintLine}>
            B.T.E. BOTLabs Trusted Entity GmbH
          </p>
          <p className={styles.imprintLine}>Keithstraße 2-4</p>
          <p className={styles.imprintLine}>10787 Berlin, Germany</p>
          <p className={styles.imprintLine}>
            Germany Commercial Court: Amtsgericht Charlottenburg in Berlin
          </p>
          <p className={styles.imprintLine}>Registration Number: HRB 231219B</p>
          <p className={styles.imprintLine}>VAT No: DE 346528612</p>
          <p className={styles.imprintLine}>Managing Director: Ingo Rübe</p>
          <p className={styles.imprintLine}>
            Contact:{' '}
            <a className={styles.anchor} href="mailto:info@botlabs.org">
              info@botlabs.org
            </a>
          </p>
          <p className={styles.imprintLine}>
            Or go to{' '}
            <a
              className={styles.anchor}
              href="https://support.kilt.io/support/home"
              target="_blank"
              rel="noreferrer"
            >
              Tech Support
            </a>{' '}
            and click on &quotContact Us&quot
          </p>

          <p className={styles.spacedLine}>
            Requirements according to § 5 TMG (Germany)
          </p>

          <p className={styles.spacedLine}>
            &copy; 2022 B.T.E. BOTLabs Trusted Entity GmbH
          </p>
        </div>
      </div>
    </footer>
  );
};
