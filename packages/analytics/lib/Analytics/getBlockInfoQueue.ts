import fastq, { queueAsPromised } from "fastq";
import { config } from "./../../config";
import { providers } from "./providers";

let processedBlocks = 0;
let seenTransactions = 0;

interface Args {
  blockNumber: number;
}
const getBlock = async ({ blockNumber }: Args): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    let cancelRequest = false;
    const toId = setTimeout(() => {
      cancelRequest = true;
      const error = new Error("Timeout");
      error.name = "RequestTimeoutError";
      getBlock({ blockNumber });
      reject(error);
      clearTimeout(toId);
    }, 10000);

    const block = await providers[
      Math.floor(Math.random() * providers.length)
    ].getBlockWithTransactions(blockNumber);

    // todo: get receipts for each transaction
    // block.transactions.map((transaction) => {
    //   await provider.getTransactionReceipt(transaction.hash)
    // })

    if (cancelRequest) {
      return;
    }

    seenTransactions += block.transactions.length;

    process.send({
      cmd: "transactions",
      payload: {
        transactions: block.transactions,
        blockNumber,
      },
    });

    processedBlocks++;
    resolve();
  });
};
export { processedBlocks, seenTransactions };

export const blockInfoQueue: queueAsPromised<Args> = fastq.promise(
  getBlock,
  config.concurrentBlockRequests
);
