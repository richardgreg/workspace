export interface EmissionStats {
  transactionVol: number;
  gasUsed: number;
  emissions: number;
  address: string;
  startBlock: number;
  endBlock: number;
  averageGasPrice: number;
  blockStartDate: Date;
}

export interface Contract {
  name: string;
  address: string;
}

export interface Transaction {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
}

export interface ChartData {
  date: string;
  co2Emissions: number;
  numTransactions: number;
}
