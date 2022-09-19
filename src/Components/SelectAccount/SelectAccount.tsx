import { useState } from 'react';

import * as styles from './SelectAccount.module.css';

import { InjectedAccount } from '../../Utilts/linking-helpers';

interface Wallet {
  accounts: InjectedAccount[];
  onSelect: React.Dispatch<React.SetStateAction<InjectedAccount | undefined>>;
  selected?: InjectedAccount;
}

export const SelectAccount = (props: Wallet) => {
  const [showOptions, setShowOptions] = useState(false);

  const openOptionsMenu = async () => {
    if (!props.accounts.length) return;
    if (showOptions) setShowOptions(false);
    else setShowOptions(true);
  };
  const selectOptions = (account: InjectedAccount) => {
    props.onSelect(account);
    setShowOptions(false);
  };
  return (
    <div className={styles.container}>
      <div
        className={
          showOptions ? styles.selectContainerOpen : styles.selectContainer
        }
        onClick={() => openOptionsMenu()}
      >
        <div className={styles.selection}>
          {props.selected
            ? `${props.selected.meta.name} (${props.selected.meta.source})`
            : 'Choose Account Name'}
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
