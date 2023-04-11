import { useState } from 'react';

import * as styles from './SelectAccount.module.css';

import { InjectedAccount } from '../../Utilts/linking-helpers';

interface Props {
  accounts: InjectedAccount[];
  onSelect: React.Dispatch<React.SetStateAction<InjectedAccount | undefined>>;
  selected?: InjectedAccount;
}

export const SelectAccount = ({ accounts, onSelect, selected }: Props) => {
  const [showOptions, setShowOptions] = useState(false);

  const openOptionsMenu = async () => {
    if (!accounts.length) return;
    if (showOptions) setShowOptions(false);
    else setShowOptions(true);
  };
  const selectOptions = (account: InjectedAccount) => {
    onSelect(account);
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
          {selected
            ? `${selected.meta.name || selected.address} (${
                selected.meta.source
              })`
            : 'Choose Account Name'}
        </div>
      </div>
      {showOptions && (
        <div className={styles.optionBoxContainer}>
          {accounts.map((account) => (
            <div
              className={styles.optionsWrapper}
              key={account.address}
              onClick={() => selectOptions(account)}
            >
              <div className={styles.options}>
                {account.meta.name || account.address} ({account.meta.source})
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
