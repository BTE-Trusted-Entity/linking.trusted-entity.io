import React from 'react';

import styles from './Header.module.css';

import BTE from '../../ImageAssets/bte_logo.png';
import Kilt from '../../ImageAssets/kilt_logo_header.svg';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <img
          className={styles.bteLogo}
          src={BTE}
          alt="Botlabs Trusted Entity logo"
        />
        <img className={styles.kiltLogo} src={Kilt} alt="Built on KILT" />
        <h1 className={styles.heading}>
          <span>
            <span className={styles.textLarge}>link</span> your account
            addresses
          </span>
          <span className={styles.headingBottom}>
            with your unique web3name
          </span>
        </h1>
      </div>
    </header>
  );
};
