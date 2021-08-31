import cluster from "cluster";
import { config } from "./../../config";
import { providers } from "./providers";

export default async function main() {
  console.log(`Primary ${process.pid} is running`);
  const blockCeil = await providers[0].getBlockNumber();
  const blocksFloor = blockCeil - config.blocksToImport;
  const batchSize = Math.ceil(config.blocksToImport / config.threads);
  let totalProcessedBlocks = 0;
  let totalIndexedTransactions = 0;
  let totalSeenTransactions = 0;
  let blockMin = blocksFloor;
  let blockMax = blockMin + batchSize;

  for (let i = 0; i < config.threads; i++) {
    if (i !== 0) {
      blockMin = blockMax + 1;
      blockMax = blockMax + batchSize;
      if (blockMax > blockCeil) {
        blockMax = blockCeil;
      }
    }
    console.log("forking");
    // Fork workers.
    cluster.fork({
      BLOCK_MIN: blockMin,
      BLOCK_MAX: blockMax,
    });
  }

  const messageHandler = ({ cmd, payload }) => {
    if (cmd === "update") {
      const { processedBlocks, seenTransactions } = payload;
      totalProcessedBlocks += processedBlocks;
      totalSeenTransactions += seenTransactions;
    }
  };

  setInterval(() => {
    console.log({
      totalSeenTransactions,
      totalProcessedBlocks,
      totalIndexedTransactions,
    });
  }, 5000);

  for (const id in cluster.workers) {
    cluster.workers[id].on("message", messageHandler);
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
}
