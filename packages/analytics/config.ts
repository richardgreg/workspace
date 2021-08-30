import { cpus } from "os";
const numCPUs = cpus().length;

export const config: Config = {
  indexBatchSize: 10000,
  concurrentBlockRequests: 2, // per thread
  concurrentIndexRequests: 5, 
  threads: Math.floor(numCPUs / 2),
  blocksToImport: 5000000, // from latest blocknumber
};

export interface Config {
  indexBatchSize: number;
  concurrentBlockRequests: number;
  concurrentIndexRequests: number;
  threads: number;
  blocksToImport: number;
}
