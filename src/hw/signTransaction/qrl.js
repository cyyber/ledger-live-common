// @flow
import Qrl from "@theqrl/hw-app-qrl";
import  validateQrlAddress  from '@theqrl/validate-qrl-address'
import type Transport from "@ledgerhq/hw-transport";
import type { CryptoCurrency } from "../../types";

const toBigendianUint64BytesUnsigned = (input, bufferResponse = false) => {
  const byteArray = [0, 0, 0, 0, 0, 0, 0, 0];
  for (var index = 0; index < byteArray.length; index += 1) {
    const byte = input.modulo(256).toNumber() & 0xff  // eslint-disable-line no-bitwise
    byteArray[index] = byte;
    input = input.minus(byte).dividedBy(256) // eslint-disable-line
  }
  byteArray.reverse();
  if (bufferResponse === true) {
    return Buffer.from(byteArray);
  }
  return new Uint8Array(byteArray);
};

export default async (
  currency: CryptoCurrency,
  transport: Transport<*>,
  path: string,
  txArg: Object
) => {
  const tx = txArg.transferTx;
  const sourceAddress = txData.sourceAddress;
  const qrl = new Qrl(transport);

  const ledgerState = await qrl.get_state();
  const maxOtsIndex = validateQrlAddress.hexString(sourceAddress).sig.number;
  // Doesn't allow usage of last 5 ots index from ledger live
  if (ledgerState.xmss_index > maxOtsIndex - 5) {
    throw new Error("Last 5 ots indexes can only be used by QRL web wallet.")
  }

  let publicKey = await qrl.publickey();

  const sourceAddr = Buffer.from(sourceAddress.substr(1), 'hex');
  const fee = toBigendianUint64BytesUnsigned(new BigNumber(tx.fee), true);
  let addressesTo = [];
  addressesTo.push(Buffer.from(tx.addressesTo[0].substr(1), 'hex'));
  let amounts = [];
  amounts.push(toBigendianUint64BytesUnsigned(new BigNumber(tx.amounts[0]), true));

  let resp = await qrl.createTx(sourceAddr, fee, addressesTo, amounts);
  const signature = await qrl.retrieveSignature(resp);

  return {publicKey: publicKey.public_key.toString('hex'), signature: Buffer.from(signature.signature).toString('hex')};
};

