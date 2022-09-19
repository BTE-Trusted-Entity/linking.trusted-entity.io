import { Fragment } from 'react';

import * as styles from './Popup.module.css';

import { LinkingSteps } from '../LinkingButton/LinkingButton';

interface ErrorContentsProps {
  onClose: React.MouseEventHandler;
}

function ErrorContents({ onClose }: ErrorContentsProps) {
  return (
    <Fragment>
      <p className={styles.errorText}>
        Oops!
        <br /> Click “Try Again” or reload the page or restart your browser.
      </p>
      <button className={styles.btn} onClick={onClose}>
        Try again
      </button>
    </Fragment>
  );
}

interface SuccessContentsProps {
  onSuccess: React.MouseEventHandler;
  onClose: React.MouseEventHandler;
}

function SuccessContents({ onSuccess, onClose }: SuccessContentsProps) {
  return (
    <Fragment>
      <p className={styles.successText}>
        Your account is now linked to searches of your DID/web3name on w3n.id
      </p>
      <button className={styles.btn} onClick={onSuccess}>
        CHECK IT NOW
      </button>
      <button
        aria-label="close modal"
        onClick={onClose}
        className={styles.closeBtn}
      />
    </Fragment>
  );
}

interface LoadingContentsProps {
  linkingStep: LinkingSteps;
}
function LoadingContents({ linkingStep }: LoadingContentsProps) {
  const linkingMessage = {
    1: 'The extension of the account you are linking to will pop up. Enter the password of that account and click “Sign”',
    2: 'Select the identity in Sporran containing the DID that you copied and pasted earlier. Enter your password and click “Sign”',
    3: 'Sign the transaction from the chosen payer account.',
    4: 'Your request is being processed. Please leave this tab open until the transaction is complete.',
  };

  return (
    <Fragment>
      <p className={styles.modalText}>{linkingMessage[linkingStep]}</p>
      <div className={styles.spinnerContainer}>
        {linkingStep !== 4 && <p className={styles.step}>{linkingStep}</p>}
      </div>
      <button className={styles.btnDisabled}>CHECK IT NOW</button>
    </Fragment>
  );
}

interface Props {
  linkingStatus?: 'linking' | 'success' | 'error';
  onClose: React.MouseEventHandler;
  onSuccess: React.MouseEventHandler;
  linkingStep: LinkingSteps;
}

export function LinkingModal({
  linkingStatus,
  onClose,
  onSuccess,
  linkingStep,
}: Props) {
  if (!linkingStatus) {
    return null;
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <h1 className={styles.heading}>Linking process</h1>
        {linkingStatus === 'linking' && (
          <LoadingContents linkingStep={linkingStep} />
        )}
        {linkingStatus === 'success' && (
          <SuccessContents onSuccess={onSuccess} onClose={onClose} />
        )}

        {linkingStatus === 'error' && <ErrorContents onClose={onClose} />}
      </div>
    </div>
  );
}
