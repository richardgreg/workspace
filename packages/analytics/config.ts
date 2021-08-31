import { cpus } from "os";
const numCPUs = cpus().length;

export const config: Config = {
  indexBatchSize: 25000,
  concurrentBlockRequests: 1, // per thread
  concurrentIndexRequests: 5,
  threads: Math.floor(numCPUs / 3),
  blocksToImport: 500000, // from latest blocknumber
  // blockStart: '',
  // blockEnd: '',
};

export interface Config {
  indexBatchSize: number;
  concurrentBlockRequests: number;
  concurrentIndexRequests: number;
  threads: number;
  blocksToImport: number;
}
