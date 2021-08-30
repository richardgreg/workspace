import { ethers } from "ethers";
import fastq, { queueAsPromised } from "fastq";
import { config } from "../../config";
import { Indexer } from "@myelastic/indexer";

const transactionsToIndex = [[]];
let currentIndexBatch = 0;

interface IndexingQueueArgs {
  transactions: ethers.providers.TransactionResponse[];
  force: boolean;
}
const indexToElasticSearch = async ({
  transactions,
  force,
}: IndexingQueueArgs): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    if (transactionsToIndex[currentIndexBatch]?.length > 0) {
      transactionsToIndex[currentIndexBatch] = [
        ...transactionsToIndex[currentIndexBatch],
        ...transactions,
      ];
    } else {
      transactionsToIndex[currentIndexBatch] = transactions;
    }
    console.log({
      currentBatchLength: transactionsToIndex[currentIndexBatch].length,
      currentIndexBatch,
    });

    if (
      transactionsToIndex[currentIndexBatch].length > config.indexBatchSize ||
      force
    ) {
      console.log(
        "Indexing batch of",
        transactionsToIndex[currentIndexBatch].length
      );
      let batch = transactionsToIndex[currentIndexBatch];
      currentIndexBatch++;

      const indexer = await new Indexer({
        index: "eth_transactions",
        batchSize: config.indexBatchSize,
      })
        .bulkIndex(batch)
        .catch((e) => {
          reject(e);
        });

      //indexedTransactions += transactionsToIndex[batchToIndex].length;

      // delete batch from array so it doesn't grow too big in memory
      transactionsToIndex[currentIndexBatch - 1] = [];
    }

    resolve();
  });
};
export const indexingQueue: queueAsPromised<IndexingQueueArgs> = fastq.promise(
  indexToElasticSearch,
  config.concurrentIndexRequests
);
