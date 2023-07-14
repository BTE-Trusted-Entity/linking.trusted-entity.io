export function checkTestEnvironment() {
  if (process.env.REACT_APP_IS_TEST_ENV !== 'true') {
    return;
  }

  const message =
    'This is a testing page, do not use it with real KILT coins. Do you want to go to the real linking page?';

  if (!confirm(message)) {
    return;
  }

  window.location.href = 'https://linking.trusted-entity.io';
  throw new Error('The user does not want to use the testing page.');
}
