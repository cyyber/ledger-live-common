// @flow

import Qrl from "@theqrl/hw-app-qrl";
import type { Resolver } from "../../hw/getAddress/types";

const resolver: Resolver = async (
  transport,
  { path, verify, askChainCode }
) => {
  const qrl = new Qrl(transport);
  const r = await qrl.getAddress();
  if (r.return_code && r.return_code !== "9000") {
    return
  }
  if (verify) {
      var result = await qrl.viewAddress();
    if (result.return_code && result.return_code !== "9000") {
      return
    }
  }
  return { path, address: r.address, publicKey: r.publicKey, chainCode: r.chainCode };
};

export default resolver;
