// @flow
import { BigNumber } from "bignumber.js";
import {
    parseCurrencyUnit,
    getCryptoCurrencyById,
    formatCurrencyUnit
} from "../currencies";
import network from "../network";
import {getCurrencyExplorer} from "../explorers";

const qrlUnit = getCryptoCurrencyById("qrl").units[0];

export const defaultEndpoint = "http://127.0.0.1:19009/";

export const apiForEndpointConfig = (
    qrlAPI: *,
    endpointConfig: ?string = null
) => {
    const server = endpointConfig || defaultEndpoint;
    const api = new qrlAPI(server);
    // api.on("error", (errorCode, errorMessage) => {
    //     console.warn(`QRL API error: ${errorCode}: ${errorMessage}`);
    // });
    return api;
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

export const qrlAPI = (): API => {
    if (!defaultEndpoint) {
        throw new LedgerAPINotAvailable(`LedgerAPINotAvailable ${currency.id}`, {
            currencyName: currency.name
        });
    }
    return {
        async getTransactions(address) {
            let { data } = await network({
                method: "GET",
                url: `${baseURL}/GetTransactions/${address}`,
            });
            // v3 have a bug that still includes the tx of the paginated block_hash, we're cleaning it up
            if (blockHash && getCurrencyExplorer(currency).version === "v3") {
                data = {
                    ...data,
                    txs: data
                };
            }
            return data;
        },

        async getCurrentBlock() {
            const { data } = await network({
                method: "GET",
                url: `${baseURL}/GetLatestBlock`
            });
            return data;
        },

        async getAccountNonce(address) {
            const { data } = await network({
                method: "GET",
                url: `${baseURL}/GetNonce/${address}`
            });
            return data[0].nonce;
        },

        async broadcastTransaction(tx) {
            const { data } = await network({
                method: "POST",
                url: `${baseURL}/TransferTx/send`,
                data: { tx }
            });
            return data.result;
        },

        async getAccountBalance(address) {
            const { data } = await network({
                method: "GET",
                url: `${baseURL}/GetBalance/${address}`
            });
            // FIXME precision lost here. nothing we can do easily
            return BigNumber(data[0].balance);
        }
    };
};
