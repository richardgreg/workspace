import fastq, { queueAsPromised } from "fastq";
import { providers } from "./providers";
import { BlockWithTransactions } from "@ethersproject/abstract-provider";
import { retryHandler } from "./retryHandler";
import { CircuitBreaker } from "./CircuitBreaker";
import { indexingQueue } from "./IndexQueue";
import { ethers } from "ethers";

let processedTxReceipts = 0;
let seenTxReceipts = 0;

const queueConfig = {
  maximumBackoff: 64 * 1000, // 64 seconds
  minimumBackoff: 1 * 1000, // 1 second
  concurrentRequests: 2,
  circuitBreakerMaxTries: 5,
};

let circuitBreaker = undefined;

interface Args {
  block: BlockWithTransactions;
  transaction: ethers.providers.TransactionResponse;
  tries?: number;
}
const getTransactionReceipt = async ({
  transaction,
  tries,
  block,
}: Args): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    const shouldCancelRequest = retryHandler(
      { tries, reject, options: queueConfig },
      () => {
        getTransactionReceipt({ transaction, tries, block });
      }
    );

    seenTxReceipts++;

    const receipt = await providers[
      Math.floor(Math.random() * providers.length)
    ].getTransactionReceipt(transaction.hash);

    indexingQueue.push({ receipt, transaction, block });

    if (shouldCancelRequest()) {
      return;
    }

    processedTxReceipts++;
    resolve();
  });
};

const getCircuitBreaker = (): CircuitBreaker => {
  if (!circuitBreaker) {
    circuitBreaker = new CircuitBreaker({
      queue: transactionReceiptQueue,
      config: queueConfig,
    });
  }
  return circuitBreaker;
};

const withCircuitBreaker = (callback) => {
  return (args: Args): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      const breaker = getCircuitBreaker();
      if (!breaker.checkCircuit(args.tries)) {
        transactionReceiptQueue.push(args);
        resolve(undefined);
        return;
      }
      await callback().catch((e) => reject(e));
      breaker.closeCircuit();
      resolve(undefined);
    });
  };
};

export { processedTxReceipts, seenTxReceipts };

export const transactionReceiptQueue: queueAsPromised<Args> = fastq.promise(
  withCircuitBreaker(getTransactionReceipt),
  queueConfig.concurrentRequests
);
