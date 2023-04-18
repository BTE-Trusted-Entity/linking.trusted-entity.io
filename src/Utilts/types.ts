import { HexString } from '@polkadot/util/types';

export type SignExtrinsicWithDid = (
  extrinsic: HexString,
  submitter: string,
) => Promise<{ signed: HexString; didKeyUri: string }>;
