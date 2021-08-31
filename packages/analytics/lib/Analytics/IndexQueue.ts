import { ethers } from "ethers";
import fastq, { queueAsPromised } from "fastq";
import { config } from "../../config";
import { Indexer } from "@myelastic/indexer";
import { BlockWithTransactions } from "@ethersproject/abstract-provider";

const transactionsToIndex = [[]];
let currentIndexBatch = 0;
/**
 *
 */
interface IndexingQueueArgs {
  transaction: ethers.providers.TransactionResponse;
  receipt: ethers.providers.TransactionReceipt;
  block: BlockWithTransactions;
}
const indexToElasticSearch = async ({
  transaction,
  block,
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
    //console.log({
    //  currentBatchLength: transactionsToIndex[currentIndexBatch].length,
    //  currentIndexBatch,
    //});

    if (
      transactionsToIndex[currentIndexBatch].length >= config.indexBatchSize
    ) {
      console.log(
        "Indexing batch of",
        transactionsToIndex[currentIndexBatch].length
      );
      let batch = transactionsToIndex[currentIndexBatch];
      currentIndexBatch++;
      console.log(
        "batches to index, length of each batch",
        transactionsToIndex.map((batch) => batch.length)
      );

      const indexer = await new Indexer({
        index: "eth_transactions_2",
        batchSize: config.indexBatchSize,
      })
        .bulkIndex(batch)
        .catch((e) => {
          console.log("ERRROR", e);
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
