import { Icon } from 'react-feather';
export interface Contract {
  address: string;
  name: string;
}

export interface ContractEmissions {
  contractAddress: string;
  transactionGroups: TransactionGroup[];
}

export interface EmissionEstimate {
  emissionsGpEth: number;
  date: Date;
  timestamp: number;
}

export interface StatCardData {
  change: string;
  changeType: 'increase' | 'decrease';
  icon: Icon | ((props: React.ComponentProps<'svg'>) => JSX.Element);
  id: number;
  name: string;
  stat: number;
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
  emissions?: number;
}
export interface TransactionGroup {
  averageGasPrice: number;
  blockStartDate: string;
  co2Emissions: number;
  endBlock: number;
  gasUsed: number;
  numTransactions: number;
  startBlock: number;
}
