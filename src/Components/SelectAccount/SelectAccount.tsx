import React, { useState } from 'react';

import classnames from 'classnames';

import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

import styles from './SelectAccount.module.css';

import { ReactComponent as ArrowDown } from '../../ImageAssets/bte_Triangle.svg';

interface Wallet {
  accounts: InjectedAccountWithMeta[];
  onSelect: React.Dispatch<
    React.SetStateAction<InjectedAccountWithMeta | undefined>
  >;
  selected?: InjectedAccountWithMeta;
}

export const SelectAccount = (props: Wallet) => {
  const [showOptions, setShowOptions] = useState(false);

  const openOptionsMenu = async () => {
    if (!props.accounts.length) return;
    if (showOptions) setShowOptions(false);
    else setShowOptions(true);
  };
  const selectOptions = (account: InjectedAccountWithMeta) => {
    props.onSelect(account);
    setShowOptions(false);
  };
  return (
    <div className={styles.container}>
      <div
        className={classnames({
          [styles.selectContainer]: true,
          [styles.selectContainerOpen]: showOptions,
        })}
        onClick={() => openOptionsMenu()}
      >
        <div
          className={classnames({
            [styles.selection]: true,
          })}
        >
          {props.selected
            ? `${props.selected.meta.name} (${props.selected.meta.source})`
            : 'Choose Account Name'}
          <ArrowDown
            className={classnames({
              [styles.arrow]: true,
              [styles.arrowRotate]: showOptions,
            })}
          />
        </div>
      </div>
      {showOptions && (
        <div className={styles.optionBoxContainer}>
          {props.accounts.map((account) => (
            <div
              className={styles.optionsWrapper}
              key={account.address}
              onClick={() => selectOptions(account)}
            >
              <div className={styles.options}>
                {account.meta.name} ({account.meta.source})
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
