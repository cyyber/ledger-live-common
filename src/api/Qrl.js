// @flow
import { BigNumber } from "bignumber.js";
import {
  parseCurrencyUnit,
  getCryptoCurrencyById,
  formatCurrencyUnit
} from "../currencies";

const qrlUnit = getCryptoCurrencyById("qrl").units[0];

export const defaultEndpoint = "https://brooklyn.theqrl.org/";

export const apiForEndpointConfig = (
  qrlAPI: *,
  endpointConfig: ?string = null
) => {
  const server = endpointConfig || defaultEndpoint;
  return new qrlAPI(server);
};

export const parseAPIValue = (value: string) =>
  parseCurrencyUnit(qrlUnit, value);

export const parseAPICurrencyObject = ({
                                         currency,
                                         value
                                       }: {
  currency: string,
  value: string
}) => {
  if (currency !== "QRL") {
    console.warn(`QrlJS: attempt to parse unknown currency ${currency}`);
    return BigNumber(0);
  }
  return parseAPIValue(value);
};

export const formatAPICurrencyQRL = (amount: BigNumber) => {
  const value = formatCurrencyUnit(qrlUnit, amount, {
    showAllDigits: true,
    disableRounding: true,
    useGrouping: false
  });
  return { currency: "QRL", value };
};
export type Block = { height: number }; // TODO more fields actually
// TODO Update Tx format
export type Tx = {
  hash: string,
  received_at: string,
  nonce: string,
  value: number,
  gas: number,
  gas_price: number,
  cumulative_gas_used: number,
  gas_used: number,
  from: string,
  to: string,
  input: string,
  index: number,
  block?: {
    hash: string,
    height: number,
    time: string
  },
  confirmations: number,
  status: number
};

export type API = {
  getTransactions: (
    address: string,
    blockHash: ?string
  ) => Promise<{
    truncated: boolean,
    txs: Tx[]
  }>,
  getCurrentBlock: () => Promise<Block>,
  getAccountNonce: (address: string) => Promise<number>,
  broadcastTransaction: (signedTransaction: string) => Promise<string>,
  getAccountBalance: (address: string) => Promise<BigNumber>,
};
