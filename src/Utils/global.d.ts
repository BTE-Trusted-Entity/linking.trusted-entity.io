import { SignExtrinsicWithDid } from './types';

export {};
declare global {
  interface Window {
    kilt: Record<
      string,
      {
        name?: string;
        signExtrinsicWithDid: SignExtrinsicWithDid;
      }
    >;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any;
  }
}
