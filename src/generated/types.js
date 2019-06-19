// @flow
import { reflect as bitcoinReflect } from "../families/bitcoin/types";
import type { CoreStatics as CoreStatics_bitcoin } from "../families/bitcoin/types";
import type { CoreAccountSpecifics as CoreAccountSpecifics_bitcoin } from "../families/bitcoin/types";
import type { CoreOperationSpecifics as CoreOperationSpecifics_bitcoin } from "../families/bitcoin/types";
import type { CoreCurrencySpecifics as CoreCurrencySpecifics_bitcoin } from "../families/bitcoin/types";
import { reflect as ethereumReflect } from "../families/ethereum/types";
import type { CoreStatics as CoreStatics_ethereum } from "../families/ethereum/types";
import type { CoreAccountSpecifics as CoreAccountSpecifics_ethereum } from "../families/ethereum/types";
import type { CoreOperationSpecifics as CoreOperationSpecifics_ethereum } from "../families/ethereum/types";
import type { CoreCurrencySpecifics as CoreCurrencySpecifics_ethereum } from "../families/ethereum/types";
import { reflect as rippleReflect } from "../families/ripple/types";
import type { CoreStatics as CoreStatics_ripple } from "../families/ripple/types";
import type { CoreAccountSpecifics as CoreAccountSpecifics_ripple } from "../families/ripple/types";
import type { CoreOperationSpecifics as CoreOperationSpecifics_ripple } from "../families/ripple/types";
import type { CoreCurrencySpecifics as CoreCurrencySpecifics_ripple } from "../families/ripple/types";
import { reflect as qrlReflect } from "../families/qrl/types";
import type { CoreStatics as CoreStatics_qrl } from "../families/qrl/types";
import type { CoreAccountSpecifics as CoreAccountSpecifics_qrl } from "../families/qrl/types";
import type { CoreOperationSpecifics as CoreOperationSpecifics_qrl } from "../families/qrl/types";
import type { CoreCurrencySpecifics as CoreCurrencySpecifics_qrl } from "../families/qrl/types";

export type SpecificStatics = {}
& CoreStatics_bitcoin
& CoreStatics_ethereum
& CoreStatics_ripple
& CoreStatics_qrl
export type CoreAccountSpecifics = {}
& CoreAccountSpecifics_bitcoin
& CoreAccountSpecifics_ethereum
& CoreAccountSpecifics_ripple
& CoreAccountSpecifics_qrl
export type CoreOperationSpecifics = {}
& CoreOperationSpecifics_bitcoin
& CoreOperationSpecifics_ethereum
& CoreOperationSpecifics_ripple
& CoreOperationSpecifics_qrl
export type CoreCurrencySpecifics = {}
& CoreCurrencySpecifics_bitcoin
& CoreCurrencySpecifics_ethereum
& CoreCurrencySpecifics_ripple
& CoreCurrencySpecifics_qrl
export const reflectSpecifics = (declare: *) => {
bitcoinReflect(declare);
ethereumReflect(declare);
rippleReflect(declare);
qrlReflect(declare);
};
