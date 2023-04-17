export {};
declare global {
  interface Window {
    kilt: {
      sporran: {
        signExtrinsicWithDid(
          extrinsic: HexString,
          submitter: string,
        ): Promise<{ signed: HexString; didKeyUri: string }>;
      };
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any;
  }
}
