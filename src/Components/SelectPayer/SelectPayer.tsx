import React, { useState } from 'react';

import classnames from 'classnames';

import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

import styles from './SelectPayer.module.css';

import { ReactComponent as ArrowDown } from '../../ImageAssets/bte_Triangle.svg';

interface Wallet {
  accounts: InjectedAccountWithMeta[];
  selected?: InjectedAccountWithMeta;
  onSelect: React.Dispatch<
    React.SetStateAction<InjectedAccountWithMeta | undefined>
  >;
}

export const SelectPayer = (props: Wallet) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);

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
        <div className={styles.selection}>
          {props.selected
            ? `${props.selected.meta.name} (${props.selected.meta.source})`
            : 'Choose Payer Account'}
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
