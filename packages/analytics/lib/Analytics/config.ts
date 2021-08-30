import { cpus } from "os";
const numCPUs = cpus().length;

export const config: Config = {
  indexBatchSize: 1000,
  concurrentBlockRequests: 2,
  concurrentIndexRequests: 5,
  threads: Math.floor(numCPUs / 2),
  blocksToImport: 5000000,
};

export interface Config {
  indexBatchSize: number;
  concurrentBlockRequests: number;
  concurrentIndexRequests: number;
  threads: number;
  blocksToImport: number;
}
