// @flow

import type { CoreAmount, Spec } from "../../libcore/types";

declare class CoreQrlLikeAddress {
  toBase58(): Promise<string>;
}

declare class CoreQrlLikeTransaction {
  getHash(): Promise<string>;
  getFees(): Promise<CoreAmount>;
  getReceiver(): Promise<CoreQrlLikeAddress>;
  getSender(): Promise<CoreQrlLikeAddress>;
  serialize(): Promise<string>;
  setSignature(string, string): Promise<void>;
  setDERSignature(string): Promise<void>;
}

declare class CoreQrlLikeOperation {
  getTransaction(): Promise<CoreQrlLikeTransaction>;
}

declare class CoreQrlLikeTransactionBuilder {
  wipeToAddress(address: string): Promise<void>;
  sendToAddress(amount: CoreAmount, recipient: string): Promise<void>;
  setFees(fees: CoreAmount): Promise<void>;
  build(): Promise<CoreQrlLikeTransaction>;
}

declare class CoreQrlLikeAccount {
  buildTransaction(): Promise<CoreQrlLikeTransactionBuilder>;
  broadcastRawTransaction(signed: string): Promise<string>;
}

export type CoreStatics = {
  QrlLikeOperation: Class<CoreQrlLikeOperation>,
  QrlLikeAddress: Class<CoreQrlLikeAddress>,
  QrlLikeTransaction: Class<CoreQrlLikeTransaction>,
  QrlLikeAccount: Class<CoreQrlLikeAccount>,
  QrlLikeTransactionBuilder: Class<CoreQrlLikeTransactionBuilder>,
  QrlLikeTransaction: Class<CoreQrlLikeTransaction>
};

export type {
  CoreQrlLikeAccount,
  CoreQrlLikeAddress,
  CoreQrlLikeOperation,
  CoreQrlLikeTransaction,
  CoreQrlLikeTransactionBuilder
};

export type CoreAccountSpecifics = {
  asQrlLikeAccount(): Promise<CoreQrlLikeAccount>
};

export type CoreOperationSpecifics = {
  asQrlLikeOperation(): Promise<CoreQrlLikeOperation>
};

export type CoreCurrencySpecifics = {};

export const reflect = (declare: (string, Spec) => void) => {
declare("QrlLikeAddress", {
    methods: {
    }
  });

declare("QrlLikeOperation", {
    methods: {
      getTransaction: {
        returns: "QrlLikeTransaction"
      }
    }
  });

declare("QrlLikeTransaction", {
    methods: {
      getHash: {},
      getFees: { returns: "Amount" },
      getReceiver: { returns: "QrlLikeAddress" },
      getSender: { returns: "QrlLikeAddress" },
      serialize: { returns: "hex" },
      setSignature: {
        params: ["hex", "hex"]
      },
      setDERSignature: {
        params: ["hex"]
      }
    }
  });

declare("QrlLikeTransactionBuilder", {
    methods: {
      wipeToAddress: {},
      sendToAddress: {
        params: ["Amount"]
      },
      setFees: {
        params: ["Amount"]
      },
      build: {
        returns: "QrlLikeTransaction"
      }
    }
  });

declare("QrlLikeAccount", {
    methods: {
      buildTransaction: {
        returns: "QrlLikeTransactionBuilder"
      },
      broadcastRawTransaction: {
        params: ["hex"]
      }
    }
  });
};
