import { Icon } from 'react-feather';

export interface Contract {
  address: string;
  name: string;
}

export interface ChartData {
  averageGasPrice: number;
  co2Emissions: number;
  date: Date;
  gasUsed: number;
  numTransactions: number;
  unit: string;
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
  statCur: number;
  statPrev: number;
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
  date?: Date;
}
export interface TransactionGroupSummary {
  averageGasPrice: number;
  blockStartDate: string;
  co2Emissions: number;
  endBlock: number;
  gasUsed: number;
  numTransactions: number;
  startBlock: number;
}

export interface ContractEmissions {
  contractAddress: string;
  transactionGroupSummaries: TransactionGroupSummary[];
}

export interface DateTimePickerProps {
  updateDates: (startDate: Date, endDate: Date) => void;
  endDate: Date;
  startDate: Date;
}

export interface CalendarInputProps {
  label: string;
  defaultDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  isStartInput?: Boolean;
  onChange?: (selectedDate: Date) => void;
}

export type ChartReadyState = 'loading' | 'error' | 'done';
