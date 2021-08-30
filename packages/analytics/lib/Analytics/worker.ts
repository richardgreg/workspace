import {
  blockInfoQueue,
  processedBlocks,
  seenTransactions,
} from "./getBlockInfoQueue";

export default function main() {
  const blockMin = Number(process.env.BLOCK_MIN);
  const blockMax = Number(process.env.BLOCK_MAX);

  console.log(`Worker ${process.pid} started`, {
    blockMin,
    blockMax,
  });

  for (let i = blockMin; i <= blockMax; i++) {
    blockInfoQueue
      .push({ blockNumber: i })
      .catch((e) => console.error("error", console.log(e)));
  }

  const intId = setInterval(() => {
    if (processedBlocks <= blockMax - blockMin) {
      process.send({
        cmd: "update",
        payload: {
          process: process.pid,
          processedBlocks,
          seenTransactions,
        },
      });
    } else {
      console.log({
        process: process.pid,
        complete: true,
        processedBlocks,
        message: `
        ==============================================================================
        ================================== DONE ======================================
        ==============================================================================
        `,
      });
      clearInterval(intId);
    }
  }, 10000);
}
