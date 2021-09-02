export interface EmissionStats {
  address: string;
  averageGasPrice: number;
  blockStartDate: Date;
  co2Emissions: number;
  endBlock: number;
  gasUsed: number;
  numTransactions: number;
  startBlock: number;
}

export interface StatCardData {
  change: string;
  changeType: 'increase' | 'decrease';
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  id: number;
  name: string;
  stat: number;
}

export interface Contract {
  address: string;
  name: string;
}

export interface Transaction {
  blockHash: string;
  blockNumber: string;
  confirmations: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  from: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  hash: string;
  input: string;
  isError: string;
  nonce: string;
  to: string;
  transactionIndex: string;
  txreceipt_status: string;
  timeStamp: string;
  value: string;
}
