// @flow

import type { CoreOperation } from "../../libcore/types";

async function qrlBuildOperation({
  coreOperation
}: {
  coreOperation: CoreOperation
}) {
  const qrlLikeOperation = await coreOperation.asQrlLikeOperation();
  const qrlLikeTransaction = await qrlLikeOperation.getTransaction();
  const hash = await qrlLikeTransaction.getHash();
  return { hash };
}

export default qrlBuildOperation;
