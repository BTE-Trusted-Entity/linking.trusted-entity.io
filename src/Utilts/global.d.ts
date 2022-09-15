export {};
declare global {
  interface Window {
    kilt: {
      sporran: {
        signExtrinsicWithDid(
          extrinsic: HexString,
          signer: string,
          signingDid?: string,
        ): Promise<{ signed: HexString; didKeyUri: string }>;
      };
    };
  }
}
