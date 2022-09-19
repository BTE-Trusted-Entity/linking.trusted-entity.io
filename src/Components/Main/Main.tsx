import * as styles from './Main.module.css';

import { Linking } from '../Linking/Linking';
import { GettingSporran } from '../GettingSporran/GettingSporran';
import { CreateOnChainDID } from '../CreateOnChainDID/CreateOnChainDID';
import { ClaimWeb3name } from '../ClaimWeb3name/ClaimWeb3name';

export const Main = () => {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <p className={styles.topText}>
          Linking your accounts with your web3name and on-chain DID – your
          unique decentralized identifier – makes it easier for others to
          reference you.
        </p>

        <p className={styles.boldText}>
          Follow the steps below to link your web3name with your Polkadot
          ecosystem accounts, and (coming soon) your Ethereum accounts.
        </p>

        <p className={styles.info}>
          Before linking you need a Sporran wallet, an on-chain DID and a
          web3name. If you don’t already have them, scroll{' '}
          <a href="#instructions">down</a> for instructions on setting them up.
        </p>

        <Linking />

        <h2 className={styles.instructions} id="instructions">
          <span className={styles.bold}>Instructions</span> on how to get your
          Sporran, on-chain DID and your web3name:
        </h2>
        <GettingSporran />
        <CreateOnChainDID />
        <ClaimWeb3name />
      </div>
    </main>
  );
};
