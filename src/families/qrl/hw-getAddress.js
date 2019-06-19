// @flow

import Qrl from "@theqrl/hw-app-qrl";
import type { Resolver } from "../../hw/getAddress/types";

const resolver: Resolver = async (
  transport,
  { path, verify, askChainCode }
) => {
  const qrl = new Qrl(transport);
  const { address, publicKey, chainCode } = await qrl.getAddress();
  return { path, address, publicKey, chainCode };
};

export default resolver;
